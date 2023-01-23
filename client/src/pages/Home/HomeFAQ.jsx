import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from 'react-icons/ai'
import { useAction } from '../../hooks/useAction';
import '../FAQ/faq.css'
import { useTranslation } from 'react-i18next';

const HomeFAQ = () => {
    const { t } = useTranslation()
    const { FAQNovetly } = useSelector(state => state.FAQ);
    const { is_admin } = useSelector(state => state.user);
    const { GetFAQNovetly, deleteFAQ } = useAction();

    useEffect(() => {
        GetFAQNovetly(5);
    }, [])

    const { language } = useSelector(state => state.language);

    function createMarkup(text) { return { __html: text }; };

    const [isActive, setIsActive] = useState(null);

    const toggle = (i) => {
        if (isActive == i) {
            return setIsActive(null)
        }
        setIsActive(i)
    }

    const deleteFaq = (id) => {
        deleteFAQ(id);
        GetFAQNovetly(5);
    }
    if (FAQNovetly === undefined) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
                <div className='accordion-title'>
                    <div className='section-home-title'>
                        <p className='home__title'>
                            <span>
                                {t('FAQ.questions_and_answers')}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="accordion">
                    {FAQNovetly.map((item, i) => {
                        return (
                            <div key={item.id} className="accordion-item">
                                <button onClick={() => toggle(i)} className={isActive === i ? "accordion-button" : ''} aria-expanded={isActive === i ? "true" : "false"}><span className="accordion-title">{item.name[language]}?</span><span className='icon-accordion' aria-hidden="true">{isActive === i ? <AiOutlineMinus /> : <AiOutlinePlus />}</span></button>
                                <div className={isActive === i ? 'accordion-content show' : 'accordion-content'}>
                                    {is_admin ? <button onClick={() => deleteFaq(item.id)}><AiFillDelete /></button> : <></>}
                                    <p dangerouslySetInnerHTML={createMarkup(item.description[language])} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}
export default HomeFAQ;