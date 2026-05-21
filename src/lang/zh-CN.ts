export const zhCN = {
	// ================================================================
	// SETTINGS — 分区标题
	// ================================================================
	'section_title': '页眉与外观',
	'section_appearance': '外观',
	'section_frontmatter_properties': '属性',
	'section_date': '日期与阅读',
	'section_custom_fields': '自定义字段',

	// ================================================================
	// SETTINGS — 外观
	// ================================================================
	'toggles_section_name': '界面组件',
	'toggles_section_desc': '启用或禁用页眉的可视组件。',
	'colors_section_name': '自定义颜色',
	'colors_section_desc': '设置高亮、进度条和标签的颜色。',
	'title_font_size_name': '标题大小',
	'title_font_size_desc': '默认：3。',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': '笔记路径',
	'breadcrumb_toggle_desc': '在标题上方显示笔记的文件夹路径。位于仓库根目录的笔记不显示。',
	'breadcrumb_highlight_name': '高亮当前文件夹',
	'breadcrumb_highlight_desc': '将强调色应用于路径的最后一个片段。',
	'breadcrumb_highlight_color_name': '文件夹高亮颜色',
	'breadcrumb_highlight_color_desc': '自定义高亮颜色。留空 = 主题强调色。',
	'badge_color_name': '更新标签颜色',
	'badge_color_desc': '标签背景颜色。留空 = 默认颜色。',
	'layout_style_name': '页眉布局',
	'layout_style_desc': 'Wiki：元数据在标题上方，路径在下方。Blog：路径在标题上方，元数据在下方。',
	'layout_style_wiki': 'Wiki 样式',
	'layout_style_blog': 'Blog 样式',
	'header_font_size_name': '元数据大小',
	'header_font_size_desc': '默认：0.75。',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Frontmatter 属性
	// ================================================================
	'date_field_name': '创建日期',
	'date_field_desc': '创建或发布日期的 YAML 键。例如：date、published。',
	'date_field_placeholder': '日期',
	'last_updated_field_name': '更新日期',
	'last_updated_field_desc': '最后修改日期的 YAML 键。例如：updated、modified。',
	'last_updated_field_placeholder': '更新',

	// ================================================================
	// SETTINGS — 日期与阅读
	// ================================================================
	'date_locale_name': '格式化语言',
	'date_locale_desc': '显示日期时使用的语言环境。',
	'short_date_name': '缩写月份名称',
	'short_date_desc': '例如："1月"而非"一月"。',

	'custom_date_format_name': '自定义格式',
	'custom_date_format_desc': '通过 <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a> 自定义日期格式。留空 = 区域默认值。',
	'custom_date_format_placeholder': '例如 DD/MM/YYYY',
	'show_reading_time_name': '显示阅读时间',
	'show_reading_time_desc': '显示在日期旁边。',
	'wpm_name': '阅读速度',
	'wpm_desc': '用于计算估计时间的每分钟字数。默认：200。',
	'wpm_placeholder': '200',
	'show_last_updated_name': '显示更新标签',
	'show_last_updated_desc': '当笔记在创建后被修改时显示最后修改日期。',

	// ================================================================
	// SETTINGS — 语言下拉选项
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
	// SETTINGS — 自定义字段
	// ================================================================
	'add_field_name': '新字段',
	'add_field_desc': '将 frontmatter 属性添加到笔记页眉。',
	'add_field_button': '添加',
	'manage_fields_name': '管理字段',
	'manage_fields_desc': '编辑或删除已配置的字段。',
	'manage_fields_button': '管理',

	// ================================================================
	// 字段编辑器模态框
	// ================================================================
	'field_editor_title_add': '添加字段',
	'field_editor_title_edit': '编辑字段',
	'field_key_name': 'YAML 键',
	'field_key_desc': '笔记 frontmatter 中的属性名称。',
	'field_key_placeholder': '作者',
	'field_label_name': '显示标签',
	'field_label_desc': '在字段值之前显示的文本。',
	'field_label_placeholder': '作者',
	'field_show_label_name': '显示标签',
	'field_show_label_desc': '显示在字段值之前。',
	'field_position_name': '位置',
	'field_position_desc': '定义字段显示在标题上方还是下方。',
	'field_position_below': '标题下方',
	'field_position_above': '标题上方',
	'save_button': '保存',
	'cancel_button': '取消',
	'field_key_required': '请输入字段的 YAML 键。',
	'field_added': '字段 "{key}" 已创建。',
	'field_updated': '字段 "{key}" 已更新。',
	'field_folder_scope_name': '在文件夹中隐藏',
	'field_folder_scope_desc': '在指定文件夹中的笔记隐藏此字段。多个文件夹用逗号分隔。留空 = 所有地方显示。',
	'field_folder_scope_placeholder': '输入文件夹名称...',
	'field_folder_scope_excluded_label': '隐藏于',

	// ================================================================
	// 字段管理器模态框
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
	// 元数据页眉 — 运行时标签
	// ================================================================
	'min_read': '分钟阅读',
	'last_updated': '最后更新',
	'field_already_exists': '字段 "{key}" 已存在。',

// ================================================================
	// SETTINGS — 滚动进度
	// ================================================================
	'scroll_progress_bar_name': '滚动进度条',
	'scroll_progress_bar_desc': '在笔记顶部显示阅读进度条。',
	'scroll_progress_color_name': '进度条颜色',
	'scroll_progress_color_desc': '进度条颜色。留空 = 默认强调色。',

	// ================================================================
	// 数据管理（导入/导出）
	// ================================================================
	'section_data_management_title': '数据管理',
	'export_title': '导出设置',
	'export_desc': '将当前插件设置导出到剪贴板。',
	'export_button': '导出',
	'import_title': '导入设置',
	'import_desc': '从先前导出的 JSON 应用设置。',
	'import_button': '导入',

	'export_modal_title': '导出设置',
	'copy_clipboard_button': '复制到剪贴板',
	'copy_clipboard_success': '设置复制成功！',
	'export_error': '复制到剪贴板失败。',

	'import_modal_title': '导入设置',
	'import_paste_placeholder': '在此处粘贴您的设置 JSON...',
	'import_empty_notice': '请在导入前粘贴设置 JSON。',
	'import_invalid_json': '无效的 JSON 格式。',
	'import_error': 'JSON 不包含有效的设置。',
	'import_success': '设置导入成功！',
};
