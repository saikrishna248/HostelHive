import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />npm run dev
  // </StrictMode>,
   <GoogleOAuthProvider clientId="207926738223-lebml862bmh8spvebuii0uudgecfgf70.apps.googleusercontent.com">
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </GoogleOAuthProvider>
)
