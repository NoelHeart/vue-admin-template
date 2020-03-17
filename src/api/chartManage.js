import request from '@/utils/request'

export function getLastMonthEmScaleList() {
  return request({
    url: '/echart/getLastMonthEmScaleList',
    method: 'get'
  })
}

export function getLastMonthWmScaleList() {
  return request({
    url: '/echart/getLastMonthWmScaleList',
    method: 'get'
  })
}

export function getYesterdayEmChart() {
  return request({
    url: '/echart/getYesterdayEmChart',
    method: 'get'
  })
}

export function getYesterdayWmChart() {
  return request({
    url: '/echart/getYesterdayWmChart',
    method: 'get'
  })
}

