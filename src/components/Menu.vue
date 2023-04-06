<script setup lang="ts">
import { toggleDark } from '~/composables'
</script>

<template>
  <!-- <van-nav-bar
    title="标题"
    left-text="返回"
    left-arrow
    @click-left="$router.back()"
  /> -->
  <nav text-xl p="t-6">
    <RouterLink class="icon-btn mx-2" px-2 to="/" title="首页">
      <div i-ri-home-2-line />
    </RouterLink>

    <button class="icon-btn mx-2 hover:text-yellow-400 !outline-none" px-2 title="切换" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>

    <RouterLink class="icon-btn mx-2 hover:text-blue-400" px-2 to="/recipe" title="菜谱">
      <div i-ri-restaurant-2-fill />
    </RouterLink>

    <RouterLink class="icon-btn mx-2 hover:text-blue-400" px-2 to="/dataRetrive" title="导入导出数据">
      <div i-ri-folder-2-line />
    </RouterLink>

    <a class="icon-btn mx-2 hover:text-blue-400" px-2 href="https://github.com/Oshibuki/poor-cook" title="项目地址">
      <div i-ri-github-line />
    </a>
  </nav>
</template>
