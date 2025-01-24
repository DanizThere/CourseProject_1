import Footer from "../../components/Footer";
import RenderUser from "../../components/Users/RenderUser";
import WorkHeader from "../../components/WorkHeader";
import Head from "../../components/Head";

export default function CustomerList(){
    return(
        <>
            <Head placeholder='Пользователи'></Head>
            <WorkHeader />
            <RenderUser />
            <Footer placeholder={'Пользователи'}></Footer>
        </>
    )
}