/* jshint esversion: 6 */
import reservationCheck from './component/reservation-check/index.vue'
import reservationQuery from './component/reservation-query/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/reservation-check'
  },
  {
    path: '/reservation-check',
    name: 'reservation-check',
    component: (resolve) => require(['./component/reservation-check/index.vue'], resolve)
  },
  {
    path: '/reservation-query',
    name: 'reservation-query',
    component: (resolve) => require(['./component/reservation-query/index.vue'], resolve)
  }
]

export default routes
