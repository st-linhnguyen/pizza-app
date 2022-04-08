import React, { useState } from 'react';

import PizzaSizes from './PizzaSizes';
import PizzaToppings from './PizzaToppings';
import PizzaCard from './PizzaCard';

const PizzaMenu = () => {
  const imageRootUrl = 'https://cdn.pizzahut.vn/images/Web_V3/Products/';
  const pizzaList = {
    veggie: {
      id: 1,
      name: 'Veggie Supreme',
      image: `${imageRootUrl}Pizza_Rau_Cu_400x275.jpg`,
      sizes: {
        small: 15,
        medium: 20,
        large: 25,
      }
    },
    seafood: {
      id: 2,
      name: 'Seafood Pesto',
      image: `${imageRootUrl}Pizza_Gap_Doi_Nhan_Phu_Hai_San_Xot_Pesto_400x275.jpg`,
      sizes: {
        small: 15,
        medium: 20,
        large: 25,
      }
    },
    ocean: {
      id: 3,
      name: 'Ocean Delight',
      image: `${imageRootUrl}Pizza_Gap_Doi_Nhan_Phu_Con_Loc_Hai_San_400x275.jpg`,
      sizes: {
        small: 15,
        medium: 20,
        large: 25,
      }
    },
    cheese:{
      id: 4,
      name: 'Cheese Crust',
      image: `${imageRootUrl}Pizza_Hai_Vi_400x275.jpg`,
      sizes: {
        small: 15,
        medium: 20,
        large: 25,
      }
    },
    chicken: {
      id: 5,
      name: 'Chicken Deluxe',
      image: `${imageRootUrl}Pizza_Ga_Nuong_Nam_400x275.jpg`,
      sizes: {
        small: 15,
        medium: 20,
        large: 25,
      }
    }
  };

  return (
    <div className="pizza-menu-wrapper">
      <ul className="row pizza-list">
        {
          Object.values(pizzaList).map(item => (
            <li key={ item?.id } className="col-4">
              <PizzaCard pizza={ item } />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default PizzaMenu;
