import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/orderdetail/";

export default function DropOrderDetail(){
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
                <label>ID - {initialData.id_detail}</label>
                <table>
                    <tbody>
                    <tr>
                            <label>ID медикаментов</label>
                            <input type="number" name="id_customer" defaultValue={initialData.id_stack}></input>
                        </tr>
                        <tr>
                            <label>ID поставки</label>
                            <input type="number" name="total_cost" defaultValue={initialData.id_delivery}></input>
                        </tr>
                        <tr>
                            <label>ID заказа</label>
                            <input type="number" name="address" defaultValue={initialData.id_order}></input>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" onClick={() => deleteOrder(initialData.id_detail)}>Удалить</button>
            </form>
            }
        </div>
        </>
    )
}