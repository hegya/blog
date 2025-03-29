# Google 相关折腾

- YouTube 查看频道 ID

  右键单击页面并选择“查看源代码”

  按 Ctrl+f，搜索
  ```
  <meta property="og:url" content=
  ```

- 下载 YouTube 视频清单
  ```
  yt-dlp --flat-playlist --no-warnings --cookies-from-browser firefox --print "%(webpage_url)s##%(title)s" 播放列表 > dates1.txt
  yt-dlp --flat-playlist --get-url --get-title --match-filter "playlist_title != ''" https://www.youtube.com/@yuansir > dates1.txt
  ```

- 下载 YouTube 节目音视频
  ```
  yt-dlp --list-formats https://www.youtube.com/watch?v=e8EuHV    #列出音视频格式清单
  yt-dlp -f 139 https://www.youtube.com/watch?v=e8EuHV
  yt-dlp -f 140 --cookies-from-browser firefox/edge/opera/chrome https://www.youtube.com/watch?v=e8EuHV
  yt-dlp -f "bv+ba" --merge-output-format mp4 https://www.youtube.com/watch?v=e8EuHV
  ```

- 获取 YouTube 节目上传时间
  ```
  yt-dlp --skip-download --no-warnings --print "%(upload_date)s" "视频URL"  # 输出：20241104
  yt-dlp --skip-download --no-warnings --print "%(title)s,%(upload_date)s,%(webpage_url)s" "播放列表URL" > dates.txt
  yt-dlp --skip-download --no-warnings --print "%(title)s##%(release_timestamp)s##%(webpage_url)s" "PLoPd8czFk392PaACHE4cabdm1" > dates.txt
  ```

- 用 aria2c 加速下载，需把 aria2c.exe 放在 yt-dlp 同目录下
  ```
  yt-dlp.exe -f 139 --downloader aria2c --downloader-args aria2c:"-x 8 -k 1M" https://www.youtube.com/watch?v=e8EuHV
  ```

- 相关 API
  ```
  https://line.1010diy.com/web/free-mp3-finder/detail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DkYiUePX

  https://www.youtubemp3dl.com/extracting?link=https://www.youtube.com/watch?v=kUHAmnrrqsc //返回id
  https://www.youtubemp3dl.com/youtube/youtube_dl?id=id&format=mp3

  https://www.youtube.com/oembed?format=json&url=urlencode($url);
  ```
