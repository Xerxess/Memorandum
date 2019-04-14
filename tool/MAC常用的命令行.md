# MAC常用的命令行

# ls　 查看当前终端目录下面的文件
 * ls -a　　"ls -a"会出现一些带.xxxx的文件名，列出所有内容，包括隐藏的文件和目录  
 * ls -l　　 列出长格式的目录的所有内容，内容如下.以空格区分
访问权。这些是在文件或目录中允许的操作。
硬链接数。此数字计算子目录和文件的数量。这个数字包括父目录link（..）和当前目录link（.）。
    * 文件所有者的用户名
    * 拥有该文件的组的名称
    * 文件的大小（以字节为单位）。
    * 文件上次修改的日期和时间。
    * 文件或目录的名称。
 * ls -t      在上次修改之前订购文件和目录。
 * ls -alt     这种子命令可以放在一起输出,如‘-alt’会把a和l和t所有都输出

# pwd 查看当前终端目录所在的位置
# cd  进入到某个文件夹      如:cd index 
使用如下
cd index        进入到当前目录下面的index文件夹
cd ..              ..是忘上走一层文件夹如果需要走多个请使用类似于这样的: ../../
# mkdir                   创建一个文件夹    如: mkdir index2
# touch                   创建一个文件      如: touch index.txt
# cp                   　  复制文件到另一个文件夹如：cp index/text.html   html/          将index目录下面的text.html复制到html文件夹内
cp index/text.html  index/text2.html  html/    如要复制多个以空格隔开
cp index/t*.html  html/         *(通配符)代表所有的意思,这行会复制index目录下面所有以t开头的html文件
# mv 'cp'是复制文件,mv是转移文件它们的方法类似,如: mv index/text.html  html/   将index目录下的text.html文件转移到html内
# rm                      删除文件 如:rm index.html         
rm -r index               rm是删除一个文件,不包含文件夹，如果需要删除文件夹输入rm -r xxxx会删除掉文件夹内所有文件
# echo                   输入内容,如: echo  "hello world"　　
echo "hello world" > hello.txt      创建一个txt格式文本其内容为'hello world',想深入了解可以搜关键字“重定向”
# cat                      输出内容,如：cat  hello.txt
cat hello.txt > world.txt    将hello里面的内容覆盖掉world.txt里面，输出cat world.txt可查看  
cat hello.txt >> world.txt     将hello里面内容追加到world.txt后面


> 目录操作  
  
| 命令名 |	功能描述 |	使用举例  
---------|----------|---------
| mkdir |	创建一个目录 |	mkdir dirname  
| rmdir |	删除一个目录 |	rmdir dirname  
| mvdir |	移动或重命名一个目录 |	mvdir dir1 dir2  
| cd |	改变当前目录 |	cd dirname  
| pwd	 |显示当前目录的路径名 |	pwd  
| ls |	显示当前目录的内容 |	ls -la  
| dircmp |	比较两个目录的内容 |	dircmp dir1 dir2  

> 文件操作  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| cat	| 显示或连接文件	| cat filename  
| pg	| 分页格式化显示文件内容	| pg filename  
| more	| 分屏显示文件内容	| more filename  
| od	| 显示非文本文件的内容	| od -c filename  
| cp	| 复制文件或目录	| cp file1 file2  
| rm	| 删除文件或目录	| rm filename  
| mv	| 改变文件名或所在目录	| mv file1 file2  
| ln	| 联接文件	| ln -s file1 file2  
| find	| 使用匹配表达式查找文件	| find . -name "*.c" | -print  
| file	| 显示文件类型	| file filename  
| open	| 使用默认的程序打开文件	| open filename  

> 选择操作  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| head	| 显示文件的最初几行	| head -20 filename  
| tail	| 显示文件的最后几行	tail -15 filename  
| cut	| 显示文件每行中的某些域	| cut -f1,7 -d:  /etc/passwd  
| colrm	| 从标准输入中删除若干列	| colrm 8 20 file2  
| paste	| 横向连接文件	| paste file1 file2  
| diff	| 比较并显示两个文件的差异	| diff file1 file2  
| sed	| 非交互方式流编辑器	| sed "s/red/green/g"  filename  
| grep	| 在文件中按模式查找	| grep "^[a-zA-Z]"  filename  
| awk	| 在文件中查找并处理模式	| awk '{print $1 $1}'  filename  
| sort	| 排序或归并文件	| sort -d -f -u file1  
| uniq	| 去掉文件中的重复行	| uniq file1 file2  
| comm	| 显示两有序文件的公共和非公共行	| comm file1  file2  
| wc	| 统计文件的字符数、词数和行数	| wc filename  
| nl	| 给文件加上行号	| nl file1 >file2  

> 安全操作 

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| passwd	| 修改用户密码	| passwd  
| chmod	| 改变文件或目录的权限	| chmod ug+x  filename  
| umask	| 定义创建文件的权限掩码	| umask 027  
| chown	| 改变文件或目录的属主	| chown newowner  filename  
| chgrp	| 改变文件或目录的所属组	| chgrp staff  filename  
| xlock	| 给终端上锁	| xlock -remote  

> 编程操作  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| make	| 维护可执行程序的最新版本	| make  
| touch	| 更新文件的访问和修改时间	| touch -m 05202400 filename  
| dbx	| 命令行界面调试工具	| dbx a.out  
| xde	| 图形用户界面调试工具	| xde a.out  

> 进程操作  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| ps	| 显示进程当前状态	| ps u  
| kill	| 终止进程	| kill -9 30142  
| nice	| 改变待执行命令的优先级	| nice cc -c *.c  
| renice	| 改变已运行进程的优先级	| renice +20 32768  

> 时间操作  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| date	| 显示系统的当前日期和时间	| date  
| cal	| 显示日历	| cal 8 1996  
| time	| 统计程序的执行时间	| time a.out  

>网络与通信操作  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| telnet	| 远程登录	| telnet hpc.sp.net.edu.cn  
| rlogin	| 远程登录	| rlogin hostname -l username  
| rsh	| 在远程主机执行指定命令	| rsh f01n03 date  
| ftp	| 在本地主机与远程主机之间传输文件	| ftp ftp.sp.net.edu.cn  
| rcp	| 在本地主机与远程主机 之间复制文件	| rcp file1 host1:file2  
| ping	| 给一个网络主机发送 回应请求	| ping hpc.sp.net.edu.cn  
| mail	| 阅读和发送电子邮件	| mail  
| write	| 给另一用户发送报文	| write username pts/1  
| mesg	| 允许或拒绝接收报文	| mesg n  

> Korn Shell 命令  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| history	| 列出最近执行过的 几条命令及编号	| history  
| r	| 重复执行最近执行过的 某条命令	| r -2  
| alias	| 给某个命令定义别名	| alias del=rm -i  
| unalias	| 取消对某个别名的定义	| unalias del  

> 其它命令  

| 命令名	| 功能描述	| 使用举例  
---------|----------|---------
| uname	| 显示操作系统的有关信息| 	uname -a  
| clear	| 清除屏幕或窗口内容| 	clear  
| env	| 显示当前所有设置过的环境变量	| env  
| who	| 列出当前登录的所有用户| 	who  
| whoami	| 显示当前正进行操作的用户名	| whoami  
| tty	| 显示终端或伪终端的名称	| tty  
| stty	| 显示或重置控制键定义	| stty -a  
| du	| 查询磁盘使用情况	| du -k subdir  
| df	| 显示文件系统的总空间和可用空间| 	df /tmp  
| w	| 显示当前系统活动的总信息	| w  

