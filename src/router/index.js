import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/screen',
    component: () => import('@/views/bigData/bigScreenData'),
    hidden: true
  },
  {
    path: '/incomeChart',
    component: () => import('@/views/bigData/components/InCome'),
    hidden: true
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://a120erqbyqo4bn7x.idtapp.cloudhost.link/login.htm?oauth_callback=http%3A%2F%2Fa120erqbyqo4bn7x.idtapp.cloudhost.link%2Flogin%2Fcallback',
        meta: { title: '智能用电平台', icon: 'link' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '业务计算',
      icon: 'example'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '每日用电统计' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '每日用水统计' }
      },
      {
        path: 'compute3',
        component: () => import('@/views/nested/compute3'),
        meta: { title: '每月用电统计' }
      },
      {
        path: 'compute4',
        component: () => import('@/views/nested/compute4'),
        meta: { title: '每月用水统计' }
      },
      {
        path: 'compute5',
        component: () => import('@/views/nested/compute5'),
        meta: { title: '企业用电日统计' }
      },
      {
        path: 'compute6',
        component: () => import('@/views/nested/compute6'),
        meta: { title: '企业用水日统计' }
      },
      {
        path: 'compute7',
        component: () => import('@/views/nested/compute7'),
        meta: { title: '企业用电月统计' }
      },
      {
        path: 'compute8',
        component: () => import('@/views/nested/compute8'),
        meta: { title: '企业用水月统计' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const adminRoutes = [
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/userInfo',
    name: 'UserManage',
    meta: {
      title: '用户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'userInfo',
        component: () => import('@/views/profile/index'),
        meta: {
          title: '用户详情'
        }
      },
      {
        path: 'userManagePage',
        component: () => import('@/views/userManage/userManage'),
        meta: {
          title: '用户管理'
        }
      }
    ]
  },

  {
    path: '/screendata',
    component: Layout,
    redirect: '/screendata/mapData',
    name: 'Screendata',
    meta: {
      title: '大屏展示数据',
      icon: 'tab'
    },
    children: [
      {
        path: 'hxscreen1',
        component: () => import('@/views/screendata/hxscreen1'),
        meta: { title: '地图显示数据' }
      },
      {
        path: 'hxscreen2',
        component: () => import('@/views/screendata/hxscreen2'),
        meta: { title: '智能设备情况' }
      },
      {
        path: 'hxscreen3',
        component: () => import('@/views/screendata/hxscreen3'),
        meta: { title: '各大楼能耗饼状图' }
      },
      {
        path: 'hxscreen4',
        component: () => import('@/views/screendata/hxscreen4'),
        meta: { title: '当天用电量折线图' }
      },
      {
        path: 'hxscreen5',
        component: () => import('@/views/screendata/hxscreen5'),
        meta: { title: '近12月耗能柱形图' }
      },
      {
        path: 'hxscreen6',
        component: () => import('@/views/screendata/hxscreen6'),
        meta: { title: '总能耗情况统计表格' }
      },
      {
        path: 'hxscreen7',
        component: () => import('@/views/screendata/hxscreen7'),
        meta: { title: '前一天电量折线图' }
      },
      {
        path: 'hxscreen8',
        component: () => import('@/views/screendata/hxscreen8'),
        meta: { title: '收入与入住人数柱形图' }
      },
      {
        path: 'hxscreen9',
        component: () => import('@/views/screendata/hxscreen9'),
        meta: { title: '摄像头列表' }
      },
      {
        path: 'hxscreen10',
        component: () => import('@/views/screendata/hxscreen10'),
        meta: { title: '1号窗口摄像头' }
      },
      {
        path: 'hxscreen11',
        component: () => import('@/views/screendata/hxscreen11'),
        meta: { title: '2号窗口摄像头' }
      },
      {
        path: 'hxscreen12',
        component: () => import('@/views/screendata/hxscreen12'),
        meta: { title: '3号窗口摄像头' }
      },
      {
        path: 'hxscreen13',
        component: () => import('@/views/screendata/hxscreen13'),
        meta: { title: '4号窗口摄像头' }
      },
      {
        path: 'hxscreen14',
        component: () => import('@/views/screendata/hxscreen14'),
        meta: { title: '每日大楼用水' }
      },
      {
        path: 'hxscreen15',
        component: () => import('@/views/screendata/hxscreen15'),
        meta: { title: '每月大楼用水' }
      }
    ]
  },
  {
    path: '/honeycomb',
    component: Layout,
    redirect: '/honeycomb/honeycomb1',
    name: 'Honeycomb',
    meta: {
      title: '核心数据',
      icon: 'star'
    },
    children: [
      {
        path: 'honeycomb1',
        component: () => import('@/views/honeycomb/honeycomb1'),
        meta: { title: '企业列表' }
      },
      {
        path: 'honeycomb2',
        component: () => import('@/views/honeycomb/honeycomb2'),
        meta: { title: '企业用房分配' }
      },
      {
        path: 'honeycomb3',
        component: () => import('@/views/honeycomb/honeycomb3'),
        meta: { title: '电表清单' }
      },
      {
        path: 'honeycomb4',
        component: () => import('@/views/honeycomb/honeycomb4'),
        meta: { title: '水表清单' }
      },
      {
        path: 'honeycomb5',
        component: () => import('@/views/honeycomb/honeycomb5'),
        meta: { title: '电表部署' }
      },
      {
        path: 'honeycomb6',
        component: () => import('@/views/honeycomb/honeycomb6'),
        meta: { title: '水表部署' }
      },
      {
        path: 'honeycomb7',
        component: () => import('@/views/honeycomb/honeycomb7'),
        meta: { title: '住户登记' }
      },
      {
        path: 'honeycomb8',
        component: () => import('@/views/honeycomb/honeycomb8'),
        meta: { title: '电表每小时记录' }
      },
      {
        path: 'honeycomb9',
        component: () => import('@/views/honeycomb/honeycomb9'),
        meta: { title: '水表每日记录' }
      },
      {
        path: 'honeycomb10',
        component: () => import('@/views/honeycomb/honeycomb10'),
        meta: { title: '电表事件记录' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const editorRoutes = [
  {
    path: '/userManage2',
    component: Layout,
    redirect: '/userManage2/userInfo2',
    name: 'UserManage2',
    meta: {
      title: '用户管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'userInfo2',
        component: () => import('@/views/profile/index'),
        meta: { title: '用户详情' }
      },
      {
        path: 'userManagePage2',
        component: () => import('@/views/userManage2/userManage2'),
        meta: { title: '用户管理' }
      }
    ]
  },

  {
    path: '/screendata',
    component: Layout,
    redirect: '/screendata/mapData',
    name: 'Screendata',
    meta: {
      title: '大屏展示数据',
      icon: 'tab'
    },
    children: [
      {
        path: 'hxscreen1',
        component: () => import('@/views/screendata/hxscreen1'),
        meta: { title: '地图显示数据' }
      },
      {
        path: 'hxscreen2',
        component: () => import('@/views/screendata/hxscreen2'),
        meta: { title: '智能设备情况' }
      },
      {
        path: 'hxscreen3',
        component: () => import('@/views/screendata/hxscreen3'),
        meta: { title: '各大楼能耗饼状图' }
      },
      {
        path: 'hxscreen4',
        component: () => import('@/views/screendata/hxscreen4'),
        meta: { title: '当天用电量折线图' }
      },
      {
        path: 'hxscreen5',
        component: () => import('@/views/screendata/hxscreen5'),
        meta: { title: '近12月耗能柱形图' }
      },
      {
        path: 'hxscreen6',
        component: () => import('@/views/screendata/hxscreen6'),
        meta: { title: '总能耗情况统计表格' }
      },
      {
        path: 'hxscreen7',
        component: () => import('@/views/screendata/hxscreen7'),
        meta: { title: '前一天电量折线图' }
      },
      {
        path: 'hxscreen8',
        component: () => import('@/views/screendata/hxscreen8'),
        meta: { title: '收入与入住人数柱形图' }
      },
      {
        path: 'hxscreen9',
        component: () => import('@/views/screendata/hxscreen9'),
        meta: { title: '摄像头列表' }
      },
      {
        path: 'hxscreen10',
        component: () => import('@/views/screendata/hxscreen10'),
        meta: { title: '1号窗口摄像头' }
      },
      {
        path: 'hxscreen11',
        component: () => import('@/views/screendata/hxscreen11'),
        meta: { title: '2号窗口摄像头' }
      },
      {
        path: 'hxscreen12',
        component: () => import('@/views/screendata/hxscreen12'),
        meta: { title: '3号窗口摄像头' }
      },
      {
        path: 'hxscreen13',
        component: () => import('@/views/screendata/hxscreen13'),
        meta: { title: '4号窗口摄像头' }
      },
      {
        path: 'hxscreen14',
        component: () => import('@/views/screendata/hxscreen14'),
        meta: { title: '每日大楼用水' }
      },
      {
        path: 'hxscreen15',
        component: () => import('@/views/screendata/hxscreen15'),
        meta: { title: '每月大楼用水' }
      }
    ]
  },
  {
    path: '/honeycomb',
    component: Layout,
    redirect: '/honeycomb/honeycomb1',
    name: 'Honeycomb',
    meta: {
      title: '核心数据',
      icon: 'star'
    },
    children: [
      {
        path: 'honeycomb1',
        component: () => import('@/views/honeycomb/honeycomb1'),
        meta: { title: '企业列表' }
      },
      {
        path: 'honeycomb2',
        component: () => import('@/views/honeycomb/honeycomb2'),
        meta: { title: '企业用房分配' }
      },
      {
        path: 'honeycomb3',
        component: () => import('@/views/honeycomb/honeycomb3'),
        meta: { title: '电表清单' }
      },
      {
        path: 'honeycomb4',
        component: () => import('@/views/honeycomb/honeycomb4'),
        meta: { title: '水表清单' }
      },
      {
        path: 'honeycomb5',
        component: () => import('@/views/honeycomb/honeycomb5'),
        meta: { title: '电表部署' }
      },
      {
        path: 'honeycomb6',
        component: () => import('@/views/honeycomb/honeycomb6'),
        meta: { title: '水表部署' }
      },
      {
        path: 'honeycomb7',
        component: () => import('@/views/honeycomb/honeycomb7'),
        meta: { title: '住户登记' }
      },
      {
        path: 'honeycomb8',
        component: () => import('@/views/honeycomb/honeycomb8'),
        meta: { title: '电表每小时记录' }
      },
      {
        path: 'honeycomb9',
        component: () => import('@/views/honeycomb/honeycomb9'),
        meta: { title: '水表每日记录' }
      },
      {
        path: 'honeycomb10',
        component: () => import('@/views/honeycomb/honeycomb10'),
        meta: { title: '电表事件记录' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const visitorRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]
