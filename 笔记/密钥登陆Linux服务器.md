# [密钥登陆Linux服务器](https://www.cnblogs.com/assassin1994/p/4661878.html)

Linux VPS/服务器的使用越来越多，Linux的安全问题也需要日渐加强。我们远程线上的服务器，通常是通过密码方式（ip+帐号+密码，可能还多一个ssh端口）登录，如果密码不够强壮，那么系统将是灰常不安全的。

下面介绍一种密钥验证登录的方式:

# 使用密钥验证登录

基于密钥的安全验证必须为用户自己创建一对密钥，并把共有的密钥放在需要访问的服务器上。当需要连接到远程服务器上时，客户端软件就会向服务器发出请求，请求使用客户端的密钥进行安全验证。服务器收到请求之后，先在该用户的根目录下寻找共有密钥，然后把它和发送过来的密钥进行比较。如果两个密钥一致，服务器就用公有的密钥加密“质询”，并把它发送给客户端软件（putty,xshell等）。客户端收到质询之后，就可以用本地的私人密钥解密再把它发送给服务器，这种方式是相当安全的。

 

一.生成密钥

1.登录远程Linux  VPS/服务器，执行：ssh-keygen -t rsa 

Generating public/private rsa key pair.

Enter file in which to save the key (.ssh/id_rsa):                 //直接回车

Enter passphrase (empty for no passphrase):                   //输入密钥密码（如果不设置，请直接回车。强烈建议输入1个密码- -）

Enter same passphrase again:                              //重复密钥密码

2、将~/.ssh/id_rsa.pub复制到~/.ssh/authorized_keys,并修改权限。

cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

chmod 600 ~/.ssh/authorized_keys   

3、修改/etc/ssh/sshd_config 文件，将RSAAuthentication 和 PubkeyAuthentication 后面的值都改成yes ，保存。

4、重启sshd服务，Debian/Ubuntu执行/etc/init.d/ssh restart ；CentOS执行：/etc/init.d/sshd restart。

二、客户端测试使用密钥登录

1、XShell登录

①把服务器的~/.ssh/id_rsa文件下载到本地。

②

 ![img](https://images0.cnblogs.com/blog2015/760719/201507/201634184889223.png)

![img](https://images0.cnblogs.com/blog2015/760719/201507/201634398796321.jpg)

 ![img](https://images0.cnblogs.com/blog2015/760719/201507/201635022851476.png)

 

2、SecureCRT登录

①把服务器的~/.ssh/id_rsa文件下载到本地。

②

 ![img](https://images0.cnblogs.com/blog2015/760719/201507/201635215665120.png)![img](https://images0.cnblogs.com/blog2015/760719/201507/201635289889085.png)

3、Linux客户端登录测试

①、把服务器的~/.ssh/id_rsa文件弄到linux客户端上，并重命名为rsa_for_55. (~/rsa_for_55)。

②、在Linux客户端执行：chmod 600 ~/rsa_for_55 

   再执行：ssh yang@192.168.1.55 -i  ~/rsa_for_55 

​    第一次链接可能会提示确认，输入yes即可，再按提示输入密钥密码，没有问题就会出现用户提示符。

三、停用密码验证登录方式（前面都ok了，就把密码验证给取消吧）

1、修改/etc/ssh/sshd_config 文件

将PasswordAuthentication yes 修改成 PasswordAuthentication no

2、重启sshd服务

Debian/Ubuntu执行/etc/init.d/ssh restart ；CentOS执行：/etc/init.d/sshd restart。



作者博客地址：https://www.cnblogs.com/assassin1994/p/4661878.html