import { t } from 'i18next'
import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { useAction } from '../../hooks/useAction';

const AboutUsEdit = () => {
    const { aboutUs } = useSelector(state => state.aboutUs);
    const [ua, setUa] = useState(undefined);
    const [ru, setRu] = useState(undefined);
    useEffect(() => {
        if (aboutUs == undefined) {
            GetAboutUs();
        }
    }, [])
    useEffect(() => {
        if (aboutUs != undefined) {
            setUa(aboutUs.description[0]);
            setRu(aboutUs.description[1]);
        }
    }, [aboutUs])
    const { GetAboutUs, SetAboutUs } = useAction();
    return (
        <div className='about__us__edit__main'>
            {ua == undefined || ru == undefined ? <div>...loading</div> :
                <><h1>українська версія</h1>

                    <Editor value={ua}
                        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                        onEditorChange={(newText) => setUa(newText)}
                    />

                    <h1>російська версія</h1>

                    <Editor value={ru}
                        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                        onEditorChange={(newText) => setRu(newText)}
                    />

                    <button onClick={() => SetAboutUs(ua, ru)}>save</button></>}
        </div>
    )
}

export default AboutUsEdit