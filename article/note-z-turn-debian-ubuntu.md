# Debian / Ubuntu 折腾

- 安装 telegram

  ```
  #snap install telegram-desktop
  ```

- 解决 dpkg 报 “警告: 在 PATH 环境变量中找不到 ldconfig 或没有可执行权限” 等

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

- 检测 CPU 温度（[参考资料](https://gcore.com/learning/how-to-check-cpu-temperature-on-linux/)）

  ```
  #apt install lm-sensors
  #sensors-detect
  #sensors
  ```

- Sed 去除 “# ” 开头的行后保存

  ```
  #sed -i '/^# /d' file
  ```

- 对文本行排序并保存

  ```
  #sort -o file file
  ```
