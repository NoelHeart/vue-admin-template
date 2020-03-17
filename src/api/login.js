import request from '@/utils/request'

export function login(userAccount, passWord) {
  const data = {
    userAccount,
    passWord
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}

export function getAdminUserList(data) {
  return request({
    url: '/user/getAdminUserList',
    method: 'post',
    data
  })
}

export function getEditorUserList(data) {
  return request({
    url: '/user/getEditorUserList',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}
export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

