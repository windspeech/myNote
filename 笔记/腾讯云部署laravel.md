## 安装 Mysql

```
添加源：
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm

yum -y install mysql57-community-release-el7-10.noarch.rpm

安装：
yum -y install mysql-community-server

启动：
systemctl start  mysqld.service

查看状态：
systemctl status mysqld.service

查看初始密码：
grep "password" /var/log/mysqld.log

登录数据库：
mysql -uroot -p

修改密码：
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';

授权访问：
GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;

删除仓库防止更新
yum -y remove mysql57-community-release-el7-10.noarch
```

## 安装nginx

```
添加资源库：
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

安装nginx：
yum install -y nginx

设置开机自启动：
sudo systemctl start nginx.service
```

## 安装php72

```
安装epel软件包：
yum install epel-release

安装remi源：
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm

安装yum 扩展包：
yum install yum-utils

启用remi仓库：
yum-config-manager --enable remi-php72
yum update

安装php72：
sudo yum install php72

安装扩展：
yum install php72-php-fpm php72-php-gd php72-php-json php72-php-mbstring php72-php-mysqlnd php72-php-xml php72-php-xmlrpc php72-php-opcache

设置php-fpm开机自启动：
systemctl enable php72-php-fpm.service
```

## 站点server配置

```
server {
    listen       80;
    server_name  zero-tt.fun;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    root   /var/www/php/MyBlog/public;
    index  index.html index.htm index.php;

    #error_page  404              /404.html;
    if (!-e $request_filename) {
                   rewrite ^/(.*)$ /index.php?q=$1 last;
    }

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    location / {
            try_files $uri $uri/ /index.php?$query_string;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /$document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```





————————————————
版权声明：本文为CSDN博主「taozhang_tt」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u013120098/java/article/details/102671606