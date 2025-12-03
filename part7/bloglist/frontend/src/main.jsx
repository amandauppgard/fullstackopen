import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { GlobalStyles } from './styled'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
)