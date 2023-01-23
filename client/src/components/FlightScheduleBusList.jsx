import React from 'react'
import { useSelector } from 'react-redux'
import { t } from 'i18next'

const FlightScheduleBusList = ({
    flight, is_admin, setScheduleToUA, setScheduleWithUA,
    setScheduleToRU, setScheduleWithRU,
    status, changeStatus, changeSchedule }) => {

    const { language } = useSelector(state => state.language);

    const statusDayHidden = [1, 2, 3, 4, 5, 6, 7]

    return (
        <div className='block-schedule'>
            <div className='schedule-date-with-to'>
                <b>{t('flight.bus_schedule')}</b>
                {flight.schefule.map(item => {
                    if (is_admin) {
                        return (
                            <div key={item.id}>
                                <p>{t("flight.schedule_valid_with")}
                                    <input type="text" placeholder={t('lang.uk')}
                                        className='create-date'
                                        onChange={(e) => setScheduleWithUA(e.target.value)}
                                    />
                                    <input type="text" placeholder={t('lang.ru')}
                                        className='create-date'
                                        onChange={(e) => setScheduleWithRU(e.target.value)}
                                    />
                                    по
                                    <input type="text" placeholder={t('lang.uk')}
                                        className='create-date'
                                        onChange={(e) => setScheduleToUA(e.target.value)}
                                    />
                                    <input type="text" placeholder={t('lang.ru')}
                                        className='create-date'
                                        onChange={(e) => setScheduleToRU(e.target.value)}
                                    />
                                    <button className='change-date' onClick={() => changeSchedule(item.id)}>{t('flight.update')}</button>
                                </p>
                            </div>
                        )
                    } else {
                        return (
                            <span key={item.id}>{t("flight.schedule_valid_with")} <strong>{item.scheduleWith[language]}</strong> по <strong>{item.scheduleTo[language]}.</strong></span>
                        )
                    }
                })}
            </div>
            <div className='block-schedule-table'>
                <div className='schedule-table-day'>
                    {flight.schefule.map(day => {
                        return (
                            <div key={`${day.id}days`} className='table-day' >
                                <div>
                                    <span>{day.monday}</span>
                                </div>
                                <div>
                                    <span>{day.tuesday}</span>
                                </div>
                                <div>
                                    <span>{day.wednesday}</span>
                                </div>
                                <div>
                                    <span>{day.thursday}</span>
                                </div>
                                <div>
                                    <span>{day.friday}</span>
                                </div>
                                <div>
                                    <span>{day.suturday}</span>
                                </div>
                                <div>
                                    <span>{day.sunday[language]}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='table-status'>
                    {statusDayHidden.map(h => {
                        const date = new Date()
                        const month = date.getMonth()
                        const year = date.getFullYear()
                        const newDate = new Date(year, month, 1)
                        const day = newDate.getDay()
                        if (+h + 1 <= +day) {
                            return (
                                <div key={`${h.id}dates`} className='table-day-status-number-admin-hidden'>
                                    <div className='table-day-number-hidden'>
                                    </div>
                                </div>
                            )
                        }
                    })
                    }
                    {status.map((s, id) => {
                        const date = new Date()
                        const month = date.getMonth()
                        const year = date.getFullYear()
                        const newDate = new Date(year, month + 1, 0)
                        const lastDate = newDate.getDate()
                        if (+id < +lastDate) {
                            if (is_admin) {
                                return (
                                    <div key={`${s.id}status`} className='table-day-status-number-admin'>
                                        <div className={s.status === true ? 'table-day-status' : 'table-day-number'}>
                                            <button onClick={() => changeStatus(s.id, s.status)}>
                                                <span>{id + 1}</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={s.id} className='table-day-status-number'>
                                        <div className={s.status === true ? 'table-day-status' : 'table-day-number'}>
                                            <span >{id + 1}</span>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </div>
            <div className='schedule-time-with-to'>
                <span>{t('flight.flight_time_first')}: {flight.timeFlight.split("//")[language]}</span>
                <span>{t('flight.flight_time_second')}: {flight.startTime}</span>
                <span>{t('flight.flight_time_third')}: {flight.finishTime}</span>
            </div>
        </div>
    )
}

export default FlightScheduleBusList;