import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/Login.vue'
import Dashboard from '@/components/adm/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
     {
        path: '/',
        name: 'Login',
        component: () => import('@/components/Login.vue')
     },
     
    {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('@/components/adm/Dashboard.vue')
    },
    {
      path: '/Agentes',
      name: 'Agentes',
      component: () => import('@/components/adm/Agentes.vue')
    },
    {
      path: '/dashboardAgente',
      name: 'dashboardAgente',
      component: () => import('@/components/SubAgentes/dashboardAgente.vue')
    },
    {
      path: '/Pedido',
      name: 'Pedido',
      component: () => import('@/components/SubAgentes/Pedido.vue')
    }
  ],
})

export default router
