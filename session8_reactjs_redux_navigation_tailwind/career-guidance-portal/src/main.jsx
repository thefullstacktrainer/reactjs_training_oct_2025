import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // RTK version
import AppRedux from './AppRedux.jsx'; // Classic Redux version
import { Provider } from 'react-redux';
import { store } from './app/store'; // RTK
import { storeRedux } from './app/storeRedux'; // Classic

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> <App /> </Provider> */}
    <Provider store={storeRedux}>
      <AppRedux />
    </Provider>
  </StrictMode>
);
