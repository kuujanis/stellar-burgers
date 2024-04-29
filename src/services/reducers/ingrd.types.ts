import { TConstructorIngredients, TDragable, TIngrd } from "../../utils/type"
import { COUNT_ORDER_SUM, DELETE_CONSTRUCTOR_INGREDIENT, FETCH_INGREDIENTS_ERROR, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, GET_CONSTRUCTOR_INGREDIENTS, POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, PUSH_CONSTRUCTOR_INGREDIENT, REFRESH_CONSTRUCTOR, SELECT_INGREDIENT, SET_DEFAULT_CONSTRUCTOR } from "../actions"


type FetchIngredientsAction = { type: typeof FETCH_INGREDIENTS_SUCCESS, ingredients:TIngrd[], fetchRequest: boolean, fetchFailed: boolean }
type FetchIngredientsRequest = {type: typeof FETCH_INGREDIENTS_REQUEST, fetchRequest: boolean}
type FetchIngredientsFailed = {type: typeof FETCH_INGREDIENTS_ERROR, fetchFailed: boolean}
type PostOrderAction = {type: typeof POST_ORDER_SUCCESS, orderNumber: number, orderRequest: boolean, orderFailed: boolean}
type PostOrderRequest = {type: typeof POST_ORDER_REQUEST, orderRequest: boolean}
type PostOrderFailed = {type: typeof POST_ORDER_ERROR, orderFailed: boolean}
type SelectIngredientAction = { type: typeof SELECT_INGREDIENT, currentIngredient:TIngrd }
type GetConstructorAction = {type: typeof GET_CONSTRUCTOR_INGREDIENTS, constructorIngredients: TConstructorIngredients, ingredients: TConstructorIngredients}
type IngredientPushAction = {type: typeof PUSH_CONSTRUCTOR_INGREDIENT, ingredientsCount: { [id: string]: number },constructorIngredients: TConstructorIngredients, draggedIngridient: TDragable, dragId: string}
type IngredientsDeleteAction = { type: typeof DELETE_CONSTRUCTOR_INGREDIENT, ingredientsCount: { [id: string]: number },constructorIngredients: TConstructorIngredients, deletedIngredient: TDragable }
type RefreshConstructorAction = {type: typeof REFRESH_CONSTRUCTOR, getConstructorIngredients: TConstructorIngredients, newCards: TDragable[]}
type DefaultConstructorAction = {type: typeof SET_DEFAULT_CONSTRUCTOR}
type TotalSumAction = {type: typeof COUNT_ORDER_SUM, bun: TDragable, slop: TDragable[]}

export type TIngredientActions = 
FetchIngredientsAction 
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