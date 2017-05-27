# 项目说明

## 本地环境安装

```
# 安装 NodeJS NPM
$ sudo apt-get install node npm -g

# 更新 NodeJS (Linux, OSX)
$ npm install -g n
$ n 6.2.2

# 更新 NPM
$ npm install -g npm

# 更新 NodeJS 6.2.2 或以上稳定版本
$ npm install -g n nrm
$ n use stable

# 使用淘宝源 或 cnpm 源
$ nrm use taobao
$ 或
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

# (npm、cnpm)安装 node_modules
$ cd /path/to/project
$ npm install 或 cnpm install

# yarn 方式安装node_modules
$ 1、npm install yarn -g 或者 cnpm install yarn -g
$ 2、yarn

# yarn安装依赖包
$ yarn add xxx --dev
```

#### Nginx 配置文件导入

```
# 生成 nginx 配置文件
$ ./bin/nginx
# 或者
$ npm run nginx

# 导入配置文件
$ echo "include /path/to/project/vhosts/nginx.conf;" >> /path/to/nginx/nginx.conf

# 重启nginx
# Linux
$ sudo service nginx restart
# OSX
$ sudo brew services restart nginx
# windos
$ nginx -s reload
```

## 代码编译与发布

```
# 开发环境编译
$ npm start

# 发布代码
$ npm run build
```
