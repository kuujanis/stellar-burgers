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

const initialState = {
    ingredients: [],
    fetchRequest: false,
    fetchFailed: false,
    constructorIngredients: {
      bun: null,
      slop: []
    },
    orderRequest: false,
    orderFailed: false,
    currentIngredient: {},
    ingredientsCount: {},
    orderNumber: 0,
    totalPrice: 0,
}

export const ingredientReducer = (state = initialState, action) => {
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
                constructorIngredients: {
                  bun: action.ingredients.bun,
                  slop: action.ingredients.slop.filter(
                    (item) => item.type !== "bun"
                  ),
                },
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
                    constructorIngredients: {
                        bun: null,
                        slop: []
                    },
                      currentIngredient: {},
                      ingredientsCount: 0,
                      totalPrice: 0,
                }
            }

            case COUNT_ORDER_SUM: {
              return {
                ...state,
                totalPrice:
                  action.slop && action.bun &&
                  action?.slop?.reduce((acc, {price}) => acc + price, action.bun.price * 2) || 0
              };
            }
        default: return state
    }
}