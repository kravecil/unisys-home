<template>
  <q-layout view="lHh Lpr lFf" class="q-page-main">
    
    <q-page-container>
      <transition
        appear
        enter-active-class="animate__animated animate__fadeIn animate__slower"
        leave-active-class="animate__animated animate__fadeOut animate__slower"
      >
        <router-view />
      </transition>
      <!-- <router-view v-slot="{ Component, route }">
        <transition
          enter-active-class="animate__animated animate__fadeIn animate__slower"
          leave-active-class="animate__animated animate__fadeOut animate__slower"
        >
          <component :is="Component" :key="route.path" />
        </transition> 
      </router-view> -->
    </q-page-container>

    <q-img no-spinner
      class="absolute-center bg-image full-height" src="/images/bg-login.jpg" />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.q-page-main {
  background: #1d1d1ddd;
}
.bg-image {
  z-index: -1;
  filter: grayscale(100%);
}
</style>