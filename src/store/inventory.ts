import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { LocationQueryValue } from 'vue-router'
import { useRecipeStore } from './recipe'
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
  const rStore = useRecipeStore()

  // 当前库存
  const curInventory = useStorage(`${namespace}:stuff`, Array<InventoryItem>)
  // const curTools = ref(new Set<string>())
  const curTool = useStorage(`${namespace}:tool`, '')

  interface InventoryInfo {
    id: string
    name: string
  }
  const selectedInventory = useStorage(`${namespace}:selectedInventory`, Array<InventoryInfo>)
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

  function toggleSelectedInventory(stuffItem: InventoryItem) {
    if (selectedInventory.value.find(i => i.id === stuffItem.id)) {
      selectedInventory.value = selectedInventory.value.filter(i => i.id !== stuffItem.id)
      rStore.curStuff = new Set(selectedInventory.value.map(i => i.name))
    }
    else {
      selectedInventory.value.push({ id: stuffItem.id, name: stuffItem.name })
      rStore.curStuff.add(stuffItem.name)
    }
  }

  function isSelected(id: string) {
    return selectedInventory.value.find(i => i.id === id)
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
    curTool,
    curMode,
    curInventory,
    selectedInventory,

    clearKeyWord: () => { keyword.value = '' },
    toggleTools,
    reset,
    setMode,
    isSelected,
    toggleSelectedInventory,
    addInventory,
    delInventory,
    getInventoryById,
    findByIdAndUpdate,
    findByIdAndDelete,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useInventoryStore, import.meta.hot))
