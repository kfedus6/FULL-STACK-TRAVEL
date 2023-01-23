import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home/Home';
import Flights from '../pages/Flights/Flights.jsx'
import Flight from '../pages/Flight/Flight';
import AboutUs from '../pages/AboutUs/AboutUs';
import { useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import { useSelector } from 'react-redux';
import { ListBlog } from '../pages/Blog/ListBlog';
import Blog from '../pages/Blog/Blog';
import FAQ from '../pages/FAQ/FAQ';
import Account from '../pages/Account/Account';
import FlightOrders from '../pages/FlightOrders/FlightOrders';
import Error from '../pages/Error/Error'
import AboutUsEdit from '../pages/Admin/AboutUsEdit';
import BlogEdit from '../pages/Admin/BlogEdit';
import FAQEdit from '../pages/Admin/FAQEdit';
import FlightsEdit from '../pages/Admin/FlightsEdit';
import InfoCompanyEdit from '../pages/Admin/InfoCompanyEdit';
import NovetlyEdit from '../pages/Admin/NovetlyEdit';
import ResponceEdit from '../pages/Admin/ResponceEdit';
import Services from '../pages/Services/Services';
import ReservationOnline from '../pages/Services/pages/ReservationOnline';
import LuggageTransportation from '../pages/Services/pages/LuggageTransportation';
import ReservationManagement from '../pages/Services/pages/ReservationManagement';
import TransportationAnimals from '../pages/Services/pages/TransportationAnimals';
import Contacts from '../pages/contacts/Contacts';
import EditAccount from '../pages/Account/EditAccount';
import FlightUpdate from '../pages/Admin/FlightUpdate';
import ForgorPass from '../pages/Account/ForgorPass';

const AppRouter = () => {
    const { IsAuthorize } = useAction();
    const { is_login, is_admin } = useSelector(state => state.user);

    useEffect(() => {
        IsAuthorize();
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                {/*<Route path='flights' element={<Flights isShowFilter={false} />} />*/}
                <Route path='flightsCategory' element={<Flights isShowFilter={true} />} />
                <Route path='flight/:name/:id' element={<Flight />} />
                <Route path='FAQ' element={<FAQ />} />
                <Route path='aboutUs' element={<AboutUs />} />
                <Route path='blog' element={<ListBlog />} />
                <Route path='blog/:name/:id' element={<Blog />} />
                <Route path="services" element={<Services />} />
                <Route path='services/reservation_online' element={<ReservationOnline />} />
                <Route path='services/luggage_transportation' element={<LuggageTransportation />} />
                <Route path='services/booking_management' element={<ReservationManagement />} />
                <Route path='services/transportation_animals' element={<TransportationAnimals />} />
                <Route path='contacts' element={<Contacts />} />
                <Route path='user/forgorPass/:key' element={<ForgorPass/>}/>
                {is_login ? <Route path='account' element={<Account />} /> : <></>}
                {is_login ? <Route path='account/edit' element={<EditAccount />} /> : <></>}
                {is_admin ? <Route path='order' element={<FlightOrders />} /> : <></>}
                {is_admin ? <Route path='aboutUsEdit' element={<AboutUsEdit />} /> : <></>}
                {is_admin ? <Route path='blogEdit' element={<BlogEdit />} /> : <></>}
                {is_admin ? <Route path='faqEdit' element={<FAQEdit />} /> : <></>}
                {is_admin ? <Route path='flightsEdit' element={<FlightsEdit />} /> : <></>}
                {is_admin ? <Route path='infoCompanyEdit' element={<InfoCompanyEdit />} /> : <></>}
                {is_admin ? <Route path='novetlyEdit' element={<NovetlyEdit />} /> : <></>}
                {is_admin ? <Route path='responseEdit' element={<ResponceEdit />} /> : <></>}
                {is_admin ? <Route path='flightUpdate/:id/:limit/:page' element={<FlightUpdate />} /> : <></>}
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;