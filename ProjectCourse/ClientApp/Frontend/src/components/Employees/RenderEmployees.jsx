import { useEffect, useState } from "react";
import Button from "../Button/Button";

const URL = "https://localhost:7014/employee/";

export default function RenderEmployees(){
    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState([]);

    async function fetchEmployees() {
        setLoading(true);
        const response = await fetch(URL);
        const empl = await response.json();
        setEmployee(empl);
        setLoading(false);
    }

    useEffect(() => {
        fetchEmployees();
    },[])

    return(
        <section className="renders">
            {loading && <p>Loading...</p>}
            {!loading && <ul className="list">
                {employee.map(emp => <li key={emp.id_employee} className="info">{emp.lastname} {emp.firstname} {emp.secondname}, {emp.emp_position} <Button onClick={() => navigate("/employee/edit/"+emp.id_employee)}>Изменить данные</Button><Button onClick={() => navigate("/employee/delete/"+emp.id_employee)}>Удалить сотрудника</Button></li>)}
            </ul> }
            <Button onClick={() => navigate('/employee/add')}>Добавить сотрудника</Button>
        </section>
    )
}