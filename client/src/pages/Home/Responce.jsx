import { t } from 'i18next'
import React, { useRef, useState } from "react";
import { useSelector } from 'react-redux'
import { useAction } from "../../hooks/useAction";
import { useEffect } from 'react';
import { Pagination, Navigation } from "swiper";
import { FaUserCircle } from 'react-icons/fa';
const Responce = () => {
    const { GetResponceNovetly, DelResponce } = useAction()
    const { novetlyResponce } = useSelector(state => state.responce);
    const { is_admin } = useSelector(state => state.user);
    useEffect(() => {
        GetResponceNovetly();
    }, [])
    const [novetlyResponce1,setNovetlyResponce1]=useState();
    const [novetlyResponce2,setNovetlyResponce2]=useState();
    const [novetlyResponce3,setNovetlyResponce3]=useState();
    const [novetlyResponce4,setNovetlyResponce4]=useState();
    const [novetlyResponce5,setNovetlyResponce5]=useState();
    useEffect(()=>{
        if(novetlyResponce!=undefined){
            setNovetlyResponce1(novetlyResponce.filter((x,idx)=>idx<(novetlyResponce.length/3)));
            setNovetlyResponce2(novetlyResponce.
                filter((x,idx)=>(idx<=Math.round((novetlyResponce.length/2))&&idx>=novetlyResponce.length/3)));
            setNovetlyResponce3(novetlyResponce.filter((x,idx)=>idx>Math.ceil((novetlyResponce.length/2))));
            setNovetlyResponce4(novetlyResponce.filter((x,idx)=>idx<Math.ceil(novetlyResponce.length/2)-1));
            setNovetlyResponce5(novetlyResponce.filter((x,idx)=>{
                if(novetlyResponce%2==0){
                    return (idx>(novetlyResponce.length/2));
                }else{
                    return (idx>(novetlyResponce.length-1)/2);
                }
            }))
        }
    },[novetlyResponce])
    
    return (
        novetlyResponce == undefined ||novetlyResponce1==undefined||novetlyResponce2==undefined||
            novetlyResponce3==undefined ||novetlyResponce4==undefined||novetlyResponce5==undefined?
            <div>loading...</div> : novetlyResponce.length == 0 ? <></> 
            :
            <div className='responce__main'>
                <div className="responce__container">
                    <h1>{t("home.responce")}</h1>
                    <div className="list__responce">
                        <div className="list__responce__collum no__with__480__to__768">
                            {novetlyResponce1.map(x=>
                                <div key={x.id} className='responce'>
                                    {is_admin?<button onClick={()=>DelResponce(x.id)}>del</button>:<></>}
                                    <div className="responce__content">
                                        <div className="img__with__name__and__where__to__where">
                                            <div className="responce__img">
                                                <img src={process.env.REACT_APP_API_URL+x.imageAuthor}/>
                                            </div>
                                            <div className="name__with__where__to__where">
                                                <div className="name__author">
                                                    {x.nameAuthor}
                                                </div>
                                                <div className="where_to__where">
                                                    {x.wheretoWhere}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="responce__description">
                                            {x.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="list__responce__collum no__with__480__to__768">
                            {novetlyResponce2.map(x=>
                                <div key={x.id} className='responce'>
                                    {is_admin?<button onClick={()=>DelResponce(x.id)}>del</button>:<></>}
                                    <div className="responce__content">
                                        <div className="img__with__name__and__where__to__where">
                                            <div className="responce__img">
                                                <img src={process.env.REACT_APP_API_URL+x.imageAuthor}/>
                                            </div>
                                            <div className="name__with__where__to__where">
                                                <div className="name__author">
                                                    {x.nameAuthor}
                                                </div>
                                                <div className="where_to__where">
                                                    {x.wheretoWhere}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="responce__description">
                                            {x.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="list__responce__collum no__with__480__to__768">
                            {novetlyResponce3.map((x,idx)=>
                                <div key={x.id} className={idx==novetlyResponce3.length-1?"responce last":"responce"}>
                                    {is_admin?<button onClick={()=>DelResponce(x.id)}>del</button>:<></>}
                                    <div className="responce__content">
                                        <div className="img__with__name__and__where__to__where">
                                            <div className="responce__img">
                                                <img src={process.env.REACT_APP_API_URL+x.imageAuthor}/>
                                            </div>
                                            <div className="name__with__where__to__where">
                                                <div className="name__author">
                                                    {x.nameAuthor}
                                                </div>
                                                <div className="where_to__where">
                                                    {x.wheretoWhere}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="responce__description">
                                            {x.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="list__responce__collum with__480__to__768">
                            {novetlyResponce4.map((x,idx)=>    
                                <div key={x.id} className={idx==novetlyResponce3.length-1?"responce last":"responce"}>
                                    <div className="responce__content">
                                        <div className="img__with__name__and__where__to__where">
                                            <div className="responce__img">
                                                <img src={process.env.REACT_APP_API_URL+x.imageAuthor}/>
                                            </div>
                                            <div className="name__with__where__to__where">
                                                <div className="name__author">
                                                    {x.nameAuthor}
                                                </div>
                                                <div className="where_to__where">
                                                    {x.wheretoWhere}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="responce__description">
                                            {x.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="list__responce__collum with__480__to__768">
                            {novetlyResponce5.map((x,idx)=>
                            
                                <div key={x.id} className={idx==novetlyResponce3.length-1?"responce last":"responce"}>
                                    <div className="responce__content">
                                        <div className="img__with__name__and__where__to__where">
                                            <div className="responce__img">
                                                <img src={process.env.REACT_APP_API_URL+x.imageAuthor}/>
                                            </div>
                                            <div className="name__with__where__to__where">
                                                <div className="name__author">
                                                    {x.nameAuthor}
                                                </div>
                                                <div className="where_to__where">
                                                    {x.wheretoWhere}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="responce__description">
                                            {x.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Responce