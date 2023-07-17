export function createUniqueId() {
  return Math.floor(Math.random() * 100000);
}

export const initialState = {
  items: [
    {
      id: createUniqueId(),
      itemCount: 0,
      subItems: [
        {
          subItemId: createUniqueId(),
          subItemCount: 0,
        },
      ],
      typeOfPrint: "",
      fileUploaded: false,
      prints: {
        frontPrint: {
          printSize: "",
          file: "",
        },
        backPrint: {
          printSize: "",
          file: "",
        },
        noPrint: {
          text: "",
        },
      },
    },
  ],
  customerData: {},
  shipping: false,
  totalPrice: 0,
  orderNotes: "",
};

export const printSizes = ["סמל קטן (כיס 8 סמ)", "(A4)סמל גדול"];
export const printTypes = [
  "בחירת קובץ להדפס קידמי",
  "בחירת קובץ להדפס אחורי",
  "הדפסה ללא בחירת קובץ",
];
