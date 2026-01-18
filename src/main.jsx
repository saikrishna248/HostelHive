import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./Redux/store";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />npm run dev
  // </StrictMode>,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
