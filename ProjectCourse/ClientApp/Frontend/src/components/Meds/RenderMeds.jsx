import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

const URL = "https://localhost:7014/catalogue/";

export default function RenderMeds(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [meds, setMeds] = useState([]);
    const [token, setToken] = useState();

    function getToken(){
        const t = localStorage.getItem('Token');
        setToken(t);
    }

    useEffect(getToken,[]);

    async function fetchMeds() {
        setLoading(true);
        const response = await fetch(URL);
        const medss = await response.json();
        setMeds(medss);
        setLoading(false);
    }

    useEffect(() => {
        fetchMeds();
    },[])

    return(
        <section className="renders">
            {loading && <p>Loading...</p>}
            {!loading && <ul className="list">
                {meds.map(med => <li key={med.id_stack} className="info">{med.meds_naming} - {med.dozen}мг., {med.meds_cost}руб. <Button onClick={() => navigate("/employee/catalog/edit/"+med.id_stack)}>Изменить данные</Button><Button onClick={() => navigate("/employee/catalog/delete/"+med.id_stack)}>Удалить медикамент</Button></li>)}
            </ul> }
            <Button onClick={() => {{token && navigate('/employee/catalog/add')} {!token && navigate('/')}}}>Добавить медикамент</Button>
        </section>
    )
}