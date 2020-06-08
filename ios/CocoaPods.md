https://guides.cocoapods.org/
https://cocoapods.org/

# 条件

* Ruby>2.2.2
* rvm

# rvm

RVM 是一个命令行工具，可以提供一个便捷的多版本 Ruby 环境的管理和切换。 
https://rvm.io/

> 1.安装mpapis公钥。但是，正如安装页面所记录的，您可能需要gpg。Mac OS X不附带gpg，因此在安装公钥之前，您需要安装gpg。

https://www.gnupg.org/download/
https://sourceforge.net/p/gpgosx/docu/Download/
```cmd
brew install gnupg 
```

```
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash -s stable
```

# CocoaPods安装

https://www.jianshu.com/p/84f0db9c7a31

```cmd
sudo gem install -n /usr/local/bin cocoapods

```

# 


```
git clone git://cocoapodscn.com/Specs.git master
```

# 国里源

gem sources -l

gem sources --add https://gems.ruby-china.com/

gem sources --remove https://rubygems.org/