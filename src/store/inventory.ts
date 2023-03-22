import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LocationQueryValue } from 'vue-router'
import type { InventoryItem } from '~/data/food'

const namespace = 'inventory'

/**
 * survival: 生存模式
 * strict: 严格
 * loose: 模糊
 */
export type SearchMode = 'survival' | 'loose' | 'strict'

export const useInventoryStore = defineStore('inventory', () => {
  /**
   * 搜索关键字
   */
  const keyword = ref('')
  const category = ref('all')
  const dateType = ref('all')

  // 当前库存
  const curInventory = useStorage(`${namespace}:stuff`, Array<InventoryItem>)
  // const curTools = ref(new Set<string>())
  const curTool = useStorage(`${namespace}:tool`, '')

  const selectedInventory = computed(state => Array.from(curInventory.value))
  // const selectedTools = computed(() => Array.from(curTools.value))
  // const selectedTools = ref('')

  const curMode = useStorage<SearchMode>(`${namespace}:mode`, 'loose')

  function toggleTools(name: string) {
    if (curTool.value === name)
      curTool.value = ''
    else
      curTool.value = name
  }

  function setMode(mode: SearchMode) {
    curMode.value = mode
  }

  /**
   * 重置
   */
  function reset() {
    curInventory.value = []
    curTool.value = ''
  }

  function addInventory(stuffItem: InventoryItem) {
    curInventory.value.push({ ...stuffItem })
  }

  function delInventory(stuffItem: InventoryItem) {
    curInventory.value = curInventory.value.filter(item => item.id !== stuffItem.id)
  }

  function getInventoryById(id: string | LocationQueryValue[]): InventoryItem | undefined {
    return curInventory.value.find(item => item.id === id)
  }

  function findByIdAndUpdate(id: string, newItem: InventoryItem) {
    curInventory.value = curInventory.value.map((i) => {
      if (i.id === id)
        return newItem
      else
        return i
    })
  }

  function findByIdAndDelete(id: string) {
    curInventory.value = curInventory.value.filter(i => i.id !== id)
  }

  return {
    keyword,
    category,
    dateType,
    curTool,
    curMode,
    curInventory,
    selectedInventory,

    clearKeyWord: () => { keyword.value = '' },
    toggleTools,
    reset,
    setMode,

    addInventory,
    delInventory,
    getInventoryById,
    findByIdAndUpdate,
    findByIdAndDelete,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useInventoryStore, import.meta.hot))
