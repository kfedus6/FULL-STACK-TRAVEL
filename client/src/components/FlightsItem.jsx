import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FlightsItem = ({ item, sumOld, sumYoung, deleteFlight, limit, page, openModal, changeCurrentFlight }) => {
    const { t } = useTranslation()

    const [sum, setSum] = useState(0)

    const { user } = useSelector(state => state)

    const { language } = useSelector(state => state.language);

    useEffect(() => {
        let sum = +sumOld + +sumYoung

        if (sumOld === 1) {
            setSum(item.price)
        } else {
            return setSum(item.price * +sum)
        }

        if (sumYoung === 0) {
            setSum(item.price)
        } else {
            return setSum(item.price * +sum)
        }

    }, [sumOld, sumYoung])

    return (
        <div className='item-flight'>
            <div className='item-blocks'>
                <div className='item-info-group' >
                    <div className='item-block-position'>
                        <div className='item-position'>
                            <div className='item-street-start-finish'>
                                <div>
                                    <img src={process.env.REACT_APP_API_URL + item.flagStart} alt="flag" />
                                    <span>{item.startPosition[language]}</span>
                                </div>
                                <span>{item.streetStartPosition[language]}</span>
                            </div>
                            <div className='item-time-date'>
                                <span>{item.startTime}</span>
                                <span>{item.startDate}</span>
                            </div>
                        </div>
                        <div className='item-position'>
                            <div className='item-street-start-finish'>
                                <div>
                                    <img src={process.env.REACT_APP_API_URL + item.flagFinish} alt="flag" />
                                    <span>{item.finishPosition[language]}</span>
                                </div>
                                <span>{item.streetFinishPosition[language]}</span>
                            </div>
                            <div className='item-time-date'>
                                <span>{item.finishTime}</span>
                                <span>{item.finishDate}</span>
                            </div>
                        </div>
                        <div className='item-block-btn-price'>
                            <span>{(item.price * sumOld) + (item.childPrice * sumYoung)} грн</span>
                            {
                                item.currentFlight ?
                                    <button className='item-button-active' onClick={() => openModal(item.id)}>
                                        {t('modalbuy.btn-buy')}
                                    </button>
                                    :
                                    <button className='item-button-disabled'>
                                        {t('modalbuy.btn-buy')}
                                    </button>
                            }
                        </div>
                        <div className='item-btn-info-flight item-btn-info-flight-none'>
                            <NavLink to={`/flight/${item.startPosition[language]}-${item.finishPosition[language]}/${item.id}`}>{t('flight.info_flight')}</NavLink>
                        </div>
                    </div>
                </div>
                <div className='item-block-info'>
                    <div className='item-block-info-flight'>
                        <div className='item-block-reverse-free-place'>
                            {
                                item.currentFlight ?
                                    <div className='item-info-true'>
                                        <img src={process.env.REACT_APP_API_URL + "reverse.png"} alt="reverse" />
                                        <span>{t("flight.reverse_flight")}</span>
                                    </div>
                                    :
                                    <div className='item-info-false'>
                                        <img src={process.env.REACT_APP_API_URL + "info.png"} alt="info" />
                                        <span>{t("flight.info_icon_flight")}</span>
                                    </div>
                            }
                            <div>
                                <img src={process.env.REACT_APP_API_URL + "users-silver.png"} alt="users" />
                                <span>{item.countFreePlace} {t('flight.free_place')}</span>
                            </div>
                        </div>
                        <div className='item-btn-info-flight item-btn-info-flight-none-second'>
                            <NavLink to={`/flight/${item.startPosition[language]}-${item.finishPosition[language]}/${item.id}`}>{t('flight.info_flight')}</NavLink>
                        </div>
                    </div>
                </div>
                {user.is_admin
                    ?
                    <div className='flight-block-update-admin'>
                        <div className='flight-block-update-admin-btn'>
                            <div className='flight-block-update-admin-btns'>
                                <button onClick={() => changeCurrentFlight(item.id, item.currentFlight)}>{item.currentFlight ? 'Не актуальний' : 'Aктуальний'}</button>
                                <NavLink to={`/flightUpdate/${item.id}/${limit}/${page}`}>
                                    <button>{t('flight.update')}</button>
                                </NavLink>
                                <button onClick={() => deleteFlight(item.id)}>{t('flight.delete')}</button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div >
    )
}

export default FlightsItem;