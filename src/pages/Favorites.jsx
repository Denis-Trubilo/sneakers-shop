import React from 'react';
import Card from '../components/Card';
import AppContext from '../context'

function Favorites() {

    const {favorites, onAddToFavorite } = React.useContext(AppContext);

    

    return (
      <div className="content">
        <div className="content__item">
            <h1 className="content__title">Мои закладки</h1>   
        </div>

        <div className="sneakers">

        {favorites.map((item, index) => (
              <Card
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                favorite={true}
                onFavorite={onAddToFavorite}
              />
            ))}

        </div>

      </div>
    )
}

export default Favorites;