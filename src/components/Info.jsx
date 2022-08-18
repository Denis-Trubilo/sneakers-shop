import React from 'react'
import AppContext from '../context';

export const Info = ({title, image, description}) => {

  const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className="cart__empty">
        <img className="cart__empty-img" src={image}/>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)} className="green__btn">
            <img className="green__btn-img" src="images/arrow.svg" alt="Arrow"/>Вернуться назад
        </button>
    </div>
  )
}

export default Info;
