import React from 'react'
import { useTranslation } from 'react-i18next'

const Pagination = ({ flights, pagesArray, changePage, limit, page }) => {
    const { t } = useTranslation()

    return (
        <div className='pages'>
            <div className={pagesArray.length === 1 || flights.rows.length === flights.count ? 'page-wrapper-none' : 'page-wrapper'}>
                {pagesArray.map(p => {
                    return (
                        <button
                            onClick={() => changePage(p)}
                            key={p}
                            className={page === p ? 'page page-current' : 'page'}
                        >{p}</button>
                    )
                })}
            </div>
        </div >
    )
}

export default Pagination;