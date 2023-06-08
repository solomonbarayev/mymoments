// const React, {createContext, useContext} = require('react');
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { data } from "../data/data";
import reducer from "../reducers/reducer";

const FormContext = createContext();

function createUniqueId() {
  return Math.floor(Math.random() * 100000);
}

const initalIndex = createUniqueId();

const initialState = {
  items: [],
  itemsIds: [initalIndex],
  customerData: false,
  totalPrice: 0,
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { itemsIds } = state;
  console.log(state);

  const [itemValues, setItemValues] = useState([{ id: initalIndex }]);
  const [customerValues, setCustomerValues] = useState({});
  const [price, setPrice] = useState(0);
  // const [itemsIds, setItemIds] = useState([createUniqueId()]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = () => {
    // setItemIds((prevState) => {
    //   const newState = [...prevState, createUniqueId()];
    //   return newState;
    // });
    dispatch({ type: "ADD_ITEM", payload: createUniqueId() });
  };

  useEffect(() => {});

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const handleItemsChange = (e, id) => {
    setItemValues((prevState) => {
      const newState = prevState;
      newState.forEach((item) => {
        if (item.id == id) {
          item[e.target.name] = e.target.value;
          console.log("items updated");
        }
      });
      return newState;
    });
  };

  const handleCustomerChange = (e) => {
    setCustomerValues({ ...customerValues, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    console.log(e.target);
  };

  useEffect(() => {
    const ids = itemsIds;
    const newItemsValues = itemValues;
    //whenever there is a new ID, initialize an object into itemValues with that id
    const exisitingIds = itemValues.map((el) => el.id);
    ids.forEach((id) => {
      if (!exisitingIds.includes(id)) {
        newItemsValues.push({ id });
      } else return;
    });
    // newItemsValues.push(objToAdd);
    setItemValues(newItemsValues);
  }, [itemsIds, itemValues]);

  function calculateFinalPrice() {
    let newTotalPrice = 0;
    itemValues.forEach((item) => {
      console.log(item.category);
      if (item.category != undefined) {
        console.log("inside");
        const itemPrice = data.categories.filter(
          (cat) => cat.name == item.category
        )[0].price;
        newTotalPrice += itemPrice * item.amount;
        return newTotalPrice;
      }
    });

    // setTotalPrice(newTotalPrice);
  }

  useEffect(() => {
    //calculateFinalPrice();
    console.log(itemValues);
  }, [JSON.stringify(itemValues)]);

  return (
    <FormContext.Provider
      value={{
        handleCustomerChange,
        handleItemsChange,
        customerValues,
        handleFileUpload,
        itemValues,
        price,
        itemsIds,
        addItem,
        removeItem,
        totalPrice,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
