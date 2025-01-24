import Footer from "../../components/Footer";
import RenderOrdersDetails from "../../components/Order_Details/RenderOrderDetail";
import WorkHeader from "../../components/WorkHeader";
import Head from "../../components/Head";

export default function DetailList(){
    return(
        <>
            <Head placeholder='Детали'></Head>
            <WorkHeader />
            <RenderOrdersDetails />
            <Footer placeholder={'Детали'}></Footer>
        </>
    )
}