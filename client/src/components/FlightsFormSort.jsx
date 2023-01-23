import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import { useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import Box from '@mui/material/Box';

const FlightsFormSort = ({ finishDate, setFinishDate, startDate, setStartDate, startPosition, finishPosition, setStartPosition, setFinishPosition, sortFlights, sumOld, setSumOld, sumYoung, setSumYoung, setChangePosition, changePosition, changePositionFun, setInOneDirection, setInTwoDirections, inOneDirection, inTwoDirections, handleChangeInOneDirection, handleChangeInTwoDirections }) => {
    const { t } = useTranslation()

    const [dropdownCheck, setDropdowbCheck] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenFinish, setIsOpenFinish] = useState(false)

    const { SearchCity } = useAction()

    const { language } = useSelector(state => state.language);

    const { searchStartPostion, searchFinishPosition } = useSelector(state => state.flights)

    useEffect(() => {
        SearchCity(startPosition, language, true);
    }, [startPosition, language])

    useEffect(() => {
        SearchCity(finishPosition, language, false);
    }, [finishPosition, language])

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

    const changePos = () => {
        setChangePosition(!changePosition);
        let temp = startPosition;
        setStartPosition(finishPosition);
        setFinishPosition(temp)
    }

    const liStartClickHandler = (e) => {
        setStartPosition(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const liFinishClickHandler = (e) => {
        setFinishPosition(e.target.textContent)
        setIsOpenFinish(!isOpenFinish)
    }

    const handleChangeDateStart = (newDate) => {
        setStartDate(newDate);
    }

    const handleChangeDateFinish = (newDate) => {
        setFinishDate(newDate);
        setInOneDirection(false)
        setInTwoDirections(true)
    }

    return (
        <div className='flights-sort-form'>
            <div className='form-checkboxes'>
                <div>
                    <input type="radio" name='sorting' checked={inOneDirection} onChange={(e) => handleChangeInOneDirection(e.target.value)} />
                    <span>{t('flight.flight_radio')}</span>
                </div>
                <div>
                    <input type="radio" name='sorting' checked={inTwoDirections} onChange={(e) => handleChangeInTwoDirections(e.target.value)} />
                    <span>{t('flight.flight_radio_second')}</span>
                </div>
            </div>
            <div className='form-inputs-button-group'>
                <div className='form-sort-input-group'>
                    <div className='form-input-text'>
                        <input id='form-text' className='position-text'
                            type="text"
                            placeholder=' '
                            autoComplete="off"
                            value={startPosition}
                            onChange={(e) => { setStartPosition(e.target.value) }}
                            onClick={() => setIsOpen(true)}
                        />
                        <label className='label-text' htmlFor='form-text'>{t('flight.whence')}</label>
                        {
                            startPosition && isOpen
                                ?
                                <ul className='autocomplete'>
                                    {searchStartPostion.map((city) => {
                                        return (
                                            <li key={city.title} onClick={liStartClickHandler}>{city.title}</li>
                                        )
                                    })}
                                </ul>
                                :
                                null
                        }
                        <div className='form-swap form-swap-none'>
                            <img src={process.env.REACT_APP_API_URL + 'swap.png'} alt="swap" />
                        </div>
                    </div>
                    <div className='form-swap form-swap-second-none' onClick={changePos}>
                        <img src={process.env.REACT_APP_API_URL + 'swap.png'} alt="swap" />
                    </div>
                    <div className='form-input-text'>
                        <input id='form-text-second' className='position-text'
                            type="text"
                            placeholder=' '
                            autoComplete="off"
                            value={finishPosition}
                            onChange={(e) => { setFinishPosition(e.target.value) }}
                            onClick={() => setIsOpenFinish(true)}
                        />
                        <label className='label-text' htmlFor="form-text-second">{t('flight.whitherto')}</label>
                        {
                            finishPosition && isOpenFinish
                                ?
                                <ul className='autocomplete'>
                                    {searchFinishPosition.map((city) => {
                                        return (
                                            <li key={city.title} onClick={liFinishClickHandler}>{city.title}</li>
                                        )
                                    })}
                                </ul>
                                :
                                null
                        }
                    </div>
                </div>
                <div className='form-sort-input-group'>
                    <div className='form-input-date'>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={localStorage.getItem('i18nextLng') === 'UA' ? 'uk' : 'ru'}
                        >
                            <DesktopDatePicker
                                inputFormat="DD.MM.YYYY"
                                value={startDate}
                                onChange={handleChangeDateStart}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <input autoComplete='off' className='form-input-text-date' id='custom-date-thrid' ref={inputRef} {...inputProps} />
                                        <label className='form-label-date bg' htmlFor="custom-date-thrid">Туди</label>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='form-input-date'>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={localStorage.getItem('i18nextLng') === 'UA' ? 'uk' : 'ru'}
                        >
                            <DesktopDatePicker
                                inputFormat="DD.MM.YYYY"
                                value={finishDate}
                                onChange={handleChangeDateFinish}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <input autoComplete='off' className='form-input-text-date' id='custom-date-fourth' ref={inputRef} {...inputProps} />
                                        <label className='form-label-date bg' htmlFor="custom-date-fourth">Назад</label>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='form-sort-input-group'>
                    <div className='dropdown-passengers'>
                        <div className='dropdown-select-passegers' onClick={() => dropdownCheck ? setDropdowbCheck(false) : setDropdowbCheck(true)}>
                            <input className='dropdown-passegers-input' type="text" id='passegers' placeholder=' ' value={dropdownCheck ? `${sumOld} ${t('flight.pass_old')}, ${sumYoung} дитина` : ''} disabled />
                            <label className='dropdown-passegers-text' htmlFor="passegers">{t('flight.passegers')}</label>
                            <label className='dropdown-icon-user'>
                                <img src={process.env.REACT_APP_API_URL + 'users.png'} alt="passegers" />
                            </label>
                        </div>
                        <div className={dropdownCheck ? 'dropdown-list-passegers' : 'dropdown-none'}>
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
                    <div className='form-button-search'>
                        <button onClick={sortFlights}>{t('flight.search')}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FlightsFormSort;