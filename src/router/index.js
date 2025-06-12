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
      path: '/AdicionarAgentes',
      name: 'AdicionarAgentes',
      component: () => import('@/components/adm/AdicionarAgentes.vue')
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
    },
    {
      path: '/verAgentes',
      name: 'verAgentes',
      component: () => import('@/components/adm/verAgentes.vue')
    },
    {
      path: '/editarAgentes',
      name:'editarAgentes',
      component: () => import('@/components/adm/edita-agentes.vue')
    }

    
  ],
})

export default router
