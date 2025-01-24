import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const URL = "https://localhost:7014/order/";

export default function AddOrders(){

    const navigate = useNavigate();

    async function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const order = Object.fromEntries(formData.entries());

        if(!order.id_customer || !order.total_cost || !order.date_of_order || !order.address){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_customer: order.id_customer,
                    total_cost: order.total_cost,
                    statys: false,
                    date_of_order: order.date_of_order,
                    address: order.address,
                })
            })

            await response.json();
            if(response.ok) navigate("employee/users/orders");
            if(response.status === 400){
                alert("Ошибка заполнения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу" + error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <label>ID пользователя</label>
                            <input type="number" name="id_customer"></input>
                        </tr>
                        <tr>
                            <label>Итоговая цена</label>
                            <input type="number" name="total_cost"></input>
                        </tr>
                        <tr>
                            <label>Адрес</label>
                            <input type="text" name="address"></input>
                        </tr>
                        <tr>
                            <label>Дата заказа</label>
                            <input type="date" name="date_of_order"></input>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    )
}