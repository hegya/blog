# Google 相关折腾

- YouTube 查看某频道全部视频
  
  某频道为：https://www.youtube.com/channel/UCCKdJQfcldhnd5LUlasJu
  
  则频道视频列表为：https://www.youtube.com/playlist?list=UUCKdJQfcldhnd5LUlasJu

  获取频道下所有视频 url 方法：[来源](https://www.quora.com/How-do-I-retrieve-all-video-URLs-from-a-YouTube-channel)

  在页面点右键，“检查”-“控制台”输入
  ```
  let goToBottom = setInterval(() => window.scrollBy(0, 400), 1000);
  ```

  等页面全部加载完成，再输入
  ```
  clearInterval(goToBottom);
  let arrayVideos = [];
  const links = document.querySelectorAll('a');
  for (const link of links) {
      if (link.id === "video-title-link") {
          arrayVideos.push(link.title + ';' + link.href);
          console.log(link.title + '\t' + link.href);
      }
  }
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

  https://www.youtubemp3dl.com/extracting?link=https://www.youtube.com/watch?v=kUHAmnrrqsc //返回id
  https://www.youtubemp3dl.com/youtube/youtube_dl?id=id&format=mp3
  ```
