export interface ILoginState {
  login: string
}

export interface ILoginAction {
  type: 'login'
}

const ACTION_TYPE = 'login'

export const loginState: ILoginState = {
  login: 'login',
}

const addTodo = (content: string) => ({
  type: ACTION_TYPE,
  payload: {
    content,
  },
})

export function loginReducer(
  initState = loginState,
  action: ILoginAction,
): ILoginState {
  switch (action.type) {
    case ACTION_TYPE: {
      return { ...initState }
    }
    default: {
      return { ...initState }
    }
  }
}
