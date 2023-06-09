<script setup lang="ts">
import { computed } from 'vue'
import type { InventoryItem } from '~/data/food'

const props = defineProps(['stuff', 'index'])
const iStore = useInventoryStore()

const progress = computed(() => {
  const today = new Date()
  const packagingDate = new Date(props.stuff.packagingDate)
  const cost = Math.ceil((today.getTime() - packagingDate.getTime()) / (24 * 3600 * 1000))
  const totalDays = Math.ceil((new Date(props.stuff.expirationDate).getTime() - packagingDate.getTime()) / (24 * 3600 * 1000))
  return `${cost}/${totalDays}`
},
)
const percentage = computed(() => {
  const numbers = progress.value.split('/').map(i => parseInt(i))
  const tmp = Math.floor(numbers[0] / numbers[1] * 100)
  return tmp > 100 ? 100 : tmp
})

const status = computed(() => {
  if (percentage.value === 100)
    return 'danger'
  else if (percentage.value > 70)
    return 'warning'
  else return 'success'
},
)
const active = computed(() => {
  return iStore.isSelected(props.stuff.id)
})

const lastDays = computed(() => {
  const numbers = progress.value.split('/').map(i => parseInt(i))
  return numbers[1] - numbers[0]
})
const onSelectChange = function (stuff: InventoryItem) {
  iStore.toggleSelectedInventory(stuff)
}
</script>

<template>
  <van-cell
    text-xs center mb-3 p-2 rounded
    border="~ green-200 dark:green-800"
    :bg="active ? 'green-300 opacity-90' : 'green-300 opacity-20'"
  >
    <template #title>
      <div
        text-left mb-2
      >
        <span
          mr-2
          :text="active ? 'white dark:black' : 'black dark:white'"
        >{{ stuff.name }}</span>
        <RouterLink :to="{ path: '/editInventory', query: { id: stuff.id } }">
          <van-tag
            p-1 round :type="status" cursor-pointer
            :bg="active ? 'green-300 opacity-90' : 'green-300 opacity-20'"
            :text="active ? 'white dark:black' : 'black dark:white'"
          >
            修改
          </van-tag>
        </RouterLink>
      </div>
    </template>
    <template #label>
      <van-progress :percentage="percentage" color="green" :pivot-text="progress" stroke-width="8" />
    </template>
    <template #value>
      <div @click.stop="onSelectChange(stuff)">
        <van-tag
          mb-1 p-1 round cursor-pointer opacity="0.6"
          :bg="status === 'danger' ? '#e74c3c' : status === 'success' ? '#1abc9c' : '#f39c12'"
          :text="active ? 'white dark:black' : 'black dark:white'"
        >
          {{ lastDays >= 0 ? `${lastDays}天后` : '已过期' }}
        </van-tag>
        <div
          text-right style="font-size:0.5rem;"
          :text="active ? 'white dark:black' : 'black dark:white'"
        >
          {{ new Date(stuff.expirationDate).toLocaleDateString('zh-cn', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
      </div>
    </template>
  </van-cell>
</template>

<style scoped>

</style>
