import { TextField } from '@mui/material';
import { t } from 'i18next';
import React, { useState } from 'react'
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import Error from "./../Error/Error";

const ForgorPass = () => {
    const { key } = useParams();
    const { reply, isSecretKeyTrue } = useSelector(state => state.user);
    const { IsSecretKeyTrue, SetShowMessgeTrue, SetShowMessgeFalse, ForgorPassTrue } = useAction();
    useEffect(() => {
        IsSecretKeyTrue(key);
    }, []);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const changePass = () => {
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (password.length < 8) {
            SetShowMessgeTrue(t("authorize.password_must_be_longer_than_8_characters"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        if (password != password2) {
            SetShowMessgeTrue(t("authorize.passwords_do_not_match"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        ForgorPassTrue(key, password);
    }
    useLayoutEffect(() => {
        if (reply != 0) {
            SetShowMessgeTrue(t("message.successfully_added"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            navigate("/");
        }
    }, [reply]);
    const navigate = useNavigate();
    return (
        isSecretKeyTrue == null ? <div>loading...</div> : isSecretKeyTrue == true ?
            <div className='forgot__pass__main'>
                <div className='form-input-text'>
                    <input id='form-text-second' className='position-text'
                        type="password"
                        placeholder=' '
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className='label-text' htmlFor="form-text-second">{t("authorize.password")}</label>
                </div>
                <div className='form-input-text'>
                    <input id='form-text-second' className='position-text'
                        type="password"
                        placeholder=' '
                        autoComplete="off"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <label className='label-text' htmlFor="form-text-second">{t("authorize.password")}</label>
                </div>
                <div className='form-button-search'>
                    <button onClick={(e) => { e.preventDefault(); changePass(); return false; }}>{t("authorize.confirm")}</button>
                </div>
            </div> : <Error />
    )
}

export default ForgorPass