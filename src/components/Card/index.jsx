import React from 'react';
import styles from './Card.module.css';
import AppContext from '../../context';

function Card({ id, imgUrl, title, price, onFavorite, onPlus, favorite = false }) {

    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorite);

    console.log(title, isItemAdded(id))

    const onClickPlus = () => {
        onPlus({ id, parentId: id,  imgUrl, title, price });
    }

    const onClickFavorite = () => {
        onFavorite({ id, parentId: id, imgUrl, title, price });
        setIsFavorite(!isFavorite);
    }

    return (
        
        <div className={styles.card}>
            {onFavorite &&
                <div className={styles.cardFavourite} onClick={onClickFavorite}>
                    <img src={isFavorite ? "images/like.svg" : "images/unlike.svg"} alt="Unlike"/>
                </div>
            }
            
            <img className={styles.card__img} width={133} height={133} src={imgUrl} alt="sneakers"/>
            <h5>{title}</h5>
            <div className={styles.cardInfo}>
                <div className={styles.cardItem}>
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                {onPlus && (
                    <img className={styles.cardPlus} onClick={onClickPlus} src={isItemAdded(id) ? "images/button-checked.svg" : "images/button-plus.svg"}/>
                )}
                
                
            </div>
        </div>

    )
}

export default Card
