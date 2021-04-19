## git命令大全

[TOC]

------



#### 查看命令帮助

- git config --help // 查看git config命令详细用法
- git help config // 功能同上

#### 配置

- git config --global user.name "wjw" // 配置提交用户名
- git config --global user.email "wjw@qq.com" // 配置e-mail信息
- git config --global core.editor vim // 配置默认文本编辑器，当Git 需要你输入信息时会调用它
- git config --global alias.st status // 为status配置别名st，这样git status就可以写成git st
- git config --list // 查看当前仓库的所有配置信息（包括分支相关的信息）
- git config user.name // 查看当前仓库的用户名信息
- git config -e --global // 编辑全局配置文件（用户名和e-mail信息就记录在其中）
- git config -e // 编辑当前仓库的配置文件

#### 查看远程版本库

- git remote -v // 显示远程仓库的URL 注：由于git是分布式的，所有远程仓库可能有很多个
- git remote-ls // 查看远程仓库URL和分支信息
- git remote // 查看远程仓库名称 一般为origin
- git remote rename origin test // 将远程仓库名称从origin修改为test
- git remote show origin // 显示远程仓库的信息
- git remote rm origin // 删除.git/config文件中添加remote origin相关的信息
- git remote add origin https://github.com/wjw/Test.git // 在.git/config文件中添加remote origin指向的远程仓库URL（若已存在，则命令执行失败）
- git remote set-url origin https://github.com/wjw/Test.git // 修改.git/config文件中添加remote origin指向的远程仓库URL
- git remote prune origin // 对于远程仓库不存在的分支，清除对应的远程分支cache


#### 创建版本库

- git init // 在当前目录创建一个空的git代码库
- git init MyGame // 在当前目录创建一个名为MyGame的文件夹，然后在其中创建一个空的git代码库


#### 分支操作

- git branch // 列出所有本地分支
- git branch -r // 列出所有远程分支cache
- git branch -a // 列出所有本地分支和远程分支cache
- git branch -av // 列出所有本地分支和远程分支cache（含简单说明）
- git branch -vv // 查看所有本地分支和远程分支cache之间的追踪关系
- git branch v1.0 // 在当前分支的HAED指针下创建名为v1.0的分支（创建完不会切到v1.0分支上）
- git branch --track v1.0 origin/v1.0 // 若v1.0分支不存在则先新建，然后将其与远程分支origin/v1.0建立追踪关系 ① 远程分支origin/v1.0要存在，否则命令执行失败 ② 执行完不会切到v1.0分支上
- git branch v2.0 372aa8e425b57ca30e2974b8e7737133caaa0b7f // 在372aa8e425b57ca30e2974b8e7737133caaa0b7f提交处创建名为v2.0的分支（创建完不会切到v2.0分支上）
- git branch -m v1.0 x1.0 // 将分支v1.0重命名为x1.0
- git checkout v1.0 // 切换到v1.0分支上（v1.0分支不存在则命令执行失败）
- git checkout -b v1.0 // 创建并切换到v1.0分支上（v1.0分支存在则命令执行失败）
- git checkout -B v1.0 // 不存在则创建，并切换到v1.0分支上
- git checkout -b v1.0 5a95f2d // 在5a95f2d提交处创建并切换到v1.0的分支上
- git checkout -b v1.0 tag1.0 // 在标签tag1.0处创建并切换到v1.0的分支上
- git checkout -t origin/v1.0 // 创建并切换到origin/v1.0远程分支cache的名为v1.0本地分支上，并建立两者追踪关系（本地分支v1.0存在则命令执行失败）
- git checkout -b x1.0 -t origin/v1.0 // 创建并切换到origin/v1.0远程分支cache的名为x1.0本地分支上，并建立两者追踪关系（本地分支x1.0存在则命令执行失败）
  **注1：切换分支前，必须处理工作区（未追踪的文件不用处理）和暂存区的修改才能切换成功
  注2：切换成功后，工作区会被设置成分支的内容
  注3：不允许在远程分支cache上提交，需要创建对应关联的本地分支，然后在本地分支上进行提交**
