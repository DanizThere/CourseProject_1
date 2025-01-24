import WorkHeader from "../../components/WorkHeader.jsx";
import RenderEmployees from "../../components/Employees/RenderEmployees.jsx";
import Head from "../../components/Head.jsx";
import Footer from "../../components/Footer.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Employees() {
    const [token, setToken] = useState();
    const navigate = useNavigate();

    function getToken(){
        const t = localStorage.getItem('Admin');
        setToken(t);
    }

    useEffect(getToken,[]);
  return (
    <>
    {token && <>
      <Head titleName={"Сотрудники"}></Head>
      <WorkHeader />
      <RenderEmployees />
      <Footer placeholder={'Сотрудники'}></Footer>
      </>}
    {!token && navigate('/')}
    </>
  )
}