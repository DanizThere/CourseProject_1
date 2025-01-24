import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const URL = "https://localhost:7014/user/";

export default function AddUser(){

    const navigate = useNavigate();
    async function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const user = Object.fromEntries(formData.entries());

        if(!user.firstname || !user.lastname || !user.secondname || !user.address || !user.email || !user.cust_password){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    score: 0,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    secondname: user.secondname,
                    address: user.address,
                    cust_password: user.cust_password,
                    email: user.email
                })
            })

            await response.json();
            if(response.ok) navigate("/employee/users");
            if(response.status === 400){
                alert("Ошибка заполнения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу - " + error)
        }
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <label>Имя</label>
                            <input type="text" name="firstname"></input>
                        </tr>
                        <tr>
                            <label>Фамилия</label>
                            <input type="text" name="lastname"></input>
                        </tr>
                        <tr>
                            <label>Отчество</label>
                            <input type="text" name="secondname"></input>
                        </tr>
                        <tr>
                            <label>Адрес</label>
                            <input type="text" name="address"></input>
                        </tr>
                        <tr>
                            <label>Почта</label>
                            <input type="text" name="email"></input>
                        </tr>
                        <tr>
                            <label>Пароль</label>
                            <input type="text" name="cust_password"></input>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    )
}