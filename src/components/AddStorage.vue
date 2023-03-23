<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'
import { useInventoryStore } from '~/store/inventory'
import type { InventoryItem } from '~/data/food'
import { NameOptions } from '~/data/food'

const router = useRouter()
const iStore = useInventoryStore()
const ruleForm = reactive({
  name: ['', ''],
  description: '',
  packagingDate: new Date(),
  expirationNumber: 1,
  expirationNumType: 'week',
})

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
  const oldDay = ruleForm.packagingDate.getDate()
  const tmp = new Date(ruleForm.packagingDate)
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

const handleNameChange = function (value: any) {
  ruleForm.name = value as string[]
}

const disableDate = function (date: Date) {
  return date > new Date()
}

const submitForm = () => {
  if (!ruleForm.name[1] || !ruleForm.packagingDate || !expirationDate.value)
    return
  const newInventoryItem: InventoryItem = {
    id: nanoid(10),
    name: ruleForm.name[1],
    category: ruleForm.name[0],
    description: ruleForm.description,
    packagingDate: ruleForm.packagingDate.toLocaleDateString(),
    expirationDate: expirationDate.value,
    expiration: ruleForm.expirationNumber + ruleForm.expirationNumType,
  }
  iStore.addInventory(newInventoryItem)
  router.push('/inventory')
}
</script>

<template>
  <el-row justify="center">
    <el-col :xs="24" :md="12">
      <el-form
        :model="ruleForm" label-width="auto" label-position="top" require-asterisk-position="right"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" :required="true">
          <client-only>
            <el-cascader v-model="ruleForm.name" style="min-width:340px" :options="NameOptions" @change="handleNameChange" />
          </client-only>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleForm.description" />
        </el-form-item>
        <el-form-item label="分类" required>
          <client-only>
            <el-select v-model="ruleForm.name[0]" :disabled="true" placeholder="食物分类">
              <el-option label="蔬菜" value="vegetable" />
              <el-option label="肉类" value="meat" />
              <el-option label="主食" value="staple" />
            </el-select>
          </client-only>
        </el-form-item>
        <el-form-item label="生产日期" :required="true">
          <el-date-picker
            v-model="ruleForm.packagingDate"
            :disabled-date="disableDate" type="date" label="选中某一天" placeholder="选中某一天" style="width: 100%"
            change="this.updateExpireDate"
          />
        </el-form-item>
        <el-form-item label="保质期" :required="true">
          <el-col :span="11">
            <client-only>
              <el-select v-model="ruleForm.expirationNumber" placeholder="0">
                <el-option label="0" :value="0" />
                <el-option label="1" :value="1" />
                <el-option label="2" :value="2" />
                <el-option label="3" :value="3" />
                <el-option label="4" :value="4" />
                <el-option label="5" :value="5" />
                <el-option label="6" :value="6" />
                <el-option label="7" :value="7" />
                <el-option label="8" :value="8" />
                <el-option label="9" :value="9" />
              </el-select>
            </client-only>
          </el-col>
          <el-col :span="11">
            <client-only>
              <el-select v-model="ruleForm.expirationNumType" placeholder="天">
                <el-option label="天" value="day" />
                <el-option label="周" value="week" />
                <el-option label="月" value="month" />
                <el-option label="年" value="year" />
              </el-select>
            </client-only>
          </el-col>
        </el-form-item>
        <el-form-item label="到期日" disabled>
          <el-input v-model="expirationDate" />
        </el-form-item>
        <el-form-item label="临近到期天数" prop="count" disabled>
          <el-input v-model="daysUntilExpiration" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm">
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-form-item {
  margin-right: 0 !important;
}
.el-form-item__label {
  position: absolute;
}
.el-form-item__content {
  width: 100%;
  padding-left: 80px;
}
.el-select,
.el-input_inner {
  width: 100%;
}
</style>
