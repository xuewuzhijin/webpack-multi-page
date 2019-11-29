import { Configuration } from "webpack"
import Config from "../config";
import WebpackMerge from "webpack-merge";


type PluginKey = keyof typeof Config.plugin;
let webpack: Configuration = {};

for (const key in Config.plugin) {
  Config.plugin[(key as PluginKey)] && (webpack = WebpackMerge(webpack, require(`./plugins/${key}`)));
}

export default webpack;
