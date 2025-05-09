import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/root.jsx'
import ErrorPage404 from './error-page-404';
import About from './routes/about.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
    errorElement: <ErrorPage404 />,
	},
  {
		path: '/about',
		element: <About />
	},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
