// 脚本名称：av_crack.js

const body = $response.body;
const url = $request.url;

// 定义日志前缀
const LOG_TAG = "[艾薇解析]";

// 核心逻辑函数
function solve() {
    try {
        // 1. 正则匹配 HTML 中的关键路径
        // 原理：寻找类似 src=".../videos/152/93451/..." 的结构
        // 这里的正则匹配 /videos/文件夹ID/视频ID/
        const regex = /\/videos\/(\d+)\/(\d+)\//;
        const match = body.match(regex);

        if (!match) {
            console.log(`${LOG_TAG} 未在 HTML 中找到视频 ID 线索`);
            $done({});
            return;
        }

        const folderId = match[1];
        const videoId = match[2];
        const videoIdNum = parseInt(videoId);

        console.log(`${LOG_TAG} 捕获 ID: Folder=${folderId}, Video=${videoId}`);

        // 2. 根据 ID 判断服务器节点 (复用原脚本逻辑)
        let baseURL = 'https://99newline.jb-aiwei.cc';
        
        // 原脚本逻辑：
        // if (videoIdNum > 18400 && videoIdNum < 92803) -> 99newline
        // else if (videoIdNum >= 92803) -> 88newline
        // else -> 99newline
        // 简化后如下：
        if (videoIdNum >= 92803) {
            baseURL = 'https://88newline.jb-aiwei.cc';
        }

        // 3. 拼接最终 m3u8 地址
        const m3u8Url = `${baseURL}/videos/${folderId}/${videoId}/index.m3u8`;
        const playUrl = m3u8Url; 
        
        // 如果你想生成那个特定的下载/播放工具链接，可以用下面这行代替上面：
        // const playUrl = `https://tools.thatwind.com/tool/m3u8downloader#m3u8=${encodeURIComponent(m3u8Url)}`;

        // 4. 发送通知
        // 参数：标题, 副标题, 跳转链接(点击通知触发)
        $notification.post(
            "🔓 艾薇视频已破解", 
            `ID: ${videoId} | 点击直接播放`, 
            playUrl
        );

    } catch (e) {
        console.log(`${LOG_TAG} 错误: ${e}`);
    }
    
    $done({});
}

solve();
