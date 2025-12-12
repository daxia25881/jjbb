[Script]
# 匹配 bav53.cc 和 avjb.com 的视频详情页
http-response ^https?:\/\/(www\.)?(bav53\.cc|avjb\.com)\/videos\/\d+ script-path=https://github.com/daxia25881/jjbb/blob/main/aiwei_crack.js, requires-body=true, timeout=10, tag=艾薇解析

[MITM]
hostname = bav53.cc, avjb.com
