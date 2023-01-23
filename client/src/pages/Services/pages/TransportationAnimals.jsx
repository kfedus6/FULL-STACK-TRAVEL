import { Breadcrumbs, Typography } from '@mui/material'
import { t } from 'i18next'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import AdditionalInformation from './AdditionalInformation'

const TransportationAnimals = () => {
    const { language } = useSelector(state => state.language);
    useEffect(() => {

    }, [language]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (document.querySelector("#FixedPanelMain") == null) return;
        if (document.querySelector("#AdditionalInformation") == null) return;
        if (document.querySelector("#FixedPanel") == null) return;
        if (window.screen.width < 1025) {
            document.querySelector("#FixedPanel").style.position = "unset";
            return;
        }
        if (document.querySelector("#AdditionalInformation").getBoundingClientRect().top -
            140 + document.querySelector("#AdditionalInformation").getBoundingClientRect().height -
            document.querySelector("#FixedPanel").getBoundingClientRect().height - 45 < 0) {
            document.querySelector("#FixedPanel").style.position = "unset";
            document.querySelector("#FixedPanelMain").style.display = "flex"
            document.querySelector("#FixedPanelMain").style.alignItems = "flex-end";
            document.querySelector("#FixedPanelMain").style.marginBottom = "45px";
        }
        else {
            document.querySelector("#FixedPanel").style.position = "fixed";
            document.querySelector("#FixedPanelMain").style.display = "unset"
            document.querySelector("#FixedPanelMain").style.alignItems = "unset";
        }
    }, [scrollPosition]);
    const navigate = useNavigate()
    const indexService = 4;
    return (
        <>
            <div className='bread__crumbs__main'>
                <div className='bredcrumbs-flight'>
                    <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                    <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                    <span className='bredcrumbs-flight-services-link'><NavLink to="/services">{t("footer.services")}</NavLink></span>
                    <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                    <span className='bredcrumbs-flight-text'>{t("services.transportation_animal_main_title")}</span>
                </div>
            </div>
            <div className='service__page__main'>
                <div className="service__page__content">
                    <div className="service__page__main__title">
                        {t("services.transportation_animal_main_title")}
                    </div>
                    <div className="service__page__title">
                        {t("services.transportation_animal_title_1")}
                    </div>
                    <div className="service__page__description">
                        {t("services.transportation_animal_description_1")}
                    </div>
                    <div className="service__page__title">
                        {t("services.transportation_animal_title_2")}
                    </div>
                    <div className="service__page__description">
                        <div className="service__page__description">
                            {t("services.transportation_animal_description_2")}
                        </div>
                        <ol>
                            <li>{t("services.transportation_animal_description_2_li_1")}</li>
                            <li>{t("services.transportation_animal_description_2_li_2")}</li>
                            <li>{t("services.transportation_animal_description_2_li_3")}</li>
                            <li>{t("services.transportation_animal_description_2_li_4")}</li>
                            <li>{t("services.transportation_animal_description_2_li_5")}</li>
                        </ol>
                    </div>
                    <div id="AdditionalInformation"><AdditionalInformation /></div>
                </div>
                <div className='fixed__panel' id="FixedPanelMain">
                    <div id="FixedPanel" className="services__fixed__panel">
                        <div onClick={() => navigate("/services/reservation_online")}>
                            {indexService != 1 ?
                                <img src={process.env.REACT_APP_API_URL + "reservation_online.png"} />
                                :
                                <div className='service__select' />}
                            <div>{t("services.reservation_online")}</div>
                        </div>
                        <div onClick={() => navigate("/services/booking_management")}>
                            {indexService != 2 ?
                                <img src={process.env.REACT_APP_API_URL + "booking_management.png"} />
                                :
                                <div className='service__select' />}
                            <div>{t("services.booking_management")}</div>
                        </div>
                        <div onClick={() => navigate("/services/luggage_transportation")}>
                            {indexService != 3 ?
                                <img src={process.env.REACT_APP_API_URL + "luggage_transportation.png"} />
                                :
                                <div className='service__select' />}
                            <div>{t("services.luggage_transportation")}</div>
                        </div>
                        <div onClick={() => navigate("/services/transportation_animals")}>
                            {indexService != 4 ?
                                <img src={process.env.REACT_APP_API_URL + "transportation_animals.png"} />
                                :
                                <div className='service__select' />}
                            <div>{t("services.transportation_animals")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransportationAnimals