import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTranslation } from 'react-i18next';

const FlightUpdate = () => {

    const { t } = useTranslation()

    const { id, limit, page } = useParams()

    const { fetchGetFlight, fetchUpdateFlight, fetchDeleteFlight, fetchPutSatusFlight } = useAction()

    const { flight } = useSelector(state => state.flights)

    const navigate = useNavigate()

    const [newStartPosition, setNewStartPosition] = useState('')
    const [newFinishPosition, setNewFinishPosition] = useState('')
    const [newStreetStartPosition, setNewStreetStartPosition] = useState('')
    const [newStreetFinishPosition, setNewStreetFinishPosition] = useState('')
    const [newStartUpdateDate, setNewStartUpdateDate] = useState('')
    const [newFinishUpdateDate, setNewFinishUpdateDate] = useState('')
    const [newStartTime, setNewStartTime] = useState('')
    const [newFinishTime, setNewFinishTime] = useState('')
    const [newCountFreePlace, setNewCaountFreePlace] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newMap, setNewMap] = useState('')

    useEffect(() => {
        fetchGetFlight(id)
    }, [])

    const changeFlight = () => {

        let newStartDate = newStartUpdateDate.split('-')
        newStartDate = `${newStartDate[2]}.${newStartDate[1]}.${newStartDate[0]}`
        let newFinishDate = newFinishUpdateDate.split('-')
        newFinishDate = `${newFinishDate[2]}.${newFinishDate[1]}.${newFinishDate[0]}`

        let formData = new FormData();
        formData.append('id', id);
        formData.append('price', newPrice == "" ? flight.price : newPrice);
        formData.append('startPosition', newStartPosition == "" ? flight.startPosition.join("//") : newStartPosition);
        formData.append('finishPosition', newFinishPosition == "" ? flight.finishPosition.join("//") : newFinishPosition);
        formData.append('streetStartPosition', newStreetStartPosition == "" ? flight.streetStartPosition.join("//") : newStreetStartPosition);
        formData.append('streetFinishPosition', newStreetFinishPosition == "" ? flight.streetFinishPosition.join("//") : newStreetFinishPosition);
        formData.append('startDate', newStartDate == "" ? flight.startDate : newStartDate);
        formData.append('finishDate', newFinishDate == "" ? flight.finishDate : newFinishDate);
        formData.append('startTime', newStartTime == "" ? flight.startTime : newStartTime);
        formData.append('finishTime', newFinishTime == "" ? flight.finishTime : newFinishTime);
        formData.append('countFreePlace', newCountFreePlace == "" ? flight.countFreePlace : newCountFreePlace);
        formData.append('maps', newMap == '' ? flight.map : newMap)
        fetchUpdateFlight(formData)
        navigate(-1)
    }

    const deleteFlight = () => {
        fetchDeleteFlight(id)
        navigate(-1)
    }

    const changeCurrentFlight = () => {
        let currentFlight = true
        if (flight.currentFlight === true) {
            currentFlight = false
            fetchPutSatusFlight(id, currentFlight)
        } else {
            currentFlight = true
            fetchPutSatusFlight(id, currentFlight, limit, page)
        }
        navigate(-1)
    }

    return (
        <div className='flight-update-admin'>
            <div className='flight-blocks-update-admin'>
                <div className='flight-block-update-start-finish-admin'>
                    <div className='flight-update-start-finish-admin'>
                        <div className='flight-update-input-start-finish-admin'>
                            <p>Змінити місто виїзду:</p>
                            <span>Приклад: <b>Львів//Львов</b></span>
                            <input type="text"
                                placeholder='Львів//Львов'
                                value={newStartPosition}
                                onChange={(e) => setNewStartPosition(e.target.value)}
                            />
                        </div>
                        <div className='flight-update-input-start-finish-admin'>
                            <p>Змінити вулиця посадки:</p>
                            <span>Приклад: <b>Українська//Російська</b></span>
                            <input type="text"
                                placeholder='Українська//Російська'
                                value={newStreetStartPosition}
                                onChange={(e) => setNewStreetStartPosition(e.target.value)}
                            />
                        </div>
                        <div className='flight-update-date-time-admin'>
                            <p>Змінити дату відправлення:</p>
                            <input type="date"
                                value={newStartUpdateDate}
                                onChange={(e) => setNewStartUpdateDate(e.target.value)}
                            />
                        </div>
                        <div className='flight-update-date-time-admin'>
                            <p>Змінити годину виїзду:</p>
                            <input type="time"
                                value={newStartTime}
                                onChange={(e) => setNewStartTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flight-update-start-finish-admin'>
                        <div className='flight-update-input-start-finish-admin'>
                            <p>Змінити місто приїзду:</p>
                            <span>Приклад: <b>Київ//Киев</b></span>
                            <input type="text"
                                placeholder='Київ//Киев'
                                value={newFinishPosition}
                                onChange={(e) => setNewFinishPosition(e.target.value)}
                            />
                        </div>
                        <div className='flight-update-input-start-finish-admin'>
                            <p>Змінити вулиця висадки:</p>
                            <span>Приклад: <b>Українська//Російська</b></span>
                            <input type="text"
                                placeholder='Українська//Російська'
                                value={newStreetFinishPosition}
                                onChange={(e) => setNewStreetFinishPosition(e.target.value)}
                            />
                        </div>
                        <div className='flight-update-date-time-admin'>
                            <p>Змінити дату прибуття:</p>
                            <input type="date"
                                value={newFinishUpdateDate}
                                onChange={(e) => setNewFinishUpdateDate(e.target.value)}
                            />
                        </div>
                        <div className='flight-update-date-time-admin'>
                            <p>Змінити годинуну приїзду:</p>
                            <input type="time"
                                value={newFinishTime}
                                onChange={(e) => setNewFinishTime(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flight-update-maps-palce-price-admin'>
                        <p>Змінити силку на карту:</p>
                        <input type="text"
                            placeholder='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d2617240.3241472957!2d25.011163846924628!3d50.163030132931446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x473add7c09109a57%3A0x4223c517012378e2!2z0JvRjNCy0L7Qsiwg0JvRjNCy0L7QstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!3m2!1d49.839683!2d24.029716999999998!4m5!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNC10LIsIDAyMDAw!3m2!1d50.4501!2d30.5234!5e0!3m2!1sru!2sua!4v1668425414479!5m2!1sru!2sua'
                            value={newMap}
                            onChange={(e) => setNewMap(e.target.value)}
                        />
                    </div>
                    <div className='flight-update-maps-palce-price-admin'>
                        <p>Змінити кількість вільних місць:</p>
                        <input type="text"
                            placeholder='25'
                            value={newCountFreePlace}
                            onChange={(e) => setNewCaountFreePlace(e.target.value)}
                        />
                    </div>
                    <div className='flight-update-maps-palce-price-admin'>
                        <p>Змінити ціну квитка в грн:</p>
                        <input type="text"
                            placeholder='3100'
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flight-block-update-admin-btn'>
                    <div className='flight-update-change-delete-admin'>
                        <button onClick={changeCurrentFlight} >{flight.currentFlight ? 'Не актуальний' : 'Aктуальний'}</button>
                        <button onClick={(changeFlight)}>{t('flight.update')}</button>
                        <button onClick={deleteFlight}>{t('flight.delete')}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FlightUpdate;