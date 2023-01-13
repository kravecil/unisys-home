import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Router from 'src/router/index'
import { Notify } from 'quasar'
import { unauthenticate } from 'src/api/auth'
import { authHostURL } from 'src/api/env'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: String(authHostURL) })

api.defaults.withCredentials = true;

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    Notify.create({
      type: 'negative',
      message: '<strong>Пользователь не авторизован!</strong><br>Ошибка: 401',
      html: true,
    })
    unauthenticate(Router)
  } else if (error.response.status === 403) {
    Notify.create({
      type: 'negative',
      message: '<strong>Запрещённое действие!</strong><br>Ошибка: 403',
      html: true,
    })
  } else {
    Notify.create({
      type: 'negative',
      message: error.message,
      html: true
    })
  }

  return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
