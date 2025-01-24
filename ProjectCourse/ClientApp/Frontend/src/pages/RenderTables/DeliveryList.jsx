import Footer from "../../components/Footer";
import RenderDelivery from "../../components/Delivery/RenderDelivery";
import WorkHeader from "../../components/WorkHeader";
import Head from "../../components/Head";

export default function DeliveryList(){
    return(
        <>
            <Head placeholder='Поставки'></Head>
            <WorkHeader />
            <RenderDelivery />
            <Footer placeholder={'Поставки'}></Footer>
        </>
    )
}