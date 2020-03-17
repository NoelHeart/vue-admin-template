const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  roles: state => state.user.roles,
  realName: state => state.user.name,
  userManageId: state => state.user.userId,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}
export default getters
