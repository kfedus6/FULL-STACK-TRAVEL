import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useAction } from '../hooks/useAction'
import { NavLink } from 'react-router-dom';
import { VscArrowSmallRight } from 'react-icons/vsc'
import FlightScheduleBusList from './FlightScheduleBusList'
import FlightParams from './FlightParams';
import FlightReserve from './FlightReserve';
import { t } from 'i18next'
import HomeBlog from '../pages/Home/HomeBlog';

const FlightList = ({ flight, is_admin, setScheduleToUA, setScheduleWithUA,
    setScheduleToRU, setScheduleWithRU, status, changeStatus,
    changeSchedule, relinkBlocks, name, setName, date, setDate,
    phone, setPhone, sumYoung, setSumYoung, setSumOld, sumOld,
    sumOldBack, setSumOldBack, sumYoungBack, setSumYoungBack, surename, setSurename,
    email, setEmail, dateBack, setDateBack, reserveTicket,
    setChildPrice, changeFlightChildPrice, relinkBlocksBlog }) => {

    const { language } = useSelector(state => state.language);

    function createMarkup(text) { return { __html: text }; };
    /* 
        const [startPosition, setStartPosition] = useState(flight.startPosition.join("//"));
        const [finishPosition, setFinishPosition] = useState(flight.finishPosition.join("//"));
        const [startDate, setStartDate] = useState(flight.startDate);
        const [finishDate, setFinishDate] = useState(flight.finishDate);
        const [countFreePlace, setCountFreePlace] = useState(flight.countFreePlace);
        const [timeFlight, setTimeFlight] = useState(flight.timeFlight);
        const [price, setPrice] = useState(flight.price)
        const [startTime, setStartTime] = useState(flight.startTime);
        const [finishTime, setFinishTime] = useState(flight.finishTime);
    
        const { fetchUpdateFlight } = useAction();
    
        const changeFlight = () => {
            let formData = new FormData();
            formData.append('id', flight.id);
            formData.append('price', price);
            formData.append('startPosition', startPosition);
            formData.append('finishPosition', finishPosition);
            formData.append('startDate', startDate);
            formData.append('finishDate', finishDate);
            formData.append('startTime', startTime);
            formData.append('finishTime', finishTime);
            formData.append('timeFlight', timeFlight);
            formData.append('countFreePlace', countFreePlace);
            formData.append('limit', 1);
            formData.append('page', 1);
            fetchUpdateFlight(formData);
        } */

    return (
        <div className='container-flight'>
            <div className='block-flight'>
                <div className='block-flight-info-and-reserve'>
                    <div className='block-flight-info'>
                        <div className='bredcrumbs-flight'>
                            <span className='bredcrumbs-flight-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                            <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                            <span className='bredcrumbs-flight-link'><NavLink to="/flightsCategory">{t('flight.search')}</NavLink></span>
                            <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                            <span className='bredcrumbs-flight-text'>{flight.startPosition[language]}</span>
                            <span className='bredcrumbs-flight-right'><VscArrowSmallRight /></span>
                            <span className='bredcrumbs-flight-text'>{flight.finishPosition[language]}</span>
                        </div>
                        <div className='block-flight-header-text'>
                            <div className='flight-title'>
                                <span>Рейс {flight.startPosition[language]}</span>
                                <span style={{ fontSize: '55px' }}><VscArrowSmallRight /></span>
                                <span>{flight.finishPosition[language]}</span>
                            </div>
                            <div className='flight-reverse-and-info'>
                                {flight.currentFlight ?
                                    <div className='flight-reverse'>
                                        <img src={process.env.REACT_APP_API_URL + "reverse.png"} alt="reverse" />
                                        <span>{t("flight.reverse_flight")}</span>
                                    </div>
                                    :
                                    <div className='flight-info'>
                                        <img src={process.env.REACT_APP_API_URL + "info.png"} alt="info" />
                                        <span>{t("flight.info_icon_flight")}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flight-price'>
                            <b>{t('flight.flight_price')}</b>
                            <span>{t('flight.older_15_years')}: {flight.price} грн</span>
                            {is_admin
                                ?
                                <>
                                    <span>{t('flight.flight_children')}:
                                        <input type="text" placeholder={flight.childPrice}
                                            onChange={(e) => setChildPrice(e.target.value)}
                                        />
                                        грн</span>
                                    <button onClick={changeFlightChildPrice}>{t('flight.update')}</button>
                                </>
                                :
                                <span>{t('flight.flight_children')}: {flight.childPrice} грн</span>
                            }

                        </div>
                        <div className='flight-comfort'>
                            <b>{t('flight.conditions_title')}</b>
                            {flight.params.map(status => {
                                return (
                                    <FlightParams key={status.id} status={status} />
                                )
                            })}
                        </div>
                        <FlightScheduleBusList
                            flight={flight}
                            is_admin={is_admin}
                            setScheduleToUA={setScheduleToUA}
                            setScheduleWithUA={setScheduleWithUA}
                            setScheduleToRU={setScheduleToRU}
                            setScheduleWithRU={setScheduleWithRU}
                            status={status}
                            changeStatus={changeStatus}
                            changeSchedule={changeSchedule}
                        />
                        <div className='block-flight-maps'>
                            <div className='flight-maps-street'>
                                <b>Карта маршрута</b>
                                <span>{t("flight.dispatch")}: {flight.streetStartPosition[language]}</span>
                                <span>{t("flight.arrival")}: {flight.streetFinishPosition[language]}</span>
                            </div>
                            <div className='flight-maps'>
                                <iframe src={flight.map} loading="lazy"></iframe>
                            </div>
                        </div>
                        <div className='block-flight-description'>
                            <b>{t('flight.flight_description_title')}</b>
                            <span style={{ wordBreak: 'break-word' }} dangerouslySetInnerHTML={createMarkup(flight.description[language])}></span>
                        </div>
                    </div>
                    <FlightReserve
                        flight={flight}
                        date={date}
                        setDate={setDate}
                        dateBack={dateBack}
                        setDateBack={setDateBack}
                        sumOld={sumOld}
                        setSumOld={setSumOld}
                        sumOldBack={sumOldBack}
                        setSumOldBack={setSumOldBack}
                        sumYoung={sumYoung}
                        setSumYoung={setSumYoung}
                        sumYoungBack={sumYoungBack}
                        setSumYoungBack={setSumYoungBack}
                        name={name}
                        setName={setName}
                        surename={surename}
                        setSurename={setSurename}
                        phone={phone}
                        setPhone={setPhone}
                        email={email}
                        setEmail={setEmail}
                        reserveTicket={reserveTicket}
                    />
                </div>
                <div className='flight-links'>
                    <div>
                        <b>{t("flight.popular")}</b>
                    </div>
                    <div className='flight-links-block'>
                        <div className='flight-link-block'>
                            {relinkBlocks == undefined || relinkBlocks.startPosition.length == 0 ? <></> : <>
                                <b>{t("flight.with")} {flight.startPosition[language]}</b>
                                <div className='flight-items-link'>
                                    {relinkBlocks.startPosition.map(x =>
                                        <div key={x.id} className='flight-item-link'>
                                            <NavLink
                                                to={"/flight/" + flight.startPosition[language] + "-"
                                                    + x.finishPosition.split("//")[language] + "/" + x.id}
                                                key={x.id}>
                                                <div>
                                                    <span>{flight.startPosition[language]}</span>
                                                    <span>{<VscArrowSmallRight />}</span>
                                                    <span>{x.finishPosition.split("//")[language]}</span>
                                                </div>
                                            </NavLink>
                                        </div>)}
                                </div>
                            </>}
                        </div>
                        <div className='flight-link-block'>
                            {relinkBlocks == undefined || relinkBlocks.finishPosition.length == 0 ? <></> : <>
                                <b>{t("flight.to")} {flight.finishPosition[language]}</b>
                                <div className='flight-items-link'>
                                    {relinkBlocks.finishPosition.map(x =>
                                        <div key={x.id} className='flight-item-link'>
                                            <NavLink to={"/flight/" + x.startPosition.split("//")[language] + "-" + flight.startPosition[language]
                                                + "/" + x.id}>
                                                <div>
                                                    <span>{x.startPosition.split("//")[language]}</span>
                                                    <span>{<VscArrowSmallRight />}</span>
                                                    <span>{flight.finishPosition[language]}</span>
                                                </div>
                                            </NavLink>
                                        </div>)}
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
                <div className='flight-blog'>
                    <b>{t('flight.flight_blog')}</b>
                    <div className='flight-blog-items'>
                        {relinkBlocksBlog.map(x => <HomeBlog key={x.id} blog={x} />)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FlightList;
