/*
  Loon 脚本：艾薇社区VIP视频破解
  功能：解析 HTML 响应，提取 ID，拼接 m3u8 链接并通知
*/

const url = $request.url;
const body = $response.body;

// 定义服务器逻辑 (源自油猴脚本)
function getVideoUrl(folderId, videoId) {
    const videoIdNum = parseInt(videoId);
    let baseURL = 'https://99newline.jb-aiwei.cc';
    
    // 原始脚本的逻辑判断
    if (videoIdNum > 18400 && videoIdNum < 92803) {
        baseURL = 'https://99newline.jb-aiwei.cc';
    } else if (videoIdNum >= 92803) {
        baseURL = 'https://88newline.jb-aiwei.cc';
    }
    
    return `${baseURL}/videos/${folderId}/${videoId}/index.m3u8`;
}

// 主逻辑
if (body) {
    try {
        // 1. 使用正则匹配 HTML 中的关键路径
        // 油猴脚本是找 img src，这里我们直接在 HTML 源码里找类似 "videos/123/456" 的结构
        // 正则解释：匹配 videos 或 videos_screenshots 后面的两个数字段
        const regex = /(?:videos|videos_screenshots)\/(\d+)\/(\d+)/;
        const match = body.match(regex);

        if (match && match.length >= 3) {
            const folderId = match[1];
            const videoId = match[2];
            
            // 2. 拼接链接
            const finalUrl = getVideoUrl(folderId, videoId);
            
            console.log(`[VIP破解] 成功解析: Folder=${folderId}, ID=${videoId}`);
            console.log(`[VIP破解] 播放地址: ${finalUrl}`);

            // 3. 发送本地通知
            // 用户可以在通知中心长按通知复制链接
            $notification.post(
                "🔓 VIP视频已破解", 
                "长按通知可复制链接", 
                finalUrl
            );
            
            // 进阶：如果你想直接把链接写入剪贴板（Loon部分版本支持，不稳定则只用通知）
            // $general.clipboard = finalUrl; 

        } else {
            console.log("[VIP破解] 未在页面中找到视频ID特征");
        }
    } catch (e) {
        console.log(`[VIP破解] 脚本执行出错: ${e}`);
    }
}

// 4. 结束脚本，不做修改直接返回原始内容
$done({});
