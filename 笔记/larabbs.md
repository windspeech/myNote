- 用户认证

```
php artisan ui:auth
```

- 中文语言包

```
composer require "overtrue/laravel-lang:~3.0"
```

然后config/app.php

```
Illuminate\Translation\TranslationServiceProvider::class,
替换
Overtrue\LaravelLang\TranslationServiceProvider::class,
```

如果你想修改扩展包提供的语言文件，可以使用以下命令发布语言文件到项目里

```
$ php artisan lang:publish zh-CN
```

发布后的语言文件存放于 `resources/lang/zh-CN` 文件夹



- 第三方扩展包 [mews/captcha](https://github.com/mewebstudio/captcha) 作为基础来实现 Laravel 中的验证码功能

```
composer require "mews/captcha:~3.0"
```

运行以下命令生成配置文件 `config/captcha.php`：

```
php artisan vendor:publish --provider='Mews\Captcha\CaptchaServiceProvider'
```

- 生成中间件

```
php artisan make:middleware EnsureEmailIsVerified
```

- 图片裁剪

```
composer require intervention/image
```

