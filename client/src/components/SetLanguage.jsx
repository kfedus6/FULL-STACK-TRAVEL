import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAction } from '../hooks/useAction'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SetLanguage = () => {
    const [dropdownCheck, setDropdowbCheck] = useState(false)

    const { t, i18n } = useTranslation()
    const { setLanguage } = useAction();

    const changeLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang)
    }

    const language = () => {
        const languageLetters = localStorage.getItem('i18nextLng');
        if (languageLetters) {
            return languageLetters
        }
        return 'UA'
    }

    const changeBoolenLang = () => {
        if (dropdownCheck === false) {
            setDropdowbCheck(true)
        } else {
            setDropdowbCheck(false)
        }
    }

    return (
        <>
            {/*  <FormControl size="small" >
                <Select
                    value={language()}
                    onChange={(event) => changeLanguage(event)}
                    displayEmpty
                >
                    <MenuItem value='UA'>
                        <img className="icon-lang" src={process.env.REACT_APP_API_URL + 'UA.png'} alt="UK" />
                        <a className='title-lang'>{t('lang.uk')}</a>
                    </MenuItem>
                    <MenuItem value='RU'>
                        <img className="icon-lang" src={process.env.REACT_APP_API_URL + 'RU.png'} alt="RU" />
                        <a className='title-lang'>{t('lang.ru')}</a>
                    </MenuItem>
                </Select>
            </FormControl> */}
            <div className='dropdown-lang'>
                <div className='dropdown-select-block' onClick={changeBoolenLang}>
                    {language() === 'UA'
                        ?
                        <img className="icon-lang" src={process.env.REACT_APP_API_URL + 'UA.png'} alt="UK"></img>
                        :
                        <img className="icon-lang" src={process.env.REACT_APP_API_URL + 'RU.png'} alt="RU"></img>
                    }
                    <div className='title-up-down'>
                        {language() === 'UA'
                            ?
                            <>
                                <a className='title-lang'>{t('lang.uk')}</a>
                                <img className='dropdown-up' src={process.env.REACT_APP_API_URL + 'chevron-down.png'} alt="up"></img>
                            </>
                            :
                            <>
                                <a className='title-lang'>{t('lang.ru')}</a>
                                <img className='dropdown-up' src={process.env.REACT_APP_API_URL + 'chevron-down.png'} alt="up"></img>
                            </>
                        }
                    </div>
                </div>

                <div className={dropdownCheck ? 'dropdown-list-block' : 'dropdown-none'}>
                    <div className='dropdown-list-lang'>
                        <div onClick={() => setDropdowbCheck(false)}>
                            <div onClick={() => changeLanguage('UA')}>
                                <img className="icon-lang" src={process.env.REACT_APP_API_URL + 'UA.png'} alt="UK"></img>
                                <a className='title-lang'>{t('lang.uk')}</a>
                            </div>
                        </div>
                        <div onClick={() => setDropdowbCheck(false)}>
                            <div onClick={() => changeLanguage('RU')}>
                                <img className="icon-lang" src={process.env.REACT_APP_API_URL + 'RU.png'} alt="RU"></img>
                                <a className='title-lang'>{t('lang.ru')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetLanguage