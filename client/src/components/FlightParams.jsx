import React from 'react'
import { t } from 'i18next'

const FlightParams = ({ status }) => {
    return (
        <div className='items-comfort'>
            <div className={status.isMultimedia ? 'item-comfort' : 'comfort-status'}>
                <img src={process.env.REACT_APP_API_URL + "multimedia.png"} />
                <span>{t('flight.conditions_fourth')}</span>
            </div>
            <div className={status.isWifi ? 'item-comfort' : 'comfort-status'}>
                <img src={process.env.REACT_APP_API_URL + "wifi.png"} />
                <span>Wi-Fi</span>
            </div>
            <div className={status.is220V ? 'item-comfort' : 'comfort-status'}>
                <img src={process.env.REACT_APP_API_URL + "220v.png"} />
                <span>{t('flight.conditions_first')}</span>
            </div>
            <div className={status.isAirConditioning ? 'item-comfort' : 'comfort-status'}>
                <img src={process.env.REACT_APP_API_URL + "air_conditioner.png"} />
                <span>{t('flight.conditions_second')}</span>
            </div>
            <div className={status.isWC ? 'item-comfort' : 'comfort-status'}>
                <img src={process.env.REACT_APP_API_URL + "toilet.png"} />
                <span>{t('flight.conditions_thrid')}</span>
            </div>
        </div>
    )
}

export default FlightParams;