<div align="center">
  <!-- Substitua a imagem abaixo pela sua imagem real de banner depois -->
  <img src="./docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

   ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
   ![Version](https://img.shields.io/badge/version-1.0.0-lightgreen.svg)

</div>

<div align="center">

   English | [Português](./docs/README_pt.md) | [Español](./docs/README_es.md) | [Français](./docs/README_fr.md) | [简体中文](./docs/README_zh-CN.md)

</div>

---

Transform your notes with a beautiful blog-style metadata header! 📝✨

Running Head is an Obsidian plugin that automatically adds a customizable header below your note titles, displaying the publication date, estimated reading time, a last-updated badge, and any custom frontmatter properties you desire.

## Features

- **📝 Multiple Layouts**: Choose between a Blog style (everything below the title) or a Wiki style (top-right badges).
- **⏱️ Reading Time & Dates**: Automatically calculate and display reading time and beautifully formatted dates based on your locale.
- **🧩 Custom Fields**: Display any YAML property as beautiful pills, links, or text right inside the header.
- **📁 Folder Scopes**: Keep your vault clean by hiding specific custom fields in certain folders.
- **🍞 Folder Breadcrumb**: Navigate easily with a clickable breadcrumb path showing exactly where your note is located.
- **🤝 Powerful Integrations**: Seamlessly integrates with the **Bases** plugin (injecting custom icons into table headers) and the **Typify** plugin (inheriting beautiful pill styles).
- **🌍 Internationalization**: Fully translated into English, Portuguese (Brazil), Spanish, French, and Simplified Chinese.

## How to Use

1. **Configure Dates**: In the plugin settings, set the YAML keys used for your creation date (e.g., `date`) and your update date (e.g., `updated`).
2. **Add Custom Fields**:
   - Go to **Settings > Running Head**.
   - Under "Custom fields", click **Add**.
   - Type the YAML key of the property you want to display (e.g., `Author` or `Category`).
   - Optionally add a display label or restrict the field from appearing in specific folders.
3. **Customize Appearance**: Tweak font sizes, date formats, reading speed (WPM), and choose whether to display the breadcrumb.

Voilá! Your metadata is now elegantly displayed below your note's title ✨

## Installation

### Manual Installation
1. Download the latest release: `main.js`, `manifest.json`, and `styles.css`.
2. Create a folder called `folio` inside your `.obsidian/plugins/` directory.
3. Paste the files there.
4. Reload Obsidian and enable the plugin.

## Notices

> [!Important]  
> If you are using Checkbox properties, they will currently be displayed as raw text (`true` or `false`) in the header. We recommend using other property types (like tags or text) for a better visual representation in the header context.

> [!Note]  
> The **Table icons** feature only affects the **Bases** plugin properties header when the view mode is set to Table.

> [!Tip]  
> If you have the **Typify** plugin installed, Running Head will automatically detect and apply your Typify styles to matching pills in the metadata header!

## Development

If you want to build the plugin yourself, do the following:

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run dev` to start compilation in watch mode.

## Disclaimer

This plugin was designed to bring a more elegant, "published" feel to your Obsidian vault notes.

Special thanks to [Antigravity](https://antigravity.google/) for the invaluable assistance in building, refactoring, and optimizing this codebase. 

If you find any bugs, please open an issue and I'll do my best to fix it. Contributions via pull requests are always welcome! 😉
