import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // 验权
import { Message } from 'element-ui'

const whiteList = ['/login', '/', '/screen', '/ditu', '/incomeChart']

router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (getToken()) {
      if (store.getters.roles !== '') {
        const roles = store.getters.roles
        store
          .dispatch('GenerateRoutes', roles).then(accessRoutes => {
            router.addRoutes(accessRoutes)
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({ path: '/login' })
            })
          })
      } else {
        next({ path: '/login' })
      }
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
