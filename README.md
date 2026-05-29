<div align="center">
  <img src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.1-lightgreen.svg)

</div>

<div align="center">

English | [Português](./docs/README_pt.md) | [Español](./docs/README_es.md) | [Français](./docs/README_fr.md) | [简体中文](./docs/README_zh-CN.md)

</div>

---

**Running Head** is an incredible Obsidian plugin that adds a highly customizable metadata header. Track dates, custom frontmatter properties, folder paths, and tabs navigation seamlessly without hassle.


## 🌟 Features in Action

### 1. 📅 Creation & Last Update Dates
Track your note's timeline dynamically. Format dates using 18 default locales or your own [Moment.js](https://momentjs.com/) patterns. A dedicated, smart update label automatically highlights when a note was modified after creation.

<div align="center">
  <video src="https://github.com/user-attachments/assets/f5a54a1a-2d71-4cb3-98ac-40298601d842" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/eeff569f-b336-4487-9d87-a1d5c9367d52" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 2. 📐 Layout Styles
Choose between **Blog Style** (folder path above the title, metadata below) or **Wiki Style** (metadata above the title, path below) layouts to suit your note-taking aesthetics.

<div align="center">
  <video src="https://github.com/user-attachments/assets/726ab137-ebf8-4a23-b49c-df2c1c7064a6" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 3. 🍞 Note Path (Breadcrumbs)
Navigate easily with a clickable folder path showing exactly where your note is located, with optional highlighting of the current active folder.

<div align="center">
  <video src="https://github.com/user-attachments/assets/481eb3b1-1c31-4df6-a1af-d826c86f98b0" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 4. 🏷️ Custom YAML Fields & Folder Scopes
Render any frontmatter property (text, lists, checkboxes) as custom fields or beautiful pill structures in your header. Hide specific fields in certain directories using flexible folder scopes to keep your workspace clean.

> [!NOTE]
> Adding a text field serves as an illustration; these options apply to any custom metadata property.

<div align="center">
  <video src="https://github.com/user-attachments/assets/46fc5fcd-b34b-4586-b35d-659e1ea97860" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/5b1382cd-4245-42a4-96b0-15816d587793" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 5. 🗂️ Interactive Tabs Navigation
Build sleek navigation headers to jump between related notes using frontmatter properties. Customize tab visual styles (**Underline**, **Pill**, or **Minimal**) and easily add Lucide icons or custom display names.

<div align="center">
  <video src="https://github.com/user-attachments/assets/b2e47065-132c-41ef-a1cd-2184e8bb6a2b" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 6. 📊 Scroll Progress & Typify Integration
Add a modern, color-customizable scroll progress bar fixed at the top of your note. Running Head also seamlessly integrates with the **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** plugin to automatically inherit premium colored pill styles.

<div align="center">
  <video src="https://github.com/user-attachments/assets/c0e6d91a-6e36-4c78-9348-1d29b9e860d1" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/31fad83c-f11a-4a0d-b99b-bc8af3981ea9" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


## ⚙️ Additional Features

* **🎨 Custom Colors**: Define the colors of the update label, the note path, or the progress bar simply and individually.
* **💾 Data Management**: Export complete settings as JSON and import them into another vault or device easily.
* **🌍 Internationalization**: Interface fully translated into English, Portuguese (Brazil), Spanish, French, and Simplified Chinese. If there are translation errors or improvements, please let me know.


## 🚀 Quick Start

1. **Activate the Plugin**: Open Obsidian settings $\rightarrow$ Community Plugins, search for **Running Head**, and enable it.
2. **Set Dates in Frontmatter**: Configure your YAML keys for creation (default `date`) and update (default `updated`) dates:
   ```yaml
   date: 2026-05-29
   updated: 2026-05-29
   ```
3. **Configure Custom Fields**: Go to plugin settings $\rightarrow$ **Custom Fields** and click **Add** to map any YAML key (e.g. `Author`, `tags`) to the header.
4. **Create Tabs**: Under **Tabs Navigation**, register a list-based YAML property (e.g. `tabs-home`) and define links to related notes.

### 📝 Tabs YAML Schema Example
```yaml
tabs-home:
  - "[[Home Note]]"
  - "[icon, home]"
  - "[name, Dashboard]"
  - "[[Settings Note]]"
  - "[icon, settings]"
  - "[name, Configuration]"
```

> [!NOTE]
> - The order of the tags (`[name, ...]`, `[icon, ...]`, and `[[Link]]`) within the YAML list does not matter.
> - If multiple note links are present in the list, the tab will point to the last link added.


## 📦 Installation

### Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Create a folder named `running-head` inside `<Your-Vault>/.obsidian/plugins/`.
3. Move the downloaded files into that folder.
4. Reload Obsidian and enable the plugin under **Settings → Community plugins**.


## 🛠️ Development

To build the plugin locally:
1. Clone this repository.
2. Install dependencies: `npm install`
3. Run the development watch server: `npm run dev`


## ⚠️ Disclaimer

This plugin was designed to bring a more elegant, "published" feel to your Obsidian vault notes. And like other times, it was born from my desire to customize my vault (sometimes desires make us create incredible things, as well as spend hours and hours until it looks the way we want... lol).

Special thanks to [Antigravity](https://antigravity.google/) for the invaluable assistance in building, refactoring, and optimizing this codebase. But nothing is done magically, this plugin was tested, retested, turned inside out to be as optimized, light, good, beautiful and functional as possible for everyone looking for something like this. 

If you find any bugs, please open an issue and I'll do my best to fix it. Contributions via pull requests are always welcome! 😉
