# 浏览器扩展

> 最近发现自己逐渐的写了很多的浏览器扩展，需要建立一个代码仓库来进行管理和维护，方便后续的使用和修改。并且将这些代码开源，供给有需要的人使用。

## 文件组织结构

+ `README.md`：说明文件
+ `manifest.json` ：浏览器扩展的配置文件
+ `main.html` ：浏览器扩展的页面
+ `packages` ：浏览器扩展的包文件夹 (多个项目)
  + `package_1` 项目1
    + `scripts` 浏览器扩展的脚本文件夹
      + `script_1.js`
    + `process` 后续处理 Python 文件夹
      + `process_1.py`
    + `data` 需要处理的数据文件夹
      + `data_1.json`
  
## 开始使用

1. 克隆仓库

```bash
git clone https://github.com/cheer-star/chrome-plugins.git
```

2. 选择需要的项目

> 将 `packages/项目/manifest.json` 复制到主目录下 (与 `main.html` 同级)

1. 打开浏览器，进入扩展程序页面
2. 点击“加载已解压的扩展程序”
3. 选择克隆的仓库目录

这样就可以在浏览器中使用扩展程序了。

## 项目

### Download

从网页上下载文件