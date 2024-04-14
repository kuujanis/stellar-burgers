

export const normaUrl = 'https://norma.nomoreparties.space/api/ingredients '
export const postURL = 'https://norma.nomoreparties.space/api/orders'

export const generateID = function() {
  let length = 24,
      charset = "abcdefghijklmnopqrstuvwxyz0123456789",
      count = charset.length,
      retVal = "";
  for (let i = 0, n = count; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export type TCard = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates : number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
};

export type TDraggingCard = TCard & {dragId: string};
