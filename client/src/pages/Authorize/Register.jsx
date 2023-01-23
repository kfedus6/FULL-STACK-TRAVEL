import { t } from 'i18next'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import TextField from '@mui/material/TextField';
import { GrClose } from 'react-icons/gr';
import { GoogleLogin } from '@react-oauth/google';

const Register = ({ close, setIsRegisterOrLog }) => {
    const { Register } = useAction()
    const [isRegister, setIsRegister] = useState(false);
    const { reply,is_login } = useSelector(state => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isShow, text } = useSelector(state => state.message);
    const { SetShowMessgeFalse, SetShowMessgeTrue, RegisterWithGoogle } = useAction();
    
    const registerWithGoogle=(e)=>{
        RegisterWithGoogle(e.credential);
    }
    useEffect(()=>{
        if(is_login==true){
            close(false);
        }
    },[is_login])
    useEffect(() => {
        if (!isRegister) return;
        switch (reply) {
            case 200: {
                SetShowMessgeTrue(t("authorize.you_have_successfully_registered"));
                setTimeout(() => SetShowMessgeFalse(), 3000);
                close(false);
            };
                break
            case 411: {
                SetShowMessgeTrue(t("authorize.email_is_busy"));
                setTimeout(() => SetShowMessgeFalse(), 3000);
            }
                break;
            default: {
                SetShowMessgeTrue("error");
                setTimeout(() => SetShowMessgeFalse(), 3000);
            }
                break;
        }
    }, [reply]);

    const register = () => {
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
            SetShowMessgeTrue(t("authorize.mail_must_be_genuine"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        if (password.length < 8) {
            SetShowMessgeTrue(t("authorize.password_must_be_longer_than_8_characters"));
            setTimeout(() => SetShowMessgeFalse(), 3000);
            return;
        }
        setIsRegister(true);
        Register("", email, "", password);
    }

    return (
        
        <div className="authorize__register__main register__authorize__register__main">
            <div className="register__left">
                <div className="enter__or__exit">
                    <div className="enter">
                        {t("header.registering")}
                    </div>
                    <div onClick={()=>close(false)} className="exit__register__left">
                        &times;
                    </div>
                </div>
                <div style={{marginTop:"30px"}} className="enter__with__google">
                <div style={{width:"auto"}} className='google__login'>
                        <GoogleLogin
                            onSuccess={CredentialResponce=>registerWithGoogle(CredentialResponce)}
                            onError={(e)=>console.log(e)}
                            />
                    </div>
                </div>
                <div className="athorize__or">
                    {t("authorize.or")}
                </div>
                <div className="login__and__passworf register__login__and__passworf">
                    <div className='email'>
                        <TextField style={{"borderRadius":"20px"}}
                            onChange={(e) => setEmail(e.target.value)}
                            id="demo-helper-text-misaligned-no-helper"
                            label={t("authorize.email")}
                        />
                    </div>
                    <div className='password'>
                        <TextField style={{"borderRadius":"20px"}}
                            onChange={(e) => setPassword(e.target.value)}
                            id="outlined-password-input"
                            label={t("authorize.password")}
                            type="password"
                            autoComplete="current-password"
                        />
                    </div>
                    
                    <div className="btn__authorize register__btn__authorize">
                        <button onClick={(e) => { e.preventDefault(); register();return false; }}>{t("authorize.register")}</button>
                    </div>
                </div>
                <div className="is__account__register__main">
                    <div className="is__account__register">
                        <div>
                            {t("authorize.is_acount")}
                        </div>
                        <div onClick={()=>setIsRegisterOrLog(false)} className='authorize__active'>
                            {t("authorize.log")}
                        </div>                                
                    </div>
                </div>
            </div>
                
            <div className="register__right">
                <div className="register__right__content">
                    <div onClick={()=>close(false)} className="exit__register">
                        &times;
                    </div>
                    <div className="register__list__service">
                        <div className='service__img'>
                            <img src={process.env.REACT_APP_API_URL+"booking_management_blue.png"}/>
                        </div>
                        <div className='register__right__title'>{t("services.booking_management")}</div>
                        <div className='register__right__description'>{t("services.booking_management_description")}</div>
                    </div>
                    <div className="register__list__service two">
                            <img src={process.env.REACT_APP_API_URL+"pay_online.png"}/>
                        <div className='register__right__title'>{t("services.booking_management")}</div>
                        <div className='register__right__description'>{t("services.booking_management_description")}</div>
                    </div>
                </div>  
            </div>
        </div>
            /*<div className="user__name">
                <TextField
                    className='input-material'
                    onChange={(e) => setName(e.target.value)}
                    id="demo-helper-text-misaligned-no-helper"
                    label={t("authorize.name")} margin="normal"
                />
            </div>
            <div className='email'>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    id="demo-helper-text-misaligned-no-helper"
                    label={t("authorize.email")}
                    margin="normal"
                />
            </div>
            <div className='number__phone'>
                <TextField
                    onChange={(e) => setNumberPhone(e.target.value)}
                    id="outlined-basic"
                    label={t("authorize.number_phone")}
                    margin="normal"
                />
            </div>
            <div className='password'>
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-password-input"
                    label={t("authorize.password")}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                />
            </div>
            <div className='password'>
                <TextField
                    onChange={(e) => setPassword2(e.target.value)}
                    id="outlined-password-input"
                    label={t("authorize.return_password")}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                />
            </div>
            <div className="btn__authorize">
                <button onClick={(e) => { e.stopPropagation(); register() }}>{t("authorize.register")}</button>
            </div>*/
    )
}

export default Register