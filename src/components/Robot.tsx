import React, { useContext } from 'react'
import styles from './Robot.module.css'
import { appContext, appSetStateContext } from '../AppState'
import { withAddToCart, useAddToCart } from './AddToCart' // 高阶组件

/* Provider Consumer 传递数据  */
/*
interface RobotProps {
  id: number,
  name: string,
  email: string
}

const Robot: React.FC<RobotProps>  = ({id, name, email}) => {
  return (
    <appContext.Consumer>
      { (value) => {
        return (  
          <div className={styles.cardContainer}>
            <img alt='robot' src={`https://robohash.org/${id}`} />
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
          </div>
        )
      }}
    </appContext.Consumer>
  )
}

export default Robot
*/

/* useContext 传递数据 */

export interface RobotProps {
  id: number,
  name: string,
  email: string,
  addToCart: (id: number, name: string) => void
}

const Robot: React.FC<RobotProps>  = ({id, name, email, addToCart}) => {
  const value = useContext(appContext)
  
  // * 已使用HOC高级组件（AddToCart.tsx）实现加入购物车
  // const setState = useContext(appSetStateContext)
  // const addToCart = () => {
  //   if (setState) {
  //     setState(state => {
  //       return {
  //         ...state,
  //         shoppingCart: {
  //           items: [...state.shoppingCart.items, {id, name}]
  //         }
  //       }
  //     })
  //   }
  // }

  return (
    <div className={styles.cardContainer}>
      <img alt='robot' src={`https://robohash.org/${id}`} />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={()=> { addToCart(id, name) }}>加入购物车</button>
    </div>
  )
}

export default withAddToCart(Robot)

// 使用自定义Hook加入购物车
/*
interface RobotProps {
  id: number,
  name: string,
  email: string
}

const Robot: React.FC<RobotProps>  = ({id, name, email}) => {
  const value = useContext(appContext)
  const addToCart = useAddToCart()
  return (
    <div className={styles.cardContainer}>
      <img alt='robot' src={`https://robohash.org/${id}`} />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={()=> { addToCart(id, name) }}>加入购物车</button>
    </div>
  )
}

export default Robot
*/