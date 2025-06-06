import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage404 from './error-page-404'
import About from './routes/about'
import { TaskList } from './components/TaskList/TaskList'

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />
}
  
export default App