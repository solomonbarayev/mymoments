import { data } from '../data/data';

const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newState = {
      ...state,

      items: [
        ...state.items,
        {
          id: action.payload.itemId,
          itemCount: 0,
          subItems: [{ subItemId: action.payload.subItemId, subItemCount: 0 }],
        },
      ],
    };
    return newState;
  }

  if (action.type === 'REMOVE_ITEM') {
    const newState =
      state.items.length > 1
        ? {
            ...state,
            items: state.items.filter((item) => item.id !== action.payload),
          }
        : state;
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

  if (action.type === 'UPDATE_ITEMS') {
    const newState = {
      ...state,
      items: action.payload,
    };
    return newState;
  }

  if (action.type === 'ADD_SUB_ITEM') {
    const newState = {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.itemId) {
          item.subItems.push(action.payload.value);
        }
        return item;
      }),
    };
    return newState;
  }

  if (action.type === 'UPDATE_FILE') {
    const newState = {
      ...state,
      items: state.items.map((item) => {
        if (item.id == action.payload.itemId) {
          if (action.payload.printType == 1) {
            item.prints.frontPrint = {
              file: action.payload.value,
              printSize: action.payload.printSize,
            };
          }
          if (action.payload.printType == 2) {
            item.prints.backPrint = {
              file: action.payload.value,
              printSize: action.payload.printSize,
            };
          }
          //doublesided
          if (action.payload.printType == 3) {
            console.log(action.payload);
            if (action.payload.subType == 'front') {
              item.prints.frontPrint = {
                file: action.payload.value,
                printSize: action.payload.printSize,
              };
            }
            if (action.payload.subType == 'back') {
              item.prints.backPrint = {
                file: action.payload.value,
                printSize: action.payload.printSize,
              };
            }
          }
          if (action.payload.printType == 4) {
            console.log(action.payload.noPrint);
            item.prints.noPrint.text = action.payload.noPrint;
          }
        }
        return item;
      }),
    };
    return newState;
  }

  if (action.type == 'REMOVE_SUB_ITEM') {
    //1. search which item we are dealing with.
    const item = state.items.filter((el) => el.id == action.payload.itemId)[0];
    //2. setting new array with all the sub items not including subItem with subitem id received
    const newSubItems = item.subItems.filter(
      (el) => el.subItemId != action.payload.subItemId
    );
    //3. build new state and return
    const newState = {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.itemId) {
          return {
            ...item,
            subItems: newSubItems,
          };
        }
        return item;
      }),
    };

    return newState;
  }

  if (action.type === 'UPDATE_SUB_ITEM') {
    const newState = {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.itemId) {
          const subItem = item.subItems.filter(
            (subI) => subI.subItemId === action.payload.subItemId
          )[0];
          subItem[action.payload.name] = action.payload.value;
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
      if (item.category !== undefined) {
        const itemPrice = data.categories.filter(
          (cat) => cat.name === item.category
        )[0].price;
        newTotalPrice += item.itemCount ? itemPrice * item.itemCount : 0;
      }
    });
    const newState = {
      ...state,
      totalPrice: newTotalPrice,
    };
    return newState;
  }

  if (action.type === 'UPDATE_ORDER_NOTES') {
    const newState = {
      ...state,
      orderNotes: action.payload,
    };
    return newState;
  }
  if (action.type === 'UPDATE_PRINT_TYPE') {
    const newState = {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.itemId) {
          item.typeOfPrint = action.payload.value;
        }
        return item;
      }),
    };
    return newState;
  } else {
    throw new Error('No matching action type so GTFO');
  }
};

export default reducer;
