import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'MapLayout',
      component: () => import('../views/Layout/Layout'),
      children: [
        {
          path: '/map',
          name: 'map',
          component: () => import('../components/Map/Map')
        },
        {
          path: '/basemap',
          name: 'basemap',
          component: () => import('../components/Map/BaseMap')
        },
        {
          path: '/drawmap',
          name: 'drawmap',
          component: () => import('../components/Map/DrawMap')
        },
        {
          path: '/webmap',
          name: 'webmap',
          component: () => import('../components/Map/WebMap')
        }
      ]
    },

    {
      path: '/table',
      name: 'TableLayout',
      component: () => import('../views/Layout/Layout'),
      children: [
        {
          path: '/siteTable',
          name: 'siteTable',
          component: () => import('../components/Tables/SitesTable')
        },
        {
          path:'/restaurantTable',
          name:'restaurantTable',
          component: () => import('../components/Tables/RestaurantTable')
        },
        {
          path:'/accommodationTable',
          name:'restaurantTable',
          component: () => import('../components/Tables/AccommodationTable')
        },
        {
          path:'/educationTable',
          name:'restaurantTable',
          component: () => import('../components/Tables/EducationTable')
        },
        {
          path:'/entertainTable',
          name:'restaurantTable',
          component: () => import('../components/Tables/EntertainTable')
        },
        {
          path:'/financeTable',
          name:'restaurantTable',
          component: () => import('../components/Tables/FinanceTable')
        },
        {
          path:'/marketTable',
          name:'restaurantTable',
          component: () => import('../components/Tables/MarketTable')
        }
      ]
    },
  ]
})
