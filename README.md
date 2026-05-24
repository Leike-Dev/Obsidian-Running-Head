<div align="center">
  <!-- Substitua a imagem abaixo pela sua imagem real de banner depois -->
  <img src="./docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

   ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
   ![Version](https://img.shields.io/badge/version-2.0.0-lightgreen.svg)

</div>

<div align="center">

   English | [Português](./docs/README_pt.md) | [Español](./docs/README_es.md) | [Français](./docs/README_fr.md) | [简体中文](./docs/README_zh-CN.md)

</div>

---

Transform your notes with a beautiful blog-style metadata header! 📝✨

Running Head is an Obsidian plugin that automatically adds a customizable header below your note titles, displaying the publication date, estimated reading time, a last-updated badge, and any custom frontmatter properties you desire.

## Features

- **📝 Multiple layouts**: Choose between a **Blog** style (path above the title, metadata below) or a **Wiki** style (metadata above the title, path below).
- **⏱️ Reading time & dates**: Automatically calculate and display reading time and dates formatted according to your locale (asian languages supported).
- **🧩 Custom fields**: Display any YAML property, such as beautiful "pills", links or text in the header and checkboxes — with positioning **above** or **below** the title individually.
- **📁 Folder scopes**: Keep your vault clean by hiding specific custom fields in certain folders (supports multiple folders per field).
- **🍞 Note path**: Navigate easily with a clickable folder path showing exactly where your note is located, with optional highlighting of the current folder.
- **📊 Scroll progress bar**: An elegant progress bar fixed at the top of the note that tracks your reading position in real-time.
- **🎨 Custom colors**: Define the colors of the update label, the note path or the progress bar simply and individually.
- **📅 Flexible date format**: Choose the formatting locale from 18 available options or define a custom format using [Moment.js](https://momentjs.com/) syntax.
- **💾 Data management**: Export complete settings as JSON and import them into another vault or device easily.
- **🤝 Powerful integrations**: Seamlessly integrates with the **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** plugin (inheriting the beautiful pill styles made by you).
- **🌍 Internationalization**: Interface fully translated into English, Portuguese (Brazil), Spanish, French, and Simplified Chinese (just use Obsidian in one of these languages).

## How to Use

### 1. Configure frontmatter properties

In the plugin settings, define the YAML keys used for:

- **Creation date** (default: `date`)
- **Update date** (default: `updated`)

*Or other date properties of your preference.*

### 2. Customize layout and appearance

- **Title font size**: Adjusts the title size of your notes.
- **Metadata size**: Adjusts the size of the metadata you configured to appear in the header.
- **Header layout**: Choose between Wiki (metadata above the title, path below) or Blog (path above the title, metadata below).
- **Note path**: Displays the note's folder path above the title (hidden for notes at the vault root).
- **Highlight current folder**: Applies the accent color to the last segment of the path.
- **Scroll progress bar**: Displays an elegant reading progress bar at the top of the note.
- **Show update label**: Displays the last modification date when the note was changed after creation.
- **Folder highlight color**: Custom highlight color for the path (empty = theme accent color).
- **Progress bar color**: Scroll progress bar color (empty = theme accent color).
- **Update label color**: Label background color (empty = theme default color).

### 3. Configure date and reading

- **Formatting locale**: Choose between 18 available locales (en-US, ja-JP, pt-BR, es-ES and others).
- **Custom format**: Use Moment.js syntax (e.g., `DD/MM/YYYY`, `MMMM D, YYYY`). When empty, uses the locale default.
- **Abbreviate month names**: Opt for short month names (e.g.: "Jan" instead of "January").
- **Show reading time**: Enable or disable the estimated time displayed next to the date.
- **Reading speed**: Words per minute to calculate the estimated time (default: `200`) (supports Asian languages).

### 4. Add custom fields

1. Go to **Settings > Running Head**.
2. Under "Custom fields", click **Add**.
3. Configure the field options:
   - **YAML key**: The frontmatter property to be displayed (e.g., `Author`, `Category`, `tags`).
   - **Display label**: Optional text displayed before the value.
   - **Show label**: Enable to display the label in the note.
   - **Position**: Choose **Above title** or **Below title**.
   - **Hide in folder**: Hide the field in specific folders (supports multiple folders).
4. Use the **Manage** button to edit, reorder or delete existing fields.

### 5. Configure tabs navigation

1. Go to **Settings > Running Head**.
2. Under **Tabs navigation**, configure the tab visual style (**Underline**, **Pill**, or **Minimal**).
3. Click **Add** under **New tab property** to register a frontmatter property key (e.g. `tabs-home`).
4. In your note's frontmatter, define this property as a **List** type.
5. In the list, you can add:
   - A target note link in wiki format: `"[[Target Note]]"` or `"[[Target Note|Alias]]"`
   - An optional custom name: `"[name, My Custom Name]"`
   - An optional Lucide icon: `"[icon, home]"` (tip: click the icon selector tool in settings to copy the correct icon tag to clipboard)

> [!Note]
> - The order of the tags (`[name, ...]`, `[icon, ...]`, and `[[Link]]`) within the YAML list does not matter.
> - If multiple note links are present in the list, the tab will point to the last link added.

### 6. Data management

- **Export**: Generate a JSON with all your current configuration to copy or save.
- **Import**: Paste a configuration JSON to quickly apply it to another vault or device.

And there it is, your metadata is now elegantly displayed in your notes. ✨

## Installation

### Manual Installation
1. Download the latest release: `main.js`, `manifest.json`, and `styles.css`.
2. Create a folder called `running-head` inside your `.obsidian/plugins/` directory.
3. Paste the files there.
4. Reload Obsidian and enable the plugin.

## Notices

> [!Important]  
> If you are using Checkbox properties, they will currently be displayed as raw text (`true` or `false`) in the header. We recommend using other property types (like tags or text) for a better visual representation in the header context.

> [!Tip]  
> If you have the **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** plugin installed, Running Head will automatically detect and apply your Typify styles to matching pills in the metadata header (if you want to).

> [!Tip]  
> The Minimal theme, by Kepano, was the one that gave the most headache to adjust and make the best possible. It works perfectly on it, okay?

> [!Tip]  
> Use the **Export/Import** feature to share your settings between vaults or backup your configuration before experimenting with new tweaks.

## Development

If you want to build the plugin yourself, do the following:

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run dev` to start compilation in watch mode.

## Disclaimer

This plugin was designed to bring a more elegant, "published" feel to your Obsidian vault notes. And like other times, it was born from my desire to customize my vault (sometimes desires make us create incredible things, as well as spend hours and hours until it looks the way we want... lol).

Special thanks to [Antigravity](https://antigravity.google/) for the invaluable assistance in building, refactoring, and optimizing this codebase. But nothing is done magically, this plugin was tested, retested, turned inside out to be as optimized, light, good, beautiful and functional as possible for everyone looking for something like this. 

If you find any bugs, please open an issue and I'll do my best to fix it. Contributions via pull requests are always welcome! 😉
