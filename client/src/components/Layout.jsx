import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAction } from '../hooks/useAction';
import { t } from 'i18next';

const Layout = () => {
    const { isShow, text, title } = useSelector(state => state.message);
    const { SetShowMessgeFalse } = useAction()
    const {language}=useSelector(state=>state.language);
    useEffect(()=>{

    },[language]);
    
    return (
        <div className='layout'>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
            {!isShow ? <></> :
                <div className='alert__main'>
                    <div className="alert__container">
                        <div onClick={() => SetShowMessgeFalse()} className="alert__exit">
                            &times;
                        </div>
                        <div className='alert__title'>
                            {title==""?t("message.message"):title}
                        </div>
                        <div className="alert__text">
                            {text}
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Layout;