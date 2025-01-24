import {useState } from "react";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Login(){

const [password, setPassword] = useState('');
const [login, setLogin] = useState('');

const navigate = useNavigate();

const URL = "https://localhost:7014/employee";

async function Auth(password, login){
    if(!password || !login) {alert('Поля не заполнены'); return}

    await fetch(URL,{
        method: "GET",
    }).then(response =>{
        return response.json();
    }).then(data => {
        data.map(d => {
            if(d.email === login && d.emp_password === password) 
            {
                localStorage.setItem('Token', true);
                localStorage.setItem('Body', JSON.stringify(d));
                if(d.emp_position === 'Админ') {navigate('/admin'); localStorage.setItem('Admin', true)}
                else navigate('/')
            }
            else {return; }
        })
    }).catch(error => {
        alert('Ошибка: ' + error)
    })
}

    return(
        <div className="container">
            <section className="authorization">
                <table>
                    <tr>
                        <label>Логин</label>
                        <input type="text" placeholder="Логин" name="email" onChange={(e) => {setLogin(e.target.value)}}></input>
                    </tr>
                    <tr>
                        <label>Пароль</label>
                        <input type="password" placeholder="Пароль" name="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                    </tr>
                    <Button onClick={() => Auth(password, login)}>Войти</Button>
                </table>
            </section>
        </div>
    )
}