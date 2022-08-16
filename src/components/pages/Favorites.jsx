import Card from '../Card'

function Favorites({ items, onAddToFavorite }) {
    return (
      <div className="content">
        <div className="content__item">
            <h1 className="content__title">Мои закладки</h1>   
        </div>

        <div className="sneakers">

        {items
           
            .map((item, index) => (
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