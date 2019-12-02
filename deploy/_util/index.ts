import fs from "fs";
import Glob from "glob";
import Config from "../config";
import { Configuration } from "webpack"
import WebpackMerge from "webpack-merge";

/** 返回的入口文件数组
 * @param { function } cb 回调函数
 * @param { string } path 返回相对于项目根目录的相对路径
 * @param { string } name 返回截取后的名称作为 chunk 名称
 * @param { string } templatePath 用于判断路径的入口文件有没有对应名称的 html 文件
 */
const entrys = ( cb: (path: string, name: string, templatePath: string) => void ) => {

  let { entry: { name, ignorePrefix } } = Config,
      newName = name.join("|");

  Glob.sync(`{./views/@(${newName}).[jt]s,./views/**/!(${ignorePrefix.join("|")})*/@(${newName}).[jt]s}`)
  .forEach( path => {

  let name = path.replace(new RegExp(`(./views/)|(\.[jt]s)`, "g"), ""),
      temp = path.replace(/[jt]s$/, "html"),
      // 判断文件是否存在，如果不存在则使用默认的模版文件
      exist= fs.existsSync( temp );
      
  cb( path, name + ".html", exist ? temp : Config.templatePath )

  })
}


type PluginKey = keyof typeof Config.plugin;
/** 返回使用的插件列表 */
let webpack: Configuration = {};
for (const key in Config.plugin) {
  Config.plugin[ (<PluginKey> key) ] && (webpack = WebpackMerge(webpack, require(`./plugins/${key}`)));
}


export default entrys
export {
  entrys as Entrys,
  webpack as UsePlugins
}
