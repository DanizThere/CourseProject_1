import Footer from "../../components/Footer";
import RenderOrders from "../../components/Orders/RenderOrders";
import WorkHeader from "../../components/WorkHeader";
import Head from "../../components/Head";

export default function OrderList(){
    return(
        <>
            <Head placeholder='Заказы'></Head>
            <WorkHeader />
            <RenderOrders />
            <Footer placeholder={'Заказы'}></Footer>
        </>
    )
}