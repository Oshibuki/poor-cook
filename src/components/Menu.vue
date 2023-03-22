<script setup lang="ts">
import { toggleDark } from '~/composables'
</script>

<template>
  <nav text-xl p="t-6">
    <RouterLink class="icon-btn mx-2" to="/" title="首页">
      <div i-ri-home-2-line />
    </RouterLink>

    <button class="icon-btn mx-2 hover:text-yellow-400 !outline-none" title="切换" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>

    <RouterLink class="icon-btn mx-2 hover:text-orange-400" to="/help" title="帮助">
      <div i-ri-question-line />
    </RouterLink>

    <RouterLink class="icon-btn mx-2 hover:text-blue-400" to="/recipe" title="储藏">
      <div i-ri-information-line />
    </RouterLink>

    <RouterLink class="icon-btn mx-2 hover:text-blue-400" to="/addInventory" title="储藏">
      <div i-ri:add-circle-line />
    </RouterLink>

    <a class="icon-btn mx-2 hover:text-black-400" rel="noreferrer" href="https://github.com/YunYouJun/cook" target="_blank" title="GitHub">
      <div i-ri-github-line />
    </a>
  </nav>
</template>
