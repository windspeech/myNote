# http-server 开启https服务  
准备工作
下载一个openssl
这个工具是用来生成证书的，普通的http协议不需要证书，而https协议需要有证书才能启动  
生成证书  
当你下完openssl并且为其配置好环境变量之后，在控制台中进入你的项目根目录  
1. 然后在控制台中输入命令生成证书
```
openssl genrsa -out privatekey.pem 1024
```
2. 然后继续输入命令生成签名
```
openssl req -new -key privatekey.pem -out certrequest.csr
```
3. 最后根据签名和私钥生成证书
```
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```
在你生成签名的时候会有一些配置项，貌似只需要填第一项，第一项就是国家，填CN或者US都可以后面那几项都不用填就行
————————————————

原文链接：https://blog.csdn.net/Lucky_Q/article/details/91406564
