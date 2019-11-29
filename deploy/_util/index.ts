import Glob from "glob";
import Config from "../config";
import fs from "fs";

/** 返回的入口文件数组
 * @param { Function } cb 回调函数
 * @param { String } path 返回相对于项目根目录的相对路径
 * @param { String } name 返回截取后的名称作为 chunk 名称
 * @param { String } templatePath 用于判断路径的入口文件有没有对应名称的 html 文件
 */
const entrys = ( cb: (path: string, name: string, templatePath: string) => void ) => {

  Glob.sync(`{./views/@(${Config.entry.name.join("|")}).[jt]s,./views/**/!(${Config.entry.ignorePrefix.join("|")})*/@(${Config.entry.name.join("|")}).[jt]s}`)
  .forEach( path => {

  let name = path.replace(new RegExp(`(./views/)|(\.[jt]s)`, "g"), ""),
      temp = path.replace(/[jt]s$/, "html"),
      // 判断文件是否存在，如果不存在则使用默认的模版文件
      exist= fs.existsSync( temp );
  cb( path, name + ".html", exist ? temp : Config.templatePath )

  })
}

export default entrys

export { entrys }