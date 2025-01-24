import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/user/";

export default function UpdateUser(){
    const [initialData, setInitialData] = useState()

    const navigate = useNavigate();
    const params = useParams();

    function getData(){
        fetch(URL + params.userId)
        .then(response => {
            if(response.ok) {return response.json();}

            throw new Error()
        })
        .then(data => {
            setInitialData(data);
        })
        .catch(error => {
            alert("Невозможно получить данные")
        })
    }

    useEffect(getData,[])

    async function handleEdit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const user = Object.fromEntries(formData.entries());

        if(!user.firstname || !user.lastname || !user.secondname || !user.address || !user.email || !user.cust_password){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "PATCH",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_customer: initialData.id_customer,
                    score: initialData.score,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    secondname: user.secondname,
                    address: user.address,
                    cust_password: user.cust_password,
                    email: user.email
                })
            })

            await response.json();
            if(response.ok) navigate("/catalog/users");
            if(response.status === 400){
                alert("Ошибка изменения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу" + error)
        }
    }

    return(
        <>
        <Head titleName={ "Изменить данные пользователя"}></Head>
        <div>
            <h2>Изменить данные пользователя</h2>
            { initialData && <form onSubmit={handleEdit}>
                <label>ID - {initialData.id_customer}</label>
                <table>
                    <tbody>
                        <tr>
                            <label>Имя</label>
                            <input type="text" name="firstname" defaultValue={initialData.firstname}></input>
                        </tr>
                        <tr>
                            <label>Фамилия</label>
                            <input type="text" name="lastname" defaultValue={initialData.lastname}></input>
                        </tr>
                        <tr>
                            <label>Отчество</label>
                            <input type="text" name="secondname" defaultValue={initialData.secondname}></input>
                        </tr>
                        <tr>
                            <label>Адрес</label>
                            <input type="text" name="address" defaultValue={initialData.address}></input>
                        </tr>
                        <tr>
                            <label>Почта</label>
                            <input type="text" name="email" defaultValue={initialData.email}></input>
                        </tr>
                        <tr>
                            <label>Пароль</label>
                            <input type="text" name="cust_password" defaultValue={initialData.cust_password}></input>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Изменить</button>
            </form>
            }
        </div>
        </>
    )
}