import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
// import robots from './mockdata/robots.json'
import Robot from './components/Robot'
import RobotDiscount from './components/RobotDiscount'
import styles from './App.module.css';
import ShoppingCart from './components/ShoppingCart';
// 1. typescript 无法识别css格式文件  *.d.ts后缀文件 ts类型声明文件，只包含类型声明，不包含逻辑。
// 2. typescript 无法识别json文件格式 tsconfig.json文件中添加配置 "moduleResolution": "node"  "resolveJsonModule": true


/* 类组件 */
/* 
interface Props {}

interface State {
  robotGallery: any[],
  count: number
}

// 常见生命周期
// Mounting: 创建虚拟DOM，渲染UI(构建函数,getDerivedStateFromProps,render():渲染UI,componentDidMount)
// Updating: 更新虚拟DOM，重新渲染UI(getDerivedStateFromProps,shouldComponentUpdate,render:渲染UI,componentDidUpdate)
// Unmounting: 删除虚拟DOM，移除UI(componentWillUnmount)
class App extends React.Component<Props, State> {

  // * 生命周期第一阶段： 初始化
  constructor(props) {
    super(props)
    this.state = {
      robotGallery: [],
      count: 0
    }
  }
  
  // 在组件创建好dom元素以后，挂载进页面的时候调用
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((data) => this.setState({ robotGallery: data }))
  }

  // * 生命周期第二阶段： 更新
  // 在组件接受到一个新的props (更新后)时被调用
  // componentWillReceiveProps
  // static getDerivedStateFromProps(props, state) {
  //   console.log(props, state)
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.some != this.state.some
  // }
  // 组件更新后调用
  componentDidUpdate() {}

  // * 生命周期第三阶段： 销毁
  // 组件销毁调用
  // 可以当作析构函数 destructor 来使用
  componentWillUnmount() {}

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>罗伯特机器人炫酷吊炸天online购物平台</h1>
        </div>
        <button onClick={()=>{
          // this.setState({ count: this.state.count + 1 }, ()=> {
          //   console.log('count', this.state.count)
          // })
          // this.setState({ count: this.state.count + 1 }, ()=> {
          //   console.log('count', this.state.count)
          // })
          this.setState((preState, preProps)=> {
            return {
              count: preState.count + 1
            }
          }, ()=> {
            console.log('count', this.state.count)
          })
          this.setState((preState, preProps)=> {
            return {
              count: preState.count + 1
            }
          }, ()=> {
            console.log('count', this.state.count)
          })
        }}>click</button>
        <span>count: {this.state.count}</span>
        <ShoppingCart></ShoppingCart>
        <div className={styles.robotList}>
          {this.state.robotGallery.map( r => <Robot id={r.id} email={r.email} name={r.name} /> )}
        </div>
      </div>
    )
  }
}

export default App;
*/




/* 函数组件 */

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击${count}次`
  }, [count])

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then((response)=> response.json())
    // .then((data) => setRobotGallery(data))
    // * async await 获取数据
    const fetchData = async () => {
      setLoading(true)
      try {
        const responses = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await responses.json()
        setRobotGallery(data)
      } catch(e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    
    fetchData()
    
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人炫酷吊炸天online购物平台</h1>
      </div>
      <button onClick={()=>{
        setCount(count + 1)
      }}>click</button>
      <span>count: {count}</span>
      <ShoppingCart></ShoppingCart>
      { (!error || error !== '') && <div>网站出错： {error}</div> }
      { !loading ? (
        <div className={styles.robotList}>
          {robotGallery.map( (r:any, index) =>
            index % 2 == 0 ? (
              <RobotDiscount key={index} id={r.id} email={r.email} name={r.name} />
            ) : (
              <Robot key={index} id={r.id} email={r.email} name={r.name} />
            )
            // <Robot id={r.id} email={r.email} name={r.name} /> 
          )}
        </div>
        ):( <h2>loading 加载中...</h2> )
      }
      
    </div>
  )
}


export default App;