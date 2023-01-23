import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import FlightList from '../../components/FlightList';

import './flight.css';

const Flight = () => {

    const { id } = useParams()

    const { flight, status, relinkBlocks, relinkBlocksBlog } = useSelector(state => state.flights)
    const { telephone } = useSelector(state => state.user);
    const { is_admin, is_login, user } = useSelector(state => state.user)
    const { language } = useSelector(state => state.language);

    const { fetchGetFlight, fetchGetFlights, fetchPutFlightStatus, fetchPutFlightBusDate,
        GetRelinkBlocks, postFlightOrder, GetPhone, fetchPatchFlightChildePrice, GetRelinkBlocksBlog } = useAction()

    const [scheduleWithUA, setScheduleWithUA] = useState('')
    const [scheduleWithRU, setScheduleWithRU] = useState('')
    const [scheduleToUA, setScheduleToUA] = useState('')
    const [scheduleToRU, setScheduleToRU] = useState('')

    const [childPrice, setChildPrice] = useState('')
    const [sumYoungBack, setSumYoungBack] = useState(0)
    const [sumOldBack, setSumOldBack] = useState(1)
    const [sumYoung, setSumYoung] = useState(0)
    const [sumOld, setSumOld] = useState(1)
    const [date, setDate] = useState('')
    const [dateBack, setDateBack] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [surename, setSurename] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {

    }, [language])

    useEffect(() => {
        fetchGetFlight(id)
        fetchGetFlights({
            startPosition: flight.startPosition,
            finishPosition: flight.finishPosition
        })
    }, [id])

    useEffect(() => {
        GetPhone();
    }, [])

    useEffect(() => {
        if (flight == undefined) return;
        GetRelinkBlocksBlog(flight.startPosition, flight.finishPosition, 6);
    }, [flight])

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
            setEmail(user.email)
            setSurename(user.surname)
        }
    }, [user])

    useEffect(() => {
        GetRelinkBlocks(id);
    }, [id])

    useEffect(() => {
        if (telephone != 0) {
            setPhone(telephone);
        }
    }, [telephone])

    const changeStatus = (id, status) => {
        if (status === true) {
            status = false
        } else {
            status = true
        }
        let sheduleBusId = flight.schefule.map(day => day)
        sheduleBusId = sheduleBusId[0].id
        fetchPutFlightStatus(sheduleBusId, id, status)
    }

    const changeSchedule = (id) => {
        fetchPutFlightBusDate(id, scheduleWithUA, scheduleToUA, scheduleWithRU, scheduleToRU,)
        setScheduleToRU('')
        setScheduleWithRU('')
        setScheduleToUA('')
        setScheduleWithUA('')
    }

    const changeFlightChildPrice = () => {
        fetchPatchFlightChildePrice(flight.id, childPrice)
        setChildPrice('')
    }

    const reserveTicket = () => {
        /* const regTelephone = /(^\++\d{11}$)|(^\d{10})$/;
         if (!regTelephone.test(phone)) {
             SetShowMessgeTrue(t("authorize.invalid_telephone"));
             setTimeout(() => SetShowMessgeFalse(), 3000);
             return;
         }*/

        let countTicket = sumOld + sumYoung

        if (flight.countFreePlace > countTicket) {
            if (!is_login) {
                postFlightOrder({
                    surename: surename,
                    name: name,
                    phone: phone.phone,
                    email: email,
                    countPersons: sumOld,
                    countChildren: sumYoung,
                    date: `${date.$D}.${date.$M + 1}.${date.$y}`,
                    countPersonsBack: sumOldBack,
                    countChildrenBack: sumYoungBack,
                    dateBack: `${dateBack.$D}.${dateBack.$M + 1}.${dateBack.$y}`,
                    price: (flight.price * sumOld) + (flight.childPrice * sumYoung),
                    flightId: id
                })
                setSurename('')
                setName('')
                setPhone('')
                setEmail('')
                setDate('')
                setDateBack('')
                setSumOldBack(1)
                setSumYoung(0)
                setSumOld(1)
                setSumYoung(0)
            } else {
                postFlightOrder({
                    surename: surename,
                    name: name,
                    phone: phone.phone,
                    email: email,
                    countPersons: sumOld,
                    countChildren: sumYoung,
                    date: `${date.$D}.${date.$M + 1}.${date.$y}`,
                    countPersonsBack: sumOldBack,
                    countChildrenBack: sumYoungBack,
                    dateBack: `${dateBack.$D}.${dateBack.$M + 1}.${dateBack.$y}`,
                    price: (flight.price * sumOld) + (flight.childPrice * sumYoung),
                    flightId: id,
                    userId: user.id
                })
                setDateBack('')
                setSumOldBack(1)
                setSumYoung(0)
                setDate('')
                setSumOld(1)
                setSumYoung(0)
            }
        } else {
            console.log('no ticket')
        }
    }

    if (!Array.isArray(flight)) {
        return (
            <div className='flight'>
                <FlightList
                    relinkBlocksBlog={relinkBlocksBlog}
                    flight={flight}
                    is_admin={is_admin}
                    setScheduleToUA={setScheduleToUA}
                    setScheduleWithUA={setScheduleWithUA}
                    setScheduleToRU={setScheduleToRU}
                    setScheduleWithRU={setScheduleWithRU}
                    status={status}
                    changeStatus={changeStatus}
                    changeSchedule={changeSchedule}
                    relinkBlocks={relinkBlocks}
                    date={date}
                    setDate={setDate}
                    dateBack={dateBack}
                    setDateBack={setDateBack}
                    sumOld={sumOld}
                    setSumOld={setSumOld}
                    sumOldBack={sumOldBack}
                    setSumOldBack={setSumOldBack}
                    sumYoung={sumYoung}
                    setSumYoung={setSumYoung}
                    sumYoungBack={sumYoungBack}
                    setSumYoungBack={setSumYoungBack}
                    name={name}
                    setName={setName}
                    surename={surename}
                    setSurename={setSurename}
                    phone={phone}
                    setPhone={setPhone}
                    email={email}
                    setEmail={setEmail}
                    reserveTicket={reserveTicket}
                    setChildPrice={setChildPrice}
                    changeFlightChildPrice={changeFlightChildPrice}
                />
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}


export default Flight;