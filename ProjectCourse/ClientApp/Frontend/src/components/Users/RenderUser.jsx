import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const URL = "https://localhost:7014/user/";

export default function RenderUser(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        setLoading(true);
        const response = await fetch(URL);
        const usr = await response.json();
        setUsers(usr);
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    },[])

    return(
        <section className="renders">
            {loading && <p>Loading...</p>}
            {!loading && <ul className="list">
                {users.map(user => <li key={user.id_customer} className="info">{user.lastname} {user.firstname} {user.secondname}, {user.score}руб. <Button onClick={() => navigate("/employee/users/edit/"+user.id_customer)}>Изменить данные</Button><Button onClick={() => navigate("/employee/users/delete/"+user.id_customer)}>Удалить пользователя</Button></li>)}
            </ul> }
            <Button onClick={() => navigate('/employee/users/add')}>Добавить пользователя</Button>
        </section>
    )
}