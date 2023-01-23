import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useAction } from '../../hooks/useAction'
import { BiTimeFive } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../FlightOrders/flightOrders.css';
import { getPageCount } from '../../utils/page';

const FlightOrders = () => {

    const [isActive, setIsActive] = useState(false)
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(undefined)
    const [checkOrderDetails, setCheckOrderDetails] = useState(null)

    const { t } = useTranslation()

    const { user } = useSelector(state => state.user)
    const { userHistoty, flightAccountOrders } = useSelector(state => state.order)
    const { language } = useSelector(state => state.language);
    const { flightOrders } = useSelector(state => state.order)
    const { flight } = useSelector(state => state.flights)

    const { getFlightOrder, putFlightOrder, putFlightOrderStatusPayment,
        putFlightOrderStatusPrePayment, putFlightOrderStatusSuccess, deleteFlightOrder,
        fetchGetFlight, getUserHistory, fetchGetFlightAccountOrders
    } = useAction()

    useEffect(() => {
        fetchGetFlightAccountOrders()
        getUserHistory();
    }, [])

    useEffect(() => {
        getFlightOrder({ page: page, limit: limit })
    }, [page, limit])

    useEffect(() => {
        setTotalCount(getPageCount(flightOrders.count, limit))
    }, [flightOrders])

    const [countTicket, setCountTicket] = useState(1);

    const changeStatusOrderTrue = (id) => {
        let status = true
        putFlightOrder(status, id, page, limit, countTicket)
    }

    const changeStatusOrderFalse = (id) => {
        let status = false
        putFlightOrder(status, id, page, limit, countTicket)
    }

    const changeStatusOrderPayment = (status, id) => {
        let statusPayment
        if (status === false) {
            statusPayment = true
        } else {
            statusPayment = false
        }
        putFlightOrderStatusPayment(statusPayment, id, page, limit, countTicket)
    }

    const changeStatusOrderPrePayment = (status, id) => {
        let statusPrePayment
        if (status === false) {
            statusPrePayment = true
        } else {
            statusPrePayment = false
        }
        putFlightOrderStatusPrePayment(statusPrePayment, id, page, limit, countTicket)
    }

    const changeStatusOrderSuccess = (status, id) => {
        let statusSuccess
        if (status === false) {
            statusSuccess = true
        } else {
            statusSuccess = false
        }
        putFlightOrderStatusSuccess(statusSuccess, id, page, limit, countTicket)
    }

    const deleteOrder = (id) => {
        deleteFlightOrder(id);
        setPage(1);
        setIsActive(false);
    }
    useEffect(() => {

    }, [flightOrders])

    const handleChange = (event, value) => {
        setPage(value)
    }

    const handleDetailsOrder = (i) => {
        if (checkOrderDetails == i) {
            return setCheckOrderDetails(null);
        }
        setCheckOrderDetails(i);
    }

    if (Array.isArray(flightOrders)) {
        return <></>
    } else {
        return (
            <div className='order-container'>
                <div className="container-orders">
                    <div className='bredcrumbs-flights'>
                        <div>
                            <NavLink to="/">{t("header.first_link")}</NavLink>
                        </div>
                        <div>
                            <img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" />
                        </div>
                        <div>
                            <span>
                                {t('order.title')}
                            </span>
                        </div>
                    </div>
                    <div className='accordion-title-order'>
                        <b>{t('order.title')}</b>
                    </div>
                    <div className='block-fligth-cart-profile-account'>
                        <div className='block-fligth-cart-items'>
                            {flightAccountOrders.map((item, i) => {

                                let date = item.createdAt.split('-')
                                let dateDay = date[2]
                                dateDay = dateDay.slice(0, 2)
                                let time = date[2].slice(3, 8)

                                let itemUserHistory = userHistoty.filter(user => user.flightId === item.id)
                                let objUserHistory = itemUserHistory.reduce((target, key) => {
                                    target = key
                                    return target;
                                }, {})

                                return (
                                    <div key={i} className='block-flight-cart-account'>
                                        {objUserHistory.statusSuccess === true
                                            ?
                                            <div className='flight-cart-account-status-is-success'>
                                                <img src={process.env.REACT_APP_API_URL + 'check-gray.png'} alt="time" />
                                                <span>Виконано</span>
                                            </div>
                                            :
                                            objUserHistory.statusPrepayment === true
                                                ?
                                                <div className='flight-cart-account-status-payment'>
                                                    <img src={process.env.REACT_APP_API_URL + 'check-green.png'} alt="time" />
                                                    <span>Внесено передоплату</span>
                                                </div>
                                                :
                                                objUserHistory.statusPayment === true
                                                    ?
                                                    <div className='flight-cart-account-status-payment'>
                                                        <img src={process.env.REACT_APP_API_URL + 'check-green.png'} alt="time" />
                                                        <span>Оплачено</span>
                                                    </div>
                                                    :
                                                    objUserHistory.statusPaymentInProcessing === true
                                                        ?
                                                        <div className='flight-cart-account-status-success'>
                                                            <img src={process.env.REACT_APP_API_URL + 'clock-blue.png'} alt="time" />
                                                            <span>Оплата в обробці</span>
                                                        </div>
                                                        :
                                                        objUserHistory.status === null ?
                                                            <div className='flight-cart-account-status-processing'>
                                                                <img src={process.env.REACT_APP_API_URL + 'clock-pink.png'} alt="time" />
                                                                <span>{t('account.in_processing')}</span>
                                                            </div>
                                                            :
                                                            objUserHistory.status === true
                                                                ?
                                                                <div className='flight-cart-account-status-success'>
                                                                    <img src={process.env.REACT_APP_API_URL + 'check.png'} alt="time" />
                                                                    <span>{t('account.accepted')}</span>
                                                                </div>
                                                                :
                                                                <div className='flight-cart-account-status-cancelled'>
                                                                    <img src={process.env.REACT_APP_API_URL + 'x-x.png'} alt="time" />
                                                                    <span>{t('account.canceled')}</span>
                                                                </div>
                                        }
                                        <div className='item-start-finish-position-account'>
                                            <div className='item-position-account'>
                                                <div className='item-street-start-finish-account'>
                                                    <div>
                                                        <img src={process.env.REACT_APP_API_URL + item.flagStart} alt="flag" />
                                                        <span>{item.startPosition[language]}</span>
                                                    </div>
                                                    <span>{item.streetStartPosition[language]}</span>
                                                    <div className='item-time-date-account'>
                                                        <span>{item.startTime}</span>
                                                        <span>{item.startDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='item-position-account'>
                                                <div className='item-street-start-finish-account'>
                                                    <div>
                                                        <img src={process.env.REACT_APP_API_URL + item.flagFinish} alt="flag" />
                                                        <span>{item.finishPosition[language]}</span>
                                                    </div>
                                                    <span>{item.streetFinishPosition[language]}</span>
                                                    <div className='item-time-date-account'>
                                                        <span>{item.finishTime}</span>
                                                        <span>{item.finishDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='item-detailed-payment-group'>
                                            <div className='item-payment-order'>
                                                <div className='item-paymet-date'>
                                                    <div>
                                                        <span className='item-paymet-date-title'>Дата бронювання</span>
                                                    </div>
                                                    <div className='item-paymet-date-time-name'>
                                                        <div className='item-contact-details-info-order'>
                                                            <img src={process.env.REACT_APP_API_URL + 'user-account.png'} alt="user" />
                                                            <span>{t('account.client')}: {`${objUserHistory.surename} ${objUserHistory.name}`}</span>
                                                        </div>
                                                        <div className='item-contact-details-info-order'>
                                                            <img src={process.env.REACT_APP_API_URL + 'phone-account.png'} alt="phone" />
                                                            <span>Дата: {dateDay}.{date[1]}.{date[0]}</span>
                                                        </div>
                                                        <div className='item-contact-details-info-order'>
                                                            <i><BiTimeFive /></i>
                                                            <span>Час: {time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className='item-paymet-date-title'>{t('modalbuy.message_title_second')}</span>
                                                </div>
                                                <div className='item-payment-price'>
                                                    <div>
                                                        <span>{t('account.payable')}: {objUserHistory.price} грн</span>
                                                    </div>
                                                    <div>
                                                        <img src={process.env.REACT_APP_API_URL + 'info-silver.png'} alt="info" />
                                                        <span>{t('account.payable_success')}.</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='item-detailed-info-main-order'>
                                                <div className='item-detailed-info-button-order'>
                                                    <div className='item-detailed-info-button-order-show-info'>
                                                        <button onClick={() => handleDetailsOrder(i)}>{t('account.details_btn')}</button>
                                                        <img src={process.env.REACT_APP_API_URL + 'Vector-account.png'} alt="vector" />
                                                    </div>
                                                    <div className='item-detailed-info-button-order-go-flight'>
                                                        <NavLink to={`/flight/${item.startPosition[language]}-${item.finishPosition[language]}/${item.id}`}>{t('account.flight_btn')}</NavLink>
                                                    </div>
                                                </div>
                                                <div className={checkOrderDetails == i ? 'item-detailed-info-user' : 'item-detailed-info-none'} >
                                                    <div className='item-contact-details'>
                                                        <span className='item-contact-details-title'>{t('account.contact_data')}</span>
                                                        <div className='item-contact-details-info'>
                                                            <img src={process.env.REACT_APP_API_URL + 'user-account.png'} alt="user" />
                                                            <span>{t('account.client')}: {`${objUserHistory.surename} ${objUserHistory.name}`}</span>
                                                        </div>
                                                        <div className='item-contact-details-info'>
                                                            <img src={process.env.REACT_APP_API_URL + 'phone-account.png'} alt="phone" />
                                                            <span>Телефон: {objUserHistory.phone}</span>
                                                        </div>
                                                        <div className='item-contact-details-info'>
                                                            <img src={process.env.REACT_APP_API_URL + 'mail-account.png'} alt="email" />
                                                            <span>Email: {objUserHistory.email}</span>
                                                        </div>
                                                    </div>
                                                    <div className='item-contact-details'>
                                                        <span className='item-contact-details-title'>{t('modalbuy.modal_details_title')}</span>
                                                        <div className='item-contact-details-info'>
                                                            <img src={process.env.REACT_APP_API_URL + 'users-account.png'} alt="users" />
                                                            <span>{t('flight.passegers')}: {`${objUserHistory.countPersons} ${t('flight.pass_old')}, ${objUserHistory.countChildren} дитина`}</span>
                                                        </div>
                                                        <div className='item-contact-details-info'>
                                                            <img src={process.env.REACT_APP_API_URL + 'phone-account.png'} alt="phone" />
                                                            <span>{t('modalbuy.date_back')}: {objUserHistory.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className='item-contact-details-order-admin'>
                                                        <div className='item-contact-details-order-admin-cancel'>
                                                            <img src={process.env.REACT_APP_API_URL + 'x-x.png'} alt="cancel" />
                                                            <button onClick={() => changeStatusOrderFalse(objUserHistory.id)}>{t('account.delete_user_order')}</button>
                                                        </div>
                                                        <div className='item-contact-details-order-admin-check'>
                                                            <img src={process.env.REACT_APP_API_URL + 'check.png'} alt="check" />
                                                            <button onClick={() => changeStatusOrderTrue(objUserHistory.id)}>Підтвердження бронювання</button>
                                                        </div>
                                                        <div className='item-contact-details-order-admin-paid'>
                                                            <img src={process.env.REACT_APP_API_URL + 'check-green.png'} alt="paid" />
                                                            <button onClick={() => changeStatusOrderPayment(objUserHistory.statusPayment, objUserHistory.id)}>Оплачено</button>
                                                        </div>
                                                        <div className='item-contact-details-order-admin-paid'>
                                                            <img src={process.env.REACT_APP_API_URL + 'check-green.png'} alt="paid" />
                                                            <button onClick={() => changeStatusOrderPrePayment(objUserHistory.statusPrepayment, objUserHistory.id)}>Внесено передоплату</button>
                                                        </div>
                                                        <div className='item-contact-details-order-admin-success'>
                                                            <img src={process.env.REACT_APP_API_URL + 'check-gray.png'} alt="success" />
                                                            <button onClick={() => changeStatusOrderSuccess(objUserHistory.statusSuccess, objUserHistory.id)}>Виконано</button>
                                                        </div>
                                                        <div className='item-contact-details-order-admin-delete'>
                                                            <img src={process.env.REACT_APP_API_URL + 'trash-account.png'} alt="delete" />
                                                            <button onClick={() => deleteOrder(objUserHistory.id)}>Видалити бронювання</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="accordion-orders">
                        {flightOrders.rows.map((item, i) => {
                            let date = item.createdAt.split('-')
                            let dateDay = date[2]
                            dateDay = dateDay.slice(0, 2)
                            let time = date[2].slice(3, 8)
                            let status = item.status

                            if (status === null) {
                                status = t('order.status')
                            }

                            return (
                                <div key={item.id} className="accordion-item-order">
                                    <div className='accordion-header-order'>
                                        <button className='accordion-order-btn' onClick={() => { toggle(i, item.flightId); setCountTicket(item.countTicket) }} aria-expanded={isActive === i ? "true" : "false"}>
                                            <span className="accordion-title-order">{dateDay}.{date[1]}.{date[0]} {time}</span>
                                            <span className="accordion-title-order">{item.authorName}</span>
                                            <span className="accordion-title-order">{item.phone}</span>
                                        </button>
                                        <div>
                                            <span className='icon-order' aria-hidden="true">
                                                {item.status === null ? status : item.status === false ? <span>{t("account.canceled")}</span> : <span>{t("account.accepted")}</span>}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={isActive === i ? 'accordion-content-order show' : 'accordion-content-order'}>
                                        {flight.length === 0
                                            ?
                                            <></>
                                            :
                                            <>
                                                <div className='order-flight-pdt'>
                                                    <div>
                                                        <span>{flight.startPosition[language]}</span>
                                                        <span>{flight.finishPosition[language]}</span>
                                                    </div>
                                                    <div className='order-street-position'>
                                                        <div>
                                                            <span>{flight.streetStartPosition[language]}</span>
                                                        </div>
                                                        <div>
                                                            <span className='order-street-finish'>{flight.streetFinishPosition[language]}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span>{flight.startDate}</span>
                                                        <span>{flight.finishDate}</span>
                                                    </div>
                                                    <div>
                                                        <span>{flight.startTime}</span>
                                                        <span>{flight.finishTime}</span>
                                                    </div>
                                                </div>
                                                <div className='order-flight-ticket'>
                                                    <span><b>{t('order.ticket')}:</b> <input value={countTicket} onChange={(e) => setCountTicket(e.target.value)} type={"number"} /></span>
                                                    <span><b>{t('order.ticket_remained')}:</b> {flight.countFreePlace}</span>
                                                    <span><b>Дата:</b> {item.date}</span>
                                                    <span><b>{t('order.price')}:</b> {flight.price} грн</span>
                                                    <span><b>{t('order.allPrice')}:</b> {+flight.price * +item.countTicket} грн</span>
                                                </div>
                                                <div className='order-status-btn'>
                                                    <div>
                                                        <button onClick={() => { if (item.status == null || item.status == false) changeStatusOrderTrue(item.id) }}>{t('order.check')}</button>
                                                        <button onClick={() => { if (item.status == null || item.status == true) changeStatusOrderFalse(item.id) }}>{t('order.close')}</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => deleteOrder(item.id)}><AiFillDelete /></button>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div> */}
                    {totalCount == undefined || isNaN(totalCount) ? <></> :
                        <div className='pagination-order'>
                            <Stack spacing={1}>
                                <Pagination count={totalCount} page={page} onChange={handleChange} shape="rounded" color="primary" />
                            </Stack>
                        </div>}
                </div>

            </div >
        )
    }
}

export default FlightOrders;