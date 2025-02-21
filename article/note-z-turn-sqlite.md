# SQLite 技巧

- 删除重复项，保留最新条目（按 storyid）
  ```
  DELETE FROM "daily" WHERE id NOT IN ( SELECT max(id) FROM daily GROUP BY storyid );
  ```

- 重置主键
  - 建立新表，复制旧表到新表
  ```
  CREATE TABLE 'daily1' ('id' INTEGER PRIMARY KEY AUTOINCREMENT,'storyid' TEXT,'title' TEXT,'date1' TEXT);
  INSERT INTO daily1 (storyid, title, date1) SELECT storyid, title, date1 FROM daily;
  ```
  - 删除旧表，重命名新表
  ```
  DROP TABLE daily;
  ALTER TABLE daily1 RENAME TO daily;
  ```

- 在字段中做字符串替换
  ```
  UPDATE twitter SET link = REPLACE(link, 'nitter.privacydev.net', 'x.com') WHERE 1;
  ```
  
