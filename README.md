# B站抽奖站点

本站点前后端由 [spiritlhl](https://github.com/spiritLHL) 开发

感谢 [shanmiteko](https://github.com/shanmiteko) 开发并维护的抽奖脚本

配套脚本仓库链接： [https://github.com/shanmiteko/LotteryAutoScript](https://github.com/shanmiteko/LotteryAutoScript)

本仓库文件为本地展示版本，服务器部署需要根据IP和域名修改多处配置，并更改一些模块的导入路径

## 前端页面

![](https://i.loli.net/2021/10/06/RmapSE8uMd4vKIj.png)

![](https://i.loli.net/2021/10/06/hsvX4Und5aoEp8D.png)

## 后端页面

![](https://i.loli.net/2021/10/06/BkE7oMjYTCsZf3q.png)

## 功能

- [x] 扫码添加cookie到Bilibili.sqlite3数据库
- [x] 添加cookie后刷新脚本的env配置文件
- [x] pushplus群组推送
- [x] 多次扫码cookie更新替换
- [x] 匹配DedeUserID删除数据库内的cookie
- [x] 增加手动录入ck页面，方便自己浏览器抓ck录入
- [x] 删除同时刷新脚本配置文件内的ck记录
- [x] 检查库内所有cookie后删除所有过期cookie
- [x] 一对一通知推送
- [ ] 个人自定义配置
- [ ] 账号管理面板

## 不要将本项目用于收费代挂，一经发现直接删库跑路
