import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../Head";

const URL = "https://localhost:7014/employee/";

export default function UpdateEmployee(){
    const [initialData, setInitialData] = useState()

    const navigate = useNavigate();
    const params = useParams();

    function getData(){
        fetch(URL + params.empId)
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
        const employee = Object.fromEntries(formData.entries());

        if(!employee.firstname || !employee.lastname || !employee.secondname || !employee.emp_position || !employee.salary || !employee.email || !employee.emp_password){
            alert("Поля не заполнены");
            return;
        }

        try {
            const response = await fetch(URL,{
                method: "PATCH",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_employee: params.empId,
                    firstname: employee.firstname,
                    lastname: employee.lastname,
                    secondname: employee.secondname,
                    emp_position: employee.emp_position,
                    salary: employee.salary,
                    email: employee.email,
                    emp_password: employee.emp_password
                })
            })

            await response.json();
            if(response.ok) navigate("/employee");
            if(response.status === 400){
                alert("Ошибка изменения данных")
            }

        } catch (error) {
            alert("Ошибка в подключении к серверу" + error)
        }
    }

    return(
        <>
        <Head titleName={ "Изменить данные сотрудника"}></Head>
        <div>
            <h2>Изменить данные сотрудника</h2>
            { initialData && <form onSubmit={handleEdit}>
                <label>ID - {initialData.id_employee}</label>
                <table>
                    <tbody>
                        <tr>
                            <label>Имя</label>
                            <input type="text" name="firstname" defaultValue={initialData.firstname}></input>
                        </tr>
                        <tr>
                            <label>Фамилия</label>
                            <input type="text" name="lastname" defaultValue={initialData.lastname}></input>
                        </tr>
                        <tr>
                            <label>Отчество</label>
                            <input type="text" name="secondname" defaultValue={initialData.secondname}></input>
                        </tr>
                        <tr>
                            <label>Должность</label>
                            <input type="text" name="emp_position" defaultValue={initialData.emp_position}></input>
                        </tr>
                        <tr>
                            <label>Зарплата</label>
                            <input type="number" name="salary" defaultValue={initialData.salary}></input>
                        </tr>
                        <tr>
                            <label>Почта</label>
                            <input type="text" name="email" defaultValue={initialData.email}></input>
                        </tr>
                        <tr>
                            <label>Пароль</label>
                            <input type="text" name="emp_password" defaultValue={initialData.emp_password}></input>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Изменить</button>
            </form>
            }
        </div>
        </>
    )
}