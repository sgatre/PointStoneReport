#### mac 环境下push东西的基本命令行操作

- 其实跟Linux差不多了

------

1. 安装git

brew install git

安装完git之后，就可以开始在mac上面进行git的配置

2. 设置SSH

检查SSH KEYS 
通过下面命令来查看mac是否存在SSH KEYS
cd ~/.ssh

由于我已经设置好了SSH，所以会定位到.ssh这个目录下面。 

创建SSH KEYS

ssh-keygen -t rsa -C "your_email@youremail.com"

注意上述输入的是你的github帐号的邮箱，输入的时候要有” “双引号。 
接着回输出下面的语句：

Generating public/private rsa key pair. Enter file in which to save thekeys (/Users/your_user_directory/.ssh/id_rsa): 

看到这里，直接点击Enter就好了 
接着会提示你输入自定义的通行证号，如果你不想设置，那就直接Enter，这样的话就为空。注意在摄入的时候你会看不到任何字符，不要认为你没有输入进去，因为这和mac在terminal下输入密码一样，你也是看不到任何提示或者字符的

Enter passphrase(empty for no passphrase):

提示重新输入，要保持上下输入的号一样

Enter same passphraseagain:

之后就会提示我们创建 id_rsa 和 id_rsa.pub成功

3. 在github中添加SSH 
登陆你的github，选择SSH and GPG keys添加ssh 
Title：xxxxx@gmail.com 
Key：打开你生成的id_rsa.pub文件，将其中内容拷贝至此。创建成功会有相应的提示。如下所示： 
这里写图片描述
如果大家不知道怎么打开id_rsa.pub文件，可以根据我下面的操作来打开。 
这里写图片描述

4. 验证你的github连接

ssh -T git@github.com
将会显示下面的信息：

The authenticity of host 'github.com (192.30.252.121)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?
输入no，因为我们这只是测试。看到上述的提示表明我们这里github连接已经没有问题了。

5. 设置用户名和邮箱 
在本地设置git：

git config --global user.name "your name"
git config --global user.email "xxxxx@163.com"

输入上述之后没有任何提示说明设置成功了，如果不放心，可以利用下述命令来查看设置是否正确

git config --list

这样的话，git和github设置就完成了，下面要做的就是把本地git里面的代码push到github上，还有如何从github上pull代码

6. 创建github代码库 
登陆你的github，选择New Repository输入你要创建project的名字，这样代码库就创建完毕了，要记住你刚刚新建Repository的网址 （其实无所谓了）

7. 本地git创建 
首先创建一个文件夹my_git
这个文件夹会被用来做本地的库

mkdir ~/my_git

更改当前目录到my_git目录下；初始化该文件夹

cd ~/my_git 
git init

创建一个需要push上的文件，咱们假设要push TEST。把TEST搁进刚刚的文件夹my_git

git add TEST
git commit -m "my first commit"		//这个是对文件的注释

8. 本地git版本库push到github 
这样已经将要更改的文件提交到版本库中，但是呢还没有真正提交到网站上去，还需要执行下面两个命令：

git remote add origin git@github.com:xxx/xxxx.git
git remote add origin https://github.com/xxx/xx.git

注意上面的两个命令结果一样，只是协议不一样，第一个速度会比较快。（若是第一次提交该项目的文件或是修改项目文件名后则需要这行这个命令，以后就可不用执行该命令） 
输入下面的命令之后，会提示你输入你的帐号和密码（也可能不用输入）

 git push -u origin master

这样，我们就可以把本地的git版本库push到你的github里

**这里很容易出错，如果已经这个库里已经有了文件（比如README），会出错，需要先输入git pull --rebase origin master，合并两个库，输入完后，本地的库会收到GitHub库中的内容。** 

9. 从github中pull代码到本地 
在github中搜到你想要pull的代码，如https://github.com/xx/xx 
选择fork，将此repository fock到你的repository下 
在本地创建local repository并初始化 
使用命令：

git pull git@github.com:xxxxx/xxxx.git
1
这样代码就被pull到本地git版本库里了