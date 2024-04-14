import { UnknownAction } from "redux";
import { TCard, TDraggingCard } from "../../utils";
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
  COUNT_ORDER_SUM
} from "../actions";
import { getConstructorIngredients } from "../actions/ingredientsData";

type TConstructorIngredients = {
  bun: TDraggingCard | null,
  slop: TDraggingCard[]
}

type TIngredientsState = {
  ingredients: TCard[];
  fetchRequest: boolean,
  fetchFailed: boolean,
  constructorIngredients: TConstructorIngredients,
  ingredientsCount: { [id: string]: number },
  currentIngredient: TCard | null,

  orderNumber: number,
  totalPrice: number,
  orderRequest: boolean,
  orderFailed: boolean
}

const initialState:TIngredientsState = {
    ingredients: [],
    fetchRequest: false,
    fetchFailed: false,
    constructorIngredients: {
      bun: null,
      slop: []
    },
    currentIngredient: null,
    ingredientsCount: {},
    orderNumber: 0,
    totalPrice: 0,
    orderRequest: false,
    orderFailed: false
}

export type FetchIngredientsAction = { type: typeof FETCH_INGREDIENTS_SUCCESS, ingredients:TCard[], fetchRequest: boolean, fetchFailed: boolean }
export type FetchIngredientsRequest = {type: typeof FETCH_INGREDIENTS_REQUEST, fetchRequest: boolean}
export type FetchIngredientsFailed = {type: typeof FETCH_INGREDIENTS_ERROR, fetchFailed: boolean}
export type PostOrderAction = {type: typeof POST_ORDER_SUCCESS, orderNumber: number, orderRequest: boolean, orderFailed: boolean}
export type PostOrderRequest = {type: typeof POST_ORDER_REQUEST, orderRequest: boolean}
export type PostOrderFailed = {type: typeof POST_ORDER_ERROR, orderFailed: boolean}
export type SelectIngredientAction = { type: typeof SELECT_INGREDIENT, currentIngredient:TCard }
export type GetConstructorAction = {type: typeof GET_CONSTRUCTOR_INGREDIENTS, constructorIngredients: TConstructorIngredients, ingredients: TConstructorIngredients}
export type IngredientPushAction = {type: typeof PUSH_CONSTRUCTOR_INGREDIENT, ingredientsCount: { [id: string]: number },constructorIngredients: TConstructorIngredients, draggedIngridient: TDraggingCard, dragId: string}
export type IngredientsDeleteAction = { type: typeof DELETE_CONSTRUCTOR_INGREDIENT, ingredientsCount: { [id: string]: number },constructorIngredients: TConstructorIngredients, deletedIngredient: TDraggingCard }
export type RefreshConstructorAction = {type: typeof REFRESH_CONSTRUCTOR, getConstructorIngredients: TConstructorIngredients, newCards: TDraggingCard[]}
export type DefaultConstructorAction = {type: typeof SET_DEFAULT_CONSTRUCTOR}
export type TotalSumAction = {type: typeof COUNT_ORDER_SUM, bun: TDraggingCard, slop: TDraggingCard[]}

type TIngredientActions = FetchIngredientsAction 
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

export const ingredientReducer = (state:TIngredientsState = initialState, action:TIngredientActions):TIngredientsState => {
    switch(action.type) {
        case FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.ingredients,
                fetchRequest: false,
                fetchFailed: false
            }
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                fetchRequest: true,
            }
        case FETCH_INGREDIENTS_ERROR:
            return {
                ...state,
                fetchFailed: true,
            }

            case POST_ORDER_SUCCESS: {
              return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false
              };
            }
            case POST_ORDER_REQUEST: {
                return {
                  ...state,
                  orderRequest: true
                };
              }
            case POST_ORDER_ERROR: {
                return {
                  ...state,
                  orderFailed: true
                };
            }

            case SELECT_INGREDIENT: {
              return {
                ...state,
                currentIngredient: action.currentIngredient,
              };
            }

            case GET_CONSTRUCTOR_INGREDIENTS: {
              return {
                ...state,
                constructorIngredients: action.ingredients
              };
            }
            case PUSH_CONSTRUCTOR_INGREDIENT: {
              const newItem = action.draggedIngridient;
              const newId = newItem._id;
              const isBun = newItem.type === "bun";
              return {
                ...state,
                ingredientsCount: !isBun
                  ? {
                      ...state.ingredientsCount,
                      [newId]: state.ingredientsCount[newId]
                        ? state.ingredientsCount[newId] + 1
                        : 1,
                    }
                  : { ...state.ingredientsCount },
                constructorIngredients: {
                  bun: isBun
                    ? { ...newItem, dragId: action.dragId }
                    : state.constructorIngredients.bun,
                    slop: !isBun
                    ? [
                        ...state.constructorIngredients.slop,
                        { ...newItem, dragId: action.dragId },
                      ]
                    : state.constructorIngredients.slop,
                },
              };
            }
            case DELETE_CONSTRUCTOR_INGREDIENT: {
              return {
                ...state,
                ingredientsCount: {
                  ...state.ingredientsCount,
                  [action.deletedIngredient._id]:
                    state.ingredientsCount[action.deletedIngredient._id] - 1,
                },
                constructorIngredients: {
                  ...state.constructorIngredients,
                  slop:
                    state.constructorIngredients.slop.filter(
                      (item) => item.dragId !== action.deletedIngredient.dragId
                    ),
                },
              };
            }
            case REFRESH_CONSTRUCTOR: {
              return {
                ...state,
                constructorIngredients: {
                  ...state.constructorIngredients,
                  slop: [...action.newCards],
                },
              };
            }

            case SET_DEFAULT_CONSTRUCTOR: {
                return{
                  ...state,
                  constructorIngredients: initialState.constructorIngredients,
                  ingredientsCount: initialState.ingredientsCount,
                }
            }

            case COUNT_ORDER_SUM: {
              return {
                ...state,
                totalPrice:
                  action.slop && action.bun ?
                  action?.slop?.reduce((acc:number, item:TCard) => acc + item.price, 0) + action.bun.price * 2 : 0
              };
            }
        default: {return state}
    }
}