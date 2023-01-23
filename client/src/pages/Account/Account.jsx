import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAction } from '../../hooks/useAction'
import { useTranslation } from 'react-i18next';
import GooglePayButton from '@google-pay/button-react';

import '../Account/account.css'

const Account = () => {

    const navigate = useNavigate();

    const { t } = useTranslation()

    const { user } = useSelector(state => state.user)
    const { userHistoty, flightAccountOrders } = useSelector(state => state.order)

    const { language } = useSelector(state => state.language)

    const { getUserHistory, fetchGetFlightAccountOrders, deleteFlightOrder } = useAction()

    const [checkAccountDetails, setCheckAccountDetails] = useState(null)

    useEffect(() => {
        fetchGetFlightAccountOrders()
        getUserHistory();
    }, [])

    const handleDetailsAccount = (i) => {
        if (checkAccountDetails == i) {
            return setCheckAccountDetails(null);
        }
        setCheckAccountDetails(i);
    }

    const deleteOrder = (id) => {
        deleteFlightOrder(id);
    }

    return (
        <div className='container-account'>
            <div className='block-account'>
                <div className='bread-crumbs-main'>
                    <div className='bredcrumbs-flight'>
                        <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                        <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                        <span className='bredcrumbs-flight-text'>{t("account.personal_office")}</span>
                    </div>
                    <div className="account-user-profile account-user-profile-none">
                        <b>{t("account.profile")}</b>
                        <div className="account-surname-with-name">
                            <span>{user.name + " " + user.surname}</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="account-setting-profile-button">
                            <button onClick={() => navigate("/account/edit")}>{t("account.setting_profile")}</button>
                        </div>
                    </div>
                    <div className='block-fligth-cart-profile-account'>
                        <div className='block-fligth-cart-items'>
                            <div className='account-main-title'>
                                <b>{t("account.my_booking")}</b>
                            </div>
                            {flightAccountOrders.map((item, i) => {

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
                                            <div className={objUserHistory.status === null ? 'item-payment' : 'item-payment-none'}>
                                                <div>
                                                    <span>{t('modalbuy.message_title_second')}</span>
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
                                            <div className='item-detailed-info-main'>
                                                <div className='item-detailed-info-button'>
                                                    <div>
                                                        <button onClick={() => handleDetailsAccount(i)}>{t('account.details_btn')}</button>
                                                        <img src={process.env.REACT_APP_API_URL + 'Vector-account.png'} alt="vector" />
                                                    </div>
                                                    <div>
                                                        <NavLink to={`/flight/${item.startPosition[language]}-${item.finishPosition[language]}/${item.id}`}>{t('account.flight_btn')}</NavLink>
                                                    </div>
                                                </div>
                                                <div className={checkAccountDetails == i ? 'item-detailed-info-user' : 'item-detailed-info-none'} >
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
                                                        <div className='item-contact-details-delete'>
                                                            <img src={process.env.REACT_APP_API_URL + 'trash-account.png'} alt="delete" />
                                                            <button onClick={() => deleteOrder(objUserHistory.id)}>{t('account.delete_user_order')}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="block-account-user">
                            <div className="account-user-profile account-user-profile-none-second">
                                <b>{t("account.profile")}</b>
                                <div className="account-surname-with-name">
                                    <span>{user.name + " " + user.surname}</span>
                                    <span>{user.email}</span>
                                </div>
                                <div className="account-setting-profile-button">
                                    <button onClick={() => navigate("/account/edit")}>{t("account.setting_profile")}</button>
                                </div>
                            </div>
                            <div className="account-message">
                                <div className='flight-message-icon'>
                                    <img src={process.env.REACT_APP_API_URL + 'info-blue.png'} alt='info' />
                                </div>
                                <div className="account-message-title-description">
                                    <b>{t("account.message_title")}</b>
                                    <span>{t("account.message_description")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    и                    <GooglePayButton
                        environment="PRODUCTION"
                        buttonColor='white'
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                    },
                                },
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: '100.00',
                                currencyCode: 'GBP',
                                countryCode: 'UA',
                            },
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('load payment data', paymentRequest);
                        }}
                    />
                </div>
            </div>
        </div >

    )
}

export default Account;
/*<LiqPayPay
                    publicKey={process.env.REACT_APP_PUBLIC_KEY}
                    privateKey={process.env.REACT_APP_PRIVATE_KEY}
                    amount="3"
                    description="Payment for product"
                    currency="UAH"
                    orderId={Math.floor(1 + Math.random() * 900000000)}
                    result_url="http://domain.com/user/account"
                    server_url="http://server.domain.com/liqpay"
                    product_description="Online courses"
                    style={{ margin: "8px" }}
                    disabled={true}
                    />
                    <LiqPaySubscribe
                    publicKey={process.env.REACT_APP_PUBLIC_KEY}
                    privateKey={process.env.REACT_APP_PRIVATE_KEY}
                    amount="3"
                    subscribePeriodicity="month"
                    description="Payment for subscription"
                    currency="USD"
                    orderId={Math.floor(1 + Math.random() * 900000000)}
                    result_url="http://domain.com/user/account"
                    server_url="http://server.domain.com/liqpay"
                    product_description="Online courses"
                    style={{ margin: "8px" }}
                    disabled={false}
                    />
                    <LiqPayPay
                    publicKey={process.env.REACT_APP_PUBLIC_KEY}
                    privateKey={process.env.REACT_APP_PRIVATE_KEY}
                    description="Payment for product"
                    orderId={Math.floor(1 + Math.random() * 900000000)}
                    result_url="http://domain.com/user/account"
                    server_url="http://server.domain.com/liqpay"
                    product_description="Online courses"
                    style={{
                        backgroundColor: '#337ab7',
                        color: '#fff',
                        borderColor: '#2e6da4',
                        border: '1px solid transparent',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer'
                      }}
                    />
                    */