import React, {useContext} from 'react';
import { appSetStateContext } from '../AppState';
import { RobotProps } from './Robot';
// * HOC 高阶组件 
export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) => {
  // return class extends React.Component {}
  return (props) => {
    const setState = useContext(appSetStateContext)

    const addToCart = (id, name) => {
      if (setState) {
        setState(state => {
          return {
            ...state,
            shoppingCart: {
              items: [...state.shoppingCart.items, {id, name}]
            }
          }
        })
      }
    }

    return <ChildComponent {...props} addToCart={addToCart}/>
  }
}

// * 自定义Hook函数 
export const useAddToCart = () => {
  const setState = useContext(appSetStateContext)
  const addToCart = (id, name) => {
    if (setState) {
      setState(state => {
        return {
          ...state,
          shoppingCart: {
            items: [...state.shoppingCart.items, {id, name}]
          }
        }
      })
    }
  }
  return addToCart
}
  