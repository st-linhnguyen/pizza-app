import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import PizzaSizes from './PizzaSizes';
import PizzaToppings from './PizzaToppings';
import { updateCart } from '../app.action'

interface IPizzaCard {
  pizza: any
}

const PizzaCard = ({ pizza }: IPizzaCard) => {
  const dispatch = useDispatch();
  const { pizzas } = useSelector((state: RootStateOrAny) => state?.cart);
  const [selectedSize, setSize] = useState('medium');
  const [price, setPrice] = useState(pizza?.sizes[selectedSize] || 0);
  const [toppings, setToppings] = useState<any>({
    olives: {
      id: 1,
      name: 'olives',
      price: 3,
      selected: true
    },
    pepperoni: {
      id: 2,
      name: 'pepperoni',
      price: 4,
      selected: false
    },
    mushrooms: {
      id: 3,
      name: 'mushrooms',
      price: 2,
      selected: false
    },
    pepper: {
      id: 4,
      name: 'pepper',
      price: 2,
      selected: false
    }
  });

  useEffect(() => {
    let newPrice = pizza?.sizes[selectedSize];
    Object.keys(toppings).map((key: any) => {
      if (toppings[key].selected) {
        newPrice += toppings[key].price;
      }
    });
    setPrice(newPrice);
  }, [selectedSize, toppings]);

  const toggleTopping = (key: string, isSelected: boolean) => {
    toppings[key].selected = isSelected;
    setToppings({ ...toppings });
  };

  const pushOnCart = () => {
    const selectedToppings = Object.keys(toppings).filter((key: any) => toppings[key].selected);
    const result = {
      id: pizzas?.length,
      name: pizza.name,
      size: selectedSize,
      price,
      toppings: selectedToppings,
      quantity: 1
    };
    const isExistedIndex = pizzas.findIndex(item => item.name === result.name && JSON.stringify(item.toppings) === JSON.stringify(result.toppings) && selectedSize === item.size);
    if (isExistedIndex >= 0) {
      pizzas[isExistedIndex].quantity = pizzas[isExistedIndex].quantity + 1;
      dispatch(updateCart({
        pizzas: [...pizzas]
      }));
    } else {
      dispatch(updateCart({
        pizzas: [...pizzas, ...[result]]
      }));
    }
  }

  return (
    <div className="card pizza-item">
      <div
        className="card-img card-img-top"
        style={{ backgroundImage: `url(${ pizza?.image })` }}
      />
      <div className="card-body">
        <h5 className="card-title">{ pizza?.name }</h5>
        <div className="card-text">
          <p className="desc">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <div className="pizza-sizes">
            <span className="label">Size:</span>
            <PizzaSizes
              sizes={ Object.keys(pizza?.sizes) }
              selectedValue={  selectedSize }
              onChangeSize={ setSize }
            />
          </div>
          <div className="pizza-toppings">
            <span className="label">Toppings:</span>
            <PizzaToppings toppings={ toppings } onClick={ toggleTopping } />
          </div>
        </div>
        <button className="btn btn-add-cart" onClick={ pushOnCart }>
          Add to Cart (${price})
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
