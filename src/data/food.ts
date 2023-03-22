export interface StuffItem {
  /**
   * 食材名称
   */
  name: string
  /**
   * 例如：🥔
   */
  emoji?: string
  /**
   * 图片链接
   */
  image?: string
  /**
   * 别名，譬如：西红柿/番茄
   */
  alias?: string
  /**
   * 图标名称
   */
  icon?: string
  /**
   * 显示标签
   */
  label?: string
}

/**
 * 素菜
 */
export const vegetable: StuffItem[] = [
  {
    name: '土豆',
    emoji: '🥔',
  },
  {
    name: '胡萝卜',
    emoji: '🥕',
  },
  {
    name: '花菜',
    emoji: '🥦',
  },
  {
    name: '白萝卜',
    emoji: '🥣',
  },
  {
    name: '西葫芦',
    emoji: '🥒',
  },
  {
    name: '番茄',
    emoji: '🍅',
    alias: '西红柿',
  },
  {
    name: '芹菜',
    emoji: '🥬',
  },
  {
    name: '黄瓜',
    emoji: '🥒',
  },
  {
    name: '洋葱',
    emoji: '🧅',
  },
  {
    name: '莴笋',
    emoji: '🎍',
  },
  {
    name: '菌菇',
    emoji: '🍄',
  },
  {
    name: '茄子',
    emoji: '🍆',
  },
  {
    name: '豆腐',
    emoji: '🍲',
  },
  {
    name: '包菜',
    emoji: '🥗',
  },
  {
    name: '白菜',
    emoji: '🥬',
  },
]

/**
 * 荤菜
 */
export const meat: StuffItem[] = [
  {
    name: '午餐肉',
    emoji: '🥓',
  },
  {
    name: '香肠',
    emoji: '🌭',
  },
  {
    name: '腊肠',
    emoji: '🌭',
  },
  {
    name: '鸡肉',
    emoji: '🐤',
  },
  {
    name: '猪肉',
    emoji: '🐷',
  },
  {
    name: '鸡蛋',
    emoji: '🥚',
  },
  {
    name: '虾',
    emoji: '🦐',
  },
  {
    name: '牛肉',
    emoji: '🐮',
  },
  {
    name: '骨头',
    emoji: '🦴',
  },
  {
    name: '鱼（Todo）',
    emoji: '🐟',
  },
]

/**
 * 主食
 */
export const staple: StuffItem[] = [
  {
    name: '面食',
    emoji: '🍝',
  },
  {
    name: '面包',
    emoji: '🍞',
  },
  {
    name: '米',
    emoji: '🍚',
  },
  {
    name: '方便面',
    emoji: '🍜',
  },
]

export const tools: StuffItem[] = [
  {
    name: '烤箱',
    emoji: '',
    icon: 'i-mdi-toaster-oven',
  },
  {
    name: '空气炸锅',
    emoji: '',
    icon: 'i-fe-frying-pan',
  },
  {
    name: '微波炉',
    emoji: '',
    icon: 'i-ic-outline-microwave',
  },
  {
    name: '电饭煲',
    emoji: '',
    icon: 'i-gg-smart-home-cooker',
  },
  {
    label: '一口能炒又能煮的大锅',
    name: '一口大锅',
    emoji: '',
    icon: 'i-mdi-pot-steam-outline',
  },
]

export const NameOptions = [
  {
    value: 'vegetable',
    label: '蔬菜',
    children: [
      {
        value: '土豆',
        label: '🥔 土豆',
      },
      {
        value: '胡萝卜',
        label: '🥕 胡萝卜',
      },
      {
        value: '花菜',
        label: '🥦 花菜',
      },
      {
        value: '白萝卜',
        label: '🥣 白萝卜',
      },
      {
        value: '西葫芦',
        label: '🥒 西葫芦',
      },
      {
        value: '番茄',
        label: '🍅 番茄',
        alias: '西红柿',
      },
      {
        value: '芹菜',
        label: '🥬 芹菜',
      },
      {
        value: '黄瓜',
        label: '🥒 黄瓜',
      },
      {
        value: '洋葱',
        label: '🧅 洋葱',
      },
      {
        value: '莴笋',
        label: '🎍 莴笋',
      },
      {
        value: '菌菇',
        label: '🍄 菌菇',
      },
      {
        value: '茄子',
        label: '🍆 茄子',
      },
      {
        value: '豆腐',
        label: '🍲 豆腐',
      },
      {
        value: '包菜',
        label: '🥗 包菜',
      },
      {
        value: '白菜',
        label: '🥬 白菜',
      },
    ],
  },
  {
    value: 'meat',
    label: '肉类',
    children: [
      {
        value: '午餐肉',
        label: '🥓 午餐肉',
      },
      {
        value: '香肠',
        label: '🌭 香肠',
      },
      {
        value: '腊肠',
        label: '🌭 腊肠',
      },
      {
        value: '鸡肉',
        label: '🐤 鸡肉',
      },
      {
        value: '猪肉',
        label: '🐷 猪肉',
      },
      {
        value: '鸡蛋',
        label: '🥚 鸡蛋',
      },
      {
        value: '虾',
        label: '🦐 虾',
      },
      {
        value: '牛肉',
        label: '🐮 牛肉',
      },
      {
        value: '骨头',
        label: '🦴 骨头',
      },
      {
        value: '鱼',
        label: '🐟 鱼',
      },
    ],
  },
  {
    value: 'staple',
    label: '主食',
    children: [
      {
        value: '面食',
        label: '🍝 面食',
      },
      {
        value: '面包',
        label: '🍞 面包',
      },
      {
        value: '米',
        label: '🍚 米',
      },
      {
        value: '方便面',
        label: '🍜 方便面',
      },
    ],
  },
]

export interface InventoryItem {
  /**
 * 唯一标识符，用于标识库存
 */
  id: string
  /**
   * 食材名称
   */
  name: string
  /**
   * 例如：🥔
   */
  emoji?: string
  /**
   * 图片链接
   */
  image?: string
  /**
   * 别名，譬如：西红柿/番茄
   */
  alias?: string
  /**
   * 图标名称
   */
  icon?: string
  /**
   * 显示标签
   */
  label?: string
  /**
   * 显示起始
   */
  packagingDate: string
  /**
 * 显示到期日
 */
  expirationDate: string
  /**
 * 显示保质期
 */
  expiration: string
  description?: string
  category: string
}
