import React from 'react';
import styles from './Card.module.css';

function Card({ imgUrl, title, price, onFavorite, onPlus }) {

    const [isAdded, setisAdded] = React.useState(false);

    const onClickPlus = () => {
        onPlus({ imgUrl, title, price });
        setisAdded(!isAdded);
    }

    // React.useEffect(() => {
    //     console.log('Переменная изменилась');
    // }, [isAdded]);

    return (
        
        <div className={styles.card}>
            <div className={styles.cardFavourite} onClick={onFavorite}>
                <img src="/images/unlike.svg"/>
            </div>
            <img width={133} height={133} src={imgUrl} alt="sneakers"/>
            <h5>{title}</h5>
            <div className={styles.cardInfo}>
                <div className={styles.cardItem}>
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                <img className={styles.cardPlus} onClick={onClickPlus} src={isAdded ? "/images/button-checked.svg" : "/images/button-plus.svg"}/>
                
            </div>
        </div>

    )
}

export default Card
