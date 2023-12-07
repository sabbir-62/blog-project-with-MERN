import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Import context providers
import { DataProvider, LoginProvider } from './components/contextApi/DataProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </DataProvider>
  </BrowserRouter>
);
