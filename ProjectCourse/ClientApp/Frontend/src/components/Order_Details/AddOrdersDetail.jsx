import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const URL = "https://localhost:7014/orderdetail/";

export default function AddOrdersDetail(){

    const navigate = useNavigate();

    async function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const order = Object.fromEntries(formData.entries());

        if(!order.id_stack || (!order.id_delivery || !order.id_order)){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_stack: order.id_stack,
                    id_delivery: order.id_delivery,
                    id_order: order.id_order
                })
            })

            await response.json();
            if(response.ok) navigate("employee/users/orders");
            if(response.status === 400){
                alert("Ошибка заполнения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу " + error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <label>ID препарата</label>
                            <input type="number" name="id_stack"></input>
                        </tr>
                        <tr>
                            <label>ID поставки</label>
                            <input type="number" name="id_delivery"></input>
                        </tr>
                        <tr>
                            <label>ИЛИ</label>
                        </tr>
                        <tr>
                            <label>ID заказа</label>
                            <input type="text" name="id_order"></input>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    )
}