import { useEffect, useState } from "react";
import Button from "../Button/Button";

const URL = "https://localhost:7014/delivery/";

export default function RenderDelivery(){
    const [loading, setLoading] = useState(false);
    const [delivery, SetDelivery] = useState([]);

    async function fetchDelivery() {
        setLoading(true);
        const response = await fetch(URL);
        const del = await response.json();
        SetDelivery(del);
        setLoading(false);
    }

    useEffect(() => {
        fetchDelivery();
    },[])

    return(
        <section>
            {loading && <p>Loading...</p>}
            {!loading && <ul className="list">
                    {delivery.map(del => <li key={del.id_delivery} className="info">{del.id_employee}, {del.total_cost}руб. <Button onClick={() => navigate("/employee/delivery/edit/"+del.id_delivery)}>Изменить данные</Button><Button onClick={() => navigate("/employee/delivery/delete/"+del.id_delivery)}>Удалить поставку</Button></li>)}
            </ul> }
            <Button onClick={() => navigate('/employee/delivery/add')}>Добавить поставку</Button>
        </section>
    )
}