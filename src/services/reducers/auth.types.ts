import { TUser } from "../../utils/type"
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN, LOGOUT, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS } from "../actions"

type BlankAction = {type: undefined}
type RegSuccessAction = {type: typeof REGISTER_SUCCESS}
type RegFailedAction = {type: typeof REGISTER_FAILED}
type LoginAction = {type: typeof LOGIN, user: TUser }
type LogoutAction = {type: typeof LOGOUT}
type GetUserRequestAction = {type: typeof GET_USER_REQUEST}
type GetUserSuccessAction = {type: typeof GET_USER_SUCCESS, user: TUser }
type GetUserFailedAction = {type: typeof GET_USER_FAILED}
type RefreshTokenRequestAction = {type: typeof REFRESH_TOKEN_REQUEST }
type RefreshTokenSuccessAction = {type: typeof REFRESH_TOKEN_SUCCESS }
type RefreshTokenFailedAction = {type: typeof REFRESH_TOKEN_FAILED }

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
| BlankAction
