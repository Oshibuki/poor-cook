<script setup lang="ts">
// import { installPrompt } from './utils/pwa'
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { isDark } from '~/composables'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '隔离食用手册',
  meta: [
    {
      name: 'description',
      content: '好的，今天我们来做菜！',
    },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#121212' : '#fff'),
    },
  ],
})

const currentTheme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})

// installPrompt()
</script>

<template>
  <van-config-provider :theme="currentTheme">
    <RouterView />
  </van-config-provider>
</template>
