import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Item = React.lazy(() => import('./views/item/Item'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Notification = React.lazy(() => import('./views/notifications/Notification'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/item', name: 'Item', element: Item },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/notification', name: 'Notification', element: Notification },
]

export default routes
