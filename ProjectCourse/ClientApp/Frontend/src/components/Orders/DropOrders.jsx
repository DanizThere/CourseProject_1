import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/order/";

export default function DropOrders(){
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

    function deleteOrder(id){
        fetch(URL + id,{
            method: "DELETE", 
        })
        .then(response => {
            if(!response.ok){
                throw new Error()
            }

            navigate("/employee/users/orders")
        })
        .catch(error => {
            alert("Ошибка в подключении к серверу - " + error)
        })
    }

    return(
        <>
        <Head titleName={"Удалить заказ"}></Head>
        <div>
            <h2>Удалить заказ</h2>
            { initialData && <form>
                <label>ID - {initialData.id_order}</label>
                <table>
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
                    </tbody>
                </table>
                <button type="submit" onClick={() => deleteOrder(initialData.id_order)}>Удалить</button>
            </form>
            }
        </div>
        </>
    )
}