# Windows 10/11 折腾

- 激活 Windows11

Alt + X，选择“终端管理员”，依次输入三行命令：

```
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.03k.org
slmgr /ato
```

- 替换系统字体

  - 字体下载 https://blog.dsrkafuu.net/post/2020/extract-sf-pingfang/
  - 替换工具 https://github.com/Tatsu-syo/noMeiryoUI

- 下载最新 Visual C++ Redistribution

  > https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-microsoft-visual-c-redistributable-version

- 修复照片查看器图片发黄

  - 进入显示器属性，选择“颜色管理”
  - 在“颜色管理”设备中选择显示器，勾选“使用我对此设备的设置”
  - 添加“sRGB IEC61966-2.1”，设置为默认配置文件

- 注册表相关
  - 删除“设备和驱动器”中的网盘图标，删除其下子项
    > HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\
  - 删除“导航窗格”中的网盘图标，删除其下子项
    > HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace
