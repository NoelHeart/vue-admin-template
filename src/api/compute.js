import request from '@/utils/request'

/*
compute1 API
*/
export function getEmDailyRecordList(data) {
  return request({
    url: '/compute/getEmDailyRecordList',
    method: 'post',
    data
  })
}
export function deleteEmDailyRecord(data) {
  return request({
    url: '/compute/deleteEmDailyRecord',
    method: 'post',
    data
  })
}
export function addEmDailyRecord(data) {
  return request({
    url: '/compute/addEmDailyRecord',
    method: 'post',
    data
  })
}

/*
compute2 API
*/
export function getWmDailyRecordList(data) {
  return request({
    url: '/compute/getWmDailyRecordList',
    method: 'post',
    data
  })
}
export function deleteWmDailyRecord(data) {
  return request({
    url: '/compute/deleteWmDailyRecord',
    method: 'post',
    data
  })
}
export function addWmDailyRecord(data) {
  return request({
    url: '/compute/addWmDailyRecord',
    method: 'post',
    data
  })
}
/*
compute3 API
*/
export function getEmMonthRecordList(data) {
  return request({
    url: '/compute/getEmMonthRecordList',
    method: 'post',
    data
  })
}
export function deleteEmMonthRecord(data) {
  return request({
    url: '/compute/deleteEmMonthRecord',
    method: 'post',
    data
  })
}
export function addEmMonthRecord(data) {
  return request({
    url: '/compute/addEmMonthRecord',
    method: 'post',
    data
  })
}

/*
compute4 API
*/
export function getWmMonthRecordList(data) {
  return request({
    url: '/compute/getWmMonthRecordList',
    method: 'post',
    data
  })
}
export function deleteWmMonthRecord(data) {
  return request({
    url: '/compute/deleteWmMonthRecord',
    method: 'post',
    data
  })
}
export function addWmMonthRecord(data) {
  return request({
    url: '/compute/addWmMonthRecord',
    method: 'post',
    data
  })
}

/*
compute5 API
*/

export function getEmFirmDaily(data) {
  return request({
    url: '/compute/getEmFirmDaily',
    method: 'post',
    data
  })
}
export function deleteEmFirmDaily(data) {
  return request({
    url: '/compute/deleteEmFirmDaily',
    method: 'post',
    data
  })
}
export function addEmFirmDaily(data) {
  return request({
    url: '/compute/addEmFirmDaily',
    method: 'post',
    data
  })
}

/*
compute6 API
*/

export function getWmFirmDaily(data) {
  return request({
    url: '/compute/getWmFirmDaily',
    method: 'post',
    data
  })
}
export function addWmFirmDaily(data) {
  return request({
    url: '/compute/addWmFirmDaily',
    method: 'post',
    data
  })
}
export function deleteWmFirmDaily(data) {
  return request({
    url: '/compute/deleteWmFirmDaily',
    method: 'post',
    data
  })
}

/*
compute7 API
*/

export function getEmFirmMonth(data) {
  return request({
    url: '/compute/getEmFirmMonth',
    method: 'post',
    data
  })
}
export function addEmFirmMonth(data) {
  return request({
    url: '/compute/addEmFirmMonth',
    method: 'post',
    data
  })
}
export function deleteEmFirmMonth(data) {
  return request({
    url: '/compute/deleteEmFirmMonth',
    method: 'post',
    data
  })
}

/*
compute8 API
*/

export function getWmFirmMonth(data) {
  return request({
    url: '/compute/getWmFirmMonth',
    method: 'post',
    data
  })
}
export function addWmFirmMonth(data) {
  return request({
    url: '/compute/addWmFirmMonth',
    method: 'post',
    data
  })
}
export function deleteWmFirmMonth(data) {
  return request({
    url: '/compute/deleteWmFirmMonth',
    method: 'post',
    data
  })
}

