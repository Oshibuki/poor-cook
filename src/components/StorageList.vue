<script setup lang="ts">
import { reactive } from 'vue'

const iStore = useInventoryStore()

const category = [
  {
    value: 'all',
    text: '🥡 全部',
  },
  {
    value: 'vegetable',
    text: '蔬菜',
  },
  {
    value: 'meat',
    text: '肉类',
  },
  {
    value: 'staple',
    text: '主食',
  },
  {
    value: '其他',
    text: '其他',
  },
]

const dateType = [
  {
    value: 'all',
    text: '📆 全部',
  },
  {
    value: 'unexpired',
    text: '未到期',
  },
  {
    value: 'expiring',
    text: '临近到期',
  },
  {
    value: 'expired',
    text: '已到期',
  },
]

const state = reactive({
  category,
  dateType,
  currentCategory: 'all',
  currentDateType: 'all',
  searchValue: '',
})

const filteredInventory = computed(() => {
  let tmp = iStore.curInventory
  if (state.currentCategory !== 'all')
    tmp = tmp.filter(i => i.category === state.currentCategory)
  const today = new Date()
  if (state.currentDateType !== 'all') {
    if (state.currentDateType === 'expired')
      tmp = tmp.filter(i => today > new Date(i.expirationDate))
    else if (state.currentDateType === 'expiring')
      tmp = tmp.filter(i => Math.floor((new Date(i.expirationDate).getTime() - today.getTime()) / (24 * 3600 * 1000)) < 3)
    else if (state.currentDateType === 'unexpired')
      tmp = tmp.filter(i => Math.floor((new Date(i.expirationDate).getTime() - today.getTime()) / (24 * 3600 * 1000)) > 3)
  }
  return tmp
})
</script>

<template>
  <div class="h-sm">
    <div style="background-color: #F5F7FA;">
      <van-dropdown-menu text-lg>
        <van-dropdown-item v-model="state.currentCategory" :options="state.category" />
        <van-dropdown-item v-model="state.currentDateType" :options="state.dateType" />
      </van-dropdown-menu>
    </div>
    <van-empty v-if="filteredInventory.length === 0" description="库藏空空如也Σ(っ °Д °;)っ" image="search">
      <button text-4xl class="cursor-pointer hover:text-green-600 active:text-green-800" title="添加" @click.stop="$router.push('/addInventory')">
        <div i-mdi-plus-circle-outline />
      </button>
    </van-empty>
    <van-cell-group
      v-else mt-5
      inset
    >
      <storage-item v-for="(stuff, index) in filteredInventory" :key="stuff" :index="index" :stuff="stuff" />
    </van-cell-group>
    <van-action-bar fixed bottom="0" mx-4 rounded>
      <van-action-bar-icon icon="cart-o" text="已选中" :badge="iStore.selectedInventory.length" />
      <van-action-bar-button color="#409EFF" type="warning" text="查看食谱" @click.stop="$router.push('/recipe')" />
      <van-action-bar-button color="#529b2e" type="danger" text="添加库存" @click.stop="$router.push('/addInventory')" />
    </van-action-bar>
  </div>
</template>

<style lang="scss" scoped>
</style>
