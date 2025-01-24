import {Link} from 'react-router-dom';

export default function Footer({placeholder}){
    return(
        <footer>
            <p>{placeholder}, 2024-2025</p>
            <Link to="https://vk.com/wall-57536014_9936233">Ответы на ваши вопросы</Link>
        </footer>
    )
}