/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * validate phone
 * @param phone
 * @returns {boolean}
 */

// 校验手机号码：必须以数字开头，除数字外，可含有“-”
export function validPhone(phone) {
  const re = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/
  return re.test(phone)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 校验用户名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
export function isRegisterUserName(userName) {
  var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
  if (!patrn.exec(userName)) return false
  return true
}
// 校验密码：只能输入6-20个字母、数字、下划线
export function isPasswd(s) {
  var patrn = /^(\w){6,20}$/
  if (!patrn.exec(s)) return false
  return true
}
