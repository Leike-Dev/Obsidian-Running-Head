export const zhCN = {
	// ================================================================
	// SETTINGS — 分区标题
	// ================================================================
	'section_title': '页眉与外观',
	'section_date': '日期与阅读',
	'section_custom_fields': '自定义字段',
	'section_data_management_title': '数据管理',
	'section_tabs': '标签导航',

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
	'hide_first_h1_name': '隐藏第一个标题 (H1)',
	'hide_first_h1_desc': '视觉上隐藏文档中的第一个 H1。如果您使用文件名同步插件并禁用了原生标题，此选项很有用。',

	'format_title_as_date_name': '将标题格式化为日期',
	'format_title_as_date_desc': '如果文件名是日期（如 2026-05-26），则根据选定的语言环境格式化显示的标题。',
	'breadcrumb_highlight_name': '高亮当前文件夹',
	'breadcrumb_highlight_desc': '将强调色应用于路径的最后一个片段。',
	'breadcrumb_highlight_color_name': '文件夹高亮颜色',
	'badge_color_name': '更新标签颜色',
	'layout_style_name': '页眉布局',
	'layout_style_desc': 'Wiki：元数据在标题上方，路径在下方。Blog：路径在标题上方，元数据在下方。',
	'layout_style_wiki': 'Wiki 样式',
	'layout_style_blog': 'Blog 样式',
	'header_font_size_name': '元数据大小',
	'header_font_size_desc': '默认：0.75。',
	'header_font_size_placeholder': '0.75',
	'scroll_progress_bar_name': '滚动进度条',
	'scroll_progress_bar_desc': '在笔记顶部显示阅读进度条。',
	'scroll_progress_color_name': '进度条颜色',
	'reset_color_tooltip': '重置',

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
	'field_key_placeholder': 'author',
	'field_label_name': '显示标签',
	'field_label_desc': '显示在字段值之前的文本。',
	'field_label_placeholder': 'Author',
	'field_show_label_name': '显示标签',
	'field_show_label_desc': '在值之前显示标签。',
	'field_position_name': '位置',
	'field_position_desc': '在标题上方或下方显示字段。',
	'field_position_below': '标题下方',
	'field_position_above': '标题上方',
	'save_button': '保存',
	'cancel_button': '取消',
	'field_key_required': '请输入字段的 YAML 键。',
	'field_added': '字段 "{key}" 已创建。',
	'field_updated': '字段 "{key}" 已更新。',
	'field_folder_scope_name': '在文件夹中隐藏',
	'field_folder_scope_desc': '在指定文件夹中的笔记隐藏此字段。',
	'field_folder_scope_placeholder': '文件夹名称...',
	'field_folder_scope_excluded_label': '隐藏于',
	'field_already_exists': '具有此键的字段已存在。',
	'field_max_items_name': '最大可见项目数',
	'field_max_items_desc': '设置列表中显示的最大项目数。使用 0 表示无限制。',
	'field_max_items_placeholder': '0',

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
	'boolean_true': '是',
	'boolean_false': '否',

	// ================================================================
	// 数据管理（导入/导出）
	// ================================================================
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

	// ================================================================
	// SETTINGS — 标签导航
	// ================================================================
	'tab_property_global_name': 'Frontmatter 属性',
	'tab_property_global_desc': '用于在笔记中激活标签组的 YAML 键。',
	'add_tab_property_name': '新建标签组',
	'add_tab_property_desc': '创建一个命名的标签组用于导航。',
	'tab_group_new_button': '创建',
	'manage_tab_properties_name': '管理标签组',
	'manage_tab_properties_desc': '编辑或删除已配置的标签组。',
	'manage_tab_properties_button': '管理',
	'tab_style_name': '标签样式',
	'tab_style_desc': '标签导航栏的视觉样式。',
	'tab_style_underline': '下划线',
	'tab_style_pill': '药丸',
	'tab_style_minimal': '极简',

	// ================================================================
	// 标签编辑器模态框
	// ================================================================
	'tab_editor_title_add': '新建标签组',
	'tab_editor_title_edit': '编辑标签组',
	'tab_group_name_label': '组名称',
	'tab_group_name_placeholder': 'Home',
	'tab_property_placeholder': 'Menu',
	'tab_group_name_required': '请输入此标签组的名称。',
	'tab_group_tabs_label': '标签',
	'tab_group_add_tab': '添加标签',
	'tab_group_no_tabs': '尚未添加标签。',
	'tab_group_move_up': '上移',
	'tab_property_added': '标签组 "{key}" 已创建。',
	'tab_property_updated': '标签组 "{key}" 已更新。',
	'tab_group_already_exists': '组 "{name}" 已存在。',
	'tab_item_label_name': '标签名称',
	'tab_item_icon_choose': '选择',
	'tab_item_link_name': '链接',
	'icon_picker_placeholder': '搜索图标...',
	'tab_item_name_required_indexed': '标签 {index} 需要一个名称。',
	'tab_item_link_required_indexed': '标签 {index} 需要一个链接。',

	// ================================================================
	// 标签管理器模态框
	// ================================================================
	'tab_manager_title': '管理标签组',
	'tab_manager_count': '{count} 个标签组',
	'tab_manager_empty': '尚未配置标签组。',
	'tab_property_deleted': '标签组 "{name}" 已删除。',
	'tab_count_singular': '{count} 个标签',
	'tab_count_plural': '{count} 个标签',

	'notices_tab_info': '提示',
	'notices_tab_warning': '警告',
	'notices_tab_system': '系统',

	'notice_tabs_title': '新的标签页架构',
	'notice_tabs_desc': '标签页系统已完全重写以提高稳定性。旧的标签页配置无法迁移，因此您需要重新配置它们。',
	'notice_tabs_tutorial_title': '如何使用新的标签页',
	'notice_tabs_tutorial_desc': '1) 转到“标签页导航”部分并定义全局属性名称（例如 `menu`）。2) 创建一个标签组并将其命名（例如 `project`）。3) 在此组中添加您的标签（链接）。4) 在笔记的 frontmatter 中，添加带有组名的属性（例如 `menu: project`）。',
	'notice_links_title': '自定义字段中的可点击链接',
	'notice_links_desc': '您现在可以在 frontmatter 属性中使用 Markdown 链接（[名称](url)）或原始 URL。Running Head 将检测它们并使它们在笔记标题中可点击！',
	'notice_h1_title': '隐藏重复的标题',
	'notice_h1_desc': '如果您使用将文件名与笔记标题同步的插件，您现在可以在“标题和外观”设置中切换“隐藏第一个标题（H1）”以防止重复的标题。',
	'notice_list_title': '更简洁的长列表',
	'notice_list_desc': '为了保持标题的优雅，您现在可以在视觉上截断长列表属性。要使用它，请编辑您的一个自定义字段并填写“项目限制”选项。只需单击标题中的省略号图标 (...) 即可显示所有隐藏的项目。',
	'notice_format_title_title': '将标题格式化为日期',
	'notice_format_title_desc': '您现在可以将笔记标题格式化为日期！提示：我们建议在禁用 Obsidian 本机标题（设置 > 外观 > 显示内联标题）的情况下使用此功能。请注意，启用此选项后，将无法手动编辑标题。',
};
