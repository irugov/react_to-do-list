import React from 'react'
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage404 from './error-page-404'
import About from './routes/about'
import { TaskList } from './components/TaskList/TaskList'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Root />,
    errorElement: <ErrorPage404 />,
    children: [
      {
        path: '/',
        element: <TaskList />
      },
    ]
	},
  {
		path: '/about',
		element: <About />,
	},
];

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return <RouterProvider router={router} />
}
  
export default App