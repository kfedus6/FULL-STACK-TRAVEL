import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux';
import './utils/i18next';

import 'swiper/css/bundle'

import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
           <Provider store={store}>
                <GoogleOAuthProvider clientId={"357033640863-2fp06dgvoi1hjdam532virn2f8q9u8mi.apps.googleusercontent.com"}>
                    <App />                    
                </GoogleOAuthProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
);

