## Android 系统折腾

- adb 下载 https://developer.android.com/tools/releases/platform-tools?hl=zh-cn

  - 重启进 bootloader
    > adb -d reboot bootloader
    
  - 列出已连接的设备
    > fastboot devices
    
  - fastboot 刷入 recovery.img
    > fastboot flash recovery recovery.img
    
  - fastboot 重启进 recovery
    > fastboot boot recovery.img
    
  - 侧载刷机包
    > adb -d sideload filename.zip
    
  - 停用 bloatware
    > adb shell pm disable-user com.android.quicksearchbox
    ```
    com.android.vivo.tws.vivotws
    com.baidu.input_vivo
    com.vivo.ai.ime.nex
    com.vivo.browser
    com.vivo.nps
    ```
    
  - 去除信号感叹号
    > adb shell "settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204"
    
    > adb shell "settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204"
    
  - 安装应用
    > adb install app.apk
    
  - 连接局域网设备
    > adb connect 192.168.0.15

- Termux

  - 切换镜像
    > termux-change-repo
    
  - 设置本地存储
    > termux-setup-storage
    
  - 配置 SSH
    > pkg install openssh

    > ssh-keygen -A //生成 ssh 密钥

    > whoami //查看用户名

    > passwd //设置密码，远程访问端口为 8022
    
  - 安装 nginx 和 php
    > https://www.zhihuclub.com/152736.shtml

- APPS
  > [12306](https://mobile.12306.cn/otsmobile/h5/otsbussiness/downloadapp/downloadapp.html) | [Bmap](http://www.bmaps.cn/) | [Gboard](https://gboard-go.cn.uptodown.com/android) | [Shelter](https://f-droid.org/packages/net.typeblog.shelter/) | [SmsForwarder](https://github.com/pppscn/SmsForwarder/releases) | [Via 浏览器](https://via-browser-fast-and-light-geek-best-choice.cn.uptodown.com/android) | [bilibili](https://com-bilibili-app-in.cn.uptodown.com/android) | [fcitx5 for android](https://github.com/fcitx5-android/fcitx5-android) | [个人所得税](https://etax.chinatax.gov.cn/download/its.apk) | [坚果云](https://sj.qq.com/appdetail/nutstore.android?from_wxz=1) | [微信读书](https://weread.qq.com/web/redirect?from=NavBar) | [米家](https://g.home.mi.com/views/download-mihome.html) | [阅读](https://github.com/gedoor/legado/releases)

- [MiFlash 错误 Not catch checkpoint 解决方法](https://miuiver.com/miflash-error-not-catch-checkpoint/)
