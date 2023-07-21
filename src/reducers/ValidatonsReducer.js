import { validateTel } from '../constants/constants';

function buildNumMessage(value) {
  let message = '';
  if (value == '') {
    message = 'שדה חובה';
  } else if (!validateTel.test(value)) {
    message = 'מספרים בלבד';
  } else {
    message = '';
  }
  return message;
}

const reducer = (state, action) => {
  if (action.type === 'REQUIRED_FIELD') {
    return {
      ...state,
      formErrors: {
        ...state.formErrors,
        [action.payload.name]: action.payload.value ? '' : 'שדה חובה',
      },
    };
  }

  if (action.type === 'TEL_ERROR') {
    const { name, value } = action.payload;
    let num = value.replaceAll('-', '');
    num = value.replaceAll('(', '');
    num = value.replaceAll(')', '');
    let message = '';

    function stateBuilder(message) {
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [name]: message,
        },
      };
    }

    if (num == '') {
      message = 'שדה חובה';
      return stateBuilder(message);
    }
    if (!validateTel.test(num)) {
      message = 'מספרים בלבד';
      return stateBuilder(message);
    }
    if (num.length != 10) {
      message = 'לפחות עשר מספרים';
      return stateBuilder(message);
    } else {
      message = '';
      return stateBuilder(message);
    }
  }

  if (action.type === 'UPDATE_ITEM_ERRORS') {
    const { id, name, value, type } = action.payload;
    let newState = state[type];
    newState[id] = {
      ...newState[id],
      [name]: buildNumMessage(value),
    };
    return {
      ...state,
      [type]: newState,
    };
  }

  if (action.type === 'UPDATE_SUB_ITEM_ERRORS') {
    return {
      ...state,
      subItemErrors: {
        ...action.payload,
      },
    };
  }

  if (action.type === 'UPDATE_SINGLE_SUB_ITEM_ERRORS') {
    console.log('in UPDATE_SINGLE_SUB_ITEM_ERRORS');
  } else {
    throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
