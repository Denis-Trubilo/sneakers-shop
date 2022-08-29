import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Card from '../components/Card';
//import AppContext from '../context';

function Orders() {
  //const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)

  const [orders, setOrders] = useState([]); // добавить 
    
  React.useEffect(() => {

    try {
      async function getOrders() {
        const {data} = await axios.get('https://62ec129f818ab252b6f78f0d.mockapi.io/orders');
        setOrders(data.map((obj) => obj.items).flat())
        //setOrders(data.reduse((prev, obj) => [...prev, ...obj.items], []));
      }
      getOrders();
    } catch (error) {
        alert('Ошибка при запросе заказов');
    }  
  }, []);

    return (
      <div className="content">
        <div className="content__item">
            <h1 className="content__title">Мои заказы</h1>   
        </div>

        <div className="sneakers">

        {orders.map((item, index) => (
              <Card
                  key={index}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  imgUrl={item.imgUrl}                  
              />
            ))}

        </div>

      </div>
    )
}

export default Orders;