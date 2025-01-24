import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/orderdetail/";

export default function UpdateOrderDetail(){
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

        if(!order.id_stack || (!order.id_delivery || !order.id_order)){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "PATCH",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_detail: initialData.id_detail,
                    id_stack: order.id_stack,
                    id_delivery: order.id_delivery,
                    id_order: order.id_order
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
                    <label>ID - {initialData.id_detail}</label>
                    <tbody>
                        <tr>
                            <label>ID медикаментов</label>
                            <input type="number" name="id_stack" defaultValue={initialData.id_stack}></input>
                        </tr>
                        <tr>
                            <label>ID поставки</label>
                            <input type="number" name="id_delivery" defaultValue={initialData.id_delivery}></input>
                        </tr>
                        <tr>
                            <label>ID заказа</label>
                            <input type="number" name="id_order" defaultValue={initialData.id_order}></input>
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