import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/user/";

export default function DropUser(){
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
            navigate("/employee/users")
        })
    }

    useEffect(getData,[])

    function deleteRow(id){
        fetch(URL + id,{
            method: "DELETE", 
        })
        .then(response => {
            if(!response.ok){
                throw new Error()
            }            
        })
        .catch(error => {
            alert("Ошибка в подключении к серверу - " + error)
        })
    }

    return(
        <>
        <Head titleName={ "Удалить пользователя"}></Head>
        <div>
            <h2>Удалить пользователя</h2>
            { initialData && <form>
                <label>ID - {initialData.id_user}</label>
                <table>
                    <tbody>
                        <tr>
                            <label>Имя</label>
                            <input type="text" name="firstname" defaultValue={initialData.firstname} readOnly></input>
                        </tr>
                        <tr>
                            <label>Фамилия</label>
                            <input type="text" name="lastname" defaultValue={initialData.lastname} readOnly></input>
                        </tr>
                        <tr>
                            <label>Отчество</label>
                            <input type="text" name="secondname" defaultValue={initialData.secondname} readOnly></input>
                        </tr>
                        <tr>
                            <label>Адрес</label>
                            <input type="text" name="address" defaultValue={initialData.address} readOnly></input>
                        </tr>
                        <tr>
                            <label>Почта</label>
                            <input type="text" name="email" defaultValue={initialData.email} readOnly></input>
                        </tr>
                        <tr>
                            <label>Пароль</label>
                            <input type="text" name="cust_password" defaultValue={initialData.cust_password} readOnly></input>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" onClick={() => deleteRow(initialData.id_customer)}>Удалить</button>
            </form>
            }
        </div>
        </>
    )
}