- git checkout -f v1.0 // 强制切换到v1.0分支上，丢弃暂存区和工作区中的所有文件的修改（工作区中未追踪的文件不受影响）
- git checkout -f -B v1.0 origin/v1.0 // 不存在则创建，强制切换到v1.0分支上，丢弃暂存区和工作区中的所有文件的修改，并将HEAD指向origin/v1.0处（工作区中未追踪的文件不受影响）
- git checkout - // 切换到上一次分支
- git branch -d v2.0 // 删除名为v2.0的分支（必须先切到其他分支上才能执行删除操作）
- git branch -D v2.0 // 强制删除名为v2.0的分支（必须先切到其他分支上才能执行删除操作）
- git branch -dr origin/v2.0 // 删除远程分支origin/v2.0 cache


#### 文件操

- git add README.md // 将当前目录下的README.md文件加入到暂存区
- git add . // 将当前目录下（递归子目录）所有文件加入到暂存区
- git add -u . // 将当前目录下（递归子目录）所有追踪状态的文件加入到暂存区
- git add Doc/\*.txt // 将当前目录的Doc文件夹下（递归子目录）所有txt后缀的文件加入到暂存区
- git rm README.md // 删除工作区文件，并且将这次删除放入暂存区（若README.md在工作区或暂存区中有修改，命令会执行失败）
- git rm -f README.md // 强制删除工作区文件，并且将这次删除放入暂存区（即使README.md在工作区或暂存区中有修改，也会执行删除操作）
- git rm --cached README.md // 不删除工作区对应的文件，只将README.md删除放入暂存区以供提交
- git mv README.md test.md // 将README.md改名为test.md，并且将这个改名放入暂存区
- git commit -m "desc" // 添加desc注释并将暂存区中的所有修改提交到本地仓库
- git commit README.md -m "desc" // 添加desc注释并将暂存区中的README.md的修改提交到本地仓库
- git commit --amend -m "desc" // 添加desc注释使用当前提交覆盖上一次的提交（若上一次提交包含1.txt和2.txt的修改，当前提交只包含1.txt的修改；执行命令后，本地版本库中为本次的1.txt和上一次2.txt）。若没有提交内容，则用来改写上一次提交的日志信息
- git commit -m "desc" --amend README.txt // 添加desc注释使用README.txt的当前提交覆盖上一次的提交
- git commit -a -m "desc" // 添加desc注释并将工作区和暂存区中的所有修改提交到本地仓库
- git commit -am "desc" // 功能同上
- git commit -c b5cad94d229e72bd7aff5fe2c6f022b29c30e7a8 // 拿372aa8e425b57ca30e2974b8e7737133caaa0b7f提交的信息（作者、提交者、注释、时间戳等）来提交当前修改
- git reset -- README.md // 丢弃暂存区中的README.md文件的修改
- git reset README.md // 功能如上 丢弃暂存区中的README.md文件的修改
- git reset b5cad94 README.md // 使用本地版本库b5cad94提交处的README.md版本覆盖暂存区中的README.md
- git reset // 丢弃暂存区中的所有文件的修改（工作区不受影响）
- git reset --mixed // --mixed为缺省参数，命令与上面- git reset一样
- git reset --hard // 丢弃暂存区和工作区中的所有文件的修改（工作区中未追踪的文件不受影响）
- git reset --soft b5cad94d229e72bd7aff5fe2c6f022b29c30e7a8 // 仅将当前分支的HEAD指向372aa8e425b57ca30e2974b8e7737133caaa0b7f提交（暂存区和工作区中的所有文件的修改都不丢弃）
- git reset --soft HEAD~ // 仅将当前分支的HEAD指向上一次提交（暂存区和工作区中的所有文件的修改都不丢弃）
- git reset --soft HEAD~2 // 仅将当前分支的HEAD指向上两次提交（暂存区和工作区中的所有文件的修改都不丢弃）
- git reset --merge <commit> // 在被污染的工作区中回滚merge或者pull
- git reset --keep <commit> // 保留工作区并丢弃一些之前的提交
- git checkout -- README.md // -- 符号非常重，否则就变成了切换到README.md分支了
  // 当README.md在暂存区中有修改时，使用暂存区中的修改覆盖工作区中的README.md
  // 当README.md不在暂存区中时，使用本地版本库中的HEAD指针处的修改覆盖工作区中的README.md
