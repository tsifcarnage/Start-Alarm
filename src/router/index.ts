import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/nav/Layout.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'accueil',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'concept',
        name: 'concept',
        component: () => import('../views/ConceptView.vue')
      },
      {
        path: 'avantages',
        name: 'avantages',
        component: () => import('../views/AvantagesView.vue')
      },
      {
        path: 'produits',
        name: 'produits',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'carte',
        name: 'carte',
        component: () => import('../views/CarteView.vue')
      },
      {
        path: 'favoris',
        name: 'favoris',
        component: () => import('../views/FavorisView.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'page-non-trouvée',
    component: () => import('../views/NotFoundView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router