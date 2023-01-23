import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';

import { t } from 'i18next'

const FlightReserve = ({ flight, name, setName, date, setDate,
    phone, setPhone, sumYoung, setSumYoung, setSumOld, sumOld,
    sumOldBack, setSumOldBack, sumYoungBack, setSumYoungBack,
    surename, setSurename, email, setEmail, dateBack, setDateBack,
    reserveTicket }) => {

    const [dropdownCheckBack, setDropdowbCheckBack] = useState(false)
    const [dropdownCheck, setDropdowbCheck] = useState(false)
    const [checked, setChecked] = useState(false);

    const [value, setValue] = useState();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const countOldResult = () => {
        if (sumOld === 1) {
            setSumOld(1)
        } else {
            setSumOld(sumOld - 1)
        }
    }

    const countYoungResult = () => {
        if (sumYoung === 0) {
            setSumYoung(0)
        } else {
            setSumYoung(sumYoung - 1)
        }
    }

    const countOldResultBack = () => {
        if (sumOldBack === 1) {
            setSumOldBack(1)
        } else {
            setSumOldBack(sumOldBack - 1)
        }
    }

    const countYoungResultBack = () => {
        if (sumYoungBack === 0) {
            setSumYoungBack(0)
        } else {
            setSumYoungBack(sumYoungBack - 1)
        }
    }

    const handleChangeDate = (newDate) => {
        setDate(newDate);
    };

    const handleChangeDateBack = (newDate) => {
        setDateBack(newDate);
    };

    return (
        <div className='flight-block-message-reserve'>
            <div className={flight.currentFlight ? 'flight-block-reserve' : 'flight-block-reserve-none'}>
                <div className='flight-header-reserve'>
                    <b>{t('modalbuy.title_first')}</b>
                </div>
                <div className='flight-contact-info'>
                    <span>{t('modalbuy.title_second')}</span>
                    <div className='reserve-input'>
                        <input
                            id='reserve-first'
                            type="text"
                            className='reserve-input-text'
                            placeholder=' '
                            autoComplete="off"
                            value={surename}
                            onChange={(e) => setSurename(e.target.value)}
                        />
                        <label htmlFor='reserve-first' className='reserve-label-text'>{t('modalbuy.surename')}</label>
                    </div>
                    <div className='reserve-input'>
                        <input
                            id='reserve-second'
                            type="text"
                            className='reserve-input-text'
                            placeholder=' '
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor='reserve-second' className='reserve-label-text'>{t('modalbuy.name')}</label>
                    </div>
                    <div className='reserve-input'>
                        <PhoneInput
                            className='react-input-phone'
                            international
                            country="ua"
                            onChange={phone => setPhone({ phone })}
                        />
                    </div>
                    <div className='reserve-input'>
                        <input
                            id='reserve-fourth'
                            type="email"
                            className='reserve-input-text'
                            placeholder=' '
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor='reserve-fourth' className='reserve-label-text'>E-mail</label>
                    </div>
                </div>
                <div className='reserve-details'>
                    <span>{t('modalbuy.modal_details_title')}</span>
                    <div className='reserve-dropdown-free-place'>
                        <div className='reserve-free-place'>
                            <img src={process.env.REACT_APP_API_URL + "users-silver.png"} alt="users" />
                            <span>{flight.countFreePlace} {t('flight.free_place')}</span>
                        </div>
                        <div className='dropdown-passengers'>
                            <div className='dropdown-select-passegers' onClick={() => dropdownCheck ? setDropdowbCheck(false) : setDropdowbCheck(true)}>
                                <input className='dropdown-passegers-input' type="text" id='passegers-first' placeholder=' ' value={dropdownCheck ? `${sumOld} ${t('flight.pass_old')}, ${sumYoung} дитина` : ''} disabled />
                                <label className='dropdown-passegers-text' htmlFor="passegers-first">{t('flight.passegers')}</label>
                                <label className='dropdown-icon-user'>
                                    <img src={process.env.REACT_APP_API_URL + 'users.png'} alt="passegers" />
                                </label>
                            </div>
                            <div className={dropdownCheck ? 'dropdown-list-passegers' : 'dropdown-reserve-none'}>
                                <div className='dropdown-list-item-passegers'>
                                    <div className='dropdown-list-item-passegers-text'>
                                        <span>{t('flight.older_15_years')}</span>
                                    </div>
                                    <div className='dropdown-list-item-passegers-count'>
                                        <div className='dropdown-list-item-passegers-minus-and-plus'>
                                            <img src={process.env.REACT_APP_API_URL + 'minuss.png'} alt="minus" onClick={() => countOldResult()} />
                                        </div>
                                        <div value={sumOld}>{sumOld}</div>
                                        <div className='dropdown-list-item-passegers-minus-and-plus'>
                                            <img src={process.env.REACT_APP_API_URL + 'plus.png'} alt="plus" onClick={() => setSumOld(sumOld + 1)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='dropdown-list-item-passegers'>
                                    <div className='dropdown-list-item-passegers-text'>
                                        <span>{t('flight.younger_14_years')}</span>
                                    </div>
                                    <div className='dropdown-list-item-passegers-count'>
                                        <div className='dropdown-list-item-passegers-minus-and-plus'>
                                            {sumYoung >= 1
                                                ?
                                                <img src={process.env.REACT_APP_API_URL + 'minuss.png'} alt="minus" onClick={() => countYoungResult()} />
                                                :
                                                <img src={process.env.REACT_APP_API_URL + 'minus.png'} alt="minus" onClick={() => countYoungResult()} />
                                            }
                                        </div>
                                        <div value={sumYoung}>{sumYoung}</div>
                                        <div className='dropdown-list-item-passegers-minus-and-plus'>
                                            <img src={process.env.REACT_APP_API_URL + 'plus.png'} alt="plus" onClick={() => setSumYoung(sumYoung + 1)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-input-date'>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={localStorage.getItem('i18nextLng') === 'UA' ? 'uk' : 'ru'}
                        >
                            <DesktopDatePicker
                                inputFormat="DD.MM.YYYY"
                                value={date}
                                onChange={handleChangeDate}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <input autoComplete='off' className='form-input-text-date' id='custom-date-fifth' ref={inputRef} {...inputProps} />
                                        <label className='form-label-date-modal' htmlFor="custom-date-fifth">{t('modalbuy.date_back')}</label>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='reverse-reserve-details'>
                    <span className='reserve-reserve-details-text'>{t('modalbuy.flight_back')}</span>
                    <div className='reverse-checkbox'>
                        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                        <span className='reverse-checkbox-text'>{t('modalbuy.flight_back_title')}</span>
                    </div>
                    <div className={checked ? 'reserve-details' : 'reserve-none'}>
                        <div className='reserve-dropdown-free-place'>
                            <div className='reserve-free-place'>
                                <img src={process.env.REACT_APP_API_URL + "users-silver.png"} alt="users" />
                                <span>{flight.countFreePlace} {t('flight.free_place')}</span>
                            </div>
                            <div className='dropdown-passengers'>
                                <div className='dropdown-select-passegers' onClick={() => dropdownCheckBack ? setDropdowbCheckBack(false) : setDropdowbCheckBack(true)}>
                                    <input className='dropdown-passegers-input' type="text" id='passegers-fifth' placeholder=' ' value={dropdownCheckBack ? `${sumOldBack} ${t('flight.pass_old')}, ${sumYoungBack} дитина` : ''} disabled />
                                    <label className='dropdown-passegers-text' htmlFor="passegers-fifth">{t('flight.passegers')}</label>
                                    <label className='dropdown-icon-user'>
                                        <img src={process.env.REACT_APP_API_URL + 'users.png'} alt="passegers" />
                                    </label>
                                </div>
                                <div className={dropdownCheckBack ? 'dropdown-list-passegers' : 'dropdown-reserve-back-none'}>
                                    <div className='dropdown-list-item-passegers'>
                                        <div className='dropdown-list-item-passegers-text'>
                                            <span>{t('flight.older_15_years')}</span>
                                        </div>
                                        <div className='dropdown-list-item-passegers-count'>
                                            <div className='dropdown-list-item-passegers-minus-and-plus'>
                                                <img src={process.env.REACT_APP_API_URL + 'minuss.png'} alt="minus" onClick={() => countOldResultBack()} />
                                            </div>
                                            <div value={sumOldBack}>{sumOldBack}</div>
                                            <div className='dropdown-list-item-passegers-minus-and-plus'>
                                                <img src={process.env.REACT_APP_API_URL + 'plus.png'} alt="plus" onClick={() => setSumOldBack(sumOldBack + 1)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dropdown-list-item-passegers'>
                                        <div className='dropdown-list-item-passegers-text'>
                                            <span>{t('flight.younger_14_years')}</span>
                                        </div>
                                        <div className='dropdown-list-item-passegers-count'>
                                            <div className='dropdown-list-item-passegers-minus-and-plus'>
                                                {sumYoungBack >= 1
                                                    ?
                                                    <img src={process.env.REACT_APP_API_URL + 'minuss.png'} alt="minus" onClick={() => countYoungResultBack()} />
                                                    :
                                                    <img src={process.env.REACT_APP_API_URL + 'minus.png'} alt="minus" onClick={() => countYoungResultBack()} />
                                                }
                                            </div>
                                            <div value={sumYoungBack}>{sumYoungBack}</div>
                                            <div className='dropdown-list-item-passegers-minus-and-plus'>
                                                <img src={process.env.REACT_APP_API_URL + 'plus.png'} alt="plus" onClick={() => setSumYoungBack(sumYoungBack + 1)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-input-date'>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={localStorage.getItem('i18nextLng') === 'UA' ? 'uk' : 'ru'}
                            >
                                <DesktopDatePicker
                                    inputFormat="DD.MM.YYYY"
                                    value={dateBack}
                                    onChange={handleChangeDateBack}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <input autoComplete='off' className='form-input-text-date' id='custom-date-sixth' ref={inputRef} {...inputProps} />
                                            <label className='form-label-date-modal' htmlFor="custom-date-sixth">{t('modalbuy.date_back')}</label>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div className='reserve-btn'>
                    <span>{(flight.price * sumOld) + (flight.childPrice * sumYoung)} грн</span>
                    <button onClick={reserveTicket}>{t('modalbuy.btn-buy')}</button>
                </div>
            </div>
            <div className='flight-block-message'>
                <div className={flight.currentFlight ? 'flight-info-message-first' : 'flight-message-status'}>
                    <div className='flight-message-icon'>
                        <img src={process.env.REACT_APP_API_URL + 'info-blue.png'} alt='info' />
                    </div>
                    <div className='flight-message-text'>
                        <b>{t('modalbuy.message_title_first')}</b>
                        <span>{t('modalbuy.text_message_first')}.</span>
                    </div>
                </div>
                <div className={flight.currentFlight ? 'flight-info-message-second' : 'flight-message-status'}>
                    <div className='flight-message-icon'>
                        <img src={process.env.REACT_APP_API_URL + 'info-blue.png'} alt='info' />
                    </div>
                    <div className='flight-message-text'>
                        <b>{t('modalbuy.message_title_second')}</b>
                        <span>{t('modalbuy.text_message_second')}.</span>
                    </div>
                </div>
                <div className={flight.currentFlight ? 'flight-message-status' : 'flight-info-message-thrid'}>
                    <div className='flight-message-icon'>
                        <img src={process.env.REACT_APP_API_URL + 'info.png'} alt='info' />
                    </div>
                    <div className='flight-message-text-thrid'>
                        <b>{t('modalbuy.message_title_third')}</b>
                        <span>
                            {t('modalbuy.text_message_third')}:
                            <br />
                            <ul>
                                <li>+38(056)491-23-21</li>
                                <li>+38(044)723-11-71</li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightReserve;