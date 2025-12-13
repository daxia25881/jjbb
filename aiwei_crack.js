const body = $response.body;

// 定义日志标签
const TAG = "[AVJB解析]";

function solve() {
    try {
        // 1. 第一步：匹配完整的 meta 标签，获取封面图 URL
        // 目标：<meta property="og:image" content="https://.../preview.jpg"/>
        const metaRegex = /<meta property="og:image" content="(.*?)"/;
        const metaMatch = body.match(metaRegex);

        if (!metaMatch) {
            console.log(`${TAG} 未找到 og:image 标签`);
            $done({});
            return;
        }

        const imageUrl = metaMatch[1]; // 获取到了封面图地址，用于通知显示
        
        // 2. 第二步：从封面图 URL 中提取 folderId 和 videoId
        // URL 示例: .../videos_screenshots/114000/114478/preview.jpg
        const idRegex = /videos_screenshots\/(\d+)\/(\d+)\//;
        const idMatch = imageUrl.match(idRegex);

        if (!idMatch) {
            console.log(`${TAG} 无法从图片地址提取 ID`);
            $done({});
            return;
        }

        const folderId = idMatch[1]; // 114000
        const videoId = idMatch[2];  // 114478
        
        console.log(`${TAG} ID提取成功: ${videoId}`);

        // 3. 第三步：拼接 m3u8 播放地址
        let host = "99newline.jb-aiwei.cc";
        if (parseInt(videoId) >= 92803) {
            host = "88newline.jb-aiwei.cc";
        }
        const m3u8Url = `https://${host}/videos/${folderId}/${videoId}/index.m3u8`;

        // 4. 第四步：构建通知对象 (根据你的文档截图)
        // 使用对象方式，既能带图片(mediaUrl)，又能带跳转(openUrl)
        const attach = {
            "openUrl": m3u8Url,   // 点击通知跳转的链接 (破解后的视频)
            "mediaUrl": imageUrl  // 通知的附件图片 (视频封面)
        };

        // 发送通知
        $notification.post(
            "🔓 视频已破解",          // 标题
            `ID: ${videoId}`,        // 副标题
            "点击通知直接调用播放器",   // 内容
            attach                   // 附件对象
        );

    } catch (e) {
        console.log(`${TAG} 错误: ${e}`);
    }

    $done({});
}

solve();
