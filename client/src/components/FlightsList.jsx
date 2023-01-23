import React from 'react'
import { NavLink } from 'react-router-dom'
import FlightsFormSort from './FlightsFormSort'
import FlightsItem from './FlightsItem'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { t } from 'i18next'

const FlightsList = ({ finishPosition, finishDate, setFinishDate, startPosition, startDate, flights, setStartDate, setStartPosition, setFinishPosition, sortFlights, sumOld, setSumOld, sumYoung, setSumYoung, deleteFlight, limit, page, isFilterTrue, openModal, changePosition, setChangePosition, changePositionFun, totalCount, handleChange, changeCurrentFlight, setInOneDirection, setInTwoDirections, inOneDirection, inTwoDirections, handleChangeInOneDirection, handleChangeInTwoDirections }) => {

    if (flights == undefined || flights.length === 0) {
        return (
            <div>loading...</div>
        )
    } else {
        return (
            <>
                <div className='flights-container'>
                    <div className='fligths-form'>
                        <div className='bredcrumbs-flights'>
                            <div>
                                <NavLink to="/">{t("header.first_link")}</NavLink>
                            </div>
                            <div>
                                <img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" />
                            </div>
                            <div>
                                <span>
                                    {t('flight.search')}
                                </span>
                            </div>
                        </div>
                        {isFilterTrue ? <FlightsFormSort
                            setStartDate={setStartDate}
                            setFinishDate={setFinishDate}
                            setStartPosition={setStartPosition}
                            setFinishPosition={setFinishPosition}
                            sortFlights={sortFlights}
                            sumOld={sumOld}
                            setSumOld={setSumOld}
                            sumYoung={sumYoung}
                            setSumYoung={setSumYoung}
                            deleteFlight={deleteFlight}
                            limit={limit}
                            page={page}
                            startPosition={startPosition}
                            finishPosition={finishPosition}
                            startDate={startDate}
                            finishDate={finishDate}
                            changePosition={changePosition}
                            setChangePosition={setChangePosition}
                            changePositionFun={changePositionFun}
                            setInOneDirection={setInOneDirection}
                            setInTwoDirections={setInTwoDirections}
                            inOneDirection={inOneDirection}
                            inTwoDirections={inTwoDirections}
                            handleChangeInOneDirection={handleChangeInOneDirection}
                            handleChangeInTwoDirections={handleChangeInTwoDirections}
                        /> : <></>}
                    </div>
                </div>
                <div className='flights-block'>
                    {flights.rows.length ?
                        <div className='items-flights'>
                            {flights.rows.map(item => {
                                return (
                                    <FlightsItem
                                        key={item.id}
                                        item={item}
                                        flights={flights}
                                        sumOld={sumOld}
                                        sumYoung={sumYoung}
                                        deleteFlight={deleteFlight}
                                        limit={limit}
                                        page={page}
                                        openModal={openModal}
                                        changeCurrentFlight={changeCurrentFlight}
                                    />
                                )
                            })}
                        </div>
                        :
                        <></>
                    }
                    {totalCount == undefined ? <></> : flights.rows.length ?
                        <div className='pagination'>
                            <Stack spacing={1}>
                                <Pagination count={totalCount} page={page} onChange={handleChange} shape="rounded" color="primary" />
                            </Stack>
                        </div>
                        :
                        <></>
                    }
                </div>
            </>
        )
    }
}

export default FlightsList;