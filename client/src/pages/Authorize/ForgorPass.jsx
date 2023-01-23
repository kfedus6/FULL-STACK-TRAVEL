import { TextField } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAction } from '../../hooks/useAction'

const ForgorPass = ({close, setIsRegister,setIsShowForgotPass}) => {
  const [email,setEmail]=useState("")
  const {reply}=useSelector(state=>state.user);
  const {SetShowMessgeTrueWithTitle,SetShowMessgeTrue}=useAction();
  useEffect(()=>{
    if(reply==1){
      SetShowMessgeTrueWithTitle(t("authorize.check_email_description"),t("authorize.check_email"));  
    }else if(reply==-1){
      SetShowMessgeTrue(t("authorize.invalid_email"));
    }
  },[reply]);
  const {ForgotPassword}=useAction();
  return (
    <div className='log__main register__main'>
      <div className="enter__or__exit__fotgot__pass">
        <div onClick={()=>close(false)} className="exit">
            &times;
        </div>
        <div className="enter">
            {t("authorize.restore_pass")}
        </div>
      </div>
      <div className="fotgot__pass__description">
        {t("authorize.forgot_pass_desctiption")}
      </div>
      <div className='email'>
        <TextField style={{"borderRadius":"20px"}}
            onChange={(e) => setEmail(e.target.value)}
            id="demo-helper-text-misaligned-no-helper"
            label={t("authorize.email")}
        />
      </div>
      <div className="btn__authorize btn__authorize__forgot__pass">
          <button onClick={(e) => { e.preventDefault(); ForgotPassword(email); return false; }}>{t("authorize.confirm")}</button>
      </div>
      <div className="fotgor__pass__or__register">
        <div className="forgot__pass">
          <div>
              {t("authorize.remember_pas")}
          </div>
          <div onClick={()=>{setIsRegister(false);setIsShowForgotPass(false)}} className='authorize__active'>
              {t("authorize.enter")}
          </div>                                
        </div>
        <div className="no__register">
            <div>
                {t("authorize.no_register")}
            </div>
            <div onClick={()=>{setIsShowForgotPass(false);setIsRegister(true)}} className='authorize__active'>
                {t("authorize.register")}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ForgorPass