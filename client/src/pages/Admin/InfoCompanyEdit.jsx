import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAction } from '../../hooks/useAction';

import '../Admin/admin.css'

const InfoCompanyEdit = () => {
    const { infoCompany } = useSelector(state => state.infoCompany);
    const { SetInfoCompany } = useAction();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [addressUA, setAddressUA] = useState("");
    const [addressRU, setAddressRU] = useState("");
    const [telephone, setTelephone] = useState("");
    const [openingHoursUA, setOpeningHoursUA] = useState("");
    const [openingHoursRU, setOpeningHoursRU] = useState("");
    const [viber,setViber]=useState("");
    const [telegram,setTelegram]=useState("");
    useEffect(() => {
        if (infoCompany != undefined) {
            setName(infoCompany.name);
            setEmail(infoCompany.email);
            setAddressUA(infoCompany.address[0]);
            setAddressRU(infoCompany.address[1]);
            setTelephone(infoCompany.telephone);
            setOpeningHoursUA(infoCompany.openingHours[0]);
            setOpeningHoursRU(infoCompany.openingHours[1]);
            setTelegram(infoCompany.telegram);
            setViber(infoCompany.viber);
        }
    }, [infoCompany])
    console.log(infoCompany)
    return (
        <div className='admin-panel-info-company'>
            <div className='admin-panel-block'>
                <div>
                    <p>Назва</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <p>Емейл</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <p>Адреса українською</p>
                    <input value={addressUA} onChange={(e) => setAddressUA(e.target.value)} />
                </div>
                <div>
                    <p>Адреса російською</p>
                    <input value={addressRU} onChange={(e) => setAddressRU(e.target.value)} />
                </div>
                <div>
                    <p>Телефон</p>
                    <input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                </div>
                <div>
                    <p>Години робити українською</p>
                    <input value={openingHoursUA} onChange={(e) => setOpeningHoursUA(e.target.value)} />
                </div>
                <div>
                    <p>Години робити російською</p>
                    <input value={openingHoursRU} onChange={(e) => setOpeningHoursRU(e.target.value)} />
                </div>
                <div>
                    <p>telegram</p>
                    <input value={telegram} onChange={e=>setTelegram(e.target.value)}/>
                </div>
                <div>
                    <p>viber</p>
                    <input value={viber} onChange={e=>setViber(e.target.value)}/>
                </div>
                <br />
                <div>
                    <button onClick={() => SetInfoCompany(name, email, telephone, addressUA,
                        addressRU, openingHoursUA, openingHoursRU,telegram,viber)}>Добавити</button>
                </div>
            </div>
        </div>
    )
}

export default InfoCompanyEdit