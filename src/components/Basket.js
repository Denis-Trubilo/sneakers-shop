function Basket({onClose, onRemove, items = []}) {
    return (
        <div  className="overlay">
            
            <div className="basket">
                <h2>Корзина<img onClick={onClose} className="basket__remove-btn" src="/images/remove.svg" alt="Remove"/></h2>

                <div className="basket__items">
                    
                    {items.map((obj) => (
                        <div className="basket__item">
                        <div className="basket__item-img" style={{ backgroundImage: `url(${obj.imgUrl})` }}></div>
                        <div className="basket__item-block">
                        <p>{obj.title}</p>
                        <b>{obj.price} руб.</b>
                        </div>
                        <img onClick={() => onRemove(obj.id)} className="basket__remove-btn" src="/images/remove.svg" alt="Remove"/>
                    </div>

                    ))}
                
                </div>

                <div className="basket__list">
                <ul >
                    <li className="basket__list-item">
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб.</b>
                    </li>
                    <li className="basket__list-item">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                    </li>
                </ul>
                <button className="basket__btn green__btn">Оформить заказ <img src="images/arrow.svg" alt="Arrow"/></button>
                </div>
                

            </div>

        </div>
    )
}

export default Basket