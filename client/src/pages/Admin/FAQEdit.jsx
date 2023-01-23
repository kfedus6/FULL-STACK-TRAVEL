import { Editor } from '@tinymce/tinymce-react';
import React from 'react'
import { useState } from 'react';
import { useAction } from '../../hooks/useAction';

const FAQEdit = () => {
    const [nameUa, setNameUa] = useState("");
    const [nameRu, setNameRu] = useState("");
    const [ua, setUa] = useState("");
    const [ru, setRu] = useState("");
    const { AddFAQ } = useAction();
    return (
        <div className='admin-panel-faq'>
            <div className='admin-block-faq'>
                <h1>
                    Українська версія
                </h1>
                <div className='admin-faq-input'>
                    <p>Назва</p>
                    <input onChange={e => setNameUa(e.target.value)} value={nameUa} />
                </div>
                <br />
                <Editor value={ua}
                    apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                    onEditorChange={(newText) => setUa(newText)}
                />
                <h1>Російська версія</h1>
                <div className='admin-faq-input'>
                    <p>Назва</p>
                    <input onChange={e => setNameRu(e.target.value)} value={nameRu} />
                </div>
                <br />
                <Editor value={ru}
                    apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                    onEditorChange={(newText) => setRu(newText)}
                />
                <br />
                <button onClick={() => AddFAQ(ua, ru, nameUa, nameRu)}>Добавити</button>
            </div>
        </div>
    )
}

export default FAQEdit