# 阿里云动态解析工具(ALIYUN-DDNS-TOOL)
#### 自动将域名解析到持续变化的服务器IP上

------

## 功能
  - 程序启动时查询指定域名的解析记录
  - 程序运行时，每五分钟自动执行如下操作
    - 查询本机对应的公网IP
    - 检测本机公网IP是否和指定域名目前的解析记录相等
    - 如果本机公网IP与指定域名目前的解析记录不等，则更新解析记录到阿里云DNS

------

## 使用场景描述：
  - 需要将域名解析到开发环境，但是开发环境的公网IP是动态的，无法设置解析
  - 例如线上调试有后端的微信小程序时，您可以这样：
    - 设置一个用于调用接口的域名,如: api-wechat-miniprogram.domainname.com
    - 按照说明设置启动本程序
    - 本地Nginx设置SSL证书到8080端口
    - 在本地启动您的后端程序并暴露相应端口,如: 8080
    - 在小程序管理平台设置 开发->开发设置->服务器域名->request合法域名 ：https://api-wechat-miniprogram.domainname.com:8080

------

## 使用之前的准备工作：
  - 有阿里云购买的域名，并使用阿里云云解析服务进行域名解析（因为程序设置解析调API阿里云DNS的API）。[查看文档](https://help.aliyun.com/knowledge_list/121109.html?spm=a2c4g.11186623.6.570.55fa6fd8ob7hcG)
  - 有可以用来调取阿里云API的accessKeyId和相应的accessKeySecret，这个ID需要有DNS的读写权利。[查看文档](https://help.aliyun.com/document_detail/61723.html?spm=5176.11065259.1996646101.searchclickresult.5ca4158e47eh5i)
  - 和运营商沟通，让其开启公共网IP，如果在你服务已经启动，应该在公网IP可以访问
    - 联通电信都试过，是可以免费开通的，可以这么和客服说：“我要给家里装网络监控，需要在互联网上可以访问”（这么说是因为她们只能听懂这个版本）
    - 在路由器上给你的电脑指定一个固定IP，如果你的路由器连接在光猫上同时需要给你的路由器指定一个固定IP。[查看示例](https://jingyan.baidu.com/article/647f01151db5677f2148a8de.html)（为下一步DMZ和端口映射设置作准备）
    - 在路由器和光猫上设置好DMZ或端口映射[查看示例](https://jingyan.baidu.com/article/fdbd42779f7136b89e3f48e0.html)
  - 本机安装有docker-compose [查看文档](https://docs.docker.com/compose/install/)
  - 本机安装有nodejs和npm，建议使用最新稳定版本 [查看文档](https://nodejs.org/en/)

------

## 安装和开始使用
  - 克隆本仓库 `git clone <仓库地址>`
  - 执行 `npm install`
  - 将 `example-docker-compose.yml` 重命名为 `docker-compose.yml`
  - 设置 `docker-compose.yml` 文件的环境变量<>包裹的部分（一定不能留尖括号和空格），没有的话请参见使用前准备
  ```
      environment: 
      - ALI_DNS_ID=<Your accessKeyID>
      - ALI_DNS_SECRET=<Your accessKeySecret>
      - ALI_DNS_ENDPOINT=https://alidns.aliyuncs.com
      - ALI_DNS_API_VERSION=2015-01-09
      - SUB_DOMAIN=<Your Sub domain name>
      - DOMAIN=<Your domain name>
  ```
  - 运行 `docker-compose up`

------

### 贡献
  - 联系York，添加您为合作者
    - wechat: yiranguan
    - e-mail: york@hackervalley.org
    - 或者直接提Issue
  - 上传代码，开分支提PR即可

------

### 协议MIT随便玩
