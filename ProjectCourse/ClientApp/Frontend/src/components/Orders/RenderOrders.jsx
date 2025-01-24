import { useEffect, useState } from "react";
import Button from "../Button/Button";

const URL = "https://localhost:7014/order/";

export default function RenderOrders(){
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    async function fetchOrders() {
        setLoading(true);
        const response = await fetch(URL);
        const order = await response.json();
        setOrders(order);
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    },[])

    return(
        <section className="renders">
            {loading && <p>Loading...</p>}
            {!loading && <ul className="list">
                {orders.map(order => <li key={order.id_order} className="info">{order.id_customer} - {order.address}, {order.total_cost}руб. <Button onClick={() => navigate("/employee/users/orders/edit/"+order.id_order)}>Изменить данные</Button><Button onClick={() => navigate("/employee/users/orders/delete/"+order.id_order)}>Удалить заказ</Button></li>)}
            </ul> }
            <Button onClick={() => navigate('/employee/users/orders/add')}>Добавить заказ</Button>
        </section>
    )
}