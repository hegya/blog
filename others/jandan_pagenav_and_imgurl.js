// ==UserScript==
// @name         煎蛋网-翻页箭头+图片URL优化（跨端适配）
// @namespace    https://jandan.net/
// @version      1.0
// @description  煎蛋网帖子页左右加翻页箭头（ID±1），优化post-content内图片URL，适配Edge/Via浏览器
// @author       自定义
// @match        *://jandan.net/t/*
// @grant        GM_addStyle
// @license      MIT
// @run-at       document-end
// ==/UserScript==
// @updateURL    https://github.com/hegya/blog/raw/refs/heads/main/others/jandan_pagenav_and_imgurl.js
// @downloadURL  https://github.com/hegya/blog/raw/refs/heads/main/others/jandan_pagenav_and_imgurl.js

(function() {
    'use strict';

    // ==================== 1. 样式注入（适配桌面Edge+移动端Via） ====================
    const injectStyle = (css) => {
        // 兼容Via浏览器不支持GM_addStyle的情况
        if (typeof GM_addStyle === 'function') {
            GM_addStyle(css);
        } else {
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }
    };

    // 核心样式：区分桌面/移动端箭头样式，适配触摸/点击
    injectStyle(`
        /* 基础重置 */
        * { box-sizing: border-box; }

        /* 翻页箭头容器 - 固定定位，覆盖全屏幕 */
        .page-nav-arrow {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(0,0,0,0.7);
            color: #fff;
            text-align: center;
            line-height: 48px;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            user-select: none;
            transition: background 0.2s;
        }
        .page-nav-arrow:hover {
            background: rgba(0,0,0,0.9);
        }

        /* 左箭头 */
        .arrow-prev {
            left: 16px;
        }
        /* 右箭头 */
        .arrow-next {
            right: 16px;
        }

        /* 移动端适配（Via浏览器）- 箭头更小，位置更贴边，增大触摸区 */
        @media (max-width: 768px) {
            .page-nav-arrow {
                width: 40px;
                height: 40px;
                font-size: 20px;
                line-height: 40px;
            }
            .arrow-prev { left: 8px; }
            .arrow-next { right: 8px; }
        }

        /* 禁用状态（ID为1时左箭头禁用） */
        .page-nav-arrow.disabled {
            background: rgba(0,0,0,0.3);
            cursor: not-allowed;
        }
        .page-nav-arrow.disabled:hover {
            background: rgba(0,0,0,0.3);
        }
    `);

    // ==================== 2. 核心工具函数 ====================
    /**
     * 提取当前页面的帖子ID
     * @returns {number|null} 帖子ID（数字），失败返回null
     */
    const getCurrentPostId = () => {
        const pathname = window.location.pathname.trim();
        const match = pathname.match(/\/t\/(\d+)/);
        return match ? Number(match[1]) : null;
    };

    /**
     * 优化图片URL
     * 规则：1. img.wangmoyu.com → img.toto.im；2. http → https；3. mw600/mw1024/orj360 → large
     * @param {string} url 原始图片URL
     * @returns {string} 优化后的URL
     */
    const optimizeImageUrl = (url) => {
        if (!url) return url;
        
        // 1. 替换域名：img.wangmoyu.com → img.toto.im
        let newUrl = url.replace(/img\.wangmoyu\.com/g, 'img.toto.im');
        // 2. http协议转为https（排除已为https的情况）
        newUrl = newUrl.replace(/^http:\/\//g, 'https://');
        // 3. 替换尺寸参数：mw600/mw1024/orj360 → large
        newUrl = newUrl.replace(/(mw600|mw1024|orj360)/g, 'large');
        
        return newUrl;
    };

    /**
     * 生成翻页箭头并绑定事件
     * @param {number} currentId 当前帖子ID
     */
    const createNavArrows = (currentId) => {
        // 移除已存在的箭头，避免重复创建
        document.querySelectorAll('.page-nav-arrow').forEach(el => el.remove());

        // 创建左箭头（ID-1）
        const prevArrow = document.createElement('div');
        prevArrow.className = `page-nav-arrow arrow-prev ${currentId <= 1 ? 'disabled' : ''}`;
        prevArrow.innerText = '←';
        prevArrow.addEventListener('click', () => {
            if (currentId <= 1) return;
            window.location.href = `https://jandan.net/t/${currentId - 1}`;
        });

        // 创建右箭头（ID+1）
        const nextArrow = document.createElement('div');
        nextArrow.className = 'page-nav-arrow arrow-next';
        nextArrow.innerText = '→';
        nextArrow.addEventListener('click', () => {
            window.location.href = `https://jandan.net/t/${currentId + 1}`;
        });

        // 添加到页面
        document.body.appendChild(prevArrow);
        document.body.appendChild(nextArrow);
    };

    /**
     * 批量优化post-content内的图片URL
     */
    const optimizeAllImages = () => {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        // 获取所有img标签
        const imgList = postContent.querySelectorAll('img');
        imgList.forEach(img => {
            const originalSrc = img.getAttribute('src');
            if (originalSrc) {
                const optimizedSrc = optimizeImageUrl(originalSrc);
                img.setAttribute('src', optimizedSrc);
                // 同时更新data-src等可能的懒加载属性（兼容煎蛋网懒加载）
                if (img.hasAttribute('data-src')) {
                    img.setAttribute('data-src', optimizedSrc);
                }
            }
        });
    };

    // ==================== 3. 初始化逻辑（适配Edge/Via） ====================
    const init = () => {
        const currentId = getCurrentPostId();
        if (!currentId) {
            console.log('未提取到有效帖子ID，跳过翻页箭头创建');
        } else {
            createNavArrows(currentId);
        }

        // 优化图片URL
        optimizeAllImages();

        // 监听图片懒加载（适配部分页面动态加载图片的情况）
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && (node.tagName === 'IMG' || node.querySelector('img'))) {
                            optimizeAllImages();
                        }
                    });
                }
            });
        });

        // 监听post-content区域的DOM变化
        const postContent = document.querySelector('.post-content');
        if (postContent) {
            observer.observe(postContent, { childList: true, subtree: true });
        }
    };

    // 适配不同浏览器的加载时机（Via加载慢，增加延迟+重试）
    const safeInit = () => {
        // 延迟200ms执行，确保DOM完全渲染（适配Via）
        setTimeout(() => {
            init();
            // 兜底：若首次执行未找到post-content，500ms后重试一次
            if (!document.querySelector('.post-content')) {
                setTimeout(optimizeAllImages, 500);
            }
        }, 200);
    };

    // 双重监听，确保执行
    if (document.readyState === 'complete') {
        safeInit();
    } else {
        document.addEventListener('DOMContentLoaded', safeInit);
        window.addEventListener('load', safeInit);
    }
})();
