import { Link } from "react-router-dom";


export default function ErrorElement(){
    return(
        <div className="container">
            <div className="errorPage">
                <h1>404 Not Found</h1>
                <h3 className="errorPageDesc">Страницы по указанному адресу не существует</h3>
                <Link to="/">На главную</Link>
            </div>
        </div>
    )
}