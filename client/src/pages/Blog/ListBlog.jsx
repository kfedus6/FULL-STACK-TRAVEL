import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { getPageCount } from '../../utils/page';
import { Breadcrumbs, Typography } from '@mui/material';
import { ImArrowRight2 } from 'react-icons/im'
import { t } from 'i18next';
import HomeBlog from '../Home/HomeBlog';

export const ListBlog = () => {
    const { listBlog, limit, countBlog, page } = useSelector(state => state.blog);
    const { GetBlogAll, DelBlog } = useAction();
    const { is_admin } = useSelector(state => state.user);
    const { language } = useSelector(state => state.language);
    const navigate = useNavigate();
    const [totalCount, setTotalCount] = useState(undefined);
    const [selectPage, setSelectPage] = useState(1);

    useEffect(() => {
        setTotalCount(getPageCount(countBlog, limit))
    }, [listBlog])
    const handleChange = (event, value) => {
        setSelectPage(value);
    }
    useEffect(() => {
        GetBlogAll(selectPage, limit);
    }, [selectPage]);

    return (
        listBlog == undefined ? <>loading...</> :
            <>
                <div className='bread__crumbs__main'>
                    <div className='bredcrumbs-flight'>
                        <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                        <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                        <span className='bredcrumbs-flight-text'>Блог</span>
                    </div>
                </div>
                <div className='blog__container'>
                    <h1>Блог</h1>
                    <div className='list__blog__main'>
                        {listBlog.map(x => <HomeBlog key={x.id} blog={x} />)}
                    </div>
                    {totalCount == undefined ? <></> :
                        <div className='pagination pagination-blog'>
                            <Stack spacing={1}>
                                <Pagination count={totalCount} page={page} onChange={handleChange} shape="rounded" color="primary" />
                            </Stack>
                        </div>
                    }
                </div>
            </>
    )
}
