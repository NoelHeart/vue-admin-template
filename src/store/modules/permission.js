import { adminRoutes, constantRoutes, editorRoutes, visitorRoutes } from '@/router'

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const roles = data
        let accessedRoutes
        if (roles === 'admin') {
          accessedRoutes = adminRoutes
        } else if (roles === 'editor') {
          accessedRoutes = editorRoutes
        } else {
          accessedRoutes = visitorRoutes
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission
