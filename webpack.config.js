// 引入path包，辅助路径设置
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    devServer:{
        static:"./dist"
    },
    // 生产/开发模式
    // mode:"development"
    mode:"production",
    // 入口文件
    entry:"./src/index.ts",
    output:{
        // 打包文件目录
        path:path.resolve(__dirname,'dist'),
        // 打包后的文件名
        filename:"bundle.js",
        // 每次打包清空输出目录原文件
        clean:true,
        environment:{
            // 打包后的js不使用箭头函数（立即执行）
            arrowFunction:false,
            // 打包后的js不使用const
            const:false
        }
    },
    // loader
    module:{
        // 打包规则
        rules:[
            {
                // 规则生效的文件
                test:/\.ts$/,
                // 使用的loader
                use:[
                    // 配置babel
                    {
                        // 指定加载器
                        loader:"babel-loader",
                        // 设置babel
                        options:{
                            // 设置预定义的环境
                            presets:[
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的版本
                                        targets:{
                                            "chrome":"88",
                                            "ie":"11",
                                        },
                                        // 指定corejs版本
                                        "corejs":"3",
                                        // 使用corejs的方式
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 排除的文件
                exclude:/node-modules/
            },
            // less文件处理
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:"last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 插件
    plugins:[
        // 每次打包清空dist目录，webpack5可以在output中配置
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title:"自定义title"
            template:"./src/index.html"
        }),
    ],
    // 设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }
}