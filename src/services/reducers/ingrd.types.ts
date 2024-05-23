import { TConstructorIngredients, TDragable, TIngrd } from "../../utils/type"
import { COUNT_ORDER_SUM, DELETE_CONSTRUCTOR_INGREDIENT, FETCH_INGREDIENTS_ERROR, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS, GET_CONSTRUCTOR_INGREDIENTS, POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, PUSH_CONSTRUCTOR_INGREDIENT, REFRESH_CONSTRUCTOR, SELECT_INGREDIENT, SET_DEFAULT_CONSTRUCTOR } from "../actions"

type BlankAction = {type: undefined}
type FetchIngredientsAction = { type: typeof FETCH_INGREDIENTS_SUCCESS, ingredients:TIngrd[]}
type FetchIngredientsRequest = {type: typeof FETCH_INGREDIENTS_REQUEST}
type FetchIngredientsFailed = {type: typeof FETCH_INGREDIENTS_ERROR}
type PostOrderAction = {type: typeof POST_ORDER_SUCCESS, orderNumber: number}
type PostOrderRequest = {type: typeof POST_ORDER_REQUEST}
type PostOrderFailed = {type: typeof POST_ORDER_ERROR}
type SelectIngredientAction = { type: typeof SELECT_INGREDIENT, currentIngredient:TIngrd }
type GetConstructorAction = {type: typeof GET_CONSTRUCTOR_INGREDIENTS, constructorIngredients: TConstructorIngredients, ingredients: TConstructorIngredients}
type IngredientPushAction = {type: typeof PUSH_CONSTRUCTOR_INGREDIENT, draggedIngridient: TIngrd, dragId: string}
type IngredientsDeleteAction = { type: typeof DELETE_CONSTRUCTOR_INGREDIENT, deletedIngredient: TDragable }
type RefreshConstructorAction = {type: typeof REFRESH_CONSTRUCTOR, newCards: TDragable[]}
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
| BlankAction