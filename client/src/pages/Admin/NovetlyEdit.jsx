import React from 'react'
import { useState } from 'react'
import { useAction } from '../../hooks/useAction';

const NovetlyEdit = () => {
    const [image, setImage] = useState();
    const [ua, setUa] = useState("");
    const [ru, setRu] = useState("");
    const { AddNovetly } = useAction();
    return (
        <div className='admin-panel-novetly'>
            <div className='admin-block-novetly'>
                <p>Виберіть фотографію країни</p>
                <div>
                    <input type="file" id="visitorphoto" name="visitorPhoto" accept="image/*" capture onChange={e => setImage(e.target.files?.[0])} />
                </div>
                <h1>
                    Українська версія
                </h1>
                <input onChange={(e) => setUa(e.target.value)} value={ua} />
                <h1>
                    Російська версія
                </h1>
                <input onChange={(e) => setRu(e.target.value)} value={ru} /><br />
                <br />
                <button onClick={() => AddNovetly(ua, ru, image)}>Добавити</button>
            </div>
        </div>
    )
}

export default NovetlyEdit