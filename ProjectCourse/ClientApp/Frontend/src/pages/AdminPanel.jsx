import Head from "../components/Head";
import TabsSection from "../components/TabsSection";
import { useState, useEffect } from "react";
import WorkHeader from "../components/WorkHeader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import RenderMeds from '../components/Meds/RenderMeds'
import RenderEmployees from '../components/Employees/RenderEmployees'
import RenderUser from '../components/Users/RenderUser'
import RenderOrderDetail from '../components/Order_Details/RenderOrderDetail'
import RenderDelivery from '../components/Delivery/RenderDelivery'
import RenderOrders from '../components/Orders/RenderOrders'

export default function AdminPanel(){
    const [tab, setTab] = useState("meds")
    const [token, setToken] = useState();
    const navigate = useNavigate();

    function getToken(){
        const t = localStorage.getItem('Admin');
        setToken(t);
    }

    useEffect(getToken,[]);

    return(
        <>
        {token && <>
        <WorkHeader />
        <Head titleName={"Админ"}></Head>
        <TabsSection active={tab} onChange={(e) => setTab(e)}/>

            {tab === 'meds' && (<RenderMeds/>)}
            {tab === 'employees' && (<RenderEmployees/>)}
            {tab === 'users' && (<RenderUser/>)}
            {tab === 'orders' && (<RenderOrders/>)}
            {tab === 'deliverys' && (<RenderDelivery/>)}
            {tab === 'details' && (<RenderOrderDetail/>)}

        <Footer placeholder={'Приложение по учету медикаментов'}></Footer>
        </>}
        {!token && navigate('/')}
        </>
    )
    
}