- git checkout -- . // 使用暂存区和本地版本库来恢复当前目录（递归子目录）下的所有文件 注：若暂存区中有修改，优先使用暂存区
- git checkout HEAD README.md // 使用本地版本库中的HEAD处提交覆盖暂存区和工作区中的README.md
- git checkout 9a387f22ff949fa16336508adc2284384bd6a890 README.md // 使用本地版本库中的9a387f22ff949fa16336508adc2284384bd6a890修改覆盖暂存区和工作区中的README.md
- git checkout -b v2.0 tag2.0 // 在名为tag2.0的提交处创建并切换到v2.0分支上（v2.0分支存在则命令执行失败）
- git revert --no-edit 3a6c702376168aa15a2f3d7bc98000d07a70d023 // 回滚3a6c702376168aa15a2f3d7bc98000d07a70d023提交，然后提交到本地仓库
- git revert HEAD~ // 回滚HEAD的上一次提交，然后会弹出vim环境编辑注释（输入:q直接使用默认注释内容、输入:q!放弃修改使用默认注释内容、输入:x或:wq保存当前修改的注释内容），然后提交到本地仓库
- git revert -n HEAD~3 // 回滚掉HEAD~3处的提交，不自动提交到本地仓库
- git revert -n HEAD~2..HEAD // 回滚掉(HEAD~2, HEAD]之间的2次提交，不自动提交到本地仓库
- git reset是把HEAD向后移动来删除提交，而git revert是用一次新的提交来回滚之前的提交（HEAD会继续前进）

#### 远程操作

- git clone https://github.com/wjw/Test.git // 将https://github.com/wjw/Test.git上的当前分支克隆到本地（会创建一个名为Test目录，远程仓库名称使用默认名origin）
- git clone https://github.com/wjw/Test.git MyProject // 将https://github.com/wjw/Test.git上的当前分支克隆到本地（会创建一个名为MyProject目录，远程仓库名称使用默认名origin）
- git clone -b v1.0 https://github.com/wjw/Test.git // 将https://github.com/wjw/Test.git上的v1.0分支克隆到本地（会创建一个名为Test目录，远程仓库名称使用默认名origin）
- git clone -b v1.0 https://github.com/wjw/Test.git MyGame // 将https://github.com/wjw/Test.git上的v1.0分支克隆到MyGame目录（会在当前目录中创建一个名为MyGame目录，远程仓库名称使用默认名origin）
- git clone -o TestPrj https://github.com/wjw/Test.git // 将https://github.com/wjw/Test.git上的当前分支克隆到本地（会创建一个名为Test目录，并将远程仓库名称设置为TestPrj）
- git fetch origin master // 从远程仓库拉取master分支状态的变化信息（工作区文件不会更新）
- git fetch // 从远程仓库拉取所有分支和tag状态的变化信息（工作区文件不会更新）
- git fetch -p // 从远程仓库拉取所有分支和tag状态的变化信息，并清除已被删除的远程分支和tag在本地的缓存（工作区文件不会更新）
- git fetch origin --tags // 从远程仓库拉取所有tag到本地（工作区文件不会更新）
  **git pull <远程仓库名> <远程分支名>:<本地分支名>**
