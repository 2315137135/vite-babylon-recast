<template>
  <div>
    <canvas ref="canvas" id="bjs"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Engine } from '@babylonjs/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { createScene } from './createScene'


let canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  let engine = new Engine(canvas.value!, true)
  createScene(engine).then(scene => {
    engine.runRenderLoop(() => {
      scene.render()
    })
  })

  let resizeObserver = new ResizeObserver(() => {
    engine.resize()
  })
  
  resizeObserver.observe(canvas.value!)

  onUnmounted(() => {
    engine.dispose()
    resizeObserver.disconnect()
  })
})
</script>

<style scoped>
#bjs {
  padding: 0;
  margin: 0;
  width: 100dvw;
  height: 100dvh;
  display: block;
}
</style>
