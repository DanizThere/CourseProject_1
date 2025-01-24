import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/delivery/";

export default function UpdateDelivery(){
    const [initialData, setInitialData] = useState()

    const navigate = useNavigate();
    const params = useParams();

    function getData(){
        fetch(URL + params.deliveryId)
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
        const delivery = Object.fromEntries(formData.entries());

        if(!delivery.id_employee || !delivery.meds_cost || !delivery.date_of_delivery){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "PATCH",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_delivery: initialData.id_delivery,
                    id_employee: delivery.id_employee,
                    meds_cost: delivery.meds_cost,
                    date_of_delivery: delivery.date_of_delivery,
                    statys: delivery.statys
                })
            })

            await response.json();
            if(response.ok) navigate("/employee/users/delivery");
            if(response.status === 400){
                alert("Ошибка изменения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу" + error)
        }
    }

    return(
        <>
        <Head titleName={ "Изменить поставки"}></Head>
        <div>
            <h2>Изменить поставки</h2>
            { initialData && <form onSubmit={handleEdit}>
                <table>
                    <label>ID - {initialData.id_delivery}</label>
                    <tbody>
                        <tr>
                            <label>ID сотрудника</label>
                            <input type="number" name="id_delivery" defaultValue={initialData.id_delivery}></input>
                        </tr>
                        <tr>
                            <label>Итоговая цена</label>
                            <input type="number" name="total_cost" defaultValue={initialData.total_cost}></input>
                        </tr>
                        <tr>
                            <label>Дата заказа</label>
                            <input type="date" name="date_of_delivery" defaultValue={initialData.date_of_delivery}></input>
                        </tr>
                    </tbody>
                    <button type="submit">Изменить</button>
                </table>
                
            </form>
            }
        </div>
        </>
    )
}