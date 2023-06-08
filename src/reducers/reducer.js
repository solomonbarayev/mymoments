import { data } from '../data/data';

const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newState = {
      ...state,
      itemsIds: [...state.itemsIds, action.payload],
    };
    return newState;
  }

  if (action.type === 'REMOVE_ITEM') {
    const newState = {
      ...state,
      itemsIds: state.itemsIds.filter((id) => id !== action.payload),
    };
    return newState;
  }

  if (action.type === 'UPDATE_ITEM') {
    //only update the item that was changed
    const newState = {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.id) {
          item[action.payload.name] = action.payload.value;
        }
        return item;
      }),
    };
    return newState;
  }

  if (action.type === 'UPDATE_CUSTOMER') {
    const newState = {
      ...state,
      customerData: {
        ...state.customerData,
        [action.payload.name]: action.payload.value,
      },
    };
    return newState;
  }

  if (action.type === 'CALCULATE_PRICE') {
    let newTotalPrice = 0;
    state.items.forEach((item) => {
      if (item.category != undefined) {
        const itemPrice = data.categories.filter(
          (cat) => cat.name === item.category
        )[0].price;
        newTotalPrice += itemPrice * item.amount;
      }
    });
    const newState = {
      ...state,
      totalPrice: newTotalPrice,
    };
    return newState;
  } else {
    throw new Error('No matching action type so GTFO');
  }
};

export default reducer;
