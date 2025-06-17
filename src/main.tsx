import { StrictMode } from 'react'
import { createRoot, Root } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { worker } from './api/server'
import { TaskUiProvider } from './contexts/TaskUiContext'

async function main(): Promise<void> {
  // Запуск MSW worker
  await worker.start({ onUnhandledRequest: 'bypass' });

  // root элемент с проверкой на null
  const rootElement: HTMLElement | null = document.getElementById('root');

  if(!rootElement) {
    throw new Error('Failed to find the root element');
  }
  
  // Корневой ререндер с явной типизацией
  const root: Root = createRoot(rootElement);

  // Рендер приложения
  root.render(
    <StrictMode>
      <Provider store={store}>
        <TaskUiProvider>
          <App />
        </TaskUiProvider>
      </Provider>
    </StrictMode>,
  );
}

// Запуск приложения
main().catch((error: Error) => {
  console.error('Failed to start application:', error);
})

