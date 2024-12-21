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

- 通过docker安装homeassistant

  1. 安装 docker

  ```
  #apt install curl vim wget gnupg dpkg apt-transport-https lsb-release ca-certificates
  #curl -sS https://download.docker.com/linux/debian/gpg | gpg --dearmor > /usr/share/keyrings/docker-ce.gpg
  #echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-ce.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian $(lsb_release -sc) stable" > /etc/apt/sources.list.d/docker.list
  #apt update
  #apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
  ```

  2. 安装 OS-AGENT 和 supervised

  ```
  #wget https://github.com/home-assistant/os-agent/releases/download/x.x.x/os-agent_x.x.x_linux_x86_64.deb
  #wget https://github.com/home-assistant/supervised-installer/releases/download/x.x.x/homeassistant-supervised.deb
  #dpkg -i os-agent_x.x.x_linux_x86_64.deb
  #dpkg -i homeassistant-supervised.deb
  ```
