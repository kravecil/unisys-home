<template>
  <router-view />
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { authenticate } from 'src/api/auth'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    onMounted(() => authenticate(router))
  }
})
</script>