- git pull origin master // 先执行fetch，然后将远程origin/master分支merge合并到当前分支（最后会更新origin/master, origin/HEAD指针到最新提交）
- git pull https://github.com/wjw/Test.git master // 先执行fetch，将远程origin/master分支merge合并到当前分支（最后不会更新origin/master, origin/HEAD指针到最新提交）
- git pull origin v1.0:master // 先执行fetch，然后将远程origin/v1.0分支merge合并到本地master分支
- git pull origin // 先执行fetch，然后将对应的远程分支merge合并到当前分支（当前分支需要预存远程分支的追踪关系）
- git pull // 先执行fetch，然后将对应的远程分支merge合并到当前分支（当前分支需要预存远程分支的追踪关系，而且当前分支只有一个远程仓库）
- git pull -p // 先执行fetch，然后将对应的远程分支merge合并到当前分支，并清除已被删除的远程分支和tag在本地的缓存
- git pull -r origin master // 先执行fetch，然后将远程origin/master分支rebase合并到master分支
  **git push <远程仓库名> <本地分支名>:<远程分支名>**
- git push -u origin master // 将本地仓库的修改push到origin所指向的远程仓库URL的master分支上，并在.git/config文件中记录当前分支与远程分支master的对应关系
- git push origin // 将当前分支更新推送给对应的远端分支
- git push // 将当前分支更新推送给对应的远端分支（当前分支只有一个远程仓库，可以省略仓库名origin）
- git push origin -f // 使用当前分支更新强行覆盖对应的远端分支（合入远端分支有冲突时，也使用当前分支更新）
- git push origin v1.0 // 将本地分支v1.0更新推送给对应的远端分支remotes/origin/v1.0
- git push origin --all // 将本地所有分支更新推送给各自对应的远端分支
- git push origin tag1.0 // 将本地标签tag1.0更新到远端标签tag1.0
- git push origin --tags // 将本地所有标签更新到对应的远端标签
- git push origin :v1.0 // 删除远端分支v1.0
- git push origin :refs/tags/tag1.0 // 删除远程标签tag1.0
- git push origin -d v1.0 // 删除远端分支v1.0 功能同上


#### 分支合并

- git merge-base Master Feature // 查看Master和Feature分支的最优共同commit父节点
- git merge Feature // 将Feature分支merge合并到当前分支Master（无冲突时会直接提交）
- git merge -m "merge test" Feature // 将Feature分支merge合并到当前分支Master（无冲突时使用merge test注释直接提交）
- git merge --no-commit Feature // 将Feature分支merge合并到当前分支Master（不自动提交）
- git rebase Feature // 将Feature分支rebase合并到当前分支Master
- git rebase /i Feature // 将Feature分支采用手动交互方式rebase合并到当前分支Master
  **注1：git rebase会先找出共同的祖先节点，从祖先节点把Feature分支的提交记录全都剪切下来，然后合到Master 分支（合并前后commitID会不一样）
  注2：相对来说，git merge处理冲突更直接，但会增加一些冗余的提交记录；而git rebase能够保证清晰线性的提交记录，但这也将合并的操作没有被记录下来
  注3：最好是用git rebase合并远程分支到本地，git merge合并Feature分支到Master分支
  注4：在合并Feature分支到Master分支前，务必先执行git pull -r origin Feature来进行远程分支与本地分支的rebase合并
  注5：处于冲突状态（conflict）的文件为UU（可通过git status -s --ignored来查找），手动处理完冲突后，然后使用git add该文件，最后继续执行git merge/rebase --continue来完成合并的提交工作
  注6：可以使用git mergetool来使用外部merge工具（可以在.gitconfig文件配置beyond compare作为默认的mergetool）来处理冲突。
  修改完当前文件后，可再次调用git mergetool来处理下一个冲突，直至全部处理完毕，然后使用git add该文件，最后继续执行git merge/rebase --continue来完成合并的提交工作**
