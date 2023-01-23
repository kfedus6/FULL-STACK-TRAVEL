import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from '../../hooks/useAction';
import { t } from 'i18next';
import { Breadcrumbs, Typography } from '@mui/material';
import HomeBlog from '../Home/HomeBlog';
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookF, FaTelegramPlane, FaViber } from 'react-icons/fa'
import { FacebookShareButton, TelegramShareButton, ViberShareButton, InstapaperShareButton } from "react-share"
import { ImArrowRight2 } from 'react-icons/im';


const Blog = () => {
    const { id } = useParams();
    const { name } = useParams();
    const { selectBlog, similarBlog, blogRetaledFlight } = useSelector(state => state.blog)
    const { GetBlogDescription, GetSimilarBlog } = useAction();
    const { language } = useSelector(state => state.language);
    const navigate = useNavigate();

    useEffect(() => {
        GetSimilarBlog(id);
    }, [id])
    useEffect(() => {
        if (selectBlog == undefined || selectBlog == null || selectBlog.id != id) {
            GetBlogDescription(id);
        }
    }, [id]);
    function createMarkup(text) { return { __html: text }; };
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        if (window.screen.width < 1025) {
            document.querySelector("#staticMenu").style.position = "unset";
            return;
        }
        if (document.querySelector("#description") == null) return
        if (document.querySelector("#staticMenu") == null) return;
        if (document.querySelector("#description").getBoundingClientRect().height
            - 120 + document.querySelector("#description").getBoundingClientRect().top -
            document.querySelector("#staticMenu").getBoundingClientRect().height > 0) {
            document.querySelector("#containerStaticMenu").style.alignItems = "flex-start";
            document.querySelector("#staticMenu").style.position = "fixed";
            //document.querySelector("#staticMenu").style.top=(scrollPosition+150)+"px"
        }
        else {
            document.querySelector("#containerStaticMenu").style.alignItems = "flex-end";
            document.querySelector("#staticMenu").style.position = "absolute";
        }
    }, [scrollPosition]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { SetFlightParams } = useAction();

    const toFlight = (whence, whither) => {
        SetFlightParams(whence[language], whither[language], "", 1, 0);
        navigate("/flightsCategory");
    }

    return (
        (selectBlog == undefined || selectBlog == null || selectBlog.id != id) ? <div>loading...</div> :
            <>
                <div>
                    <div className='bread__crumbs__main'>
                        <div className='bredcrumbs-flight'>
                            <span className='bredcrumbs-flight-services-link'><NavLink to="/">{t("header.first_link")}</NavLink></span>
                            <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                            <span className='bredcrumbs-flight-services-link'><NavLink to="/blog">Блог</NavLink></span>
                            <span><img src={process.env.REACT_APP_API_URL + 'chevron-right.png'} alt="right" /></span>
                            <span className='bredcrumbs-flight-text'>{selectBlog.name[language]}</span>
                        </div>
                    </div>
                    <br />
                    <div className="blog__with__static__panel">
                        <div className='blog__one__container'>
                            <div className='one__blog__main'>
                                <img src={process.env.REACT_APP_API_URL + selectBlog.image} />
                                <div className='blog__date__with__social__netvork'>
                                    <div className="mini__blog__date">
                                        <span>{selectBlog.createdAt.slice(0, 10).split("-").map((x, idx) => {
                                            if (idx == 0) return <div className='date__widt__margin' key={idx}>{x}</div>;
                                            if (idx == 1) return <div className='date__widt__margin' key={idx}>{t("blog." + x)}</div>;
                                            return <div key={idx}>{x}</div>;
                                        })}
                                        </span>
                                    </div>
                                    <div className="blog__social__networks">
                                        <FacebookShareButton url={process.env.REACT_APP_THIS_URL + window.location.pathname}>
                                            <FaFacebookF />
                                        </FacebookShareButton>
                                        <TelegramShareButton url={process.env.REACT_APP_THIS_URL + window.location.pathname.slice(1)}>
                                            <FaTelegramPlane />
                                        </TelegramShareButton>
                                        <ViberShareButton url={process.env.REACT_APP_THIS_URL + window.location.pathname.slice(1)}>
                                            <FaViber />
                                        </ViberShareButton>
                                        <InstapaperShareButton url={process.env.REACT_APP_THIS_URL + window.location.pathname.slice(1)}>
                                            <BsInstagram />
                                        </InstapaperShareButton>
                                    </div>
                                </div>
                                <h1>{selectBlog.name[language]}</h1>
                                <div id="description" dangerouslySetInnerHTML={createMarkup(selectBlog.description[language])} className="blog__main" />
                            </div>
                        </div>
                        <div id="containerStaticMenu" className='container__blog__fixed__panel'>
                            <div className='blog__fixed__panel' id="staticMenu">
                                <div className="blog__fixed__panel__title">
                                    {t("blog.similarFlight")}
                                </div>
                                {blogRetaledFlight.map(x =>
                                    <div onClick={() => toFlight(x.whence, x.whither)} key={x.id} className="blog__list__similar__flight">
                                        {x.whence[language]} <ImArrowRight2 /> {x.whither[language]}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className='blog__container'>
                        {similarBlog == undefined ? <></> :
                            <div className="list__blog__main">
                                {similarBlog.map(x => <HomeBlog key={x.id} blog={x} />)}
                            </div>}
                    </div>
                </div>
            </>

    )
}

export default Blog