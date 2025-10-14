<html>
<head>
<meta charset="UTF-8">
<title>YouTube</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="format-detection" content="telephone=no" />
<link href="./inc/main.css" rel="stylesheet" type="text/css" />
<style>
table { border: 0px; width: 90%; margin: 10px auto; border-collapse: collapse; }
td, th { border: 0.5px solid #999; padding: 8px; text-align: left; }
th { background: #f0f0f0; }
tr { transition: background-color 0.3s; }
tr:hover { background-color: #e0e0e0 !important; }
.copied { color: red; }
</style>
</head>
<body>
	<form action="./youtube.php" method="post">
		<input type="url" name="url" required placeholder="输入YouTube视频链接" style="width: 70%">
		<input type="datetime-local" name="ptime" required placeholder="选择发布时间">
		<input type="hidden" name="act" value="add">
		<button type="submit">添加</button>
	</form>
	<form action="./youtube.php" method="post">
		<input type="text" name="keyword" required placeholder="输入搜索关键词" style="width: 70%">
		<input type="hidden" name="act" value="search">
		<button type="submit">搜索</button>
	</form>
<?php
include './inc/config.php';
$db = new SQLite3('./inc/database.db');

$act = isset($_POST['act']) ? $_POST['act'] : '';
if ($act == "add") {
	$url = trim($_POST['url']);
	$stmt = $db->prepare("SELECT * FROM youtube WHERE link=:link");
	$stmt->bindValue(':link', $url, SQLITE3_TEXT);
	$data = $stmt->execute();
	$row = $data->fetchArray(SQLITE3_ASSOC);
	if ($row['link']) {
		die("链接已存在");
		header('Location: ./youtube.php?t=' . time());
		exit;
	}

	$ptime = strtotime($_POST['ptime']);

	$url1 = "https://dai.434592.xyz/https://www.youtube.com/oembed?format=json&url=" . urlencode($url);
	$str = json_decode(file_get_contents($url1), true);

	if (!$str || !isset($str['title'], $str['author_name'])) {
		die("无法获取YouTube视频信息");
	}

	$title = $str['title'];
	$author = $str['author_name'];

	$stmt = $db->prepare("INSERT INTO youtube (title, link, ptime, mark, author) VALUES (:title, :link, :ptime, 0, :author)");
	$stmt->bindValue(':title', $title, SQLITE3_TEXT);
	$stmt->bindValue(':link', $url, SQLITE3_TEXT);
	$stmt->bindValue(':ptime', $ptime, SQLITE3_INTEGER);
	$stmt->bindValue(':author', $author, SQLITE3_TEXT);
	$stmt->execute();

	$stmt->close();

	header('Location: ./youtube.php?t=' . time());
	exit;
} elseif ($act == "mark") {
	$id = $_POST['id'];
	if (empty($id)) {
		die("ID不能为空");
	}

	$stmt = $db->prepare("UPDATE youtube SET mark=1, mtime=:mtime WHERE id=:id");
	$stmt->bindValue(':mtime', time(), SQLITE3_INTEGER);
	$stmt->bindValue(':id', $id, SQLITE3_INTEGER);

	$result = $stmt->execute();
	if (!$result) {
		die("执行失败: " . $db->lastErrorMsg());
	}

	$stmt->close();
	header('Location: ./youtube.php?t=' . time());
	exit;
} elseif ($act == "search") {
	$kw = isset($_POST['keyword']) ? $_POST['keyword'] : '';
	if (empty($kw)) {
		die("关键词不能为空");
	}

	$kw1 = "%" . $kw . "%";
	$stmt = $db->prepare("SELECT * FROM youtube WHERE title LIKE :kw ORDER BY ptime ASC");
	$stmt->bindValue(':kw', $kw1, SQLITE3_TEXT);
	$data = $stmt->execute();

	while ($row = $data->fetchArray(SQLITE3_ASSOC)) {
		$title = str_ireplace($kw, '<span style="font-weight: bold; text-decoration: underline; color: red;">' . $kw . '</span>', $row['title']);
		$ptime = date("Y-m-d H:i", $row['ptime']);
		$author = $row['author'];
		$link = $row['link'];
		$mark = $row['mark'];
		$vid = substr($link, -11);

		if ($mark) {
			echo "<p><a href='$link' target='_blank'>$ptime | $author | $title | $vid</a></p>";
		} else {
			echo "<form action='./youtube.php' method='post'><a href='$link' target='_blank'>$ptime | $author | $title</a> | <span class='copy-text' data-copy='$link' data-original='$vid'>$vid</span><input type='hidden' name='act' value='mark'><input type='hidden' name='id' value='$id'><button type='submit' style='float: right'>已听</button></form>";
		}
	}

	echo "<p><a href='./youtube.php?t=" . time() . "'>返回</a></p>";
	$stmt->close();
} else {
	// 显示新入未听条目
	echo "<p>--------- <a href='./youtube.php?t=" . time() . "'>新入条目</a> --------</p>";
	$stmt = $db->prepare("SELECT * FROM youtube WHERE mark <> 1 AND ptime >= strftime('%s', datetime('now', 'localtime', '-120 hours'))");
	$data = $stmt->execute();

	while ($row = $data->fetchArray(SQLITE3_ASSOC)) {
		$id = $row['id'];
		$title = $row['title'];
		$link = $row['link'];
		$ptime = date("m-d H:i", $row['ptime']);
		$author = $row['author'];
		$vid = substr($link, -11);

		echo "<form action='./youtube.php' method='post'><a href='$link' target='_blank'>$ptime | $author | $title</a> | <span class='copy-text' data-copy='$link' data-original='$vid' id='textToCopy'>$vid</span><input type='hidden' name='act' value='mark'><input type='hidden' name='id' value='$id'><button type='submit' style='float: right'>已听</button></form>";
	}

	// 显示历史未听条目
	echo "<p>--------- 历史未听 --------</p>";
	$stmt = $db->prepare("SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY author ORDER BY ptime ASC) AS row_num FROM youtube WHERE mark=0) WHERE row_num <= 2;");
//	$stmt = $db->prepare("SELECT * FROM youtube WHERE mark=0 ORDER BY ptime ASC LIMIT 10");
	$data = $stmt->execute();

	while ($row = $data->fetchArray(SQLITE3_ASSOC)) {
		$id = $row['id'];
		$title = $row['title'];
		$author = $row['author'];
		$link = $row['link'];
		$ptime = date("Y-m-d", $row['ptime']);
		$vid = substr($link, -11);

		echo "<form action='./youtube.php' method='post'><a href='$link' target='_blank'>$ptime | $author | $title</a> | <span class='copy-text' data-copy='$link' data-original='$vid' id='textToCopy'>$vid</span><input type='hidden' name='act' value='mark'><input type='hidden' name='id' value='$id'><button type='submit' style='float: right'>已听</button></form>";
	}

	// 显示已听条目
	echo "<p>--------- 已听 --------</p>";
	$stmt = $db->prepare("SELECT * FROM youtube WHERE mark=1 AND mtime <>'' ORDER BY mtime DESC LIMIT 10");
	$data = $stmt->execute();

	while ($row = $data->fetchArray(SQLITE3_ASSOC)) {
		$title = $row['title'];
		$link = $row['link'];
		$mtime = date("m-d H:i", $row['mtime']);
		$author = $row['author'];
		$vid = substr($link, -11);

		echo "<p><a href='$link' target='_blank'>$mtime | $author | $title | $vid</a></p>";
	}

	//显示分项数据
?>
<table>
	<tr>
		<th>UP主</th>
		<th>总数</th>
		<th>已听</th>
		<th>未听</th>
	</tr>
<?php
	$stmt = $db->prepare("SELECT author, COUNT(*) as total, SUM(mark=1) as heard_count, SUM(mark=0) as unheard_count FROM youtube GROUP BY author");
	$result = $stmt->execute();
	while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
		echo "<tr><td>".$row['author']."</td><td>".$row['total']."</td><td>".$row['heard_count']."</td><td>".$row['unheard_count']."</td></tr>";
	}
?>
</table>
<?php
	$stmt->close();
}
$db->close();
?>
<script>
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.copy-text').forEach(el => {
		el.addEventListener('click', function() {
			const text = this.getAttribute('data-copy');

			// 尝试使用 Clipboard API
			if (navigator.clipboard) {
				navigator.clipboard.writeText(text)
					.then(() => handleCopySuccess(this))
					.catch(err => fallbackCopy(text, this));
			} else {
				fallbackCopy(text, this);
			}
		});
	});

	function fallbackCopy(text) {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);

		if (success) {
			handleCopySuccess(element);
		}
	}

	function handleCopySuccess(element) {
		// 保存原始文本
		//const originalText = element.getAttribute('data-original');

		// 替换为"已复制"
		//element.textContent = "已复制";
		element.classList.add('copied');

		//setTimeout(() => {
		//	element.textContent = originalText;
		//	element.classList.remove('copied');
		//}, 3000);
	}
});
</script>
<!--</body>-->
</body>
</html>
