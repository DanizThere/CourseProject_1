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

    async function handleEdit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const med = Object.fromEntries(formData.entries());

        if(!med.meds_naming || !med.quantity || !med.meds_cost || !med.date_of_create || !med.exp_time || !med.dozen){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "PATCH",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_stack: params.catalogId,
                    meds_naming: med.meds_naming,
                    quantity: med.quantity,
                    meds_cost: med.meds_cost,
                    date_of_create: med.date_of_create,
                    exp_time: med.exp_time,
                    dozen: med.dozen
                })
            })

            await response.json();
            if(response.ok) navigate("/employee/catalog");
            if(response.status === 400){
                alert("Ошибка изменения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу - " + error)
        }
    }

    return(
        <>
        {!token && navigate('/')}
        <Head titleName={ "Изменить лекарства"}></Head>
        <div className="CRUD">
            <h2>Изменить лекарства</h2>
            { initialData && <form onSubmit={handleEdit}>
                <label>ID - {initialData.id_stack}</label>
                <div >
                    <label>Название</label>
                    <input type="text" name="meds_naming" defaultValue={initialData.meds_naming}></input>
                </div>
                <div >
                    <label>Цена</label>
                    <input type="number" name="meds_cost" defaultValue={initialData.meds_cost}></input>
                </div>
                <div >
                    <label>Количество</label>
                    <input type="number" name="quantity" defaultValue={initialData.quantity}></input>
                </div>
                <div >
                    <label>Дата производства</label>
                    <input type="date" name="date_of_create" defaultValue={initialData.date_of_create}></input>
                </div>
                <div >
                    <label>Срок годности (в годах)</label>
                    <input type="number" name="exp_time" defaultValue={initialData.exp_time}></input>
                </div>
                <div >
                    <label>Дозировка (в мг)</label>
                    <input type="number" name="dozen" defaultValue={initialData.dozen}></input>
                </div>
                <button type="submit">Изменить</button>
            </form>
            }
        </div>
        </>
    )
}