import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

interface AppContextInterface {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuth: Boolean(getAccessTokenFromLS()),
  setIsAuth: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(initialAppContext.isAuth)
  return <AppContext.Provider value={{ isAuth, setIsAuth }}>{children}</AppContext.Provider>
}