- git merge/rebase --abort // 撤销当前merge或rebase操作
- git merge/rebase --skip // 强制使用Feature分支的内容
- git merge/rebase --continue // 手动处理完冲突后使用git add该文件，最后继续执行git merge/rebase --continue来完成合并的提交工作
- git merge origin/master // fetch完之后，可以将远程分支cache master分支merge合并到当前分支上
- git rebase origin/master // fetch完之后，可以将远程分支cache master分支rebase合并到当前分支上
- git rebase --onto master 76cada~ // 将当前分支从[76cada, HEAD]区间段的提交ebase合并到master上
- git cherry-pick 9a341e // 将9a341e提交合入当前分支。若不冲突，则直接使用9a341e的提交信息进行commit，否则要先进行冲突处理，然后继续执行git cherry-pick --continue来完成合并的提交工作
- git cherry-pick 371c2…971209 // 将(371c2, 971209]提交合入当前分支（每个提交都会在当前分支上创建一个commit）
- git cherry-pick 371c2~…971209 // 将 [371c2, 971209] 提交合入当前分支（每个提交都会在当前分支上创建一个commit）
- git cherry-pick -n 9a341e d2f99e // 将9a341e和d2f99e提交合入当前分支（不提交），后续需要手动commit
- git cherry-pick --abort // 撤销当前cherry-pick操作
- git cherry-pick --quit // 清理当前操作状态，不撤销修改强制退出cherry-pick操作过程
- git cherry-pick --continue // 手动处理完冲突后，最后继续执行git cherry-pick --continue来完成合并的提交工作


#### 标签- git tag // 列出所有的标签

- git tag -l 'tag1*' // 列出所有tag1开头的标签
- git tag tag1.0 // 创建名为tag1.0的轻量标签
- git tag -a tag1.0 -m "tag1.0 desc" // 添加tag1.0 desc注释并创建名为tag1.0的附注标签
- git tag tag2.0 abffefc5d82078cbaea7fcbb5106ab0c21cbeba9 // 在abffefc5d82078cbaea7fcbb5106ab0c21cbeba9提交处创建名为tag2.0的轻量标签
- git tag -a tag2.0 -m "tag2.0 desc" abffefc // 在abffefc提交处创建名为tag2.0的附注标签
- git push origin tag2.0 // 推送tag2.0到远程
- git push origin --tags // 将本地所有标签更新到对应的远端标签
- git push origin --delete tag2.0 // 删除远程标签tag2.0
- git push origin -d tag2.0 // 同上
- git push origin :tag2.0 // 同上
- git push origin :refs/tags/tag2.0 // 删除远程标签tag2.0
- git tag -d tag2.0 // 删除名为tag2.0的标签
- git show tag1.0 // 查看名为tag1.0相关的信息
- git ls-remote --tags // 查看所有远端的标签


#### 查看差异

- git diff README.md // 查看当前目录下的README.md在工作区和暂存区之间的差异
- git diff --cached README.md // 查看当前目录下的README.md在暂存区和本地仓库最后一次提交之间的差异
- git diff --cached 372aa8e425b57ca30e2974b8e7737133caaa0b7f README.md // 查看当前目录下的README.md在暂存区和本地仓库的372aa8e425b57ca30e2974b8e7737133caaa0b7f提交之间的差异
- git diff HEAD README.md // 查看当前目录下的README.md在工作区和本地仓库HEAD指针处提交之间的差异
- git diff 372aa8e425b57ca30e2974b8e7737133caaa0b7f README.md // 查看当前目录下的README.md在工作区和本地仓库的372aa8e425b57ca30e2974b8e7737133caaa0b7f提交之间的差异
- git diff 372aa8e425b57ca30e2974b8e7737133caaa0b7f HEAD README.md // 查看当前目录下的README.md在本地仓库的372aa8e425b57ca30e2974b8e7737133caaa0b7f提交和最后一次提交之间的差异
- git diff 372aa8e425b57ca30e2974b8e7737133caaa0b7f HEAD // 查看本地仓库的372aa8e425b57ca30e2974b8e7737133caaa0b7f提交和最后一次提交之间的差异
- git diff 372aa8e b5cad94 README.md // 查看当前目录下的README.md在本地仓库的372aa8e提交和b5cad94提交之间的差异
  **注：可以将git diff换成git difftool来使用外部diff工具（可以在gitconfig文件配置beyond compare作为默认的difftool和mergetool）来查看差异**



#### 日志与文件状态

