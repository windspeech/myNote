关于 vscode intelephense 错误提示的问题
解决使用vs编辑laravel项目时遇到intelephense问题
下载 laravel-ide-helper
配置config
re-generate phpDoc
reference
解决使用vs编辑laravel项目时遇到intelephense问题
在vs打开routes文件分配路由时发现里面的Route都有被提示Undefined type（虽然能加载）

然后进行了一番google，然后解决了这个问题.

下载 laravel-ide-helper
cmd进入laravel项目文件，使用composer命令安装

composer require --dev barryvdh/laravel-ide-helper

会直接安装到项目的render文件下，不要安装错路径哦~

配置config
在安装完成后，需要到config/app.php中配置providers在后面加上以下代码

Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,

re-generate phpDoc
配置好后再初始化下php

php artisan ide-helper:generate

最后在重新打开以下vs就ok啦~
————————————————
版权声明：本文为CSDN博主「Lin檬不酸」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_41901534/java/article/details/105342406