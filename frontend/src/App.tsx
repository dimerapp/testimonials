import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { Login } from './containers/Login/Login'
import { Testimonials } from './containers/Testimonials/Testimonials'
import { HowToUse } from './containers/HowToUse/HowToUse'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/groups/:groupId/testimonials/',
    Component: Testimonials,
  },
  {
    path: '/how-to-use/',
    Component: HowToUse,
  }
])

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
