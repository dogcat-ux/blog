import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/user/Index'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/common/Login'),
    },
    {
      path: '/user/PublishNote',
      name: 'PublishNote',
      component: () => import('../views/user/PublishNote'),
    },
    {
      path: '/user/UserPage',
      name: 'UserPage',
      component: () => import('../views/user/UserPage'),
    },
    {
      path: '/user/DetailPage',
      name: 'DetailPage',
      component: () => import('../views/user/DetailPage'),
    },
    {
      path: '/user/MessageCenter',
      name: 'MessageCenter',
      component: () => import('../views/user/MessageCenter'),
    },
    {
      path: '/user/InfoForOthers',
      name: 'InfoForOthers',
      component: () => import('../views/user/InfoForOthers'),
    },
    {
      path: '/user/TagsPage',
      name: 'TagsPage',
      component: () => import('../views/user/TagsPage'),
    },
    {
      path: '/user/SearchPage',
      name: 'SearchPage',
      component: () => import('../views/user/SearchPage'),
    },
    {
      path: '/user/MyNotePage',
      name: 'MyNotePage',
      component: () => import('../views/user/MyNotePage'),
    },
    {
      path: '/user/MyCollectPage',
      name: 'MyCollectPage',
      component: () => import('../views/user/MyCollectPage'),
    },
  ],
})

const  whiteList = ['/login','/'];
// 路由拦截
router.beforeEach(async (to, from, next)=>{
  //有token
  if (window.sessionStorage.getItem('token')||to.name==='Login') {
    next()
  }
  //无token，跳转到登录页面
  else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Vue.prototype.$message.warning("请先登录");
      next({
        path:'/login'
      })
    }
  }
  next();
})

export default router;
