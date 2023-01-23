import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlightsFormSort from '../../components/FlightsFormSort';
import { useAction } from '../../hooks/useAction';
import HomeListBlog from './HomeListBlog';
import ReserveFlightHome from './ReserveFlightHome';
import Responce from './Responce';
import ServicesHome from './ServicesHome';

const Home = () => {
    const { language } = useSelector(state => state.language);
    const [startPosition, setStartPosition] = useState('');
    const [finishPosition, setFinishPosition] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('')
    const [sumYoung, setSumYoung] = useState(0);
    const [sumOld, setSumOld] = useState(1);
    const [changePosition, setChangePosition] = useState(false);

    const [inOneDirection, setInOneDirection] = useState(true)
    const [inTwoDirections, setInTwoDirections] = useState(false)

    const { SetFlightParams } = useAction();

    useEffect(() => {

    }, [language])

    const navigate = useNavigate();

    const search = () => {
        SetFlightParams(startPosition, finishPosition, startDate, finishDate, sumOld, sumYoung);
        navigate("/flightsCategory");
    }

    const handleChangeInOneDirection = (radio) => {
        setInOneDirection(true)
        setInTwoDirections(false)
    }

    const handleChangeInTwoDirections = (radio) => {
        setInOneDirection(false)
        setInTwoDirections(true)
    }

    return (
        <>
            <div className='header-baner'>
                <div className='text-baner'>
                    <span>{t('baner.text')}</span>
                </div>
            </div>
            <div />
            <div className='form-fligths-home'>
                <div className='form-flights-container'>
                    <FlightsFormSort
                        setInOneDirection={setInOneDirection}
                        setInTwoDirections={setInTwoDirections}
                        inOneDirection={inOneDirection}
                        inTwoDirections={inTwoDirections}
                        handleChangeInOneDirection={handleChangeInOneDirection}
                        handleChangeInTwoDirections={handleChangeInTwoDirections}
                        setStartDate={setStartDate}
                        setFinishDate={setFinishDate}
                        setStartPosition={setStartPosition}
                        setFinishPosition={setFinishPosition}
                        sortFlights={search}
                        sumOld={sumOld}
                        setSumOld={setSumOld}
                        sumYoung={sumYoung}
                        setSumYoung={setSumYoung}
                        deleteFlight={() => { }}
                        startDate={startDate}
                        finishDate={finishDate}
                        startPosition={startPosition}
                        finishPosition={finishPosition}
                        changePosition={changePosition}
                        setChangePosition={setChangePosition} />
                </div>
            </div>
            <ReserveFlightHome />
            <ServicesHome />
            <Responce />
            <HomeListBlog />
        </>
    )
}

//<FlightsFormSort/>
export default Home;

/*<div className='home__content'>
    <ListNovetly />
    <CompanyBenefits />
    <HomeFAQ />
    <Responce />

</div>*/