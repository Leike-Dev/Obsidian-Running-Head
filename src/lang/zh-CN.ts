export const zhCN = {
	// ================================================================
	// SETTINGS — Section headings
	// ================================================================
	'section_title': '页眉',
	'section_appearance': '外观',
	'section_frontmatter_properties': '属性',
	'section_date': '日期与阅读',
	'section_custom_fields': '自定义字段',

	// ================================================================
	// SETTINGS — Appearance
	// ================================================================
	'title_font_size_name': '标题大小',
	'title_font_size_desc': '主标题大小，单位为 "em"。默认：3。',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': '文件夹面包屑导航',
	'breadcrumb_toggle_desc': '在标题上方显示笔记的文件夹路径作为可点击的面包屑导航。位于仓库根目录的笔记不显示。',
	'breadcrumb_highlight_name': '高亮当前文件夹',
	'breadcrumb_highlight_desc': '将强调色应用于面包屑的最后一个片段（笔记的直接父文件夹）。',
	'layout_style_name': '标题布局',
	'layout_style_desc': 'Wiki 样式将更新徽章与面包屑导航一起放置在顶部。Blog 样式将所有内容放置在标题下方。',
	'layout_style_wiki': 'Wiki 样式',
	'layout_style_blog': 'Blog 样式',
	'header_font_size_name': '元数据大小',
	'header_font_size_desc': '元数据文本和徽章的大小，单位为 "rem"。默认：0.75。',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Frontmatter properties
	// ================================================================
	'date_field_name': '创建日期',
	'date_field_desc': '包含创建或发布日期的 YAML 键（例如 "date"、"published"）。',
	'date_field_placeholder': '日期',
	'last_updated_field_name': '更新日期',
	'last_updated_field_desc': '包含最后修改日期的 YAML 键（例如 "updated"、"modified"）。',
	'last_updated_field_placeholder': '更新',

	// ================================================================
	// SETTINGS — Date and reading
	// ================================================================
	'date_locale_name': '格式化语言',
	'date_locale_desc': '显示日期时使用的语言环境。',
	'short_date_name': '缩写月份名称',
	'short_date_desc': '以较短的格式显示月份。',

	'custom_date_format_name': '自定义格式',
	'custom_date_format_desc': '使用 <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a> 语法的自定义格式。留空 = 区域默认值。',
	'custom_date_format_placeholder': '例如 DD/MM/YYYY',
	'show_reading_time_name': '显示阅读时间',
	'show_reading_time_desc': '在日期旁边显示估计的阅读时间。',
	'wpm_name': '阅读速度',
	'wpm_desc': '用于计算估计时间的每分钟字数。默认：200。',
	'wpm_placeholder': '200',
	'show_last_updated_name': '显示更新徽章',
	'show_last_updated_desc': '当笔记在创建后被修改时显示一个徽章。',

	// ================================================================
	// SETTINGS — Locale dropdown options
	// ================================================================
	'locale_en_us': 'English (US)',
	'locale_en_gb': 'English (UK)',
	'locale_pt_br': 'Português (Brasil)',
	'locale_pt_pt': 'Português (Portugal)',
	'locale_es': 'Español',
	'locale_fr': 'Français',
	'locale_de': 'Deutsch',
	'locale_it': 'Italiano',
	'locale_ja': '日本語',
	'locale_zh_cn': '中文 (简体)',
	'locale_zh_tw': '中文 (繁體)',
	'locale_ko': '한국어',
	'locale_ru': 'Русский',
	'locale_ar': 'العربية',
	'locale_hi': 'हिन्दी',
	'locale_nl': 'Nederlands',
	'locale_sv': 'Svenska',
	'locale_pl': 'Polski',
	'locale_tr': 'Türkçe',

	// ================================================================
	// SETTINGS — Custom fields
	// ================================================================
	'add_field_name': '新字段',
	'add_field_desc': '在标题下方显示一个额外的 frontmatter 属性。',
	'add_field_button': '添加',
	'manage_fields_name': '管理字段',
	'manage_fields_desc': '编辑样式或删除现有字段。',
	'manage_fields_button': '管理',

	// ================================================================
	// FIELD EDITOR MODAL
	// ================================================================
	'field_editor_title_add': '添加字段',
	'field_editor_title_edit': '编辑字段',
	'field_key_name': 'YAML 键',
	'field_key_desc': '笔记 frontmatter 中的属性名称。',
	'field_key_placeholder': '作者',
	'field_label_name': '显示标签',
	'field_label_desc': '在值之前显示的文本（启用 "显示标签" 时可见）。',
	'field_label_placeholder': '作者',
	'field_show_label_name': '显示标签',
	'field_show_label_desc': '在字段值之前显示标签。',
	'field_position_name': '位置',
	'field_position_desc': '将此字段放置在标题的上方或下方。',
	'field_position_below': '标题下方',
	'field_position_above': '标题上方',
	'save_button': '保存',
	'cancel_button': '取消',
	'field_key_required': '请输入字段的 YAML 键。',
	'field_added': '字段 "{key}" 已创建。',
	'field_updated': '字段 "{key}" 已更新。',
	'field_folder_scope_name': '在文件夹中隐藏',
	'field_folder_scope_desc': '如果设置，该字段将在这些文件夹内的笔记中隐藏。使用逗号分隔多个文件夹。留空以在所有地方显示。',
	'field_folder_scope_placeholder': '输入文件夹名称...',
	'field_folder_scope_excluded_label': '隐藏于',

	// ================================================================
	// FIELD MANAGER MODAL
	// ================================================================
	'field_manager_title': '管理字段',
	'field_manager_count': '{count} 个字段',
	'field_manager_empty': '尚未添加字段。',
	'field_manager_group_above': '标题上方',
	'field_manager_group_below': '标题下方',
	'edit_field_tooltip': '编辑字段',
	'delete_field_tooltip': '删除字段',
	'delete_confirm': '要删除 "{name}" 吗？',
	'delete_button': '删除',
	'field_deleted': '字段 "{name}" 已删除。',

	// ================================================================
	// METADATA HEADER — Runtime labels
	// ================================================================
	'min_read': '分钟阅读',
	'last_updated': '最后更新',
	'field_already_exists': '字段 "{key}" 已存在。',

	// ================================================================
	// BASES ICONS
	// ================================================================
	'section_bases_icons': '表格图标',
	'bases_icons_notice': '此样式仅在视图模式设置为表格时影响 Bases 插件的属性标题。',
	'bases_icon_label': '图标：',
	'add_bases_icon_name': '新属性图标',
	'add_bases_icon_desc': '设置要显示在特定属性标题中的自定义图标。',
	'add_bases_icon_button': '添加',
	'manage_bases_icons_name': '管理图标',
	'manage_bases_icons_desc': '编辑或删除先前创建的图标配置。',
	'manage_bases_icons_button': '管理',
	
	'bases_icons_title': '管理图标',
	'bases_icon_editor_title_add': '添加图标',
	'bases_icon_editor_title_edit': '编辑图标',
	'bases_icon_property': '属性名称',
	'bases_icon_property_desc': '表格中确切的属性名称（例如 status, category）。',
	'bases_icon_name': '图标',
	'bases_icon_name_desc': '要在标题中显示的选定图标。',
	
	'bases_icon_property_required': '请输入字段的 YAML 键。',
	'bases_icon_name_required': '请选择一个图标。',
	'bases_icon_added': '"{property}" 的图标已创建。',
	'bases_icon_updated': '"{property}" 的图标已更新。',
	'bases_icon_deleted': '"{property}" 的图标已删除。',
	'existing_bases_icons': '{count} 个图标',
	'no_bases_icons': '尚未添加图标。',
	
	'add_button': '选择图标',
	'icon_picker_placeholder': '搜索图标...',

	// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': '滚动进度条',
	'scroll_progress_bar_desc': '在笔记顶部显示阅读进度条。',
	'scroll_progress_color_name': '滚动进度颜色',
	'scroll_progress_color_desc': '自定义颜色（留空为默认强调色）。',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': '数据管理',
	'export_title': '导出设置',
	'export_desc': '将当前插件设置复制到剪贴板。',
	'export_button': '导出',
	'import_title': '导入设置',
	'import_desc': '粘贴先前导出的设置 JSON 以应用它。',
	'import_button': '导入',

	'export_modal_title': '导出设置',
	'copy_clipboard_button': '复制到剪贴板',
	'copy_clipboard_success': '设置已成功复制到剪贴板！',
	'export_error': '复制到剪贴板失败。',

	'import_modal_title': '导入设置',
	'import_paste_placeholder': '在此处粘贴您的设置 JSON...',
	'import_empty_notice': '请粘贴您的设置 JSON。',
	'import_invalid_json': '无效的 JSON 格式。',
	'import_error': '提供的 JSON 不包含有效的设置。',
	'import_success': '设置导入成功！',
};
