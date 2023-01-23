import { t } from 'i18next'
import React from 'react'
import { ImArrowRight2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const ServicesHome = () => {
    const navigate=useNavigate();
  return (
    <div className='services__home__main'>
        <div className='services__home__content'>
            <h1>{t("home.services")}</h1>
            <div className="serivices__home__list">
                <div className="service__home">
                    <div className='service__img'>
                        <img src={process.env.REACT_APP_API_URL+"booking_management_blue.png"}/>
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
                <div className="service__home">
                    <div className='service__img'>
                        <img src={process.env.REACT_APP_API_URL+"luggage_transportation_blue.png"}/>
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
                <div className="service__home">
                    <div className='service__img'>
                        <img src={process.env.REACT_APP_API_URL+"transportation_animals_blue.png"}/>
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
  )
}

export default ServicesHome