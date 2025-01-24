import { useEffect, useState } from "react";
import Button from "../Button/Button";

const URL = "https://localhost:7014/orderdetail/";

export default function RenderOrdersDetails(){
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    async function fetchDetails() {
        setLoading(true);
        const response = await fetch(URL);
        const detail = await response.json();
        setDetails(detail);
        setLoading(false);
    }

    useEffect(() => {
        fetchDetails();
    },[])

    return(
        <>
        <section className="renders">
            {loading && <p>Loading...</p>}
            {!loading && <ul className="list">
                {details.map(detail => <li key={detail.id_detail} className="info">{detail.id_detail}, {detail.id_stack} <Button onClick={() => navigate("/employee/details/edit/"+detail.id_detail)}>Изменить данные</Button><Button onClick={() => navigate("/employee/details/delete/"+detail.id_detail)}>Удалить детали</Button></li>)}
            </ul> }
            <Button onClick={() => navigate('/employee/details/add')}>Добавить детали</Button>
        </section>
        </>
    )
}