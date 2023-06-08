const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    console.log(state);
    const newState = {
      ...state,
      itemsIds: [...state.itemsIds, action.payload],
    };
    return newState;
  }

  if (action.type === "REMOVE_ITEM") {
    const newState = {
      ...state,
      itemsIds: itemsIds.filter((id) => id !== action.payload),
    };
    return newState;
  } else {
    throw new Error("No matching action type so GTFO");
  }
};

export default reducer;