- git reflog // 查看操作记录 注：每条操作记录使用HEAD@{n}来标识
- git show HEAD@{5} // 查看索引为5的操作记录的详细信息
- git status // 查看当前所处的分支暂存区和工作区的文件（会显示当前所处分支）
  **注1：处于暂存区的文件状态:：staged(已暂存)；处于工作区的文件状态:：untrack(未跟踪)、modified(已修改)
  注2：工作区中的空目录不会被git追踪**
- git status -s --ignored // 以简洁模式查看暂存区和工作区的文件（全部显示，不执行文件过滤）
- git status -uno // 查看暂存区和工作区的非untrack(未跟踪)状态文件
- git status -uall // 查看暂存区和工作区的状态文件（递归子目录显示出里面的文件）
- git log // 查看本地版本库提交记录（会显示当前所处分支，HEAD指针指向哪个分支的哪条提交）
- git log --stat // 查看本地版本库提交记录（会显示当前所处分支，HEAD指针指向哪个分支的哪条提交和每次提交的文件变更简略统计信息）
- git log -- README.md // 查看README.md文件的本地版本库提交记录
- git log --graph -- README.md // 以图形化方式查看README.md文件的本地版本库提交记录
- git log -p README.md // 查看README.md文件的本地版本库提交记录（显示出每次的修改内容）
- git log --grep "test" // 显示注释中含有test字符串的提交
- git log --author=wjw // 查看本地版本库中作者为wjw的提交记录
- git log -S "SplitPath(FString& str)" // 查看SplitPath(FString& str)内容是什么时候加到项目中那些文件中去的
- git log --since=2.weeks // 查看最近2周的提交记录
- git log --since="2 weeks 3 days 2 hours 30 minutes 59 seconds ago" // 查看2周3天2小时30分59秒以前的提交记录
- git log --after="2018-10-7" --before="2018-10-12" // 查看2018.10.7~2018.10.12之间的提交记录
- git log --since="2018-10-7" --until="2018-10-12" // 功能同上：git log --after="2018-10-7" --before="2018-10-12"
  **注：--since、--until 标记和 --after、--before 标记分别是等价的**
- git whatchanged README.md // 查看README.md文件的本地版本库提交记录（包括文件改名）
- git log --follow README.md // 功能同上：git whatchanged README.md
- git log -3 // 查看最近3条本地版本库提交记录
- git log -3 --pretty --oneline // 查看最近3条本地版本库提交记录（简洁模式，一行显示一个提交）
- git log --graph --oneline // 以图形化简洁模式查看当前分支的本地版本库提交记录
- git log release --graph --oneline // 以图形化简洁模式查看release分支的本地版本库提交记录
- git log --graph --oneline --no-merges // 以图形化简洁模式查看当前分支的本地版本库提交记录（过滤merge过来的提交）
- git log --graph --oneline --merges // 以图形化简洁模式查看当前分支的本地版本库提交记录（只显示有2个及以上父亲节点的提交）
- git log --graph --oneline --name-only // 以图形化简洁模式查看当前分支的本地版本库提交记录（并显示每次提交的文件名称清单）
- git log --graph --oneline --name-status // 以图形化简洁模式查看当前分支的本地版本库提交记录（并显示每次提交的文件状态、名称清单）
- git log --graph --oneline --stat // 以图形化简洁模式查看当前分支的本地版本库提交记录（并显示每次提交的文件变化统计、各文件名及增删记录）
- git log --graph --oneline --shortstat // 以图形化简洁模式查看当前分支的本地版本库提交记录（并显示每次提交的文件变化统计及增删记录）
- git log --graph --oneline --decorate --all // 以图形化简洁模式查看所有分支的本地版本库提交记录树
- git log --graph --pretty=format:"%H - %an, %ad : %s" // 自定义格式图形化查看所有分支的本地版本库提交记录树
  **%H 提交对象（commit）的完整哈希字串
  %h 提交对象的简短哈希字串
  %T 树对象（tree）的完整哈希字串
  %t 树对象的简短哈希字串
  %P 父对象（parent）的完整哈希字串
  %p 父对象的简短哈希字串
  %an 作者（author）的名字
  %ae 作者的电子邮件地址
  %ad 作者修订日期（可以用 --date= 选项定制格式）
  %ar 作者修订日期，按多久以前的方式显示
  %cn 提交者(committer)的名字
  %ce 提交者的电子邮件地址
  %cd 提交日期
  %cr 提交日期，按多久以前的方式显示
  %s 提交说明**
