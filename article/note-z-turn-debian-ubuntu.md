# Debian / Ubuntu 折腾

- 安装 telegram
  ```
  #snap install telegram-desktop
  ```
- 解决 dpkg 报“警告: 在 PATH 环境变量中找不到 ldconfig 或没有可执行权限”等
  ```
  #vim ~/.bashrc
  ```
  添加一行
  ```
  export PATH=/usr/loca/sbin:/usr/sbin:/sbin:\$PATH
  ```
  之后
  ```
  #source ~/.bashrc
  #source /etc/profile
  ```
