mkdir -- XX (创建一个空目录 XX指目录名)
pwd -- 显示当前目录的路径。
cat XX -- 查看XX文件内容
git init -- 把当前的目录变成可以管理的git仓库，生成隐藏.git文件。
git add readme.txt -- 增加到暂存区
git commit -m readme.txt "xx" -- 提交文件，–m 后面的是注释
git status -- 状态
git diff -- 查看XX文件修改了那些内容
git log -- 查看日志
git reset  –hard HEAD^ 或者 git reset  –hard HEAD~ 回退到上一个版本(如果想回退到100个版本，使用git reset –hard HEAD~100 )
git reflog -- 查看历史记录的版本号id
git checkout — XX -- 把XX文件在工作区的修改全部撤销
git rm readme.txt -- 删除文件

git stash -- 把当前的工作隐藏起来 等以后恢复现场后继续工作
git stash list -- 查看所有被隐藏的文件列表
git stash apply -- 恢复被隐藏的文件，但是内容不删除
git stash drop -- 删除文件
git stash pop -- 恢复文件的同时 也删除文件

git pull --rebase origin master   ------远程库的文件和本地的合并
git remote -- 查看远程库信息
git remote –v -- 查看远程库的详细信息
git remote add origin https://github.com/windspeech/testgit.git -- 关联一个远程库
git push –u(第一次要用-u 以后不需要) origin master 把当前master分支推送到远程库
git clone https://github.com/*** -- 从远程库中克隆
git remote set-url origin https://github.com/*** -- 修改远程库url

git pull -- 把最新的提交从[origin/dev]抓下来

git branch --查看当前所有分支
git branch name --创建分支
git checkout name --切换分支
git checkout -b name --创建并切换分支
git branch -d name --删除分支
git merge name -- 合并某分支到当前分支
git merge –no-ff  -m “注释” name -- 来禁用”Fast forward”模式，保证删除后分支信息还存在

###获取git分支某指定的目录
1. git init favorite && cd favorite
2. git config core.sparsecheckout true
3. echo '/favorite-plugs/*' >> .git/info/sparse-checkout
4. git remote add origin https://github.com/windspeech/myNote
5. git pull origin master

### 打标签
git tag -a v1.0(标签名) xxxx(版本) -m '描述'
git tag -- 查看所有标签
git tag -d tagname -- 删除标签
git push origin :refs/tags/v0.1 //远程删除标签
git push origin <tagname> -- 推送



#### 创建git仓库目录

git服务器创建裸仓库 ,git服务器初始化仓库的时候一定要加上--bare，否则你的仓库不能推送代码,test为项目

```
git init --bare /data/gitrepos/test/test.git
```

git服务器修改git仓库的读写权限，这样子git仓库就能读写了，否则会报错拒绝提交的

```
chmod -R 777 /data/gitrepos/test
```

