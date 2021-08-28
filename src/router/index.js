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
  //   {
  //     path: '/user/OrderDetail',
  //     name: 'OrderDetail',
  //     component: () => import('../views/user/OrderDetail'),
  //   },
  //   {
  //     path: '/user/OrderSoldDetail',
  //     name: 'OrderSoldDetail',
  //     component: () => import('../views/user/OrderSoldDetail'),
  //   },
  //   {
  //     path: '/TabsPage',
  //     name: 'TabsPage',
  //     component: () => import('../views/common/TabsPage'),
  //   },
  //   {
  //     path: '/AllTags',
  //     name: 'AllTags',
  //     component: () => import('../views/common/AllTags'),
  //   },
  ],
})
//
// const  whiteList = ['/login','/'];
// // const  adminList = ['/admin/PendingGoods','/admin/AllUnsold   Goods']
// // const  userList = ['/user/UploadCommodity']
// // 路由拦截
// router.beforeEach(async (to, from, next)=>{
//   //有token
//   if (window.sessionStorage.getItem('token')||to.name==='Login') {
//     //拦截用户
//     // if(adminList.indexOf(to.path) !== -1&&Vue.prototype.$store.state.isAdmin===false){
//     //   Vue.prototype.$message.error('非管理员不得访问该页面');
//     //   next({
//     //     path:'/'
//     //   })
//     // }
//     //拦截管理员
//     // if(userList.indexOf(to.path) !== -1&&Vue.prototype.$store.state.isAdmin===true){
//     //   Vue.prototype.$message.error('管理员不得出售商品');
//     //   next({
//     //     path:'/'
//     //   })
//     // }
//     next()
//   }
//   //无token，跳转到登录页面
//   else {
//     if(whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       Vue.prototype.$message.warning("请先登录");
//       next({
//         path:'/login'
//       })
//     }
//   }
//   next();
// })
//
export default router;
