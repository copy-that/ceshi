import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index')
    },
    {
      path: '/newsXq',
      name: 'newsXq',
      component: () => import('../views/newsXq')
    },
    {
      path: '/searchindex',
      name: 'searchindex',
      component: () => import('../views/searchindex')
    },
    {
      path: '/navlist1',
      name: 'navlist1',
      component: () => import('../views/navlist1')
    },
    {
      path: '/navlist2',
      name: 'navlist2',
      component: () => import('../views/navlist2')
    },
    {
      path: '/navlist3',
      name: 'navlist3',
      component: () => import('../views/navlist3')
    },
    {
      path: '/navlist4',
      name: 'navlist4',
      component: () => import('../views/navlist4')
    },
    {
      path: '/navlist5',
      name: 'navlist5',
      component: () => import('../views/navlist5')
    },
    {
      path: '/navlist6',
      name: 'navlist6',
      component: () => import('../views/navlist6')
    },
    {
      path: '/navlist7',
      name: 'navlist7',
      component: () => import('../views/navlist7')
    },
    {
      path: '/navlist8',
      name: 'navlist8',
      component: () => import('../views/navlist8')
    },
    {
      path: '/navlist9',
      name: 'navlist9',
      component: () => import('../views/navlist9')
    },
    {
      path: '/navlist10',
      name: 'navlist10',
      component: () => import('../views/navlist10')
    },
    {
      path: '/navlistXq',
      name: 'navlistXq',
      component: () => import('../views/navlistXq')
    },
    {
      path: '/personyuyue',
      name: 'personyuyue',
      component: () => import('../views/personyuyue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/personfabu',
      name: 'personfabu',
      component: () => import('../views/personfabu'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/personbj',
      name: 'personbj',
      component: () => import('../views/personbj'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/personpj',
      name: 'personpj',
      component: () => import('../views/personpj')
    },
    {
      path: '/personhis',
      name: 'personhis',
      component: () => import('../views/personhis')
    },
    {
      path: '/personsc',
      name: 'personsc',
      component: () => import('../views/personsc'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/personmoney',
      name: 'personmoney',
      component: () => import('../views/personmoney')
    },
    {
      path: '/persontx',
      name: 'persontx',
      component: () => import('../views/persontx')
    },
    {
      path: '/personcz',
      name: 'personcz',
      component: () => import('../views/personcz')
    },
    {
      path: '/personrz',
      name: 'personrz',
      component: () => import('../views/personrz')
    },
    {
      path: '/personxxtz',
      name: 'personxxtz',
      component: () => import('../views/personxxtz')
    },
    {
      path: '/personwt',
      name: 'personwt',
      component: () => import('../views/personwt')
    },
    {
      path: '/personwtfk',
      name: 'personwtfk',
      component: () => import('../views/personwtfk')
    },
    {
      path: '/personwtxq',
      name: 'personwtxq',
      component: () => import('../views/personwtxq')
    },
    {
      path: '/personabout',
      name: 'personabout',
      component: () => import('../views/personabout')
    },
    {
      path: '/personzl',
      name: 'personzl',
      component: () => import('../views/personzl'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/personpass',
      name: 'personpass',
      component: () => import('../views/personpass')
    },
    {
      path: '/fabu',
      name: 'fabu',
      component: () => import('../views/fabu'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/wodefabu',
      name: 'wodefabu',
      component: () => import('../views/wodefabu')
    },
    {
      path: '/buylabel',
      name: 'buylabel',
      component: () => import('../views/buylabel')
    },
    {
      path: '/fabuform1',
      name: 'fabuform1',
      component: () => import('../views/fabuform1')
    },
    {
      path: '/fabuform2',
      name: 'fabuform2',
      component: () => import('../views/fabuform2')
    },
    {
      path: '/fabuform3',
      name: 'fabuform3',
      component: () => import('../views/fabuform3')
    },
    {
      path: '/fabuform4',
      name: 'fabuform4',
      component: () => import('../views/fabuform4')
    },
    {
      path: '/fabuform5',
      name: 'fabuform5',
      component: () => import('../views/fabuform5')
    },
    {
      path: '/fabuform6',
      name: 'fabuform6',
      component: () => import('../views/fabuform6')
    },
    {
      path: '/fabuform7',
      name: 'fabuform7',
      component: () => import('../views/fabuform7')
    },
    {
      path: '/fabuform8',
      name: 'fabuform8',
      component: () => import('../views/fabuform8')
    },
    {
      path: '/fabuform9',
      name: 'fabuform9',
      component: () => import('../views/fabuform9')
    },
    {
      path: '/fabuform10',
      name: 'fabuform10',
      component: () => import('../views/fabuform10')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/zhuc',
      name: 'zhuc',
      component: () => import('../views/zhuc')
    },
    {
      path: '/zhucgr',
      name: 'zhucgr',
      component: () => import('../views/zhucgr')
    },
    {
      path: '/zhucsj',
      name: 'zhucsj',
      component: () => import('../views/zhucsj')
    },
    {
      path: '/zhmima',
      name: 'zhmima',
      component: () => import('../views/zhmima')
    },
    {
      path: '/zfcs',
      name: 'zfcs',
      component: () => import('../views/zfcs')
    },
    {
      path: '/revoke',
      name: 'revoke',
      component: () => import('../views/revoke')
    }
  ]
})
