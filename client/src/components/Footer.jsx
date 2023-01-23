import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom'
import { useAction } from '../hooks/useAction';
import { BsInstagram } from 'react-icons/bs'
import { GiSmartphone } from 'react-icons/gi'
import { useTranslation } from 'react-i18next';
import { AiOutlineFacebook, AiOutlineWhatsApp } from 'react-icons/ai';
import { CgMail } from "react-icons/cg";
import { BiTime } from "react-icons/bi";
import { FaFacebook, FaFacebookF, FaTelegramPlane, FaViber } from 'react-icons/fa';

const Footer = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { infoCompany } = useSelector(state => state.infoCompany);
    const { language } = useSelector(state => state.language);
    const { GetInfoCompany } = useAction();

    useEffect(() => {
        if (infoCompany == undefined) {
            GetInfoCompany();
        }
    }, [])

    return (
        infoCompany == undefined ? <div>...loading</div> :
            <div className='footer-main'>
                <div className='footer__component'>
                    <div className='footer-block'>
                        <div className='footer-logo logo-none-second' onClick={() => navigate("/")}>
                            <img src={process.env.REACT_APP_API_URL + 'logo-white3.png'} alt="logo" />
                            <span className='protected-none'>ⓒ 2022 TripNet. {t('footer.protected')}.</span>
                            <div className='footer-icon-social'>
                                <div>
                                    <a target="_blank" href={infoCompany.telegram}><FaTelegramPlane /></a>
                                </div>
                                <div>
                                    <a target="_blank" href={infoCompany.viber}><FaViber /></a>
                                </div>
                                <div>
                                    <a target="_blank" href="https://m.facebook.com/TripNET.com.ua/"><FaFacebookF /></a>
                                </div>
                                <div>
                                    <a target="_blank" href='https://www.instagram.com/tripnet.com.ua/'><BsInstagram /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer__list'>
                        <div className="footer__section">
                            <p>{t("footer.company")}</p>
                            <div><NavLink to="/">{t('header.first_link')}</NavLink></div>
                            <div><NavLink to="/flightsCategory">{t('header.third_link')}</NavLink></div>
                            <div><NavLink to="/services">{t('header.six_link')}</NavLink></div>
                            <div><NavLink to='/blog'>{t("header.five_link")}</NavLink></div>
                            <div><NavLink to="/contacts">{t('header.fourth_link')}</NavLink></div>
                        </div>
                        <div className="footer__section pair">
                            <p>{t("footer.services")}</p>
                            <div><NavLink to="/services/reservation_online">{t("footer.reservation_online")}</NavLink></div>
                            <div><NavLink to="/services/booking_management">{t("footer.booking_management")}</NavLink></div>
                            <div><NavLink to="/services/luggage_transportation">{t("footer.luggage_transportation")}</NavLink></div>
                            <div><NavLink to="/services/transportation_animals">{t("footer.transportation_animals")}</NavLink></div>
                        </div>
                        <div className='footer__section pair'>
                            <p>{t("footer.contacts")}</p>
                            <div>
                                <img src={process.env.REACT_APP_API_URL + 'phone.png'} alt="phone" />
                                {infoCompany.telephone}
                            </div>
                            <div>
                                <img src={process.env.REACT_APP_API_URL + 'mail.png'} alt="mail" />
                                {infoCompany.email}
                            </div>
                            <div>
                                <img src={process.env.REACT_APP_API_URL + 'clock.png'} alt="clock" />
                                {infoCompany.openingHours[language]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Footer