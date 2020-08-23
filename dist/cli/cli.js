#!/usr/bin/env node
(function e(r,n){if(typeof exports==="object"&&typeof module==="object")module.exports=n();else if(typeof define==="function"&&define.amd)define("prerendered_cli",[],n);else if(typeof exports==="object")exports["prerendered_cli"]=n();else r["prerendered_cli"]=n()})(this,(function(){return function(e){var r={};function n(o){if(r[o]){return r[o].exports}var t=r[o]={i:o,l:false,exports:{}};e[o].call(t.exports,t,t.exports,n);t.l=true;return t.exports}n.m=e;n.c=r;n.d=function(e,r,o){if(!n.o(e,r)){Object.defineProperty(e,r,{enumerable:true,get:o})}};n.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})};n.t=function(e,r){if(r&1)e=n(e);if(r&8)return e;if(r&4&&typeof e==="object"&&e&&e.__esModule)return e;var o=Object.create(null);n.r(o);Object.defineProperty(o,"default",{enumerable:true,value:e});if(r&2&&typeof e!="string")for(var t in e)n.d(o,t,function(r){return e[r]}.bind(null,t));return o};n.n=function(e){var r=e&&e.__esModule?function r(){return e["default"]}:function r(){return e};n.d(r,"a",r);return r};n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)};n.p="";return n(n.s=1)}([function(e,r){e.exports=require("path")},function(e,r,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:true});var t=o(n(2));var i=o(n(0));var s=o(n(3));var u=o(n(4));var a=n(5);var l=n(6);a.program.version("0.0.1");console.log("Prerendered CLI");a.program.option("--debug, -d","Enable debug printing");a.program.command("init").description("Initialize prerendered").action((function(e,r){if(t.default.existsSync(i.default.join(process.cwd(),"prerendered.json"))){throw new Error("Error! prerendered.json already exists. Please delete it before proceeding.")}console.log("Thank you for using prerendered. I will now ask a few questions about your app.");console.log("A configuration file will be created to the project root which is used by the build command.");console.log("The folder I will use as a base will be "+process.cwd());var n=[{type:"input",name:"entrypoint",message:"What is your client entrypoint? (Current working dir: "+process.cwd()+")"}];s.default.prompt(n).then((function(e){if(e.entrypoint===""){throw new Error("Error! No entrypoint given")}if(!t.default.existsSync(i.default.join(process.cwd(),e.entrypoint))){throw new Error("Error! Entrypoint does not exidst")}var r={client:{entryPoint:e.entrypoint}};t.default.writeFileSync(i.default.join(process.cwd(),"prerendered.json"),JSON.stringify(r,null,2));console.log("Created prerendered.json")}))}));a.program.command("build").description("Build prerendered").action((function(e,r){if(!t.default.existsSync(i.default.join(process.cwd(),"prerendered.json"))){throw new Error("Error! prerendered.json not found. Please run `prerendered init`")}var n=JSON.parse(t.default.readFileSync(i.default.join(process.cwd(),"prerendered.json")).toString("utf-8"));var o=l.createConfig(n.client.entryPoint,a.program.debug);u.default(o,(function(e,r){if(e||r.hasErrors()){if(e.message){console.error(e.message)}throw new Error("Webpack: Failed to compile")}console.log("Webpack: Done!");console.log(r.toString())}))}));a.program.parse(process.argv)},function(e,r){e.exports=require("fs")},function(e,r){e.exports=require("inquirer")},function(e,r){e.exports=require("webpack")},function(e,r){e.exports=require("commander")},function(e,r,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:true});r.createConfig=void 0;var t=n(0);var i=o(n(7));var s=n(8);var u=o(n(9));r.createConfig=function(e,r){if(r===void 0){r=false}var n=t.resolve(__dirname,"tsconfig.prr.json");var o={mode:"production",entry:t.resolve(process.cwd(),e),output:{path:t.resolve(process.cwd(),".prerendered","static"),filename:"[name].[contenthash].js",chunkFilename:"[id]-[chunkhash].js"},module:{rules:[{test:/\.tsx?$/,exclude:[/node_modules/],include:[t.resolve(process.cwd(),t.dirname(e))],loader:"ts-loader",options:{configFile:n}}]},resolve:{extensions:[".js",".jsx",".ts",".tsx"]},devtool:"source-map",target:"web",optimization:{minimize:true,minimizer:[new i.default({parallel:true,terserOptions:{compress:false,ecma:6,mangle:true},sourceMap:true,test:/\.js(\?.*)?$/i})]},plugins:[new s.CleanWebpackPlugin,new u.default({publicPath:"static",fileName:t.resolve(process.cwd(),".prerendered","manifest.json")})]};if(r){console.log("tsconfig.prr.json: %s",n);console.log("Webpack configuration: %s",JSON.stringify(o,null,2))}return o}},function(e,r){e.exports=require("terser-webpack-plugin")},function(e,r){e.exports=require("clean-webpack-plugin")},function(e,r){e.exports=require("webpack-manifest-plugin")}])}));
//# sourceMappingURL=cli.js.map