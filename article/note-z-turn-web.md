# PHP / Web / SQLite 技巧

- 删除重复项，保留最新条目（按 storyid）
  ```
  DELETE FROM "daily" WHERE id NOT IN ( SELECT max(id) FROM daily GROUP BY storyid );
  ```

- 重置主键
  - 建立新表，复制旧表到新表
  ```
  CREATE TABLE 'daily1' ('id' INTEGER PRIMARY KEY AUTOINCREMENT,'storyid' TEXT,'title' TEXT,'date1' TEXT);
  INSERT INTO youtube (title, link, author, ptime, mark, mtime) SELECT title, link, author, ptime, mark, mtime FROM youtube1 ORDER BY ptime ASC;
  ```
  - 删除旧表，重命名新表
  ```
  DROP TABLE daily;
  ALTER TABLE daily1 RENAME TO daily;
  ```

- 表中有多个 author，每个 author 按时间顺序选取前 3 条
  ```
  SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY author ORDER BY ptime ASC) AS row_num FROM youtube WHERE mark=0) WHERE row_num <= 3
  ```

- 在字段中做字符串替换
  ```
  UPDATE twitter SET link = REPLACE(link, 'nitter.privacydev.net', 'x.com') WHERE 1;
  ```

- 本地调试 PHP

  - 下载 PHP Non Thread Safe 版，解压。重命名 php.ini-development 或 php.ini-production 为 php.ini，做几处修改：

  ```
  取消 extension_dir = "ext"、extension=curl、extension=mbstring、extension=openssl、extension=sqlite3、date.timezone = Asia/Shanghai 前注释
  allow_url_include = Off => allow_url_include = On
  allow_url_fopen = Off => allow_url_fopen = On
  ```

  - 运行 PHP 自带 Web 服务器：

  ```
  php -S localhost:8000 //当前目录为根目录
  php -S localhost:8000 -t /path/to/dir  //指定目录为根目录
  ```

- file_get_contents 设置 useragent 和 cookie

  - 设置 UA：

  ```
  ini_set('user_agent','Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/133.0.0.0');
  ```

  - 设置 cookie：

  ```
  $opts = array (
  	'http' => array (
  		'method' => 'GET',
  		'header'=>"Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\r\n" .
  		"Cookie:_xsrf=7Qsif4vDaDPZF8G6pCmN; \r\n" .
  		"Pragma:no-cache\r\n",
  	)
  );
  $context = stream_context_create($opts);
  $data = file_get_contents($url, false, $context);
  ```

- 设置 favicon
  - 下载 favicon.ico 到 /var/www/html
  - 修改 /etc/apache2/mods-available/mime.conf，添加 AddType image/x-icon .ico，重启 apache

- 执行本地程序，以用 yt-dlp 获取 youtube 视频 upload_date 为例
  ```
  $command = 'D:\path\to\yt-dlp.exe --skip-download --no-warnings --print "%(upload_date)s" ' . escapeshellarg($link);
  $rawDate = shell_exec($command);
  $rawDate .= " 08:00:00";
  $ptime = strtotime($rawDate);
  ```

- Apache 服务器显示文本汉字为乱码
  - 在 /etc/apache2/apache2.conf 末尾添加
  ```
  AddDefaultCharset UTF-8
  ```
  重启 Apache systemctl restart apache2
