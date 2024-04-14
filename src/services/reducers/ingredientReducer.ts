import { TIngrd, TConstructorIngredients, TIngredientActions } from "../../utils/type";
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



export type TIngredientsState = {
  ingredients: TIngrd[];
  fetchRequest: boolean,
  fetchFailed: boolean,
  constructorIngredients: TConstructorIngredients,
  ingredientsCount: { [id: string]: number },
  currentIngredient: TIngrd | null,

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
                  action?.slop?.reduce((acc:number, item:TIngrd) => acc + item.price, 0) + action.bun.price * 2 : 0
              };
            }
        default: {return state}
    }
}