export function createUniqueId() {
  return Math.floor(Math.random() * 100000);
}

export function createEmptyItem(newItemId, newSubItemId = createUniqueId()) {
  return {
    id: newItemId || createUniqueId(),
    itemCount: 0,
    hasErrors: false,
    subItems: [
      {
        subItemId: newSubItemId,
        subItemCount: 0,
      },
    ],
    typeOfPrint: '',
    fileUploaded: false,
    prints: {
      frontPrint: {
        printSize: '',
        file: '',
      },
      backPrint: {
        printSize: '',
        file: '',
      },
      noPrint: {
        text: '',
      },
    },
  };
}

export const initialState = {
  items: [createEmptyItem()],
  customerData: {
    fullName: '',
    phone: '',
    address: '',
    city: '',
  },
  shipping: false,
  totalPrice: 0,
  orderNotes: '',
};

export const printSizes = ['סמל קטן (כיס 8 סמ)', '(A4)סמל גדול'];
export const printTypes = [
  'בחירת קובץ להדפס קידמי',
  'בחירת קובץ להדפס אחורי',
  'הדפסה ללא בחירת קובץ',
];

export const validateTel = /^[0-9]*$/;
