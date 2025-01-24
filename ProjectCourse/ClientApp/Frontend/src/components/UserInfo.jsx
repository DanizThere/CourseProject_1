import { useEffect, useState } from "react"
import Button from "./Button/Button";
import { useNavigate } from "react-router-dom";

export default function UserInfo(){
    const [info, setInfo] = useState();
    const navigate = useNavigate();
    function getInfo(){
        const body = JSON.parse(localStorage.getItem('Body'));

        if(body) {setInfo(body);}
        else alert('Ошибка');
    };

    useEffect(getInfo,[]);

    return(
        <>
        {info && <div className="userInfo">Приветствую, {info.firstname}.<Button onClick={() => {localStorage.removeItem('Token'); localStorage.removeItem('Admin'); navigate('/login')}}>Выйти</Button></div>}
        </>
    )
}