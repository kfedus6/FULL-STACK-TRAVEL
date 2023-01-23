import { Editor } from '@tinymce/tinymce-react';
import React, { useState } from 'react'
import { useAction } from '../../hooks/useAction';

const FlightsEdit = () => {

    const { AddFlight } = useAction();

    const [flagStartImg, setFlagStartImg] = useState(undefined);
    const [flagFinishImg, setFlagFinishImg] = useState(undefined);
    const [newStartDate, setNewStartDate] = useState('');
    const [newFinishDate, setNewFinishDate] = useState('');
    const [price, setPrice] = useState('');
    const [childPrice, setChildPrice] = useState('');
    const [startPositionUA, SetStartPositionUA] = useState('');
    const [finishPositionUA, SetFinishPositionUA] = useState('');
    const [startPositionRU, SetStartPositionRU] = useState('');
    const [finishPositionRU, SetFinishPositionRU] = useState('');
    const [streetStartPositionUA, setStreetStartPositionUA] = useState('');
    const [streetFinishPositionUA, setStreetFinishPositionUA] = useState('');
    const [streetStartPositionRU, setStreetStartPositionRU] = useState('');
    const [streetFinishPositionRU, setStreetFinishPositionRU] = useState('');
    const [startTime, setStartTime] = useState('');
    const [finishTime, setFinishTime] = useState('');
    const [countFreePlace, setCountFreePlace] = useState(1);
    const [timeFlightUA, setTimeFlightUA] = useState('');
    const [timeFlightRU, setTimeFlightRU] = useState('');
    const [descriptionUa, setDescriptionUa] = useState('');
    const [descriptionRu, setDescriptionRu] = useState('');
    const [isWifi, setIsWifi] = useState(false);
    const [isWC, setIsWC] = useState(false);
    const [is220V, setIs200V] = useState(false);
    const [isMultimedia, setIsMultimedia] = useState(false);
    const [isAirConditioning, setIsAirConditioning] = useState(false);
    const [map, setMap] = useState("");

    const newFlight = () => {
        let startDate = newStartDate.split('-')
        startDate = `${startDate[2]}.${startDate[1]}.${startDate[0]}`
        let finishDate = newFinishDate.split('-')
        finishDate = `${finishDate[2]}.${finishDate[1]}.${finishDate[0]}`

        AddFlight(flagStartImg, flagFinishImg, price, childPrice, startPositionUA, startPositionRU, finishPositionUA,
            finishPositionRU, streetStartPositionUA, streetStartPositionRU, streetFinishPositionUA, streetFinishPositionRU,
            startDate, finishDate, startTime, finishTime, timeFlightUA, timeFlightRU,
            countFreePlace, isWifi, isWC, is220V, isMultimedia, isAirConditioning,
            descriptionUa, descriptionRu, map)
    }

    return (
        <div className='admin-panel-flight'>
            <div className='admin-block-flight'>
                <div>
                    <p>Фотографія прапору рейсу виїзду (обов'язково):</p>
                    <input type="file" id="visitorphoto" name="visitorPhoto" accept="image/*" capture onChange={e => { setFlagStartImg(e.target.files?.[0]) }} />
                </div>
                <div>
                    <p>Фотографія прапору рейсу приїзду (обов'язково):</p>
                    <input type="file" id="visitorphoto" name="visitorPhoto" accept="image/*" capture onChange={e => { setFlagFinishImg(e.target.files?.[0]) }} />
                </div>
                <div>
                    <p>Місто виїзду укр:</p>
                    <input type='text' value={startPositionUA} onChange={e => SetStartPositionUA(e.target.value)} />
                </div>
                <div>
                    <p>Місто приїзду укр:</p>
                    <input type='text' value={finishPositionUA} onChange={(e) => SetFinishPositionUA(e.target.value)} />
                </div>
                <div>
                    <p>Місто виїзду рос:</p>
                    <input type='text' value={startPositionRU} onChange={e => SetStartPositionRU(e.target.value)} />
                </div>
                <div>
                    <p>Місто приїзду рос:</p>
                    <input type='text' value={finishPositionRU} onChange={(e) => SetFinishPositionRU(e.target.value)} />
                </div>
                <div>
                    <p>Вулиця посадки укр:</p>
                    <input type='text' value={streetStartPositionUA} onChange={(e) => setStreetStartPositionUA(e.target.value)} />
                </div>
                <div>
                    <p>Вулиця висадки укр:</p>
                    <input type='text' value={streetFinishPositionUA} onChange={(e) => setStreetFinishPositionUA(e.target.value)} />
                </div>
                <div>
                    <p>Вулиця посадки рос:</p>
                    <input type='text' value={streetStartPositionRU} onChange={(e) => setStreetStartPositionRU(e.target.value)} />
                </div>
                <div>
                    <p>Вулиця висадки рос:</p>
                    <input type='text' value={streetFinishPositionRU} onChange={(e) => setStreetFinishPositionRU(e.target.value)} />
                </div>
                <div>
                    <p>Дата відправлення:</p>
                    <input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />
                </div>
                <div>
                    <p>Дата прибуття:</p>
                    <input type="date" value={newFinishDate} onChange={(e) => setNewFinishDate(e.target.value)} />
                </div>
                <div>
                    <p>Ціна квитка в грн</p>
                    <input value={price} type="number" onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <p>Дитяча ціна квитка в грн</p>
                    <input value={childPrice} type="number" onChange={e => setChildPrice(e.target.value)} />
                </div>
                <div>
                    <p>Година виїзду:</p>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div>
                    <p>Година приїзду</p>
                    <input type="time" value={finishTime} onChange={(e) => setFinishTime(e.target.value)} />
                </div>
                <div>
                    <p>Кількість вільних місць:</p>
                    <input type="number" min={1} onChange={e => setCountFreePlace(e.target.value)} value={countFreePlace} />
                </div>
                <div>
                    <p>Тривалість рейсу укр</p>
                    <input type='text' value={timeFlightUA} onChange={e => setTimeFlightUA(e.target.value)} />
                </div>
                <div>
                    <p>Тривалість рейсу рос</p>
                    <input type='text' value={timeFlightRU} onChange={e => setTimeFlightRU(e.target.value)} />
                </div>
                <p>Wi-Fi:<input onChange={() => setIsWifi(!isWifi)} type="checkbox" /></p>
                <p>Туалет:<input onChange={() => setIsWC(!isWC)} type="checkbox" /></p>
                <p>Розетка:<input onChange={() => setIs200V(!is220V)} type="checkbox" /></p>
                <p>Мультимедія:<input onChange={() => setIsMultimedia(!isMultimedia)} type="checkbox" /></p>
                <p>Кондиціонер:<input onChange={() => setIsAirConditioning(!isAirConditioning)} type="checkbox" /></p>
                <p>Опис українською</p>
                <Editor value={descriptionUa}
                    apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                    onEditorChange={(newText) => setDescriptionUa(newText)}
                />
                <p>Опис россійською</p>
                <Editor value={descriptionRu}
                    apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
                    onEditorChange={(newText) => setDescriptionRu(newText)}
                />
                <div>
                    <p>Силка на карту</p>
                    <input value={map} onChange={e => setMap(e.target.value)} />
                </div>
                <br />
                <div>
                    <button onClick={newFlight}>Добавити</button>
                </div>
            </div>
        </div>
    )
}

export default FlightsEdit;
