# Windows 10/11 折腾

- 激活 Windows11
  - Alt + X，选择“终端管理员”，依次输入三行命令：
  ```
  slmgr -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
  slmgr -ipk M7XTQ-FN8P6-TTKYV-9D4CC-J462D (for win11 ltsc)
  slmgr -skms kms.03k.org
  slmgr -ato
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
  - 添加开机自启动程序
    > HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run
    新建“字符串”

- 删除 C:\Windows\WinSxS 文件
  - Alt + X，选择“终端管理员”，输入：
    ```
    Dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase
    ```

- 关闭搜索栏广告及隐藏热门搜索推荐
  - https://www.wxy97.com/archives/af5cab33-dd5f-4862-95d3-53dcd4966756

- 安装 APPX
  - Alt + X，选择“ Windows PowerShell (管理员)”，输入：
    ```
    Add-AppxPackage -Path "D:\Path\Filename.Appx"
    ```

- LTSC 安装 Microsoft Store
  - 一条指令法
    - Alt + X，选择“ Windows PowerShell (管理员)”，输入：wsreset -i
  - 手动法
    - 在 https://store.rg-adguard.net/ 用 PackageFamilyName 搜索 “Microsoft.WindowsStore_8wekyb3d8bbwe”
    - 下载最新的 Microsoft.NET.Native.Framework、Microsoft.NET.Native.Runtime、Microsoft.UI.Xaml、Microsoft.VCLibs、Microsoft.WindowsStore，放在一个文件夹内
    - Alt + X，选择“ Windows PowerShell (管理员)”，输入：
    ```
    Add-AppxPackage *
    ```
    - 在 Microsoft Store 内安装 “HEIF 图像扩展” https://apps.microsoft.com/detail/9PMMSR1CGPWG
  
