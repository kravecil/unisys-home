<template>
  <q-page class="flex q-pa-xl">
    <div class="WAL q-gutter-y-sm q-mx-auto column items-center">
      <transition-group appear enter-active-class="animate__animated animate__fadeInDown animate__slow">
        <div key="an1" class=" text-white text-h6 text-weight-light">Добро пожаловать,</div>
        <div key="an2" class="row q-gutter-md items-center">
          <div class="text-white text-h4 text-weight-light">{{ user.lastname }} {{ user.firstname }} {{ user.middlename }}!</div>
          <q-btn flat dense color="white" icon="logout" @click="logout()">
            <q-tooltip>Выход из системы</q-tooltip>
          </q-btn>
        </div>
        <div key="an3" class="text-white q-mb-xl">
          Вам доступны следующие подсистемы
        </div>
      </transition-group>
      <transition-group appear enter-active-class="animate__animated animate__fadeInUp animate__slow"
        tag="p" class="row q-gutter-lg relative-position justify-center">
        <q-item class="desktop flat"
          v-for="(desktop) in user.desktops" :key="desktop.id"
          :class="{'bg-grey-9' : desktop.under_construction}"
          :clickable = "!desktop.under_construction"
          :v-ripple = "!desktop.under_construction"
          @click="go(desktop.path)"
          >

          <q-item-section>
            <q-item-label class="t1 text-weight-bold text-white">{{ desktop.title }}</q-item-label>
            <q-item-label class="t2 text-white text-weight-light" caption>{{ desktop.description }}</q-item-label>
            <q-badge floating
              v-if="desktop.under_construction"
              color="grey"
              text-color="black">
              <q-icon name="settings" />
              <span class="t-badge">В разработке</span>
            </q-badge>
          </q-item-section>
        </q-item>
      </transition-group>
      <q-space />
      <div class="row items-center text-white text-weight-light">
        <q-icon name="notifications" size="sm" class="q-mr-sm" />
        <a class="text-weight-bolder text-deep-orange-5" href="/dist/unisys-notify-setup.exe">Скачать</a>
        &nbsp;клиент уведомлений
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import { api } from 'boot/axios'
import * as auth from 'src/api/auth'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const router = useRouter()

    return {
      user: auth.auth.user,

      logout: () => auth.logout(router),
      go: (path) => window.location = path
    }
  }
})
</script>

<style lang="scss" scoped>
.desktop {
  width: 250px;
  height: 80px;
  border: 2px solid $deep-orange-10;
  background: linear-gradient(to right, $deep-orange-9,$deep-orange-5 );
}
.WAL { width: 1170px; }
.t1 { font-size: .9em; text-align: center; }
.t2 { font-size: .7em; text-align: center; }
.t-badge { font-size: .7em; }
</style>