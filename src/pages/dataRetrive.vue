<script lang="ts" setup>
import { showToast } from 'vant'

function exportLocalStorageToJSON() {
  alert(cordova)
  const filePath = `${cordova.file.externalDataDirectory}` + 'poorfood.json'

  const data = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    data[key] = localStorage.getItem(key)
  }
  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  // Downloading the file
  const filePromise = new Promise<string>((resolve, reject) => {
    cordova.plugin.http.downloadFile(url, {}, { Accept: '*' }, filePath,
      (entry) => {
        resolve(entry.nativeURL)
      },
      (response) => {
        reject(response.error)
      })
  })
  filePromise
    .then((res) => {
      showToast('导出成功')
    })
    .catch(err => showToast(err))
}

function importJSONToLocalStorage() {
  localStorage.clear()
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = () => {
    const file = input.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      const data = JSON.parse(reader.result)
      for (const key in data)
        localStorage.setItem(key, data[key])

      showToast('数据导入成功!')
    }
  }
  input.click()
}
</script>

<template>
  <div>
    <van-cell-group inset my-24>
      <div style="margin: 16px;">
        <van-button
          round block bg="green-500 dark:green-600 opacity-100"
          text="orange-800 dark:orange-200"
          @click.stop="exportLocalStorageToJSON"
        >
          导出数据
        </van-button>
      </div>
    </van-cell-group>

    <van-cell-group inset>
      <div style="margin: 16px;">
        <van-button
          round block bg="orange-500 dark:orange-600 opacity-100"
          text="orange-800 dark:orange-200"
          @click.stop="importJSONToLocalStorage"
        >
          导入数据（会覆盖原有数据！！！）
        </van-button>
      </div>
    </van-cell-group>
  </div>
</template>
