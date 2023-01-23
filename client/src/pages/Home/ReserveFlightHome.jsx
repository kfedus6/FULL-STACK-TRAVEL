import { t } from 'i18next'
import React from 'react'

const ReserveFlightHome = () => {
  return (
    <div className='reserve__flight__main'>
        <div className='reserve__flight__main__content'>
            <h1>{t("home.how_reserce_fligt_online")}</h1>
            <div className="reserve__flight__instruction">
                <div className="reserve__flight__step">
                    <div className='reserve__flight__number__step'>
                        1
                    </div>
                    <div className='reserve__flight__description__title'>
                        <div className='reserve__flight__title'>
                            {t("home.reserve_flight_title_1")}
                        </div>
                        <div className="reserve__flight__description">
                            {t("home.reserve_flight_description_1")}
                        </div>
                    </div>
                </div>
                <div className="reserve__flight__step">                        
                    <div className='reserve__flight__number__step'>
                        2
                    </div>
                    <div className='reserve__flight__description__title'>
                        <div className='reserve__flight__title'>
                            {t("home.reserve_flight_title_2")}
                        </div>
                        <div className="reserve__flight__description">
                            {t("home.reserve_flight_description_2")}
                        </div>
                    </div>
                </div>
                <div className="reserve__flight__step">    
                    <div className='reserve__flight__number__step'>
                        3
                    </div>
                    <div className='reserve__flight__description__title'>    
                        <div className='reserve__flight__title'>
                            {t("home.reserve_flight_title_3")}
                        </div>
                        <div className="reserve__flight__description">
                            {t("home.reserve_flight_description_3")}
                        </div>
                    </div>
                </div>
                <div className="reserve__flight__step">
                    <div className='reserve__flight__number__step'>
                        4
                    </div>
                    <div className='reserve__flight__description__title'>
                        <div className='reserve__flight__title'>
                            {t("home.reserve_flight_title_4")}
                        </div>
                        <div className="reserve__flight__description">
                            {t("home.reserve_flight_description_4")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReserveFlightHome