import React from 'react';
import Card from '../components/Card';



function Home({ 
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart }) {
      
    return (
      
        <div className="content">
          <div className="content__item">
            <h1 className="content__title">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="content__search">
              <img src="/images/search.svg" alt="Search"/>
              {searchValue ? 
              <img 
                onClick={() => setSearchValue('')}
                className="basket__remove-btn clear" 
                src="/images/remove.svg" 
                alt="Clear"/> : null}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
            </div>
        </div>

        

        <div className="sneakers">

            {items
            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))  //перед рендеренгом будет проходится по массиву и будет исключать все item у которых в title нету того, что написано в searchValue и все перевести в нижний регистр
            .map((item, index) => (
              <Card
                key={index}
                id={item.id}
                parentId={item.parentId}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                
              />
            ))}

            

            

        </div>

      </div>
    )
}

export default Home;