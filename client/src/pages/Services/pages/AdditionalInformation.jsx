import { t } from 'i18next';
import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdditionalInformation = () => {
  const {infoCompany}=useSelector(state=>state.infoCompany);
  const {language}=useSelector(state=>state.language);
  useEffect(()=>{

  },[language]);
  return (
    infoCompany==undefined?<div>loading...</div>:
    <div className='additional__information__main'>
      <div>
        {t("services.add_info")}
        <ul>
          {infoCompany.telephone.split(" ").map((x,idx)=><li key={idx}>{x}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default AdditionalInformation