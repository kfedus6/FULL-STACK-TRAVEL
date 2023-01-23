import { Breadcrumbs, Typography } from '@mui/material';
import { t } from 'i18next';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { useAction } from '../../hooks/useAction'

const AboutUs = () => {
    const { aboutUs } = useSelector(state => state.aboutUs);
    const { GetAboutUs } = useAction();
    const { language } = useSelector(state => state.language)
    useEffect(() => {
        if (aboutUs == undefined) {
            GetAboutUs();
        }
    }, []);
    useEffect(() => {

    }, [language])
    function createMarkup(text) { return { __html: text }; };
    return (
        <>
            <div className='bread__crumbs__main'>
                <div className='bredcrumbs-flight'>
                    <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                    <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                    <span className='bredcrumbs-flight-text'>{t("header.fourth_link")}</span>
                </div>
            </div>
            <p className='home__title'>{t("header.fourth_link")}</p>
            <div className="about__us__main">
                {aboutUs != undefined ? <div className='about__us__value' dangerouslySetInnerHTML=
                    {createMarkup(aboutUs.description[language])}></div> : <></>}
            </div>
        </>
    )
}

export default AboutUs

