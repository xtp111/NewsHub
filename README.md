# NewsHub

NewsHub 是一个基于 `Next.js 16.2.0`、`React 19`、`TypeScript` 和 `styled-components` 构建的新闻聚合应用。项目通过 `NewsAPI.org` 获取新闻内容，使用 `Supabase Auth` 处理用户认证，并通过 `MongoDB + Mongoose` 持久化收藏和点赞数据。

当前实现已经覆盖新闻浏览、分类筛选、关键词搜索、文章详情、点赞、收藏以及完整的登录注册流程。

## 技术栈

- 前端框架：`Next.js 16.2.0`、`React 19`
- 语言：`TypeScript`
- 样式方案：`styled-components`
- 认证：`Supabase Auth`
- 数据持久化：`MongoDB`、`Mongoose`
- 外部内容来源：`NewsAPI.org`

## 项目结构

项目使用 `App Router`，并遵循 Next.js 16 的目录与文件约定；根目录中的 `proxy.ts` 是新版 Next.js 16 对原 Middleware 的命名。

```text
.
|-- app/
|   |-- actions/
|   |   `-- auth.ts                 # 认证相关 Server Actions
|   |-- api/
|   |   |-- bookmarks/
|   |   |   |-- [id]/route.ts       # 删除单条收藏
|   |   |   `-- route.ts            # 查询/新增收藏
|   |   |-- likes/
|   |   |   `-- [id]/route.ts       # 点赞查询与切换
|   |   `-- news/
|   |       `-- route.ts            # 新闻获取、搜索、分类与缓存
|   |-- article/
|   |   `-- [id]/page.tsx           # 文章详情页
|   |-- auth/
|   |   `-- callback/route.ts       # Supabase OAuth/邮件回调
|   |-- bookmarks/
|   |   `-- page.tsx                # 收藏页面
|   |-- components/
|   |   |-- ArticleDetail.tsx       # 文章详情展示与交互
|   |   |-- BookmarkList.tsx        # 收藏列表
|   |   |-- CategoryTabs.tsx        # 分类切换
|   |   |-- Navbar.tsx              # 顶部导航
|   |   |-- NewsCard.tsx            # 新闻卡片
|   |   `-- SearchBar.tsx           # 搜索栏
|   |-- forgot-password/page.tsx    # 忘记密码
|   |-- login/page.tsx              # 登录页
|   |-- reset-password/page.tsx     # 重置密码
|   |-- search/page.tsx             # 搜索结果页
|   |-- signup/page.tsx             # 注册页
|   |-- favicon.ico
|   |-- globals.css
|   |-- layout.tsx                  # 根布局
|   |-- page.tsx                    # 首页
|   `-- registry.tsx                # styled-components SSR 注册 + Provider 挂载
|-- context/
|   `-- BookmarkContext.tsx         # 收藏全局状态管理
|-- lib/
|   |-- mongodb.ts                  # MongoDB 连接工具
|   `-- supabase/
|       |-- client.ts               # 浏览器端 Supabase Client
|       `-- server.ts               # 服务端 Supabase Client
|-- models/
|   |-- Bookmark.ts                 # 收藏模型
|   `-- Like.ts                     # 点赞模型
|-- public/                         # 静态资源
|-- styles/
|   `-- GlobalStyles.ts             # 全局样式
|-- types/
|   `-- index.ts                    # Article / BookmarkData 类型定义
|-- next.config.ts                  # Next.js 配置
|-- proxy.ts                        # 请求代理、会话刷新与登录页跳转控制
|-- package.json
`-- tsconfig.json
```

## 核心模块说明

### 1. 路由与页面层

- `app/page.tsx`
  首页，默认展示新闻列表，并支持按分类重新拉取数据。
- `app/search/page.tsx`
  根据 URL 查询参数 `q` 执行新闻搜索，并显示结果数量与空状态。
- `app/article/[id]/page.tsx`
  根据文章 ID 加载单篇文章详情。
- `app/bookmarks/page.tsx`
  展示当前收藏列表。
- `app/login`、`app/signup`、`app/forgot-password`、`app/reset-password`
  对应完整的认证流程页面。

### 2. API 层

- `app/api/news/route.ts`
  统一处理新闻列表、分类筛选、关键词搜索和按文章 ID 查询。
- `app/api/bookmarks/route.ts`
  处理收藏列表读取和新增收藏。
- `app/api/bookmarks/[id]/route.ts`
  删除指定收藏。
- `app/api/likes/[id]/route.ts`
  查询文章点赞数，并执行点赞/取消点赞。

### 3. 数据与服务层

- `lib/supabase/server.ts` 与 `lib/supabase/client.ts`
  分别封装服务端和浏览器端 Supabase 客户端。
- `lib/mongodb.ts`
  封装 Mongoose 单例连接，避免开发环境热更新时重复建连。
- `models/Bookmark.ts`、`models/Like.ts`
  定义收藏和点赞数据模型。
- `context/BookmarkContext.tsx`
  在客户端统一维护收藏状态，并封装新增/删除收藏操作。

### 4. 样式与全局包装

- `app/layout.tsx`
  根布局中会在服务端读取当前 Supabase 用户，并将登录态传给导航栏。
- `app/registry.tsx`
  负责 `styled-components` 的 SSR 样式注入，同时挂载 `BookmarkProvider` 和全局样式。
- `styles/GlobalStyles.ts`
  定义应用基础重置样式和全局视觉基线。

## 已实现的基础功能

### 新闻首页

- 首页会请求 `/api/news?category=all`，展示最新头条新闻。
- 页面顶部提供搜索入口。
- 页面支持分类切换，目前包括：
  - `All`
  - `Tech`
  - `World`
  - `Culture`
  - `Finance`
  - `Sports`

### 关键词搜索

- 用户可通过搜索栏跳转到 `/search?q=关键词`。
- 搜索页根据关键词请求 `/api/news?q=...`。
- 支持显示结果数量、无结果提示和未输入关键词的空状态。

### 文章详情

- 点击新闻卡片会进入 `/article/[id]`。
- 详情页展示：
  - 分类
  - 标题
  - 作者
  - 发布时间
  - 封面图
  - 正文摘要或正文片段
  - 原文跳转链接

### 点赞功能

- 文章详情页会请求 `/api/likes/[id]` 读取当前点赞数量。
- 用户可执行点赞与取消点赞。
- 点赞数据持久化到 MongoDB。

需要注意的是，当前点赞模型按 `articleId` 建立唯一索引，因此一篇文章在当前实现下最多只会存在一条点赞记录，点赞数本质上只有 `0` 或 `1`，还不是按用户维度统计的完整点赞系统。

### 收藏功能

- 文章详情页支持收藏与取消收藏。
- 收藏列表由 `BookmarkContext` 统一管理。
- 收藏页 `/bookmarks` 会展示所有已保存文章，并支持删除。
- 收藏数据保存在 MongoDB 中。

当前收藏同样没有按用户隔离，属于全局共享收藏数据。

### 分享功能

- 文章详情页支持分享。
- 优先使用浏览器的 `Web Share API`。
- 若浏览器不支持，则回退为复制原文链接到剪贴板。

### 用户认证

项目已经接入 Supabase 认证，包含以下能力：

- 邮箱密码登录
- 邮箱密码注册
- Google OAuth 登录
- 忘记密码邮件发送
- 通过邮件回调进入重置密码流程
- 登录后显示当前用户邮箱
- 登出

此外，`proxy.ts` 会在请求阶段刷新 Supabase 会话，并将已登录用户从 `/login`、`/signup`、`/forgot-password` 等认证页面重定向回首页。

## 数据流与实现方式

### 新闻数据

- 新闻内容不存储在本地数据库中。
- 服务端通过 `NewsAPI.org` 拉取新闻数据。
- `app/api/news/route.ts` 内部实现了 15 分钟的内存缓存，用于减少外部 API 请求次数。

该接口支持三种查询模式：

- `GET /api/news?category=Tech`
  获取分类新闻
- `GET /api/news?q=ai`
  获取搜索结果
- `GET /api/news?id=xxx`
  获取单篇文章详情

### 文章 ID 设计

项目没有为新闻单独建立文章表，而是将原始新闻链接 URL 经过 `base64url` 编码后生成稳定的文章 ID。这样做的好处是：

- 不依赖数据库主键
- 同一篇新闻在列表页和详情页可使用相同 ID
- 可在缓存未命中时反向解码回原始链接

### 收藏与点赞数据

- 收藏和点赞使用 MongoDB 持久化。
- Mongoose 模型通过“复用已存在模型”的方式，避免开发环境热更新时报 `OverwriteModelError`。

## 运行依赖

项目运行至少需要以下环境变量：

```env
NEWS_API_KEY=
MONGODB_URI=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

说明：

- `NEWS_API_KEY`：NewsAPI.org 的接口密钥
- `MONGODB_URI`：MongoDB 连接地址
- `NEXT_PUBLIC_SUPABASE_URL`：Supabase 项目地址
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：Supabase 匿名公钥

如果需要 Google 登录，还需要在 Supabase 控制台中额外配置 Google Provider 与回调地址。

## 本地启动

安装依赖并启动开发环境：

```bash
npm install
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

## 当前实现特征与限制

- 收藏和点赞都不是按用户维度隔离，而是全局共享数据。
- 点赞模型的唯一索引导致每篇文章最多只有一个点赞记录。
- 新闻详情依赖缓存和原文 URL 生成的 ID，不是独立文章库。
- 项目中尚未看到自动化测试文件。

## 总结

从当前代码实现来看，NewsHub 的职责划分比较清晰：

- `Next.js App Router` 负责页面、接口和服务端渲染
- `Supabase` 负责认证与会话
- `MongoDB` 负责业务状态数据
- `NewsAPI.org` 负责外部新闻内容

如果后续继续扩展，这个项目最自然的方向是补充按用户隔离的收藏/点赞、增加权限控制，以及为新闻接口增加更稳定的持久化缓存层。
