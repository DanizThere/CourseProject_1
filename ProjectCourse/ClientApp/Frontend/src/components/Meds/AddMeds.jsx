import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const URL = "https://localhost:7014/catalogue/";

export default function AddMeds(){

    const navigate = useNavigate();
    async function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const med = Object.fromEntries(formData.entries());

        if(!med.meds_naming || !med.quantity || !med.meds_cost || !med.date_of_create || !med.exp_time || !med.dozen){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    meds_naming: med.meds_naming,
                    quantity: med.quantity,
                    meds_cost: med.meds_cost,
                    date_of_create: med.date_of_create,
                    exp_time: med.exp_time,
                    dozen: med.dozen
                })
            })

            await response.json();
            if(response.ok) navigate("employee/catalog");
            if(response.status === 400){
                alert("Ошибка заполнения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу - " + error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <label>Название</label>
                            <input type="text" name="meds_naming"></input>
                        </tr>
                        <tr>
                            <label>Цена</label>
                            <input type="number" name="meds_cost"></input>
                        </tr>
                        <tr>
                            <label>Количество</label>
                            <input type="text" name="quantity"></input>
                        </tr>
                        <tr>
                            <label>Срок годности (в месяцах)</label>
                            <input type="text" name="exp_time"></input>
                        </tr>
                        <tr>
                            <label>Дозировка (в мг)</label>
                            <input type="number" name="dozen"></input>
                        </tr>
                        <tr>
                            <label>Дата производства</label>
                            <input type="date" name="date_of_create"></input>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    )
}