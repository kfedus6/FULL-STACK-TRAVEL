import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import SetLanguage from '../SetLanguage';

const Burger = ({ setIsShowRegister, setIsRegister, setIsBurgerShow }) => {
    const { t, i18n } = useTranslation()
    const [isBurgerClick, setIsBurgerClick] = useState(false);
    const { is_login, user, is_admin } = useSelector(state => state.user)
    const navigate = useNavigate();
    return (
        <div className={"burger__menu__main"}>
            <div className='burger__exit1'>
                <div onClick={() => { setIsBurgerShow(false) }}>
                    &times;
                </div>
            </div>
            <div className='burger__menu__list1'>
                <div onClick={() => { setIsBurgerShow(false) }} className='burger__component'><NavLink to="/">{t('header.first_link')}</NavLink></div>
                <div onClick={() => { setIsBurgerShow(false) }} className='burger__component'><NavLink to="/flightsCategory">{t('header.third_link')}</NavLink></div>
                <div onClick={() => { setIsBurgerShow(false) }} className='burger__component'><NavLink to="/services">{t('header.six_link')}</NavLink></div>
                <div onClick={() => { setIsBurgerShow(false) }} className='burger__component'><NavLink to="/contacts">{t('header.fourth_link')}</NavLink></div>
                <div onClick={() => { setIsBurgerShow(false) }} className='burger__component'><NavLink to="/blog">Блог</NavLink></div>
                {is_admin ?
                    <div className='burger__admin__panel'>
                        <details onClick={e => { e.stopPropagation(); }}>
                            <summary>
                                Admin
                            </summary>
                            <div>
                                <div><NavLink to="/infoCompanyEdit">{t('admin.infoCompany')}</NavLink></div>
                                <div><NavLink to="/aboutUsEdit">{t('admin.aboutUs')}</NavLink></div>
                                <div><NavLink to="/blogEdit">{t('admin.blog')}</NavLink></div>
                                <div><NavLink to="/faqEdit">{t('admin.faq')}</NavLink></div>
                                <div><NavLink to="/flightsEdit">{t('admin.flight')}</NavLink></div>
                                <div><NavLink to="/novetlyEdit">{t('admin.novetly')}</NavLink></div>
                                <div><NavLink to="/responseEdit">{t('admin.response')}</NavLink></div>
                                <div><NavLink to="/order">{t('admin.order')}</NavLink></div>
                            </div>

                        </details>
                    </div> : <></>}
                <div className='burger__set__language1'><SetLanguage /></div>
                {!is_login ?
                    <div onClick={() => { setIsBurgerShow(false) }} className="burger__buttons">
                        <div className='burger__button__log__in'>
                            <button onClick={() => { setIsShowRegister(true); setIsRegister(false); setIsBurgerShow(false) }}>{t("authorize.enter")}</button>
                        </div>
                        <div className="burger__button__register">
                            <button onClick={() => { setIsShowRegister(true); setIsRegister(true); setIsBurgerShow(false) }}>{t("authorize.register")}</button>
                        </div>
                    </div>
                    :
                    <div onClick={() => { navigate("/account"); setIsBurgerShow(false) }} className="burger__personal__office">
                        {t("account.personal_office")}
                    </div>
                }
            </div>
        </div>
    )
}

export default Burger;