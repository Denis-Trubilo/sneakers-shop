import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';


function Header(props) {

    const {cartItems} = React.useContext(AppContext);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    
    return (
        
        <header>
            
            <Link to="/">
                <div className="header__left">
                    <img src="images/header-logo.svg" alt="logo"/>
                    <div className="header__info">
                        <h3>Sneakers</h3>
                        <p>Магазин кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className="header__right">
                <li onClick={props.onClickCart}>
                    <img width={18} height={18} src="images/header-basket.svg" alt="Корзина"/>
                    <span className="header__price">{totalPrice} руб</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={18} height={18} src="images/favorites.svg" alt="Закладки"/>
                    </Link>
                </li>

                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="images/header-cabinet.svg" alt="Пользователь"/>
                    </Link>
                </li>

            </ul>
            
      </header>

    )
}

export default Header