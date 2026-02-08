// ==UserScript==
// @name         煎蛋网评论区重构-树状+热门高亮(Via移动端适配)
// @namespace    https://jandan.net/
// @version      1.1
// @description  解析煎蛋网评论API，构建评论回复树，热门评论加粗，适配安卓Via浏览器
// @author       自定义
// @match        *://jandan.net/t/*
// @grant        GM_addStyle
// @connect      jandan.net
// @license      MIT
// @run-at       document-end  // 延迟执行，适配Via页面加载机制
// @updateURL    https://github.com/hegya/blog/raw/refs/heads/main/others/jandan_comments_enhance.js
// @downloadURL  https://github.com/hegya/blog/raw/refs/heads/main/others/jandan_comments_enhance.js
// ==/UserScript==

(function() {
    'use strict';

    // ==================== 核心优化1：移动端样式适配（针对Via浏览器） ====================
    // 兼容Via的GM_addStyle，若不支持则用原生方式注入
    const injectStyle = (css) => {
        if (typeof GM_addStyle === 'function') {
            GM_addStyle(css);
        } else {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = css;
            document.head.appendChild(style);
        }
    };

    // 移动端适配样式：优化字体、间距、缩进，避免横向滚动，增强触摸友好性
    injectStyle(`
        * {
            box-sizing: border-box;  /* 避免布局错乱，Via必加 */
        }
        .tucao-item {
            margin: 8px 0;          /* 减小移动端间距，节省屏幕空间 */
            padding: 10px 6px;      /* 适配手机窄屏，减少左右内边距 */
            border-bottom: 1px solid #eee;
            width: 100%;            /* 强制占满宽度，避免Via布局异常 */
            overflow: hidden;       /* 防止内容横向溢出 */
        }
        .tucao-meta {
            color: #999;
            font-size: 11px;        /* 移动端缩小字体，保证可读性 */
            margin-bottom: 4px;
            white-space: nowrap;    /* 元信息不换行，避免错乱 */
            overflow: hidden;
            text-overflow: ellipsis;/* 超长元信息省略，适配窄屏 */
        }
        .tucao-content {
            line-height: 1.5;
            margin-bottom: 4px;
            font-size: 14px;        /* 移动端核心字体大小，易读 */
            word-break: break-all;  /* 强制换行，避免横向滚动（Via关键） */
            padding: 2px 0;
        }
        .tucao-vote {
            font-size: 12px;
            color: #666;
            padding: 4px 0;
            display: flex;          /* 弹性布局，适配移动端 */
            gap: 16px;              /* 增大赞踩间距，方便触摸 */
        }
        .tucao-children {
            margin-left: 10px;      /* 减小移动端缩进，节省空间 */
            border-left: 2px solid #f5f5f5;
            padding-left: 8px;
        }
        .tucao-hot {
            font-weight: 700;
            color: #e53935;
            background: #fff8f8;    /* 移动端增加背景色，热门评论更醒目 */
            padding: 2px 4px;
            border-radius: 2px;
        }
        .tucao-null {
            text-align: center;
            padding: 15px;
            color: #999;
            font-size: 13px;
        }
        /* 增大投票区域点击范围，适配触摸 */
        .tucao-vote span {
            padding: 2px 8px;
            border-radius: 4px;
        }
        .tucao-vote span:hover {
            background: #f0f0f0;
        }
    `);

    // ==================== 核心优化2：工具函数增强（适配Via） ====================
    // 从URL提取煎蛋帖子ID（增强鲁棒性，适配Via URL解析）
    const getPostId = () => {
        const pathname = window.location.pathname.trim();
        const match = pathname.match(/\/t\/(\d+)/);
        return match ? match[1] : null;
    };

    // 从评论内容中匹配父评论ID（增强正则兼容性）
    const getParentCommentId = (content) => {
        if (!content) return null;
        const reg = /href=["']#tucao-(\d+)["']/i; // 兼容单/双引号，Via适配
        const match = content.match(reg);
        return match ? Number(match[1]) : null;
    };

    // 递归渲染评论树（优化移动端DOM性能，减少重排）
    const renderCommentTree = (comments, hotTucaoIds) => {
        const fragment = document.createDocumentFragment(); // 减少DOM操作次数
        if (!comments.length) return fragment;

        comments.forEach(comment => {
            const {
                comment_ID,
                comment_author,
                comment_date,
                ip_location,
                comment_content,
                vote_positive,
                vote_negative,
                children = []
            } = comment;

            // 评论外层容器
            const tucaoItem = document.createElement('div');
            tucaoItem.className = 'tucao-item';

            // 1. 元信息（作者、时间、IP）- 移动端适配
            const metaDiv = document.createElement('div');
            metaDiv.className = 'tucao-meta';
            const ip = ip_location || '未知'; // 缩短IP占位符，节省空间
            metaDiv.innerText = `${comment_author} | ${comment_date} | ${ip}`;
            tucaoItem.appendChild(metaDiv);

            // 2. 评论内容 - 热门评论增强样式
            const contentDiv = document.createElement('div');
            contentDiv.className = `tucao-content ${hotTucaoIds.has(comment_ID) ? 'tucao-hot' : ''}`;
            contentDiv.innerHTML = comment_content;
            tucaoItem.appendChild(contentDiv);

            // 3. 投票区域（增大触摸点击区）
            const voteDiv = document.createElement('div');
            voteDiv.className = 'tucao-vote';
            // 拆分span，增大点击区域
            voteDiv.innerHTML = `<span>OO ${vote_positive}</span> <span>XX ${vote_negative}</span>`;
            tucaoItem.appendChild(voteDiv);

            // 渲染子评论
            if (children.length) {
                const childrenDiv = document.createElement('div');
                childrenDiv.className = 'tucao-children';
                childrenDiv.appendChild(renderCommentTree(children, hotTucaoIds));
                tucaoItem.appendChild(childrenDiv);
            }

            fragment.appendChild(tucaoItem);
        });

        return fragment;
    };

    // ==================== 核心优化3：核心逻辑增强（Via适配） ====================
    // 增加重试机制 + 超时处理，适配移动端网络/页面加载问题
    const initComment = async (retryCount = 0) => {
        const postId = getPostId();
        if (!postId) {
            console.log('煎蛋网评论重构：未提取到有效帖子ID');
            return;
        }

        const apiUrl = `https://jandan.net/api/tucao/list/${postId}`;
        const targetContainer = document.querySelector('#comments .tucao-container');

        // 重试机制：Via页面加载慢，最多重试3次
        if (!targetContainer && retryCount < 3) {
            setTimeout(() => initComment(retryCount + 1), 500);
            return;
        }
        if (!targetContainer) {
            console.log('煎蛋网评论重构：未找到评论区容器');
            return;
        }

        try {
            targetContainer.innerHTML = '<div class="tucao-null">加载评论中...</div>';
            
            // 移动端请求超时处理（10秒），适配Via网络波动
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            // 请求API数据
            const response = await fetch(apiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json', // 明确请求类型，Via适配
                    'Cache-Control': 'no-cache'   // 避免Via缓存旧数据
                }
            });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`请求失败 [${response.status}]`);
            const resData = await response.json();
            if (resData.code !== 0) throw new Error('接口返回异常');

            const { hot_tucao, tucao } = resData;
            const hotTucaoIds = new Set(hot_tucao.map(item => item.comment_ID));
            const commentMap = new Map();
            const rootComments = [];

            // 初始化评论映射表
            tucao.forEach(comment => {
                commentMap.set(comment.comment_ID, { ...comment, children: [] });
            });

            // 构建父子关系
            tucao.forEach(comment => {
                const parentId = getParentCommentId(comment.comment_content);
                const currentComment = commentMap.get(comment.comment_ID);
                if (parentId && commentMap.has(parentId)) {
                    commentMap.get(parentId).children.push(currentComment);
                } else {
                    rootComments.push(currentComment);
                }
            });

            // 渲染评论树
            targetContainer.innerHTML = '';
            const commentTree = renderCommentTree(rootComments, hotTucaoIds);
            targetContainer.appendChild(commentTree);

            // 无评论提示
            if (!rootComments.length) {
                targetContainer.innerHTML = '<div class="tucao-null">暂无评论~</div>';
            }

        } catch (error) {
            // 移动端友好的错误提示
            const errorMsg = error.name === 'AbortError' ? '评论加载超时，请刷新' : `加载失败：${error.message}`;
            targetContainer.innerHTML = `<div class="tucao-null">${errorMsg}</div>`;
            console.error('煎蛋网评论重构失败：', error);
        }
    };

    // ==================== 核心优化4：页面加载时机（Via适配） ====================
    // 双重监听：兼容Via的DOM加载机制，延迟执行确保容器存在
    const init = () => {
        // 先等待DOM加载完成，再延迟200ms执行（Via页面渲染慢）
        setTimeout(initComment, 200);
    };

    if (document.readyState === 'complete') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
        // 兜底：监听load事件，防止DOMContentLoaded未触发
        window.addEventListener('load', init);
    }

    // 暴露手动刷新方法（移动端可通过控制台/书签执行）
    window.refreshJandanComment = initComment;
})();
