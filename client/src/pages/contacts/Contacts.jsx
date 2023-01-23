import { Breadcrumbs, Typography } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { useEffect } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookF, FaTelegramPlane, FaViber } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Contacts = () => {
    const { infoCompany } = useSelector(state => state.infoCompany);
    const { language } = useSelector(state => state.language)
    return (
        infoCompany == undefined ? <div>loading</div> :
            <>
                <div className='bread__crumbs__main'>
                    <div className='bredcrumbs-flight'>
                        <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                        <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                        <span className='bredcrumbs-flight-text'>{t("contacts.contacts")}</span>
                    </div>
                </div>
                <div className='contacts__main'>
                    <div className="contacts__controler">
                        <h1>{t("contacts.contacts")}</h1>
                        <div className="list__contacts">
                            <div className="contact">
                                <div className="constact__title">{t("contacts.title_1")}</div>
                                <div>{t('contacts.description_1')}</div>
                                <div className="list__phone">
                                    {infoCompany.telephone.split(" ").map((x, idx) =>
                                        <div key={idx} className='phone__or_email'>
                                            {x}
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="contacts__social__networks">
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
                            <div className="contact contact2">
                                <div className='constact__title'>{t("contacts.title_2")}</div>
                                <div>{t('contacts.description_2')}</div>
                                <div className="contact__email">
                                    <div className='phone__or_email'>
                                        {infoCompany.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Contacts