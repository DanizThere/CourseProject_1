import { Helmet } from "react-helmet";

export default function Head({titleName}){
    return(<>
        <Helmet title={titleName}/>
    </>)
}