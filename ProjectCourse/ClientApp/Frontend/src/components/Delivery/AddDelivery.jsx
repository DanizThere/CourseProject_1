import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const URL = "https://localhost:7014/delivery/";

export default function AddDelivery(){

    const navigate = useNavigate();

    async function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const delivery = Object.fromEntries(formData.entries());

        if(!delivery.id_employee || !delivery.meds_cost || !delivery.date_of_delivery){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_employee: delivery.id_employee,
                    meds_cost: delivery.total_cost,
                    date_of_delivery: delivery.date_of_delivery
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
                            <label>ID работника</label>
                            <input type="number" name="id_employee"></input>
                        </tr>
                        <tr>
                            <label>Итоговая цена</label>
                            <input type="number" name="total_cost"></input>
                        </tr>
                        <tr>
                            <label>Дата заказа</label>
                            <input type="date" name="date_of_delivery"></input>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    )
}