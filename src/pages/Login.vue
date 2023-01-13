<template>
  <q-page class="flex q-pa-xl">
    <div class="row col q-gutter-lg">

      <div class="column col-6 text-white">
        <div class="text-h2 text-uppercase text-weight-thin">
          Единая информационная система
        </div>
        <q-separator class="q-my-lg" color="white" />
        <div class="text-weight-thin">
          Номенклатура предприятия, аналитика и учёт, нормирование материалов, состав изделия,
          средства коммуникации, ..
        </div>

        <div class="col"></div>
        
        <div class="about q-pa-sm q-pl-lg">
          <div class="">{{ copyright.organization }}</div>
          <div class="text-weight-thin">{{ copyright.department }}</div>
        </div>
      </div>

      <div class="col"></div>
      
      <div class="q-pa-lg q-card-main text-white rounded-borders">
        <div class="text-center text-h5 text-weight-thin">
          Вход в систему
        </div>
        <q-separator spaced dark />
        <q-form
          @submit="login({username: username, password: password})"
          class="q-pa-lg q-gutter-md"
        >
          <q-input v-model="username" type="text" label="имя учётной записи"
            outlined class="q-field-custom" color="white" label-color="white" />
          <q-input v-model="password" type="password" label="пароль"
            outlined class="q-field-custom" color="white" label-color="white" />
          <div>
            <q-btn flat color="white" class="full-width" label="Войти" type="submit"/>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { copyright } from 'src/api/env'
import * as auth from 'src/api/auth'

export default {
  // name: 'PageName',
  setup () {
    const router = useRouter()

    onMounted(() => auth.authenticate(router))

    return {
      copyright,

      username: ref(null),
      password: ref(null),

      login: (payload) => auth.login(payload, router),
      logout: () => auth.logout(router),
    }
  }
}
</script>

<style scoped>
  .q-card-main {
    background: #ff5722bb;
    width: 100%;
    max-width: 350px;
  }
  .q-field-custom >>> .q-field__control::before {
    border-color: white;
  }
  .q-field-custom >>> .q-field__native {
    color: white;
  }
  .about {
    background: #ffffff33;
  }
</style>