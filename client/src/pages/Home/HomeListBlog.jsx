import { t } from 'i18next';
import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from '../../hooks/useAction';
import HomeBlog from './HomeBlog';

const HomeListBlog = () => {
    const { blogNovetly } = useSelector(state => state.blog);
    const { GetBlogNovetly } = useAction();
    useEffect(() => {
        GetBlogNovetly(3);
    }, [])
    return (
        <div className='blog__home__main'>
            <h1>{t("home.latest_news")}</h1>
            <div className='blog__home__container'>
                <div className="list__blog__home">
                    {blogNovetly.map(x => <HomeBlog key={x.id} blog={x} />)}
                </div>
            </div>
        </div>
    )
}

export default HomeListBlog