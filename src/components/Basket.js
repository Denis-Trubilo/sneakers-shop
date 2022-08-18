import React from "react";
import axios from "axios";

import AppContext from "../context";
import Info from "./Info"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Basket({onClose, onRemove, items = []}) {

    const {cartItems, setCartItems} = React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);


    const onClickOrder = async () => {

        try{
            const {data} = await axios.post('https://62ec129f818ab252b6f78f0d.mockapi.io/orders', {items : cartItems} );
            
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < Array.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62ec129f818ab252b6f78f0d.mockapi.io/cart' + item.id);
                await delay(1000);
            }
            
        } catch (error) {
            alert('Не удалось создать заказ:(')
        }
    }

    return (
        <div  className="overlay">
            
            <div className="basket">
                <h2>Корзина<img onClick={onClose} className="basket__remove-btn" src="/images/remove.svg" alt="Remove"/></h2>
                {
                    items.length > 0 ? (
                        <div className="basket__blocks">
                            <div className="basket__items">
                    
                            {items.map((obj) => (
                                <div key={obj.id} className="basket__item">
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
                                <button onClick={onClickOrder} className="basket__btn green__btn">Оформить заказ <img src="images/arrow.svg" alt="Arrow"/></button>
                            </div>
                        </div>
                    ) : (
                        <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, что бы сделать заказ"}
                              image={isOrderComplete ? "/images/complete-order.svg" : "/images/empty-cart.svg"}
                        />
                        
                    )
                }

                
                

            </div>

        </div>
    )
}

export default Basket