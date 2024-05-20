# Google 相关折腾

## YouTube 查看某频道全部视频

- 某频道为：https://www.youtube.com/channel/UCCKdJQfcldhnd5LUlasJu

则频道视频列表为：https://www.youtube.com/playlist?list=UUCKdJQfcldhnd5LUlasJu

- 获取频道下所有视频 url 方法：[来源](https://www.quora.com/How-do-I-retrieve-all-video-URLs-from-a-YouTube-channel)

在页面点右键，“检查”-“控制台”输入

> var scroll = setInterval(function(){ window.scrollBy(0, 1000)}, 1000);

等页面全部加载完成，再输入

> window.clearInterval(scroll); console.clear(); urls = \$\$('a'); urls.forEach(function(v,i,a){if (v.id=="video-title"){console.log('\t'+v.title+'\t'+v.href+'\t')}});

## 下载 YouTube 视频

> yt-dlp --list-formats https://www.youtube.com/watch?v=e8EuHV
> yt-dlp -f 137 https://www.youtube.com/watch?v=e8EuHV
