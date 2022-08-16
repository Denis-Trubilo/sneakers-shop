import { Link } from 'react-router-dom';

function Header(props) {
    console.log(props);
    return (
        
        <header>
            
            <Link to="/">
                <div className="header__left">
                    <img src="/images/header-logo.svg" alt="logo"/>
                    <div className="header__info">
                        <h3>Sneakers</h3>
                        <p>Магазин кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className="header__right">
                <li onClick={props.onClickCart}>
                    <img width={18} height={18} src="/images/header-basket.svg" alt="Корзина"/>
                    <span>1205 руб</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={25} height={25} src="/images/unlike.svg" alt="Закладки"/>
                    </Link>
                </li>

                <li>
                    <img width={18} height={18} src="/images/header-cabinet.svg" alt="Пользователь"/>
                </li>

            </ul>
      </header>

    )
}

export default Header