// 公共资源
var SiteConfig = {
    cpath: interfacePath, //接口主路径
    rpath: interfacePath + '/wap', //静态资源路径
    ipath: staticResPath, // 图片上传路径
};

function loadScript(path, _doc, charset, rootPath) {
    // if (!netChecks()) return;
    if (path.indexOf(".js") > -1) {
        var jsVersion = getResourceVersion(path) || "20160519";
        if ((path.indexOf("http://") == -1 || path.indexOf("https://") == -1)) {
            // path = SiteConfig.rpath + path;
            path = SiteConfig.rpath + path + "?v=" + jsVersion;
        }
    }
    (_doc || document).write("<script jsonload='0' onload='this.setAttribute(\"jsonload\",\"1\")' " + (charset ? "charset=\"" + charset + "\" " : "") + " type=\"text/javascript\" src=\"" + path + "\"></" + "script>");
};
var mpostLoadScript = loadScript;

function getResourceVersion(path) {
    if (window.Config_FileVersion) {
        var fileName = path.match(/[^\/\\]*$/)[0];
        return Config_FileVersion[fileName] || Config_FileVersion["defaults"];
    } else {
        return "";
    }
};

function loadCSS(path, _doc) {
    // if (!netChecks()) return;
    if (typeof path == "string") path = [path];
    for (var i = 0; i < path.length; i++) {
        var item = path[i];
        var cssVersion = getResourceVersion(item);
        if ((item.indexOf("http://") || item.indexOf("https://")) == -1) {
            // item = "/css/" + item;
            item = SiteConfig.rpath + item + "?v=" + cssVersion;
        }
        (_doc || document).write('<link cssonload="0" onload="this.setAttribute(\'cssonload\',\'1\')" rel="stylesheet" href="' + item + '" type="text/css" />');
    }
};
var mpostLoadCss = loadCSS;

var Config_FileVersion = {
    defaults: Math.random().toString().substring(2, 10),
    version: Math.random().toString().substring(2, 10)
}
