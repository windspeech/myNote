

#### Vue开启gzip压缩

- 安装插件

```
npm i compression-webpack-plugin@^1.1.11
```

- vue.config.js配置

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
...
module.exports = {
    ...
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                asset: '[path].gz[query]', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
    ...
}
```



#### Nginx开启gzip

```
server {
    listen  80;
    server_name     xxx.com;
    access_log /var/log/nginx/testing-access.log;
    error_log /var/log/nginx/testing-error.log;

    gzip on;
    gzip_buffers 32 4K;
    gzip_comp_level 6;
    gzip_min_length 100;
    gzip_types application/javascript text/css text/xml;
    gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    gzip_vary on;

    location / {
        root   /data/www/testing_front/;
        index  index.html;
    }

}

```

