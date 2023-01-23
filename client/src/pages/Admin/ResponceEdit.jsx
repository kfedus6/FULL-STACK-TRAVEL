import React from 'react'
import { useState } from 'react'
import { useAction } from '../../hooks/useAction';

const ResponceEdit = () => {
    const [nameAuthor, setNameAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [whereToWhere,setWhereToWhere]=useState("");
    const [image,setImage]=useState(undefined);
    const { AddResponce } = useAction();
    return (
        <div className='admin-panel-response'>
            <div className='admin-block-response'>
                <p>Імя автор письма</p>
                <input value={nameAuthor} onChange={(e) => setNameAuthor(e.target.value)} />
                <p>звідки-куди</p>
                <input value={whereToWhere} onChange={(e) => setWhereToWhere(e.target.value)} />
                <p>фотографія</p>
                <div className='blog__edit__set__photo'>
                    <input type="file" id="visitorphoto" name="visitorPhoto" accept="image/*" capture onChange={e => setImage(e.target.files?.[0])} />
                </div>
                <p>Опис</p>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <br />
                <button onClick={() => AddResponce(nameAuthor, whereToWhere, image, description)}>Добавити</button>
            </div>
        </div>
    )
}

export default ResponceEdit