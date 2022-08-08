function Header(props) {
    console.log(props);
    return (
        
        <header>
            <div className="header__left">
                <img src="/images/header-logo.svg" alt="logo"/>
                <div className="header__info">
                    <h3>Sneakers</h3>
                    <p>Магазин кроссовок</p>
                </div>
            </div>

            <ul className="header__right">
                <li onClick={props.onClickCart}>
                    <img src="/images/header-basket.svg" alt="basket"/>
                    <span>1205 руб</span>
                </li>

                <li>
                    <img src="/images/header-cabinet.svg" alt="сabinet"/>
                </li>

            </ul>
      </header>

    )
}

export default Header