import { Link } from 'react-router-dom';
import logo from '/apteka.svg';
import UserInfo from './UserInfo';
import { useEffect, useState } from 'react';

export default function Header(){
    const [token, setToken] = useState();

    function getToken(){
        const t = localStorage.getItem('Token');
        setToken(t);
    }

    useEffect(getToken,[]);
    return(
        <>
        <header>
            <div className='container'>
                <Link to="/"><img src={logo} alt='Лого'/></Link>
                <nav>
                    <ul>
                        {token && <li><UserInfo/></li>}
                        {!token && <li><Link to="/login">Войти</Link></li>}
                        <li><Link to="/">Каталог</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}