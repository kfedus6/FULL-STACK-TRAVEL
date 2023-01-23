import { Breadcrumbs, Button, ButtonBase, Input, InputAdornment, Typography } from '@mui/material'
import { t } from 'i18next'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSelector } from 'react-redux'
import { useAction } from '../../hooks/useAction'

const EditAccount = () => {
    const [isEditContactData, setIsEditContactData] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [isChangePass, setIsChangePass] = useState("false");
    const { is_admin, is_login, user, reply, telephone, isPasswordNull } = useSelector(state => state.user);
    const { UpdateInfoForUser, GetPhone, IsPasswordNull } = useAction()
    const EditInfoUser = () => {

        UpdateInfoForUser(name, surname, phone);
    }
    useEffect(() => {
        IsPasswordNull();
    }, [])
    useEffect(() => {
        GetPhone();
    }, [user])
    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setSurname(user.surname);
        setPhone(telephone);
    }, [user, isEditContactData, isEditEmail, telephone]);
    const { SetShowMessgeFalse, SetShowMessgeTrue, getUserHistory, fetchGetFlight,
        EditEmail } = useAction()
    const { IsAuthorize, ChangePassword } = useAction();
    const change_password = () => {
        if (newPassword != newPassword2) {
            SetShowMessgeTrue(t("authorize.passwords_do_not_match"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        if (newPassword.length < 8) {
            SetShowMessgeTrue(t("authorize.password_must_be_longer_than_8_characters"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        setIsChangePass(true);
        ChangePassword(oldPassword, newPassword, user.id);
        setOldPassword("")
        setNewPassword("")
        setNewPassword2("")
    }
    const UpdateEmail = () => {
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
            SetShowMessgeTrue(t("authorize.mail_must_be_genuine"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        EditEmail(email);
        setEmail("");
    }
    return (
        <div className='container-account-edit'>
            <div className='block-account-edit'>
                <div className='bread-crumbs-main'>
                    <div className='bredcrumbs-flight'>
                        <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                        <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                        <span className='bredcrumbs-flight-services-link'><NavLink to="/account">{t("account.personal_office")}</NavLink></span>
                        <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                        <span className='bredcrumbs-flight-text'>{t("account.setting_profile")}</span>
                    </div>
                </div>
                <div className="edit__account__main">
                    <div className="edit__account__content__main">
                        <div className="adit__account__title">
                            {t("account.my_profile")}
                        </div>
                        <div className="edit__account__content">
                            <div className="contact__data">
                                <div className="edit__account__description__title">
                                    {t("account.contact_data")}
                                </div>
                                <div className="text__edit__or__contact__data">
                                    {!isEditContactData ?
                                        <>
                                            <div onClick={() => setIsEditContactData(true)} className='text__edit'>
                                                {t("account.edit")}
                                            </div>
                                            <div className="edit__account__mini__title">
                                                {t("account.surname")}
                                            </div>
                                            <div className="edit__account__description">
                                                {user.surname == "" ? t("account.no_specefied") : user.surname}
                                            </div>
                                            <div className="edit__account__mini__title">
                                                {t("account.name")}
                                            </div>
                                            <div className="edit__account__description">
                                                {user.name == "" ? t("account.no_specefied") : user.name}
                                            </div>
                                            <div className="edit__account__mini__title">
                                                Телефон
                                            </div>
                                            <div className="edit__account__description">
                                                {telephone == "" ? t("account.no_specefied") : telephone}
                                            </div>
                                        </>
                                        :
                                        <div className='edit__contact__data'>
                                            <div className='input__name__or__surname'>
                                                <TextField
                                                    value={surname}
                                                    id="demo-helper-text-misaligned-no-helper"
                                                    onChange={(e) => setSurname(e.target.value)}
                                                    label={t("account.surname")} />
                                            </div>
                                            <br />
                                            <div className='input__name__or__surname'>
                                                <TextField
                                                    value={name}
                                                    id="demo-helper-text-misaligned-no-helper"
                                                    onChange={(e) => setName(e.target.value)}
                                                    label={t("account.name")} />
                                            </div>
                                            <br />
                                            <div>
                                                <PhoneInput
                                                    international
                                                    country="ua"
                                                    value={phone}
                                                    onChange={e => setPhone(e)} />
                                            </div>
                                            <br />
                                            <div className="buttons__cansel__and__save">
                                                <div className='button__cansel'>
                                                    <button onClick={() => setIsEditContactData(false)}>{t("account.cansel")}</button>
                                                </div>
                                                <div className="button__save">
                                                    <button onClick={() => { EditInfoUser(); setIsEditContactData(false) }}>{t("account.save")}</button>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="setting__accout">
                                <div className="edit__account__description__title">
                                    {t("account.setting_profile")}
                                </div>
                                <div className="edit__account__email">
                                    <div className="edit__account__mini__title">
                                        E-mail
                                    </div>
                                    {!isEditEmail ?
                                        <>
                                            <div className="edit__account__description">
                                                {user.email}
                                            </div>
                                            <div onClick={() => setIsEditEmail(true)} className='text__edit'>
                                                {t("account.change_email")}
                                            </div>
                                        </>
                                        :
                                        <>
                                            <TextField
                                                value={email}
                                                id="demo-helper-text-misaligned-no-helper"
                                                onChange={(e) => setEmail(e.target.value)}
                                                label="E-mail" />
                                            <div className="buttons__cansel__and__save">
                                                <div className='button__cansel'>
                                                    <button onClick={() => setIsEditEmail(false)}>{t("account.cansel")}</button>
                                                </div>
                                                <div className="button__save">
                                                    <button onClick={() => { UpdateEmail(); setIsEditEmail(false) }}>{t("account.save")}</button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="edit__account__mini__title">
                                    {t("account.password")}
                                </div>
                                {!isEditPassword ?
                                    <div onClick={() => setIsEditPassword(true)} className='text__edit'>
                                        {isPasswordNull ? t("account.create_password") : t("account.change_password")}
                                    </div>
                                    :
                                    <div className='account__edit__change__password'>
                                        {isPasswordNull ? <></> : <div>
                                            <TextField
                                                onChange={e => setOldPassword(e.target.value)}
                                                id="outlined-password-input"
                                                label={t("account.old_password")}
                                                type="password"
                                                autoComplete="current-password"
                                                value={oldPassword}
                                            />
                                        </div>}
                                        <div>
                                            <TextField
                                                onChange={e => setNewPassword(e.target.value)}
                                                id="outlined-password-input"
                                                label={t("account.new_password")}
                                                type="password"
                                                autoComplete="current-password"
                                                value={newPassword}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                onChange={e => setNewPassword2(e.target.value)}
                                                id="outlined-password-input"
                                                label={t("account.new_password")}
                                                type="password"
                                                autoComplete="current-password"
                                                value={newPassword2}
                                            />
                                        </div>
                                        <div className="buttons__cansel__and__save">
                                            <div className='button__cansel'>
                                                <button onClick={() => setIsEditPassword(false)}>{t("account.cansel")}</button>
                                            </div>
                                            <div className="button__save">
                                                <button onClick={() => { change_password(); setIsEditPassword(false) }}>{t("account.save")}</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="edit__account__message">
                        <div className="edit__account__message__content">
                            <div className="edit__account__text">
                                <div className='flight-message-icon'>
                                    <img src={process.env.REACT_APP_API_URL + 'info-blue.png'} alt='info' />
                                </div>
                                <div className="edit__account__message__title">
                                    {t("account.date_editing")}
                                    <div className="edit__account__descrition">
                                        {t("account.date_editing_descritpion")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAccount
/* 
<div className='edit__contact__data'>
    <div className='input__name__or__surname'>
        <TextField
            value={surname}
            id="demo-helper-text-misaligned-no-helper"
            onChange={(e)=>setSurname(e.target.value)}
            label={t("account.surname")}/>
    </div>
    <br/>
    <div className='input__name__or__surname'>
        <TextField
            value={name}
            id="demo-helper-text-misaligned-no-helper"
            onChange={(e)=>setName(e.target.value)}
            label={t("account.name")}/>
    </div>
                                */