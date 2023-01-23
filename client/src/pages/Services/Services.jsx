import { Breadcrumbs, Typography } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { ImArrowRight2 } from 'react-icons/im'
import { NavLink, useNavigate } from 'react-router-dom'

const Services = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='bread__crumbs__main'>
                <div className='bredcrumbs-flight'>
                    <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                    <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                    <span className='bredcrumbs-flight-text'>{t("footer.services")}</span>
                </div>
            </div>
            <div className='services__main'>
                <div className='static__text'>
                    <h1>{t("services.all_services")}</h1>
                    <div className='list__services'>
                        <div className="service">
                            <div className='service__img'>
                                <img src={process.env.REACT_APP_API_URL + "reservation_online_blue.png"} />
                            </div>
                            <h3>{t("services.reservation_online")}</h3>
                            <div>{t("services.reservation_online_description")}</div>
                            <div className='service__detail'>
                                <a onClick={() => navigate("/services/reservation_online")}>
                                    {t('services.details')}
                                    <div><ImArrowRight2 /></div>
                                </a>
                            </div>
                        </div>
                        <div className="service">
                            <div className='service__img'>
                                <img src={process.env.REACT_APP_API_URL + "booking_management_blue.png"} />
                            </div>
                            <h3>{t("services.booking_management")}</h3>
                            <div>{t("services.booking_management_description")}</div>
                            <div className='service__detail'>
                                <a onClick={() => navigate("/services/booking_management")}>
                                    {t('services.details')}
                                    <div><ImArrowRight2 /></div>
                                </a>
                            </div>
                        </div>
                        <div className="service">
                            <div className='service__img'>
                                <img src={process.env.REACT_APP_API_URL + "luggage_transportation_blue.png"} />
                            </div>
                            <h3>{t("services.luggage_transportation")}</h3>
                            <div>{t("services.luggage_transportation_description")}</div>
                            <div className='service__detail'>
                                <a onClick={() => navigate("/services/luggage_transportation")}>
                                    {t('services.details')}
                                    <div><ImArrowRight2 /></div>
                                </a>
                            </div>
                        </div>
                        <div className="service">
                            <div className='service__img'>
                                <img src={process.env.REACT_APP_API_URL + "transportation_animals_blue.png"} />
                            </div>
                            <h3>{t("services.transportation_animals")}</h3>
                            <div>{t("services.transportation_animals_description")}</div>
                            <div className='service__detail'>
                                <a onClick={() => navigate("/services/transportation_animals")}>
                                    {t('services.details')}
                                    <div><ImArrowRight2 /></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Services