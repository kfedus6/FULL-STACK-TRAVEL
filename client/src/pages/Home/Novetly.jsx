import React from 'react'
import { useSelector } from 'react-redux'
import { useAction } from '../../hooks/useAction';

const Novetly = ({ novetly }) => {
    const { is_admin } = useSelector(state => state.user)
    const { language } = useSelector(state => state.language);
    const { DelNovetly } = useAction()
    return (
        <div className="novetly__main">
            <div className='novetly__img'>
                <img src={process.env.REACT_APP_API_URL + novetly.image} />
            </div>
            <div className='novetly__description'>
                {novetly.description[language]}
            </div>
            {is_admin ?
                <div>
                    <button onClick={() => DelNovetly(novetly.id)}>del</button>
                </div> : <></>}
        </div>
    )
}

export default Novetly