<div align="center">
  <img src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.1-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | [Português](./README_pt.md) | [Español](./README_es.md) | [Français](./README_fr.md) | 简体中文

</div>

---

**Running Head** 是一款优秀的 Obsidian 插件，它可以为你的笔记自动添加高度可自定义的元数据页眉。动态追踪日期、自定义 frontmatter 属性、文件夹路径和标签页导航，一切都在一体化设计中无缝运行。


## 🌟 核心功能展示

### 1. 📅 创建与最后更新日期
动态追踪笔记的时间线。支持使用18种默认语言环境或自定义的 [Moment.js](https://momentjs.com/) 格式化日期。当笔记在创建后被修改时，系统会自动显示精美的更新标签。

<div align="center">
  <video src="https://github.com/user-attachments/assets/f5a54a1a-2d71-4cb3-98ac-40298601d842" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/eeff569f-b336-4487-9d87-a1d5c9367d52" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 2. 📐 布局样式
在 **Blog 样式**（路径在标题上方，元数据在下方）和 **Wiki 样式**（元数据在标题上方，路径在下方）之间灵活选择，完美契合你的笔记美学。

<div align="center">
  <video src="https://github.com/user-attachments/assets/726ab137-ebf8-4a23-b49c-df2c1c7064a6" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 3. 🍞 笔记路径（面包屑）
通过可点击的文件夹路径轻松导航，准确显示笔记所在位置，并可选高亮当前活动文件夹。

<div align="center">
  <video src="https://github.com/user-attachments/assets/481eb3b1-1c31-4df6-a1af-d826c86f98b0" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 4. 🏷️ 自定义 YAML 字段与文件夹范围
在页眉中将 any frontmatter 属性（文本、列表、复选框）渲染为自定义字段或精美的胶囊样式。使用灵活的文件夹范围在特定目录中隐藏指定字段，保持仓库整洁。

> [!NOTE]
> 注：添加文本字段的展示仅作演示；这些选项适用于任何自定义元数据属性。

<div align="center">
  <video src="https://github.com/user-attachments/assets/46fc5fcd-b34b-4586-b35d-659e1ea97860" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/5b1382cd-4245-42a4-96b0-15816d587793" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 5. 🗂️ 交互式标签导航
利用 frontmatter 属性构建优雅的导航页眉，在关联笔记之间轻松跳转。支持自定义标签的视觉样式（**下划线**、**药丸**或**极简**），并可轻松添加 Lucide 图标或自定义显示名称。

<div align="center">
  <video src="https://github.com/user-attachments/assets/b2e47065-132c-41ef-a1cd-2184e8bb6a2b" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 6. 📊 滚动进度条与 Typify 集成
在笔记顶部固定一条优雅且可自定义颜色的滚动进度条。Running Head 还与 **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** 插件完美集成，能够自动继承精致的彩色胶囊样式。

<div align="center">
  <video src="https://github.com/user-attachments/assets/c0e6d91a-6e36-4c78-9348-1d29b9e860d1" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/31fad83c-f11a-4a0d-b99b-bc8af3981ea9" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


## ⚙️ 附加功能

* **🎨 自定义颜色**：简单且独立地定义更新标签、笔记路径或进度条的颜色。
* **💾 数据管理**：将完整设置导出为 JSON，并轻松导入到另一个仓库或设备。
* **🌍 国际化**：界面已完全翻译为英语、葡萄牙语（巴西）、西班牙语、法语和简体中文（只需在其中一种语言下使用 Obsidian）。如果您发现翻译错误或有改进建议，请告诉我。


## 🚀 快速开始

1. **启用插件**：转到 Obsidian 设置 $\rightarrow$ 第三方插件，搜索 **Running Head** 并启用。
2. **在 Frontmatter 中设置日期**：配置您的 YAML 键以用于创建（默认 `date`） and 更新（默认 `updated`）：
   ```yaml
   date: 2026-05-29
   updated: 2026-05-29
   ```
3. **配置自定义字段**：转到插件设置 $\rightarrow$ **自定义字段**，然后点击 **添加** 将任何 YAML 键（例如 `Author`, `tags`）映射到页眉。
4. **配置标签导航**：在 **标签导航** 下，注册一个列表类型的 YAML 属性（例如 `tabs-home`）并 define 关联笔记链接。

### 📝 标签 YAML 结构示例
```yaml
tabs-home:
  - "[[主页笔记]]"
  - "[icon, home]"
  - "[name, 面板]"
```

> [!Note]
> - 列表内的标签（`[name, ...]`、`[icon, ...]` 和 `[[Link]]`）的顺序并不影响功能。
> - 如果列表中存在多个笔记链接，标签将指向最后添加的链接。


## 📦 安装

### 手动安装
1. 下载最新版本：`main.js`、`manifest.json` 和 `styles.css`。
2. 在 `<Your-Vault>/.obsidian/plugins/` 目录中创建一个名为 `running-head` 的文件夹。
3. 将下载的文件粘贴到那里。
4. 重新加载 Obsidian 并在 **设置 > 第三方插件** 中启用该插件。


## 🛠️ 开发

如果您想自己编译该插件，请按以下步骤操作：
1. 克隆此仓库。
2. 安装依赖项：`npm install`
3. 运行 `npm run dev` 启动监听模式编译。


## ⚠️ 免责声明

这个插件旨在为你 Obsidian 仓库中的笔记带来更优雅、“出版”般的感觉。和以往一样，它源于我自定义仓库的渴望（有时候渴望会让我们创造出不可思议的东西，同样也会让我们花费几个小时，直到它变成我们想要的样子……哈哈）。

特别感谢 [Antigravity](https://antigravity.google/) 在构建、重构和优化此代码库方面提供的宝贵帮助。但没有什么是靠魔法完成的，这个插件经过了测试、再测试、反复推敲，只为了尽可能优化、轻量、优秀、美观并且功能完善，提供给所有寻找类似功能的人。

如果您发现任何漏洞，请提出 *issue*，我会尽力修复。始终欢迎通过 *pull requests* 做出贡献！ 😉
