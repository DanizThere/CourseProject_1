import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/catalogue/";

export default function UpdateMeds(){
    const [initialData, setInitialData] = useState()
    const [token, setToken] = useState();
    const navigate = useNavigate();

    function getToken(){
        const t = localStorage.getItem('Admin');
        setToken(t);
    }

    useEffect(getToken,[]);
    const params = useParams();

    function getData(){
        fetch(URL + params.catalogId)
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


    function deleteMed(id){
        fetch(URL + id,{
            method: "DELETE", 
        })
        .then(response => {
            if(!response.ok){
                throw new Error()
            }

            navigate("/catalog")
        })
        .catch(error => {
            alert("Ошибка в подключении к серверу - " + error)
        })
    }

    return(
        <>
        <Head titleName={"Удалить лекарства"}></Head>
        {!token && navigate('/')}
        <div>
            <h2>Удалить лекарства</h2>
            { initialData && <form>
                <label>ID - {initialData.id_stack}</label>
                <table>
                    <tbody>
                        <tr>
                            <label>Название</label>
                            <input type="text" name="meds_naming" readOnly defaultValue={initialData.meds_naming}></input>
                        </tr>
                        <tr>
                            <label>Цена</label>
                            <input type="number" name="meds_cost" readOnly defaultValue={initialData.meds_cost}></input>
                        </tr>
                        <tr>
                            <label>Количество</label>
                            <input type="text" name="quantity" readOnly defaultValue={initialData.quantity}></input>
                        </tr>
                        <tr>
                            <label>Срок годности (в месяцах)</label>
                            <input type="text" name="exp_time" readOnly defaultValue={initialData.exp_time}></input>
                        </tr>
                        <tr>
                            <label>Дозировка (в мг)</label>
                            <input type="number" name="dozen" readOnly defaultValue={initialData.dozen}></input>
                        </tr>
                        <tr>
                            <label>Дата производства</label>
                            <input type="date" name="date_of_create" readOnly defaultValue={initialData.date_of_create}></input>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => deleteMed(initialData.id_stack)}>Удалить</button>
            </form>
            }
        </div>
        </>
    )
}