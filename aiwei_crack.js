const body = $response.body;
const url = $request.url;

// 定义日志标签
const TAG = "[AVJB解析]";

function solve() {
    try {
        // 1. 定义正则：专门匹配 og:image 中的 videos_screenshots 路径
        // 目标字符串示例：content="https://stat.avstatic.com/cdn1/contents/videos_screenshots/114000/114478/preview.jpg"
        // 捕获组 1: FolderID (114000)
        // 捕获组 2: VideoID (114478)
        const regex = /videos_screenshots\/(\d+)\/(\d+)\//;
        const match = body.match(regex);

        if (!match) {
            console.log(`${TAG} 未在 HTML 中找到 og:image 或 screenshot 路径`);
            $done({});
            return;
        }

        const folderId = match[1]; // 例如: 114000
        const videoId = match[2];  // 例如: 114478
        
        console.log(`${TAG} 提取成功 -> Folder: ${folderId}, Video: ${videoId}`);

        // 2. 拼接链接
        // 逻辑：默认使用 99newline，如果 ID 大于 92803 则使用 88newline (符合你的示例)
        let host = "99newline.jb-aiwei.cc";
        if (parseInt(videoId) >= 92803) {
            host = "88newline.jb-aiwei.cc";
        }

        // 最终链接: https://88newline.jb-aiwei.cc/videos/114000/114478/index.m3u8
        const m3u8Url = `https://${host}/videos/${folderId}/${videoId}/index.m3u8`;

        // 3. 发送通知
        // 点击通知会直接跳转系统播放器播放该 m3u8
        $notification.post(
            "✅ 视频解析成功", 
            `ID: ${videoId} | 点击播放`, 
            m3u8Url
        );

    } catch (e) {
        console.log(`${TAG} 错误: ${e}`);
    }

    $done({});
}

solve();
