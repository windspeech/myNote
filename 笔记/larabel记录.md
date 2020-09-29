- 创建controller/model并关联

```
php artisan make:controller VersionController --model=Models/Version --api

```

- 创建model并生成 `factory` 工厂文件和 `migration` 数据库迁移文件

```
php artisan make:model Models/Article -fm
```



- 生成数据库文件

```
php artisan make:migration ?
php artisan make:migration create_statuses_table --create="statuses"
```



- 执行迁移文件

```
php artisan migrate --path=/database/migrations/xxxxx文件名
```

- 数据填充

```
php artisan make:seeder UsersTableSeeder
```







------

php artisan 命令列表（摘录）

```
命令 说明 备注
php artisan clear-compiled 清除编译后的类文件  
php artisan down  使应用程序进入维修模式 
php artisan up 退出应用程序的维护模式 
php artisan env 显示当前框架环境  
php artisan fresh  清除包含框架外的支架 
php artisan help  显示命令行的帮助  
php artisan list  列出命令  
php artisan migrate 运行数据库迁移 
php artisan env 显示当前框架环境  
php artisan optimize  为了更好的框架去优化性能  
php artisan serve  在php开发服务器中服务这个应用  --port 8080，--host 0.0.0.0
php artisan tinker 在应用中交互 
php artisan app:name ? 设置应用程序命名空间
php artisan auth:clear-resets  清除过期的密码重置密钥 未使用过
php artisan cache:clear 清除应用程序缓存  
php artisan cache:table 创建一个缓存数据库表的迁移  
php artisan config:cache  创建一个加载配置的缓存文件  
php artisan config:clear  删除配置的缓存文件  
php artisan db:seed 数据库生成模拟数据  
php artisan event:generate 生成event和listen 需要实现配置eventserviceprivoder
php artisan make:command ? 创建一个新的命令处理程序类  
php artisan make:console ? 生成一个Artisan命令  
php artisan key:generate  设置程序密钥 
php artisan make:controller ?  生成一个资源控制类  
php artisan make:middleware ?  生成一个中间件 
php artisan make:migration ?  生成一个迁移文件  
php artisan make:model ?  生成一个Eloquent 模型类  
php artisan make:provider ? 生成一个服务提供商的类 
php artisan make:request ? 生成一个表单消息类  
php artisan migrate:install ?  创建一个迁移库文件  
php artisan make:migration ?  生成一个迁移文件  
php artisan migrate:refresh ?  复位并重新运行所有的迁移  
php artisan migrate:reset ? 回滚全部数据库迁移  
php artisan migrate:rollback ? 回滚最后一个数据库迁移 
php artisan migrate:status 显示列表的迁移 
php artisan queue:failed  列出全部失败的队列工作 
php artisan queue:failed-table ?  创建一个迁移的失败的队列数据库工作表 
php artisan queue:``flush` `清除全部失败的队列工作 
php artisan queue:forget ? 删除一个失败的队列工作 
php artisan queue:listen ? 监听一个确定的队列工作
php artisan queue:restart  重启现在正在运行的所有队列工作 
php artisan queue:retry 重试一个失败的队列工作 
php artisan queue:subscribe 订阅URL,放到队列上 
php artisan queue:table 创建一个迁移的队列数据库工作表 
php artisan queue:work 进行下一个队列任务
php artisan route:cache 为了更快的路由登记，创建一个路由缓存文件  
php artisan route:clear 清除路由缓存文件  
php artisan route:list 列出全部的注册路由  
php artisan schedule:run  运行预定命令 
php artisan session:table  创建一个迁移的SESSION数据库工作表  
php artisan vendor:publish 发表一些可以发布的有用的资源来自提供商的插件包
```