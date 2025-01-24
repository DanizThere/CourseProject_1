import RenderMeds from "../../components/Meds/RenderMeds";
import WorkHeader from "../../components/WorkHeader";
import Head from "../../components/Head";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Catalog(){
    const [token, setToken] = useState();

    function getToken(){
        const t = localStorage.getItem('Token');
        setToken(t);
    }

    useEffect(getToken,[]);

    return(
        <>
            <Head titleName={"Каталог"}></Head>
            {token && <WorkHeader/>}
            {!token && <Header/>}
            <RenderMeds />
            
            <Footer placeholder={'Каталог'}></Footer>
        </>
    )
}