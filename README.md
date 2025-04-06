# 浏览器扩展

> 最近发现自己逐渐的写了很多的浏览器扩展，需要建立一个代码仓库来进行管理和维护，方便后续的使用和修改。并且将这些代码开源，供给有需要的人使用。

## 文件组织结构

+ `README.md`：说明文件
+ `packages` ：浏览器扩展的包文件夹 (多个项目)
  + `项目文件夹`
    + `manifest.json`：扩展程序的配置文件
    + `main.html`：扩展程序的弹出页面
    + `scripts`：扩展程序的脚本文件夹
      + `main.js`：扩展程序的主脚本
      + `content.js`：扩展程序的内容脚本
    + `process`：扩展程序的处理文件夹
      + `main.py`: 后续数据的处理脚本
    + `data`：扩展程序的数据文件夹
      + `data.json`：扩展程序的数据文件
  
## 开始使用

1. 克隆仓库

```bash
git clone https://github.com/cheer-star/chrome-plugins.git
```

1. 打开浏览器，进入扩展程序页面
2. 点击“加载已解压的扩展程序”
3. 选择需要的项目文件夹

这样就可以在浏览器中使用扩展程序了。

## 项目

### Download

从网页上下载文件