<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'
import { showToast } from 'vant/es'
import { useInventoryStore } from '~/store/inventory'
import type { InventoryItem } from '~/data/food'
import { NameOptions } from '~/data/food'

const router = useRouter()
const iStore = useInventoryStore()
const showCascader = ref(false) // cascader
const showExpirationPicker = ref(false) // expiration picker
const minDate = new Date('1970-01-01')
const today = new Date()
const showCalendar = ref(false) // datepicker

const ruleForm = reactive({
  name: '',
  category: '',
  description: '',
  packagingDate: new Date().toLocaleDateString(),
  expirationNumber: 1,
  expirationNumType: 'week',
})

const categoryDict = {
  meat: '肉类',
  vegetable: '蔬菜',
  staple: '主食',
}
const dateDict = {
  day: '天',
  week: '周',
  month: '月',
  year: '年',
}

const expirationColumns = [
  [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '4', value: '4' },
    { text: '5', value: '5' },
    { text: '6', value: '6' },
    { text: '7', value: '7' },
    { text: '8', value: '8' },
    { text: '9', value: '9' },
    { text: '10', value: '10' },
    { text: '11', value: '11' },
    { text: '12', value: '12' },
    { text: '13', value: '13' },
    { text: '14', value: '14' },
  ],
  [
    { text: '天', value: 'day' },
    { text: '周', value: 'week' },
    { text: '月', value: 'month' },
    { text: '年', value: 'year' },
  ],
]

const expiration = computed(() => {
  return ruleForm.expirationNumber + dateDict[ruleForm.expirationNumType]
})

const onExpirationConfirm = ({ selectedValues }) => {
  ruleForm.expirationNumType = selectedValues[1]
  ruleForm.expirationNumber = parseInt(selectedValues[0])
  showExpirationPicker.value = false
}

const expirationDate = computed(() => {
  let periodDays = 0
  if (ruleForm.expirationNumType === 'day')
    periodDays += ruleForm.expirationNumber
  else if (ruleForm.expirationNumType === 'week')
    periodDays += ruleForm.expirationNumber * 7
  else if (ruleForm.expirationNumType === 'month')
    periodDays += ruleForm.expirationNumber * 30
  else if (ruleForm.expirationNumType === 'year')
    periodDays += ruleForm.expirationNumber * 365
  else
    periodDays = 0
  const tmp = new Date(ruleForm.packagingDate)
  const oldDay = tmp.getDate()
  tmp.setDate(oldDay + periodDays)

  return tmp.toLocaleDateString()
})

const daysUntilExpiration = computed(() => {
  const today = new Date()
  const result = new Date(expirationDate.value).getTime() - today.getTime()
  if (result < 0)
    return '已过期'
  return `${Math.ceil(result / (24 * 3600 * 1000))} 天`
})

const onFinishName = ({ selectedOptions }) => {
  showCascader.value = false
  ruleForm.name = selectedOptions[1].value
  ruleForm.category = selectedOptions[0].value
}

const onPackagingDateConfirm = (value: Date) => {
  ruleForm.packagingDate = value.toLocaleDateString()
  showCalendar.value = false
}

const submitForm = () => {
  if (!ruleForm.name || !ruleForm.packagingDate || !expirationDate.value) {
    showToast('缺少必要信息')
    return
  }

  const newInventoryItem: InventoryItem = {
    id: nanoid(10),
    name: ruleForm.name,
    category: ruleForm.category,
    description: ruleForm.description,
    packagingDate: ruleForm.packagingDate,
    expirationDate: expirationDate.value,
    expiration: `${ruleForm.expirationNumber}|${ruleForm.expirationNumType}`,
  }
  iStore.addInventory(newInventoryItem)
  router.push('/')
}
</script>

<template>
  <van-divider />
  <van-form>
    <van-cell-group inset>
      <van-field
        v-model="ruleForm.name"
        is-link
        readonly
        label="品类"
        placeholder="食物品类"
        @click="showCascader = true"
      />
      <van-popup v-model:show="showCascader" round position="bottom">
        <van-cascader
          title="食物品类"
          :options="NameOptions"
          @close="showCascader = false"
          @finish="onFinishName"
        />
      </van-popup>
      <van-field label="分类" :model-value="categoryDict[ruleForm.category]" readonly />
      <van-field
        v-model="ruleForm.description"
        type="text"
        name="描述"
        label="描述"
        placeholder="描述"
      />

      <van-field
        :model-value="new Date(ruleForm.packagingDate).toLocaleDateString('zh-cn', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })"
        is-link
        readonly
        name="calendar"
        label="生产日期"
        placeholder="生产日期"
        @click="showCalendar = true"
      />
      <van-calendar v-model:show="showCalendar" :min-date="minDate" :max-date="today" @confirm="onPackagingDateConfirm" />
      <van-field
        v-model="expiration"
        is-link
        readonly
        label="保质期"
        placeholder="保质期"
        @click="showExpirationPicker = true"
      />
      <van-popup v-model:show="showExpirationPicker" round position="bottom">
        <van-picker
          :columns="expirationColumns"
          @cancel="showExpirationPicker = false"
          @confirm="onExpirationConfirm"
        />
      </van-popup>
      <van-field label="到期日" :model-value="new Date(expirationDate).toLocaleDateString('zh-cn', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })" readonly />
      <van-field label="临近到期天数" :model-value="daysUntilExpiration" readonly />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-action-bar-button color="#3498db" type="primary" text="添加" @click.stop="submitForm" />
    </div>
  </van-form>
</template>

<style scoped>
</style>
