# 光猫 / 路由器折腾

- 获取光猫超级密码（中国移动 GS3101）

  - 用光猫背后 user 账户及密码登录光猫
  - 登录状态下打开网址：http://192.168.1.1/cgi-bin/getGateWay.cgi ，提示：

  ```
  Family GateWay
  Yes
  ```

  - Telnet 到路由器：telnet 192.168.1.1 ，用 admin 以及 s2@We3%Dc# 登录，成功显示 # 号
  - 输入

  ```
  cat /tmp/ctromfile.cfg | grep 'Admin'
  ```

  显示

  ```
  <Entry0 Active="Yes" username="CMCCAdmin" web_passwd="Si9Ek1*"
  ```

  即获得超级用户名和超级密码
