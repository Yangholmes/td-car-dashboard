import reservation from './component/reservation/index.vue'
import car from './component/car/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/reservation'
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: resolve => require(['./component/reservation/index.vue'], resolve)
  },
  {
    path: '/car',
    name: 'car',
    component: resolve => require(['./component/car/index.vue'], resolve)
  }
]

export default routes
