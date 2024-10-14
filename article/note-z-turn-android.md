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
    
  - 解决 sshd: no hostkeys available
    > ssh-keygen -A
    
  - 安装 nginx 和 php
    > https://www.zhihuclub.com/152736.shtml

- APPS
  > [12306](https://mobile.12306.cn/otsmobile/h5/otsbussiness/downloadapp/downloadapp.html) | [Bmap](http://www.bmaps.cn/) | [Gboard](https://gboard-go.cn.uptodown.com/android) | [Shelter](https://f-droid.org/packages/net.typeblog.shelter/) | [SmsForwarder](https://github.com/pppscn/SmsForwarder/releases) | [Via 浏览器](https://via-browser-fast-and-light-geek-best-choice.cn.uptodown.com/android) | [bilibili](https://com-bilibili-app-in.cn.uptodown.com/android) | [个人所得税](https://etax.chinatax.gov.cn/download/its.apk) | [坚果云](https://sj.qq.com/appdetail/nutstore.android?from_wxz=1) | [学习强国](https://h5.xuexi.cn/page/download.html) | [微信读书](https://weread.qq.com/web/redirect?from=NavBar) | [米家](https://g.home.mi.com/views/download-mihome.html) | [阅读](https://github.com/gedoor/legado/releases)
