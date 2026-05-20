export const en = {
	// ================================================================
	// SETTINGS — Section headings
	// ================================================================
	'section_title': 'Appearance',
	'section_frontmatter_properties': 'Frontmatter properties',
	'section_date': 'Date and reading',
	'section_custom_fields': 'Custom fields',

	// ================================================================
	// SETTINGS — Appearance
	// ================================================================
	'title_font_size_name': 'Title font size',
	'title_font_size_desc': 'Main title size, in "em". Default: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Folder breadcrumb',
	'breadcrumb_toggle_desc': 'Displays the note\'s folder path as a clickable breadcrumb above the title. Hidden for notes at the vault root.',
	'breadcrumb_highlight_name': 'Highlight current folder',
	'breadcrumb_highlight_desc': 'Applies the accent color to the last segment of the breadcrumb (the note\'s direct parent folder).',
	'layout_style_name': 'Header layout',
	'layout_style_desc': 'Wiki style places the last updated badge at the top right. Blog style places it below the title.',
	'layout_style_wiki': 'Wiki style',
	'layout_style_blog': 'Blog style',
	'header_font_size_name': 'Metadata size',
	'header_font_size_desc': 'Size of metadata texts and badges, in "rem". Default: 0.75.',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Frontmatter properties
	// ================================================================
	'date_field_name': 'Creation date',
	'date_field_desc': 'YAML key with the creation or publication date (e.g., "date", "published").',
	'date_field_placeholder': 'Date',
	'last_updated_field_name': 'Update date',
	'last_updated_field_desc': 'YAML key with the last modified date (e.g., "updated", "modified").',
	'last_updated_field_placeholder': 'Updated',

	// ================================================================
	// SETTINGS — Date and reading
	// ================================================================
	'date_locale_name': 'Formatting locale',
	'date_locale_desc': 'Locale used when displaying dates.',
	'short_date_name': 'Abbreviate month names',
	'short_date_desc': 'Displays the month in a shorter format.',

	'custom_date_format_name': 'Custom format',
	'custom_date_format_desc': 'Custom format with <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a> syntax. Empty = locale default.',
	'custom_date_format_placeholder': 'e.g., DD/MM/YYYY',
	'show_reading_time_name': 'Show reading time',
	'show_reading_time_desc': 'Estimated reading time displayed next to the date.',
	'wpm_name': 'Reading speed',
	'wpm_desc': 'Words per minute to calculate the estimated time. Default: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Show update badge',
	'show_last_updated_desc': 'Displays a badge when the note was modified after creation.',

	// ================================================================
	// SETTINGS — Locale dropdown options
	// ================================================================
	'locale_en_us': `English ${'(US)'}`,
	'locale_en_gb': `English ${'(UK)'}`,
	'locale_pt_br': `Português ${'(Brasil)'}`,
	'locale_pt_pt': `Português ${'(Portugal)'}`,
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
	'add_field_name': 'New field',
	'add_field_desc': 'Displays an extra frontmatter property below the title.',
	'add_field_button': 'Add',
	'manage_fields_name': 'Manage fields',
	'manage_fields_desc': 'Edit styling or remove existing fields.',
	'manage_fields_button': 'Manage',

	// ================================================================
	// FIELD EDITOR MODAL
	// ================================================================
	'field_editor_title_add': 'Add field',
	'field_editor_title_edit': 'Edit field',
	'field_key_name': 'YAML key',
	'field_key_desc': 'Property name in the note\'s frontmatter.',
	'field_key_placeholder': 'Author',
	'field_label_name': 'Display label',
	'field_label_desc': 'Text displayed before the value (visible when "show label" is on).',
	'field_label_placeholder': 'Author',
	'field_show_label_name': 'Show label',
	'field_show_label_desc': 'Displays the label before the field value.',
	'field_position_name': 'Position',
	'field_position_desc': 'Place this field above or below the title.',
	'field_position_below': 'Below title',
	'field_position_above': 'Above title',
	'save_button': 'Save',
	'cancel_button': 'Cancel',
	'field_key_required': 'Enter the YAML key for this field.',
	'field_added': 'Field "{key}" created.',
	'field_updated': 'Field "{key}" updated.',
	'field_folder_scope_name': 'Hide in folder',
	'field_folder_scope_desc': 'If set, this field will be hidden in notes within these folders. Use commas to separate multiple folders. Leave empty to show everywhere.',
	'field_folder_scope_placeholder': 'Type the folder name...',
	'field_folder_scope_excluded_label': 'Hidden in',

	// ================================================================
	// FIELD MANAGER MODAL
	// ================================================================
	'field_manager_title': 'Manage fields',
	'field_manager_count': '{count} field(s)',
	'field_manager_empty': 'No fields added yet.',
	'field_manager_group_above': 'Above title',
	'field_manager_group_below': 'Below title',
	'edit_field_tooltip': 'Edit field',
	'delete_field_tooltip': 'Remove field',
	'delete_confirm': 'Remove "{name}"?',
	'delete_button': 'Remove',
	'field_deleted': 'Field "{name}" removed.',

	// ================================================================
	// METADATA HEADER — Runtime labels
	// ================================================================
	'min_read': 'Min read',
	'last_updated': 'Last updated',
	'field_already_exists': 'Field "{key}" already exists.',

	// ================================================================
	// BASES ICONS
	// ================================================================
	'section_bases_icons': 'Table icons',
	'bases_icons_notice': 'This styling only affects the bases plugin properties header when the view mode is set to table.',
	'bases_icon_label': 'Icon: ',
	'add_bases_icon_name': 'New property icon',
	'add_bases_icon_desc': 'Set a custom icon to be displayed in a specific property\'s header.',
	'add_bases_icon_button': 'Add',
	'manage_bases_icons_name': 'Manage icons',
	'manage_bases_icons_desc': 'Edit or remove previously created icon configurations.',
	'manage_bases_icons_button': 'Manage',
	
	'bases_icons_title': 'Manage icons',
	'bases_icon_editor_title_add': 'Add icon',
	'bases_icon_editor_title_edit': 'Edit icon',
	'bases_icon_property': 'Property name',
	'bases_icon_property_desc': 'Exact property name in the table (e.g., status, category).',
	'bases_icon_name': 'Icon',
	'bases_icon_name_desc': 'Selected icon to display in the header.',
	
	'bases_icon_property_required': 'Enter the field\'s YAML key.',
	'bases_icon_name_required': 'Select an icon.',
	'bases_icon_added': 'Icon for "{property}" created.',
	'bases_icon_updated': 'Icon for "{property}" updated.',
	'bases_icon_deleted': 'Icon for "{property}" removed.',
	'existing_bases_icons': '{count} icon(s)',
	'no_bases_icons': 'No icons added yet.',
	
	'add_button': 'Select icon',
	'icon_picker_placeholder': 'Search icon...',

	// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': 'Scroll progress bar',
	'scroll_progress_bar_desc': 'Show a reading progress bar at the top of the note.',
	'scroll_progress_color_name': 'Scroll progress color',
	'scroll_progress_color_desc': 'Custom color (leave empty for default accent color).',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': 'Data management',
	'export_title': 'Export settings',
	'export_desc': 'Copy the current plugin settings to your clipboard.',
	'export_button': 'Export',
	'import_title': 'Import settings',
	'import_desc': 'Paste a previously exported settings JSON to apply it.',
	'import_button': 'Import',

	'export_modal_title': 'Export settings',
	'copy_clipboard_button': 'Copy to clipboard',
	'copy_clipboard_success': 'Settings copied to clipboard!',
	'export_error': 'Failed to copy to clipboard.',

	'import_modal_title': 'Import settings',
	'import_paste_placeholder': 'Paste your settings JSON here...',
	'import_empty_notice': 'Please paste your settings JSON.',
	'import_invalid_json': 'Invalid JSON format.',
	'import_error': 'The provided JSON does not contain valid settings.',
	'import_success': 'Settings imported successfully!',
};
