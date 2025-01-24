import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export default function AddEmployee(){

    const navigate = useNavigate();
    const URL = "https://localhost:7014/employee/";

    async function handleSubmit(event){

        event.preventDefault();

        const formData = new FormData(event.target);
        const employee = Object.fromEntries(formData.entries());

        if(!employee.firstname || !employee.lastname || !employee.secondname || !employee.emp_position || !employee.salary || !employee.email || !employee.emp_password){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname: employee.firstname,
                    lastname: employee.lastname,
                    secondname: employee.secondname,
                    emp_position: employee.emp_position,
                    salary: employee.salary,
                    email: employee.email,
                    statys: TRUE,
                    emp_password: employee.emp_password
                })
            })

            await response.json();
            if(response.ok) navigate("/employee");
            if(response.status === 400){
                alert("Ошибка заполнения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу" + error)
        }
    }

    return(
        <div className="CRUD">
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
                            <label>Должность</label>
                            <input type="text" name="emp_position"></input>
                        </tr>
                        <tr>
                            <label>Зарплата</label>
                            <input type="number" name="salary"></input>
                        </tr>
                        <tr>
                            <label>Почта</label>
                            <input type="text" name="email"></input>
                        </tr>
                        <tr>
                            <label>Пароль</label>
                            <input type="text" name="emp_password"></input>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    )
}