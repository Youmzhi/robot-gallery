import React, { useState } from 'react';

interface AppStateValue {
  username: string;
  shoppingCart: {
    items: { id: number, name: string}[]
  }
}

const defaultContextValue: AppStateValue = {
  username: '阿莱克斯',
  shoppingCart: { items : []}
}

export const appContext = React.createContext(defaultContextValue)

interface ProviderProps {
  children?: React.ReactNode // react18以上版本需要明确定义children类型
}

export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined) // 这个泛型类型就是setState类型，鼠标放在setState代码上

export const AppStateProvider: React.FC<ProviderProps> = (props) => {
  const [state, setState] = useState(defaultContextValue)

  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}