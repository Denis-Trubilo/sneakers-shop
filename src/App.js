import  "./index.css";

import React from "react";
import axios from "axios";
import Card from './components/Card';
import Header from './components/Header';
import Basket from "./components/Basket";

// const arrSneakers = [
//   {title: 'Мужские кроссовки Nike Blazer', price: 12999, imgUrl: 'https://via.placeholder.com/133'},
//   {title: 'Мужские кроссовки Nike Air Max', price: 15000, imgUrl: 'https://via.placeholder.com/133/red'},
//   {title: 'Мужские кроссовки Nike Blazer', price: 12999, imgUrl: 'https://via.placeholder.com/133/green'},
//   {title: 'Мужские кроссовки Nike Blazer', price: 12999, imgUrl: 'https://via.placeholder.com/133/black'}
// ];

function App() {

  const [items, setItems] = React.useState([]); // добавить клик по кнопке добавить в корзину (+)
  const [cartItems, setCartItems] = React.useState([]); // положить продукт в корзину
  const [searchValue, setSearchValue] = React.useState(''); // поиск
  const [cartOpened, setCartOpened] = React.useState(false); //отрывание корзины

  React.useEffect(() => {
    // fetch('https://62ec129f818ab252b6f78f0d.mockapi.io/items').then(res => {
    //     return res.json();
    //   }).then((json) => {
    //     setItems(json);
    //  });

    //При первом рендере приложения
    // 1. отправить запрос на получение кроссовок которые есть на сервере
    // 2. параллельно отправить запрос на получение корзины и то, что будет в ответе сохранить в useState (setCartItems)

     axios.get('https://62ec129f818ab252b6f78f0d.mockapi.io/items').then((res) => {
      setItems(res.data)
     });

     axios.get('https://62ec129f818ab252b6f78f0d.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
     });

  }, []);


  // 1. Параллельно отправляем результат на сервер
  // 2. Визуально продукт сохраняем в useState (setCartItems)

  const onAddToCart = (obj) => {
    axios.post('https://62ec129f818ab252b6f78f0d.mockapi.io/cart', obj );
    setCartItems(prev => [...prev, obj]) //забираем предыдущие данные добовляем в них новые(obj) и обновляем массив
  }

  const onRemoveItem = (id) => {
    //axios.delete(`https://62ec129f818ab252b6f78f0d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id)); // когда метод onRemoveItem выполнится, возьми, что сейчас есть в cartItems и вместо передачи нового массива отфильтруй самого себя возьми item и проверь, что item из твоего массива не равен переменной id
  }

  const onChangeSearchInput = (event) => { 
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper">
            
      {cartOpened ? <Basket items = {cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
      
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">
        <div className="content__item">
            <h1 className="content__title">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="content__search">
              <img src="/images/search.svg" alt="Search"/>
              {searchValue ? 
              <img 
                onClick={() => setSearchValue('')}
                className="basket__remove-btn clear" 
                src="https://via.placeholder.com/20" 
                alt="Clear"/> : null}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
            </div>
        </div>

        <div className="sneakers">

            {items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))  //перед рендеренгом будет проходится по массиву и будет исключать все item у которых в title нету того, что написано в searchValue и все перевести в нижний регистр
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}

            

            

        </div>

      </div>
    </div>
  );
}

export default App;


// [
//   {"title": "Мужские кроссовки Nike Blazer", "price": 12999, "imgUrl": "https://via.placeholder.com/133"},
//   {"title": "Мужские кроссовки Nike Air Max", "price": 15000, "imgUrl": "https://via.placeholder.com/133/red"},
//   {"title": "Мужские кроссовки Nike Blazer", "price": 10000, "imgUrl": "https://via.placeholder.com/133/green"},
//   {"title": "Мужские кроссовки Nike Blazer", "price": 11000, "imgUrl": "https://via.placeholder.com/133/black"},
//   {"title": "Мужские кроссовки Nike Blazer", "price": 13500, "imgUrl": "https://via.placeholder.com/133/brown"},
//   {"title": "Мужские кроссовки Nike Blazer", "price": 10500, "imgUrl": "https://via.placeholder.com/133/violet"},
//   {"title": "Мужские кроссовки Nike Blazer", "price": 11600, "imgUrl": "https://via.placeholder.com/133/orange"}
// ]