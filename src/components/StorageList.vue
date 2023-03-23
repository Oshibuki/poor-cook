<script setup lang="ts">
import { reactive } from 'vue'
import { Collection, Timer } from '@element-plus/icons-vue'
import type { InventoryItem } from '~/data/food'

const iStore = useInventoryStore()
const rStore = useRecipeStore()

const category = [
  {
    value: 'all',
    text: '全部',
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
    text: '全部',
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

const getPercentage = function (stuff: InventoryItem) {
  const today = new Date()
  const packagingDate = new Date(stuff.packagingDate)
  const cost = today.getTime() - packagingDate.getTime()
  if (cost < 0)
    return 100
  const total = new Date(stuff.expirationDate).getTime() - packagingDate.getTime()
  return Math.floor(cost / total * 100)
}

const getStatus = function (stuff: InventoryItem) {
  const percentage = getPercentage(stuff)
  if (percentage === 100)
    return 'exception'
  else if (percentage > 70)
    return 'warning'
  else return 'success'
}

const onSelectChange = function (name: string) {
  rStore.toggleStuff(name)
}
</script>

<template>
  <div class="h-sm">
    <div style="background-color: #F5F7FA;">
      <div class="inventoryFilter">
        <Collection style="width: 1em; height: 1em; margin-right: 8px" />
        <el-select v-model="state.currentCategory" placeholder="分类" size="large">
          <el-option
            v-for="item in state.category"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="inventoryFilter">
        <Timer style="width: 1em; height: 1em; margin-right: 8px" />
        <el-select v-model="state.currentDateType" placeholder="日期">
          <el-option
            v-for="item in state.dateType"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <el-empty
      v-if="filteredInventory.length === 0"
      description="库藏空空如也Σ(っ °Д °;)っ"
    />
    <el-row v-else mt-5>
      <el-col
        v-for="stuff in filteredInventory"
        :key="stuff"
        :span="24"
      >
        <el-card :body-style="{ padding: '10px' }">
          <div class="card-header" flex justify-between>
            <span>{{ stuff.name }}</span>
            <RouterLink :to="{ path: '/editInventory', query: { id: stuff.id } }">
              <el-button type="warning">
                修改
              </el-button>
            </RouterLink>
            <el-check-tag :checked="rStore.hasStuff(stuff.name)" @change="onSelectChange(stuff.name)">
              加到锅里去
            </el-check-tag>
          </div>
          <div class="body">
            <div class="info">
              <time class="time">将于 {{ stuff.expirationDate }} 过期</time>
            </div>
            <el-progress
              inline-block
              :text-inside="true"
              :stroke-width="20"
              :percentage="getPercentage(stuff)"
              :status="getStatus(stuff)"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.inventoryFilter{
  display:flex;
  align-items: center;
  justify-content: space-around;
}

.inventoryFilterLabel {

}
.time {
  font-size: 12px;
  color: #999;
}
.info {
  display:flex;
  justify-content: space-between;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
