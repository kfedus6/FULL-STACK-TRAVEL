import { t } from 'i18next'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useAction } from '../../hooks/useAction';
import TextField from '@mui/material/TextField';
import { IoClose, IoLockClosed } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr';
import { GoogleLogin } from '@react-oauth/google';

const Log = ({ close, setIsForgorPass, setIsRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLog, setIsLog] = useState(false);
    const { reply, is_login } = useSelector(state => state.user);
    const { Authorize, SetShowMessgeFalse, SetShowMessgeTrue,LogWithGoogle } = useAction()
    const logWithGoogle=(e)=>{
        LogWithGoogle(e.credential);
    }
    const log = () => {
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regPass = /drop|\(|delete|;/;
        if (!regEmail.test(email)) {
            SetShowMessgeTrue(t("authorize.mail_must_be_genuine"));
            setTimeout(()=>SetShowMessgeFalse(),3000);
            return;
        }
        if (regPass.test(password)) {
            SetShowMessgeTrue(t("authorize.invalid_pass"));
            setTimeout(()=>SetShowMessgeFalse(),3000);
            return;
        }
        if (password.length < 8) {
            SetShowMessgeTrue(t("authorize.invalid_pass"));
            setTimeout(()=>SetShowMessgeFalse(),3000);
            return;
        }
        setIsLog(true);
        Authorize(email, password);
    }
    useEffect(() => {
        if (is_login) close(false);
    }, [is_login])
    useEffect(() => {
        if (!isLog) return;
        switch (reply) {
            case 200: close(false);
                break;
            case 415:{ 
                SetShowMessgeTrue(t("authorize.invalid_email"));
                setTimeout(()=>SetShowMessgeFalse(),3000);
            }
                break;
            default: {
                SetShowMessgeTrue("error");
                setTimeout(()=>SetShowMessgeFalse(),3000);
            }
            case 416: {
                SetShowMessgeTrue(t("authorize.invalid_pass"));
                setTimeout(()=>SetShowMessgeFalse(),3000);
            }
        }
    }, [reply]);
    return (
        <form>
            <div className="log__main register__main">
                <div className="enter__or__exit">
                    <div className="enter">
                        {t("authorize.enter")}
                    </div>
                    <div onClick={()=>close(false)} className="exit">
                        &times;
                    </div>
                </div>
                <div className="enter__with__google__or__with__login__and__password">
                    <div className="enter__with__google">
                        <div style={{width:"auto"}} className='google__login'>
                            <GoogleLogin
                                onSuccess={CredentialResponce=>logWithGoogle(CredentialResponce)}
                                onError={(e)=>console.log(e)}
                                />
                        </div>
                    </div>
                    <div className="athorize__or">
                        {t("authorize.or")}
                    </div>
                    <div className="login__and__passworf">
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
                        <div className="fotgor__pass__or__register">
                            <div className="forgot__pass">
                                <div>
                                    {t("authorize.forgot_pass")}
                                </div>
                                <div onClick={()=>setIsForgorPass(true)} className='authorize__active'>
                                    {t("authorize.restore")}
                                </div>                                
                            </div>
                            <div className="no__register">
                                <div>
                                    {t("authorize.no_register")}
                                </div>
                                <div onClick={()=>setIsRegister(true)} className='authorize__active'>
                                    {t("authorize.register")}
                                </div>
                            </div>
                        </div>
                        <div className="btn__authorize">
                            <button onClick={(e) => { e.preventDefault(); log(); return false; }}>{t("authorize.log")}</button>
                        </div>
                    </div>
                </div>
                {/*
                <div className='email'>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        id="demo-helper-text-misaligned-no-helper"
                        label={t("authorize.email")}
                    />
                </div>
                <div className='password'>
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        id="outlined-password-input"
                        label={t("authorize.password")}
                        type="password"
                        autoComplete="current-password"
                    />
                </div>
                <div className="btn__authorize">
                    <button onClick={(e) => { e.preventDefault(); log(); return false; }}>{t("authorize.log")}</button>
                </div>*/}
            </div>
        
        </form>
    )
}

export default Log