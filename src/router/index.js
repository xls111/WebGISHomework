import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Layout',
      component: () => import('../views/Layout/Layout'),
      children:[
        {
          path: '/map',
          name:'map',
          component:() => import('../components/Map')
        },
        {
          path:'/basemap',
          name:'basemap',
          component:() => import('../components/BaseMap')
        },
        {
          path:'/drawmap',
          name:'drawmap',
          component:() => import('../components/DrawMap')
        },
        {
          path:'/webmap',
          name:'webmap',
          component:() => import('../components/WebMap')
        }
      ]
    },
  ]
})
