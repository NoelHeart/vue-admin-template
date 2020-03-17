import { login } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: '',
    roles: '',
    name: '',
    userId: ''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
  },
  actions: {
    // 登录
    Login({ commit }, userinfo) {
      const account = userinfo.username.trim()
      return new Promise((resolve, reject) => {
        login(account, userinfo.password).then(response => {
          const data = response.data.data
          commit('SET_TOKEN', data.token)
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.user.name)
          commit('SET_USERID', data.user.userId)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', '')
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        commit('SET_USERID', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
