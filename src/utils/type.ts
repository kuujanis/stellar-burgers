import { 
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  POST_ORDER_REQUEST, 
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  SELECT_INGREDIENT, 
  GET_CONSTRUCTOR_INGREDIENTS, 
  PUSH_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  REFRESH_CONSTRUCTOR,
  SET_DEFAULT_CONSTRUCTOR,
  COUNT_ORDER_SUM,
  LOGOUT,
  LOGIN,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED
} from "../services/actions";

export type TConstructorIngredients = {
	bun: TDragable | null,
	slop: TDragable[]
  }

export  type TUser = {
    email: string,
    password: string,
    name: string
}
  
  export type TIngrd = {
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
  
  export type TDragable = TIngrd & {dragId: string};
  
  export type FetchIngredientsAction = { type: typeof FETCH_INGREDIENTS_SUCCESS, ingredients:TIngrd[], fetchRequest: boolean, fetchFailed: boolean }
  export type FetchIngredientsRequest = {type: typeof FETCH_INGREDIENTS_REQUEST, fetchRequest: boolean}
  export type FetchIngredientsFailed = {type: typeof FETCH_INGREDIENTS_ERROR, fetchFailed: boolean}
  export type PostOrderAction = {type: typeof POST_ORDER_SUCCESS, orderNumber: number, orderRequest: boolean, orderFailed: boolean}
  export type PostOrderRequest = {type: typeof POST_ORDER_REQUEST, orderRequest: boolean}
  export type PostOrderFailed = {type: typeof POST_ORDER_ERROR, orderFailed: boolean}
  export type SelectIngredientAction = { type: typeof SELECT_INGREDIENT, currentIngredient:TIngrd }
  export type GetConstructorAction = {type: typeof GET_CONSTRUCTOR_INGREDIENTS, constructorIngredients: TConstructorIngredients, ingredients: TConstructorIngredients}
  export type IngredientPushAction = {type: typeof PUSH_CONSTRUCTOR_INGREDIENT, ingredientsCount: { [id: string]: number },constructorIngredients: TConstructorIngredients, draggedIngridient: TDragable, dragId: string}
  export type IngredientsDeleteAction = { type: typeof DELETE_CONSTRUCTOR_INGREDIENT, ingredientsCount: { [id: string]: number },constructorIngredients: TConstructorIngredients, deletedIngredient: TDragable }
  export type RefreshConstructorAction = {type: typeof REFRESH_CONSTRUCTOR, getConstructorIngredients: TConstructorIngredients, newCards: TDragable[]}
  export type DefaultConstructorAction = {type: typeof SET_DEFAULT_CONSTRUCTOR}
  export type TotalSumAction = {type: typeof COUNT_ORDER_SUM, bun: TDragable, slop: TDragable[]}

  type RegSuccessAction = {type: typeof REGISTER_SUCCESS}
  type RegFailedAction = {type: typeof REGISTER_FAILED}
  type LoginAction = {type: typeof LOGIN, login: boolean, authorized: boolean, user: TUser }
  type LogoutAction = {type: typeof LOGOUT, login: boolean, authorized: boolean, user: {name: string, email: string} }
  type GetUserRequestAction = {type: typeof GET_USER_REQUEST, getUserRequest: boolean, user: {name: string, email: string} }
  type GetUserSuccessAction = {type: typeof GET_USER_SUCCESS, getUserRequest: boolean, authorized: boolean, user: TUser }
  type GetUserFailedAction = {type: typeof GET_USER_FAILED, getUserRequest: boolean, authorized: boolean, user: {name: string, email: string} }
  type RefreshTokenRequestAction = {type: typeof REFRESH_TOKEN_REQUEST, refreshTokenRequest: boolean, tokenIsGood: boolean }
  type RefreshTokenSuccessAction = {type: typeof REFRESH_TOKEN_SUCCESS, refreshTokenRequest: boolean, authorized: boolean, tokenIsGood: boolean }
  type RefreshTokenFailedAction = {type: typeof REFRESH_TOKEN_FAILED, refreshTokenRequest: boolean, authorized: boolean, tokenIsGood: boolean }
  
  export type TIngredientActions = FetchIngredientsAction 
  | FetchIngredientsRequest 
  | FetchIngredientsFailed 
  | PostOrderAction
  | PostOrderRequest
  | PostOrderFailed
  | SelectIngredientAction
  | GetConstructorAction
  | IngredientPushAction
  | IngredientsDeleteAction
  | RefreshConstructorAction
  | DefaultConstructorAction
  | TotalSumAction

  export type TAuthActions = RegSuccessAction
  | RegFailedAction
  | LoginAction
  | LogoutAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailedAction
  | RefreshTokenRequestAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailedAction