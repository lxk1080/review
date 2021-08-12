
**常用命令汇总**

```js
// 注册一个用户
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
ssh-keygen -t rsa -C "youremail@example.com" // 创建 SSH Key

git init // 这个目录变成 Git 可以管理的仓库

// 添加文件到暂存区
git add readme.txt // 添加单个文件
git add -u // 添加编辑或者删除的文件，不包括新添加的文件
git add .  // 添加新文件和编辑过的文件，不包括删除的文件
git add -A  // 添加所有内容（添加、删除、修改）

git commit -m "first commit" // 提交，并写上提交说明
git commit -a -m 'update commit' // 不使用 git add，直接提交，-a 相当于 git add -u，只能提交修改的和删除的，添加的文件不能提交

git status // git 空间当前的状态

git diff  // 查看 difference（所有修改的内容）
git diff readme.txt // 查看指定文件的修改

git log // 显示从最近到最远的提交日志（ q 退出，s 保存，down 向下 ）
git log --pretty=oneline // 简要显示
git log --graph --pretty=oneline --abbrev-commit // 可以看到分支合并图

// 回退版本
git reset --hard HEAD^ // HEAD 间接指向当前版本，上一个版本 HEAD^，上上一个版本 HEAD^^
git reset --hard HEAD~1 // 等同于上面一句

git reflog // 记录了每一次命令，可用于回到过去后再回到未来

cat readme.txt // 查看文件内容

git checkout -- readme.txt  // 把文件在工作区的修改撤销掉，文件的删除也可以撤销
git reset HEAD readme.txt // 把暂存区的文件回退到工作区，unstage 的过程

git rm test.txt // 删除文件（只能删除工作区的，暂存区的不能删除）

// 关联远程库（使用 https 协议每次推送都必须输入登录信息，一般使用 ssh 协议，原生的，速度快，不需要验证，设置一个 SSH Key 即可）
git remote add origin https:\/\/github.com/lxk1080/myDir.git
// 关联另一个远程库（给远程库起一个不一样的名字）
git remote add gitee git@gitee.com:lxk1080/VoteManager.git
// 删除关联的远程库
git remote rm origin
// 查看远程库的信息
git remote -v

git fetch // 拉取远程上所有的改动
git pull // 拉取当前分支最新的提交
git push -u origin master // 将本地库的主分支推送到远程库上（第一次提交，远程库还是空的, -u 将分支关联）
git push // 已经关联过，直接 push，现实情况是直接使用这句，会提示做关联，用它提示的语句提交就行

git clone git@github.com:lxk1080/gitSkills.git // 从远程库克隆一个本地库

git branch dev // 创建分支
git checkout dev // 切换分支
git checkout -b dev // 上面两句合并为一句，创建并切换到分支dev
git branch // 查看当前分支
git merge dev // 合并 dev 分支到当前分支
git branch -d dev  // 删除分支
git branch -D feature-vul // 强行删除一个没有被合并的分支
git push origin :dev // 删除远程分支

git stash // 把当前工作现场"储藏"起来，等以后恢复现场后继续工作
git stash list // 查看储藏的工作现场列表
git stash pop // 恢复的工作现场的同时把stash内容也删除
git stash apply stash@{0} // 恢复指定的stash，恢复后，stash内容并不删除，需要用 git stash drop 来删除
git stash drop stash@{0} // 删除指定的 stash

git tag v1.0 // 创建标签，默认在当前版本下
git tag v0.9 515b059  // 指定一个版本创建标签
git tag // 查看标签列表
git show v0.9 // 查看此标签下的版本信息
git tag -a v0.4 -m "版本0.4" d19e413 // 创建带有说明的标签
git tag -d v0.9 // 删除标签
git push origin v1.0 // 推送某个标签到远程库
git push origin --tags // 一次性推送全部尚未推送到远程的本地标签

// 如果标签已经推送到远程，要删除远程标签，先从本地删除：
git tag -d v1.0
// 再从远程删除：
git push origin :refs/tags/v1.0

htmlpreview.github.io/?  // 查看运行结果

npm install cnpm -g --registry=https://registry.npm.taobao.org // 淘宝npm镜像
```

**打 tag**

```sh
git tag -a <tagName> -m '备注'
```

**tag 推送服务器**

```sh
git push origin <tagName>
```

**未跟踪文件储存**

```js
// 如果只使用 git stash，在工作区新加的文件将不会存储下来，建议一般使用这个
git stash push -u
```

**强制移动分支节点**

```sh
# 改变 HEAD 指向，checkout 用于改变 HEAD 指向
git checkout C2

# 将分支强制指向某个提交节点
git branch -f master C3 # 将 master 指向 C3 节点
git branch -f dev HEAD^ # 将 dev 指向 HEAD 所指向节点的父节点
```

**rebase 变基操作**

```sh
# 例如当前分支为 dev，要合并到 develop

# 拉取最新远程代码
git fetch

# 变基到目标分支 develop
git rebase -i origin/develop

# -i：可交互式变基操作

# 这个过程可以合并 dev 上的 commit
# 如果没有冲突，则保存后 rebase 成功

# 如果有冲突，先解决冲突，然后：
git rebase --continue

# rebase成功

# 这个过程也可以退出 rebase
git rebase --abort

# 一切都回到 rebase 之前的状态

# 推送到远程分支与目标分支 merge
```



<br/><br/><br/>
