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
  export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin:$PATH
  ```

  之后

  ```
  #source ~/.bashrc
  #source /etc/profile
  ```

- 检测 CPU 温度（[参考资料](https://gcore.com/learning/how-to-check-cpu-temperature-on-linux/)）

  ```
  #apt install lm-sensors
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

- 通过 docker 安装 homeassistant，并集成 xiaomi home [参考资料](https://github.com/home-assistant/supervised-installer)

- 已有 Apache 安装 PHP

  ```
  #apt install php libapache2-mod-php php-opcache php-cli php-gd php-curl php-sqlite3 php-mbstring php-xml
  #systemctl restart apache2
  ```