- git log master..v5.0 // 查看v5.0分支还未合并到master分支上的提交记录列表
- git log v5.0..master // 查看master分支还未合并到v5.0分支上的提交记录列表
- git log master...v5.0 // git log master..v5.0 + git log v5.0..master
- git shortlog -sn // 统计各个提交者的次数
- git blame README.md // 显示README.md最近一次的修改信息
- git show 3a6c702376168aa15a2f3d7bc98000d07a70d023 README.md // 查看README.md文件的3a6c702376168aa15a2f3d7bc98000d07a70d023提交的修改内容
- git show HEAD // 查看最近一次提交的修改内容
- git show --name-only HEAD // 查看最近一次提交的文件列表（不显示具体的修改内容）


#### 储藏区

- git stash // 将工作区中所有文件的修改备份压栈到储藏区，然后丢弃工作区与暂存区的所有文件的修改
- git stash pop // 使用储藏区的栈顶处备份（stash@{0}）来恢复当前分支的工作区，并将栈顶备份移除
- git stash apply stash@{1} // 使用储藏区的栈顶下面一个备份（stash@{1}）来恢复当前分支的工作区，但不移除储藏区中任何备份
- git stash list // 查看储藏区栈列表
- git stash show -p stash@{0} // 查看储藏区的栈顶处备份中各个文件的内容
- git stash drop // 直接移除储藏区的栈顶处备份（不用于恢复当前分支的工作区）
- git stash clear // 清除储藏区栈列表


#### 工作区

- git clean -nd // 探测工作区中有哪些未追踪状态的文件和目录
- git clean -fd // 删除工作区中未追踪状态的文件和目录


#### 暂存区

- git ls-files // 查询暂存区中的文件列表（递归子目录）
- git ls-files -s // 查看暂存区中所有文件的blob数据块信息
- git ls-files -s -- README.md // 查看暂存区中的README.md文件的blob数据块信息

#### 其他命令

- git fsck --full // 列出所有未引用的blob、tree、commit对象
- git archive --format zip --output ./file.zip master // 将当前master分支所有文件使用zip压缩方式打包到./file.zip

#### git清理

- git count-objects -v // 查看git对象的统计信息
- find .git/objects -type f -print0 | xargs -0 du -hk | sort -nr | head -5 // 查找git库中最大的5个文件（du -hk中的k代表单位为KB）
- find .git/objects -type f -size +1M -print0 | xargs -0 du -hm | sort -nr | head -5 // 查找git库中size超过1M的最大的5个文件（du -hm中的k代表单位为MB）
- git verify-pack -v .git/objects/pack/pack-b340eea7566df839294b71ec91a327ca2ece0b94.idx | sort -k 3 -nr | head -5 // 对压缩存储的git库查找最大的5个文件
- git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch FramePro.cpp' --prune-empty --tag-name-filter cat -- --all // 从git库的历史记录中彻底清理FramePro.cpp
- git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin // 清理所有废弃的ref引用
- git gc --prune=now // ①将所有的对象压缩存储到pack二进制文件中，以节省空间和提高效率 ②移除与任何提交都不相关的陈旧对象
- git reflog expire --expire=now --all // 清除所有操作记录日志

导入文件（opml、pos格式）

另存为图片格式（.png）

另存为opml格式（可用于导入）

#### Commit Message 规范

##### Commit message 格式

`<type>: <subject>` 注意冒号后面有空格

##### type

用于说明 commit 的类别，只允许使用下面 7 个标识。

- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style：格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果 type 为 feat 和 fix，则该 commit 将肯定出现在 Change log 之中。

##### subject

subject 是 commit 目的的简短描述，不超过 50 个字符，且结尾不加句号（.）。