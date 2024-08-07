# Google 相关折腾

- YouTube 查看某频道全部视频
  
  某频道为：https://www.youtube.com/channel/UCCKdJQfcldhnd5LUlasJu
  
  则频道视频列表为：https://www.youtube.com/playlist?list=UUCKdJQfcldhnd5LUlasJu

  获取频道下所有视频 url 方法：[来源](https://www.quora.com/How-do-I-retrieve-all-video-URLs-from-a-YouTube-channel)

  在页面点右键，“检查”-“控制台”输入
  ```
  var scroll = setInterval(function(){ window.scrollBy(0, 1000)}, 1000);
  ```

  等页面全部加载完成，再输入
  ```
  window.clearInterval(scroll); console.clear(); urls = \$\$('a'); urls.forEach(function(v,i,a){if (v.id=="video-title"){console.log('\t'+v.title+'\t'+v.href+'\t')}});
  ```
- YouTube 查看频道 ID

  右键单击页面并选择“查看源代码”

  按 Ctrl+f，搜索
  ```
  <meta property="og:url" content=
  ```

- 下载 YouTube 视频
  ```
  yt-dlp --list-formats https://www.youtube.com/watch?v=e8EuHV
  yt-dlp -f "bv+ba" --merge-output-format mp4 https://www.youtube.com/watch?v=e8EuHV
  ```

- 下载 YouTube 节目音频
  ```
  yt-dlp -f 139 https://www.youtube.com/watch?v=e8EuHV
  ```

- 用 aria2c 加速下载，需把 aria2c.exe 放在 yt-dlp 同目录下
  ```
  yt-dlp.exe -f 139 --downloader aria2c --downloader-args aria2c:"-x 8 -k 1M" https://www.youtube.com/watch?v=e8EuHV
  ```

- 相关 API
  ```
  https://line.1010diy.com/web/free-mp3-finder/detail?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DkYiUePX
  ```
