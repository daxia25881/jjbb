/*
[Script]
# 艾薇社区VIP视频解析
http-response ^https?:\/\/(www\.)?(bav53\.cc|avjb\.com)\/videos\/\d+ script-path=https://raw.githubusercontent.com/yourname/path/aiwei_crack.js, requires-body=true, timeout=10, tag=艾薇解析

[MITM]
hostname = bav53.cc, avjb.com
*/

const body = $response.body;
const url = $request.url;

// 定义解析逻辑
function crack() {
    // 1. 在HTML中查找类似 /videos/12345/67890/ 或 /videos_screenshots/12345/67890/ 的路径
    // 正则解释：匹配 videos 或 videos_screenshots 后面的两个数字ID
    const regex = /(?:videos|videos_screenshots)\/(\d+)\/(\d+)\//;
    const match = body.match(regex);

    if (match && match.length >= 3) {
        const folderId = match[1];
        const videoId = match[2];
        const videoIdNum = parseInt(videoId);

        // 2. 根据原脚本逻辑选择服务器线路
        let baseUrl = 'https://99newline.jb-aiwei.cc';
        
        if (videoIdNum > 18400 && videoIdNum < 92803) {
            baseUrl = 'https://99newline.jb-aiwei.cc';
        } else if (videoIdNum >= 92803) {
            baseUrl = 'https://88newline.jb-aiwei.cc';
        }

        // 3. 构建最终 M3U8 链接
        const m3u8Url = `${baseUrl}/videos/${folderId}/${videoId}/index.m3u8`;
        
        // 4. 构建用于通知点击跳转的链接
        // 方案A: 直接跳转m3u8 (iOS Safari可能直接下载)
        // const jumpUrl = m3u8Url; 
        
        // 方案B: 使用第三方在线播放器/下载器 (参考原脚本)
        const jumpUrl = `https://tools.thatwind.com/tool/m3u8downloader#m3u8=${encodeURIComponent(m3u8Url)}&referer=${encodeURIComponent(url)}&filename=Video_${videoId}`;

        // 5. 发送通知
        // 参数：标题，副标题，内容，点击跳转链接
        $notification.post(
            "✅ 艾薇视频解析成功", 
            `ID: ${videoId}`, 
            "长按或点击此处复制/播放链接", 
            jumpUrl
        );
        
        console.log(`[艾薇解析] 成功获取链接: ${m3u8Url}`);
    } else {
        console.log(`[艾薇解析] 未在页面中找到视频ID信息`);
    }
}

crack();
$done({});
