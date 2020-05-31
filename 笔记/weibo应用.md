- 创建weibo应用

```
composer create-project laravel/laravel weibo --prefer-dist "6.*=>版本
或
laravel new weibo
```

- 自动编译前端文件

```
npm run watch-poll
```

- 模板相关命令

```
@extends('layouts.default')
@yield('title', 'Weibo App') // 占位符
@section('title', '帮助')

```

- 模板中的链接

```
<li><a href="/help1">帮助</a></li>
相当于
<li><a href="{{ route('help') }}">帮助</a></li>
对应
Route::get('/help', 'StaticPagesController@help')->name('help1');
// // {{ route('help') }}命令路由，改动Route::get('/hel',所有{{ route('help') }}会动态生成/hel
```





#### 浏览器缓存问题

*webpack.mix.js*

```
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css').version()
```

增加了 `version()`

模板修改，用`mix`包住

```
<link rel="stylesheet" href="{{ mix('css/app.css') }}">
```

`mix()` 方法与 `webpack.mix.js` 文件里的逻辑遥相呼应

####  toArray () 和 json_encode 都会将时间格式改变（laravel7）

在 `\App\Models\User.php` 中指定序列化时的日期类型：

```php
 protected $casts = [
     'created_at' => 'datetime:Y-m-d H:i:s',
     'updated_at' => 'datetime:Y-m-d H:i:s',
 ];
```



#### 添加语言包

```
composer require "overtrue/laravel-lang:~3.0"
```

安装成功后，在 `config/app.php` 文件中将以下这一行

```
Illuminate\Translation\TranslationServiceProvider::class,
替换为
Overtrue\LaravelLang\TranslationServiceProvider::class,
并设置
'locale' => 'zh-CN',
```



#### 创建授权策略

```
php artisan make:policy UserPolicy
```



#### 忽略版本

```
composer install --ignore-platform-reqs
```



#### 自动加载

```
composer dump-atoload
```

