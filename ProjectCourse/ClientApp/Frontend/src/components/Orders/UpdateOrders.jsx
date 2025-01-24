import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/order/";

export default function UpdateOrders(){
    const [initialData, setInitialData] = useState()

    const navigate = useNavigate();
    const params = useParams();

    function getData(){
        fetch(URL + params.orderId)
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
        const order = Object.fromEntries(formData.entries());

        if(!order.id_customer || !order.total_cost || !order.date_of_order || !order.address){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "PATCH",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_order: initialData.id_order,
                    id_customer: order.id_customer,
                    total_cost: order.total_cost,
                    statys: order.statys,
                    date_of_order: order.date_of_order,
                    address: order.address,
                })
            })

            await response.json();
            if(response.ok) navigate("/employee/users/orders");
            if(response.status === 400){
                alert("Ошибка изменения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу - " + error)
        }
    }

    return(
        <>
        <Head titleName={ "Изменить лекарства"}></Head>
        <div>
            <h2>Изменить лекарства</h2>
            { initialData && <form onSubmit={handleEdit}>
                <table>
                    <label>ID - {initialData.id_order}</label>
                    <tbody>
                        <tr>
                            <label>ID пользователя</label>
                            <input type="number" name="id_customer" defaultValue={initialData.id_customer}></input>
                        </tr>
                        <tr>
                            <label>Итоговая цена</label>
                            <input type="number" name="total_cost" defaultValue={initialData.total_cost}></input>
                        </tr>
                        <tr>
                            <label>Адрес</label>
                            <input type="number" name="address" defaultValue={initialData.address}></input>
                        </tr>
                        <tr>
                            <label>Дата заказа</label>
                            <input type="date" name="date_of_order" defaultValue={initialData.date_of_order}></input>
                        </tr>
                        <tr>
                            <label>Статус</label>
                            <input type="checkbox" name="statys" defaultValue={initialData.statys}></input>
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