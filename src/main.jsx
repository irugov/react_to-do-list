import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { worker } from './api/server'
import { TaskUiProvider } from './contexts/TaskUiContext.jsx'

async function main() {
  await worker.start({ onUnhandledRequest: 'bypass' });

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <TaskUiProvider>
          <App />
        </TaskUiProvider>
      </Provider>
    </StrictMode>,
  );
}

main();

