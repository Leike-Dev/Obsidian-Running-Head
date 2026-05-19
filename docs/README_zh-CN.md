<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-1.0.0-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | [Português](./README_pt.md) | [Español](./README_es.md) | [Français](./README_fr.md) | 简体中文

</div>

---

用精美的博客风格元数据页眉让你的笔记焕然一新！ 📝✨

Running Head 是一款 Obsidian 插件，它会自动在笔记标题下方添加一个可自定义的页眉，显示发布日期、预计阅读时间、最后更新徽章，以及任何你想要的自定义 frontmatter 属性。

## 功能特性

- **📝 多种布局**: 提供博客样式（所有内容在标题下方）或 Wiki 样式（徽章在右上角）供选择。
- **⏱️ 阅读时间与日期**: 根据你的本地化设置，自动计算并展示精美格式的日期和阅读时间。
- **🧩 自定义字段**: 在页眉中将任何 YAML 属性显示为漂亮的胶囊标签、链接或文本。
- **📁 文件夹范围**: 在特定文件夹中隐藏指定的自定义字段，保持知识库的整洁。
- **🍞 面包屑导航**: 通过可点击的面包屑路径轻松导航，准确显示笔记的位置。
- **🤝 强大的集成**: 与 **Bases** 插件（将自定义图标注入到表格标题）和 **Typify** 插件（继承精美的胶囊样式）无缝集成。
- **🌍 国际化**: 完美翻译为英语、葡萄牙语（巴西）、西班牙语、法语和简体中文。

## 使用方法

1. **配置日期**: 在插件设置中，设置用于创建日期（例如 `date`）和更新日期（例如 `updated`）的 YAML 键。
2. **添加自定义字段**:
   - 转到 **设置 > Running Head**。
   - 在“自定义字段”下，点击**添加**。
   - 输入你想要显示的属性的 YAML 键（例如 `Author` 或 `Category`）。
   - 可选地添加显示标签或限制该字段在特定文件夹中显示。
3. **自定义外观**: 调整字体大小、日期格式、阅读速度 (WPM)，并选择是否显示面包屑导航。

Voilá！你的元数据现在优雅地展示在笔记标题下方了 ✨

## 安装说明

### 手动安装
1. 下载最新发布版：`main.js`、`manifest.json` 和 `styles.css`。
2. 在你的 `.obsidian/plugins/` 目录下创建一个名为 `running-head` 的文件夹。
3. 将下载的文件粘贴到该文件夹中。
4. 重新加载 Obsidian 并启用插件。

## 注意事项

> [!Important]  
> 如果你使用的是复选框 (Checkbox) 属性，它们目前会在页眉中显示为原始文本（`true` 或 `false`）。为了在页眉上下文中获得更好的视觉效果，建议使用其他类型的属性（如标签或文本）。

> [!Note]  
> **表格图标** 功能仅在视图模式设为“表格”时，才会影响 **Bases** 插件的属性页眉。

> [!Tip]  
> 如果你安装了 **Typify** 插件，Running Head 会自动检测并将你的 Typify 样式应用到元数据页眉中对应的胶囊标签上！

## 开发指南

如果你想自行构建此插件，请按以下步骤操作：

1. 克隆此仓库。
2. 运行 `npm install`。
3. 运行 `npm run dev` 启动监视模式的编译。

## 免责声明

此插件旨在为你的 Obsidian 笔记带来更加优雅、“已发布”的阅读体验。

特别感谢 [Antigravity](https://antigravity.google/) 在构建、重构和优化此代码库方面提供的宝贵协助。

如果你发现任何错误，请提交 Issue，我会尽力修复。永远欢迎通过 Pull Request 提交代码贡献！ 😉
