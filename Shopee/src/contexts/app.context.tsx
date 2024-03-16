import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from 'src/types/user.type'

interface AppContextInterface {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuth: Boolean(getAccessTokenFromLS()),
  setIsAuth: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(initialAppContext.isAuth)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  return <AppContext.Provider value={{ isAuth, setIsAuth, profile, setProfile }}>{children}</AppContext.Provider>
}
