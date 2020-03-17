import request from '@/utils/request'

/*
honeycomb1 API
*/
export function getFrimList(pageNum, pageSize, firm) {
  const data = {
    pageNum,
    pageSize,
    firm
  }
  return request({
    url: '/honeycomb/getFirmsList',
    method: 'post',
    data
  })
}

export function updateFirm(data) {
  return request({
    url: '/honeycomb/updateFirm',
    method: 'post',
    data
  })
}

export function createFirm(data) {
  return request({
    url: '/honeycomb/createFirm',
    method: 'post',
    data
  })
}

export function deleteFirm(id) {
  const data = {
    id
  }
  return request({
    url: '/honeycomb/deleteFirm',
    method: 'post',
    data
  })
}
/*
honeycomb2 API
*/
export function getFirmRoomList(data) {
  return request({
    url: '/honeycomb/getFirmApartmentList',
    method: 'post',
    data
  })
}

export function getApartmentIdList() {
  return request({
    url: '/honeycomb/getApartmentIdList',
    method: 'get'
  })
}

export function createFirmApart(data) {
  return request({
    url: '/honeycomb/addFirmApartment',
    method: 'post',
    data
  })
}

export function updateFirmApart(data) {
  return request({
    url: '/honeycomb/updateFirmApart',
    method: 'post',
    data
  })
}

export function getAllFrimList() {
  return request({
    url: '/honeycomb/getAllFrimList',
    method: 'get'
  })
}

export function deleteFirmApart(data) {
  return request({
    url: '/honeycomb/deleteFirmApart',
    method: 'post',
    data
  })
}

/*
honeycomb3 API 电表清单
*/
export function getElectricList(data) {
  return request({
    url: '/honeycomb/getElectricList',
    method: 'post',
    data
  })
}
export function createElectricMeter(data) {
  return request({
    url: '/honeycomb/addElectricMeter',
    method: 'post',
    data
  })
}
export function updateElectricMeter(data) {
  return request({
    url: '/honeycomb/updateElectricMeter',
    method: 'post',
    data
  })
}
export function deleteElectricMeter(data) {
  return request({
    url: '/honeycomb/deleteElectricMeter',
    method: 'post',
    data
  })
}

/*
honeycomb4 API 电表清单
*/
export function getWaterList(data) {
  return request({
    url: '/honeycomb/getWaterList',
    method: 'post',
    data
  })
}
export function createWaterMeter(data) {
  return request({
    url: '/honeycomb/addWaterMeter',
    method: 'post',
    data
  })
}
export function updateWaterMeter(data) {
  return request({
    url: '/honeycomb/updateWaterMeter',
    method: 'post',
    data
  })
}
export function deleteWaterMeter(data) {
  return request({
    url: '/honeycomb/deleteWaterMeter',
    method: 'post',
    data
  })
}

/*
honeycomb5 API 电表部署
*/
export function getEmApartList(data) {
  return request({
    url: '/honeycomb/getEmApartList',
    method: 'post',
    data
  })
}
export function createEmApart(data) {
  return request({
    url: '/honeycomb/addEmApart',
    method: 'post',
    data
  })
}
export function updateEmApart(data) {
  return request({
    url: '/honeycomb/updateEmApart',
    method: 'post',
    data
  })
}
export function deleteEmApart(data) {
  return request({
    url: '/honeycomb/deleteEmApart',
    method: 'post',
    data
  })
}
export function EmList() {
  return request({
    url: '/honeycomb/getAllEm',
    method: 'get'
  })
}

/*
honeycomb6 API 水表部署
*/
export function getWmApartList(data) {
  return request({
    url: '/honeycomb/getWmApartList',
    method: 'post',
    data
  })
}
export function createWmApart(data) {
  return request({
    url: '/honeycomb/addWmApart',
    method: 'post',
    data
  })
}
export function updateWmApart(data) {
  return request({
    url: '/honeycomb/updateWmApart',
    method: 'post',
    data
  })
}
export function deleteWmApart(data) {
  return request({
    url: '/honeycomb/deleteWmApart',
    method: 'post',
    data
  })
}
export function WmList() {
  return request({
    url: '/honeycomb/getAllWm',
    method: 'get'
  })
}

/*
honeycomb7 API 住户登记
*/
export function getRoomerList(data) {
  return request({
    url: '/honeycomb/getRoomerList',
    method: 'post',
    data
  })
}
export function createRooomer(data) {
  return request({
    url: '/honeycomb/addRooomer',
    method: 'post',
    data
  })
}
export function updateRoomer(data) {
  return request({
    url: '/honeycomb/updateRoomer',
    method: 'post',
    data
  })
}
export function deleteRoomer(data) {
  return request({
    url: '/honeycomb/deleteRoomer',
    method: 'post',
    data
  })
}
/*
honeycomb8 API 电表每小时记录  getEmRecordList, updateEmRecord, createEmRecord, deleteEmRecord
*/
export function getEmRecordList(data) {
  return request({
    url: '/honeycomb/getEmRecordList',
    method: 'post',
    data
  })
}
export function createEmRecord(data) {
  return request({
    url: '/honeycomb/addEmRecord',
    method: 'post',
    data
  })
}
export function updateEmRecord(data) {
  return request({
    url: '/honeycomb/updateEmRecord',
    method: 'post',
    data
  })
}
export function deleteEmRecord(data) {
  return request({
    url: '/honeycomb/deleteEmRecord',
    method: 'post',
    data
  })
}
/*
honeycomb9 API 水表每日记录
*/
export function getWmRecordList(data) {
  return request({
    url: '/honeycomb/getWmRecordList',
    method: 'post',
    data
  })
}
export function createWmRecord(data) {
  return request({
    url: '/honeycomb/addWmRecord',
    method: 'post',
    data
  })
}
export function updateWmRecord(data) {
  return request({
    url: '/honeycomb/updateWmRecord',
    method: 'post',
    data
  })
}
export function deleteWmRecord(data) {
  return request({
    url: '/honeycomb/deleteWmRecord',
    method: 'post',
    data
  })
}
/*
honeycomb10 API 水表每日记录
*/
export function getEmEventList(data) {
  return request({
    url: '/honeycomb/getEmEventList',
    method: 'post',
    data
  })
}
export function createEmEvent(data) {
  return request({
    url: '/honeycomb/addEmEvent',
    method: 'post',
    data
  })
}
export function updateEvent(data) {
  return request({
    url: '/honeycomb/updateEvent',
    method: 'post',
    data
  })
}
export function deleteEvent(data) {
  return request({
    url: '/honeycomb/deleteEvent',
    method: 'post',
    data
  })
}
