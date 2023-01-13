import { Cookies, Loading } from 'quasar'
import { api } from 'src/boot/axios'
import { hostDomain, authHostURL } from 'src/api/env'
import { ref } from 'vue'

export const auth = {
    authenticated: ref(false),
    user: ref({}),
}

export function authenticate(router) {
    const token = Cookies.get('token') 
    if (!token) {
        unauthenticate(router)
        return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    auth.authenticated.value = true

    Loading.show( {message: 'Авторизация...'} )
    api.get(authHostURL + 'api/user')
        .then(response => {
            
            auth.user.value = response.data

            router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => Loading.hide())
}

export function unauthenticate (router) {
    Cookies.remove('token', { domain: hostDomain})
    delete api.defaults.headers.common['Authorization']

    auth.authenticated.value = false
    auth.user.value = {}

    router.push('/login')
}

export function login (payload, router) {
    if (auth.authenticated.value) return

    payload.device = 'web'
    api.post('/api/login', payload)
        .then(response => {
            const token = response.data.token
            Cookies.set(
                'token',
                token,
                {
                    domain: hostDomain,
                    sameSite: 'Strict',
                    secure: false,
                    expires: 90
                })

            authenticate(router)
        })
        .catch(error => console.log(error.message))
}

export function logout (router) {
    api.delete('/api/logout')
        .then(() => {
            unauthenticate(router)
        })
        .catch((error) => console.log(error.message))
}
