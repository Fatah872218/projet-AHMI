export default [
  {
    path: '/evenement/:id/admin',
    name: 'EventDetailsAdmin',
    component: () => import('@/views/EventDetailsAdmin.vue'),
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: () => import('@/views/AdminCategories.vue'),
    meta: { requiresAdmin: true },
  },
]
