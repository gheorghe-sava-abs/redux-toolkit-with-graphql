import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { App } from './App';
import { store } from './store';
import { apolloClient } from './services/apolloClient';
import './index.css'

// Log version information
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'
console.info(`Application Version: ${appVersion}`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>,
)
