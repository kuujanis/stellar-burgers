import { TUser } from "../../utils/type"
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN, LOGOUT, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS } from "../actions"


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

export type TAuthActions = 
RegSuccessAction
| RegFailedAction
| LoginAction
| LogoutAction
| GetUserRequestAction
| GetUserSuccessAction
| GetUserFailedAction
| RefreshTokenRequestAction
| RefreshTokenSuccessAction
| RefreshTokenFailedAction