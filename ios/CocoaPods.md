<https://guides.cocoapods.org/>
<https://cocoapods.org/>

# rvm

RVM 是一个命令行工具，可以提供一个便捷的多版本 Ruby 环境的管理和切换。
<https://rvm.io/>

> 1.安装mpapis公钥。但是，正如安装页面所记录的，您可能需要gpg。Mac OS X不附带gpg，因此在安装公钥之前，您需要安装gpg。

<https://www.gnupg.org/download/>
<https://sourceforge.net/p/gpgosx/docu/Download/>

```cmd
brew install gnupg 
```

```cmd
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash -s stable
```

```cmd
rvm install 3.2.3

// 如果 openssl@3
// 需要 rustup 工具： curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rvm install ruby-3.2.3 --reconfigure --enable-yjit --with-openssl-dir=$(brew --prefix openssl@3)
```

# CocoaPods安装

```cmd
sudo gem install cocoapods
```

# 国里源

gem sources -l

gem sources --add <https://gems.ruby-china.com/>

gem sources --remove <https://rubygems.org/>
