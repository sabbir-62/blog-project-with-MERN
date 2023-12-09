
import { NavLink} from 'react-router-dom';
//import Logo from '../../assets/pictures/logo.png';
import Styles from './header.module.css';
import { useContext, useState } from 'react';
import { LoginContext } from '../contextApi/DataProvider';
import blogImage from '../../assets/blog.png';


const Header = () => {

    const [isShow, setShow] = useState('')

    const handleClick = () => {
        isShow ? setShow('') : setShow('show')
    }

    const {setLoggedIn} = useContext(LoginContext)
    const handleLogout = () => {
        localStorage.removeItem('access token')
        setLoggedIn(false)
    }


    return (
        <div className={`nav-wrapper ${Styles.navWrapper}`}>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img className='image-thumbnail' src={blogImage}  style={{ width: "50px" }}  alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" onClick={handleClick}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isShow}`} id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${Styles.navLink}`} aria-current="page" to="/" onClick={handleClick}>HOME</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${Styles.navLink}`} to="/my-account" onClick={handleClick}>ACCOUNT</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${Styles.navLink}`} to="/contact" onClick={handleClick}>CONTACT</NavLink>
                                </li> 
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${Styles.navLink}`} to="/login" onClick={handleLogout}>LOGOUT</NavLink>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;