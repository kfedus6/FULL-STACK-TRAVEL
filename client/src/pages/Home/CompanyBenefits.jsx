import { t } from 'i18next'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const CompanyBenefits = () => {
    const {language}=useSelector(state=>state.language)
    useEffect(()=>{

    },[language])

    return (
    <>
        <div className='section-home-title'>
            <p className='home__title'>
                <span>
                    {t("home.benefits_company")}
                </span>
            </p>
        </div>
        <div className="list__company__benefits">
            <div className="company__benefits__main">
                <div className='company__benefits__img'>
                    <img src={process.env.REACT_APP_API_URL+"checkMarkes.png"}/>
                </div>
                <div className='company__benefits__name'>
                    {t("home.we_treat_our_work_professionally_name")}
                </div>
                <div className='company__benefits__desctiption'>
                    {t("home.we_treat_our_work_professionally_description")}
                </div>
            </div>
            <div className="company__benefits__main">
                <div className='company__benefits__img'>
                    <img src={process.env.REACT_APP_API_URL+"checkMarkes.png"}/>
                </div>
                <div className='company__benefits__name'>
                    {t("home.work_strictly_according_to_the_schedule_name")}
                </div>
                <div className='company__benefits__desctiption'>
                    {t("home.work_strictly_according_to_the_schedule_description")}
                </div>
            </div>
            <div className="company__benefits__main">
                <div className='company__benefits__img'>
                    <img src={process.env.REACT_APP_API_URL+"checkMarkes.png"}/>
                </div>
                <div className='company__benefits__name'>
                    {t("home.professional_drivers_name")}
                </div>
                <div className='company__benefits__desctiption'>
                    {t("home.professional_drivers_description")}
                </div>
            </div>
            <div className="company__benefits__main">
                <div className='company__benefits__img'>
                    <img src={process.env.REACT_APP_API_URL+"checkMarkes.png"}/>
                </div>
                <div className='company__benefits__name'>
                    {t("home.work_without_intermediaries_name")}
                </div>
                <div className='company__benefits__desctiption'>
                    {t("home.work_without_intermediaries_description")}
                </div>
            </div>
            <div className="company__benefits__main">
                <div className='company__benefits__img'>
                    <img src={process.env.REACT_APP_API_URL+"checkMarkes.png"}/>
                </div>
                <div className='company__benefits__name'>
                    {t("home.have_proven_themselves_well_name")}
                </div>
                <div className='company__benefits__desctiption'>
                    {t("home.have_proven_themselves_well_description")}
                </div>
            </div>
            <div className="company__benefits__main">
                <div className='company__benefits__img'>
                    <img src={process.env.REACT_APP_API_URL+"checkMarkes.png"}/>
                </div>
                <div className='company__benefits__name'>
                    {t("home.professional_managers_name")}
                </div>
                <div className='company__benefits__desctiption'>
                    {t("home.professional_managers_description")}
                </div>
            </div>

        </div>
    </>
  )
}

export default CompanyBenefits