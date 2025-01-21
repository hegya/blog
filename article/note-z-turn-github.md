# GitHub 折腾

- 优化 github hosts
  - hosts 文件来源：
    - https://github.com/ineo6/hosts/blob/master/hosts
    - 或CDN ：https://gitlab.com/ineo6/hosts/-/raw/master/next-hosts
    - 或：https://github.com/521xueweihan/GitHub520/blob/main/hosts
  
  - 方式一：修改本机 hosts 文件
  
    - 以管理员身份运行 editplus，修改 C:\Windows\System32\drivers\etc\hosts 文件
  
    - 用 SwitchHosts 配置远程文件，可自动更新
  
  - 方式二：在 AdGuardHome - 过滤器 - DNS 黑名单 中添加
    - https://raw.hellogithub.com/hosts
