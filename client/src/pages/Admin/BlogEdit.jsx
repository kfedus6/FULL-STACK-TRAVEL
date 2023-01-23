import { Editor } from '@tinymce/tinymce-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAction } from '../../hooks/useAction';

const BlogEdit = () => {
    const [image, setImage] = useState(undefined);
    const [nameUa, setNameUa] = useState("");
    const [nameRu, setNameRu] = useState("");
    const [miniDescriptionUA,setMiniDescriptionUA]=useState("");
    const [miniDescriptionRU,setMiniDescriptionRU]=useState("");
    const [ua, setUa] = useState("");
    const [ru, setRu] = useState("");
    const { AddBlog } = useAction();
    const newReteladFlight=()=>{
        setRetaledFlight([...retaledFlight,{whence:[newWhenceUA,newWhenceRU].join("//"),
            whither:[newWhitherUA,newWhitherRU].join("//")}]);
    }
    const [retaledFlight,setRetaledFlight]=useState([]);
    const [newWhenceUA,setNewWhenceUA]=useState("");
    const [newWhitherUA,setNewWriterUA]=useState("");
    const [newWhenceRU,setNewWhenceRU]=useState("");
    const [newWhitherRU,setNewWriterRU]=useState("");
    useEffect(()=>{

    },[retaledFlight]);
    console.log(retaledFlight);
    return (
        <div className="admin-panel-blog">
            <div className='admin-blok-blog'>
                <span>Виберіть фотографію для статі</span>
                <div className='blog__edit__set__photo'>
                    <input type="file" id="visitorphoto" name="visitorPhoto" accept="image/*" capture onChange={e => setImage(e.target.files?.[0])} />
                </div>
                <h1>
                    Українська версія
                </h1>
                <div className='admin-blog-input'>
                    <p>Назва</p>
                    <input maxLength={60} onChange={e => setNameUa(e.target.value)} value={nameUa} />
                </div>
                <div className='admin__blog__related__flight'>
                    <p>міні опис</p>
                    <input maxLength={252} onChange={e => setMiniDescriptionUA(e.target.value)} value={miniDescriptionUA} />
                </div>

                <br />
                <Editor value={ua}
                    apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                    onEditorChange={(newText) => setUa(newText)}
                />
                <h1>Російська версія</h1>
               
                <div className='admin-blog-input'>
                    <p>Назва</p>
                    <input maxLength={60} onChange={e => setNameRu(e.target.value)} value={nameRu} />
                </div> 
                <div className='admin__blog__related__flight'>
                    <p>міні опис</p>
                    <input maxLength={252} onChange={e => setMiniDescriptionRU(e.target.value)} value={miniDescriptionRU} />
                </div>
                <br />
                <Editor value={ru}
                    apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                    onEditorChange={(newText) => setRu(newText)}
                />
                <br />
                
                <p>повязані рейси</p>
                <div className="admin__blog__related__flight">
                    <p>звідки ua</p>
                    <input maxLength={25} onChange={e => setNewWhenceUA(e.target.value)} value={newWhenceUA} />
                    <p>куди ua</p>
                    <input maxLength={25} onChange={e => setNewWriterUA(e.target.value)} value={newWhitherUA} />
                    <p>звідки ru</p>
                    <input maxLength={25} onChange={e => setNewWhenceRU(e.target.value)} value={newWhenceRU} />
                    <p>куди ru</p>
                    <input maxLength={25} onChange={e => setNewWriterRU(e.target.value)} value={newWhitherRU} />
                    <button onClick={()=>newReteladFlight()}>add</button>                    
                </div>
                <select>
                    {retaledFlight.map((x,idx)=>
                        <option key={idx}>{x.whence}-{x.whither}</option>
                        )}
                </select>
                <button onClick={() => AddBlog(ua, ru, image, [nameUa, nameRu].join("//"),[miniDescriptionUA,miniDescriptionRU].join("//"),retaledFlight)}>Добавити</button>
            </div>
        </div>
    )
}

export default BlogEdit