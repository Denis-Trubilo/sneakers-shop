import "./index.css";
import "./media.css";

import React from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

import Header from './components/Header';
import Basket from "./components/Basket";
import AppContext from "./context";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";




// создаём глобальный объект с поощью которого создаётся зависимость компонентов (что будет менятся в объекте, то будет меняться в компонентах)

// const arrSneakers = [
//   {title: 'Мужские кроссовки Nike Blazer', price: 12999, imgUrl: 'https://via.placeholder.com/133'},
//   {title: 'Мужские кроссовки Nike Air Max', price: 15000, imgUrl: 'https://via.placeholder.com/133/red'},
//   {title: 'Мужские кроссовки Nike Blazer', price: 12999, imgUrl: 'https://via.placeholder.com/133/green'},
//   {title: 'Мужские кроссовки Nike Blazer', price: 12999, imgUrl: 'https://via.placeholder.com/133/black'}
// ];

function App() {

  const [items, setItems] = React.useState([]); // добавить клик по кнопке добавить в корзину (+)
  const [cartItems, setCartItems] = React.useState([]); // положить продукт в корзину
  const [favorites, setFavorites] = React.useState([]); // добавить товар в избанное
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

     async function fetchData() {

      const cartResponse = await axios.get('https://62ec129f818ab252b6f78f0d.mockapi.io/cart');

      const favoritesResponse = await axios.get('https://62ec129f818ab252b6f78f0d.mockapi.io/favorites');

      const itemsResponse = await axios.get('https://62ec129f818ab252b6f78f0d.mockapi.io/items'); 


      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data)


     }

     fetchData()

  }, []);


  // 1. Параллельно отправляем результат на сервер
  // 2. Визуально продукт сохраняем в useState (setCartItems)

  const onAddToCart = async (obj) => {
    try{
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
        if (findItem) {
          axios.delete(`https://62ec129f818ab252b6f78f0d.mockapi.io/cart/${findItem.id}`);
          setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        } else {
          const {data} = await axios.post('https://62ec129f818ab252b6f78f0d.mockapi.io/cart', obj );
          setCartItems((prev) => [...prev, data]) //забираем предыдущие данные добовляем в них новые(obj) и обновляем массив
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
    
    
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62ec129f818ab252b6f78f0d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); // когда метод onRemoveItem выполнится, возьми, что сейчас есть в cartItems и вместо передачи нового массива отфильтруй самого себя возьми item и проверь, что item из твоего массива не равен переменной id
  }

  const onAddToFavorite = async (obj) => {  //try/catch - нужны для того что бы отлавливать ошибку (используется только при использовании async/await)
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) { //если в фаворитах нашёлся id, то
        axios.delete(`https://62ec129f818ab252b6f78f0d.mockapi.io/favorites/${obj.id}`); // отправляй запрос на удаление в бэкэнд
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        //setFavorites((prev) => prev.filter((item) => item.id !== obj.id)); //отфильтрует все item где item.id !== obj.id
      } else { // иначе (если объект favorites по obj.id не нашёлся ) на пример массив пустой
        const {data} = await axios.post('https://62ec129f818ab252b6f78f0d.mockapi.io/favorites', obj ); // отправить запрос на создание
        setFavorites((prev) => [...prev, data]) //забираем предыдущие данные добовляем в них новые(obj) и обновляем массив
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
    
  }

  const onChangeSearchInput = (event) => { 
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id)); // если есть хоть одно совпадение, то вернёт true
  }


  return (
    // передаём в контекст значения
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}> 
      <div className="wrapper">
            
            {cartOpened ? <Basket items = {cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
            
            <Header onClickCart={() => setCartOpened(true)} />
      
            <Routes>
              <Route path="" element={<Home 
                  items={items} 
                  cartItems={cartItems}
                  searchValue={searchValue} 
                  setSearchValue={setSearchValue} 
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorite={onAddToFavorite}
                  onAddToCart={onAddToCart}
                />}
                />
                
            </Routes>
      
      
            <Routes>
              <Route path="favorites" element={
                <Favorites/>
              }
                />
                
            </Routes>

            <Routes>
              <Route path="orders" element={
                <Orders/>
              }
                />
                
            </Routes>
            
      </div>
    </AppContext.Provider>
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