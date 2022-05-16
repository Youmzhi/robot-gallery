// 表示只要import以css为后缀的文件 都会遵循一下约定
declare module "*.css" {
  const css: {[key: string]: string}
  export default css
}