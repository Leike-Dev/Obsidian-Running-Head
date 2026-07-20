export const en = {
	// ================================================================
	// SETTINGS — Section headings
	// ================================================================
	'section_title': 'Header and appearance',
	'section_date': 'Date and reading',
	'section_custom_fields': 'Custom fields',
	'section_data_management_title': 'Data management',
	'section_tabs': 'Tabs navigation',

	// ================================================================
	// SETTINGS — Appearance
	// ================================================================
	'toggles_section_name': 'Interface components',
	'toggles_section_desc': 'Enable or disable visual components in the header.',
	'colors_section_name': 'Custom colors',
	'colors_section_desc': 'Set colors for highlight, progress bar, and labels.',
	'title_font_size_name': 'Title font size',
	'title_font_size_desc': 'Default: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Note path',
	'breadcrumb_toggle_desc': 'Displays the note\'s folder path above the title. Hidden for notes at the vault root.',
	'hide_first_h1_name': 'Hide first header (H1)',
	'hide_first_h1_desc': 'Visually hides the first H1 in the document. Useful if you use filename sync plugins and disabled the native title.',

	'format_title_as_date_name': 'Format title as date',
	'format_title_as_date_desc': 'If the file name is a date (e.g., 2026-05-26), it formats the displayed title to text using the chosen locale.',
	'breadcrumb_highlight_name': 'Highlight current folder',
	'breadcrumb_highlight_desc': 'Applies the accent color to the last segment of the path.',
	'breadcrumb_highlight_color_name': 'Folder highlight color',
	'badge_color_name': 'Update label color',
	'layout_style_name': 'Header layout',
	'layout_style_desc': 'Wiki: metadata above the title, path below. Blog: path above the title, metadata below.',
	'layout_style_wiki': 'Wiki style',
	'layout_style_blog': 'Blog style',
	'header_font_size_name': 'Metadata size',
	'header_font_size_desc': 'Default: 0.75.',
	'header_font_size_placeholder': '0.75',
	'scroll_progress_bar_name': 'Scroll progress bar',
	'scroll_progress_bar_desc': 'Displays a reading progress bar at the top of the note.',
	'scroll_progress_color_name': 'Progress bar color',
	'reset_color_tooltip': 'Reset',

	// ================================================================
	// SETTINGS — Frontmatter properties
	// ================================================================
	'date_field_name': 'Creation date',
	'date_field_desc': 'YAML key for the creation or publication date. E.g.: date, published.',
	'date_field_placeholder': 'Date',
	'last_updated_field_name': 'Update date',
	'last_updated_field_desc': 'YAML key for the last modification date. E.g.: updated, modified.',
	'last_updated_field_placeholder': 'Updated',

	// ================================================================
	// SETTINGS — Date and reading
	// ================================================================
	'date_locale_name': 'Formatting locale',
	'date_locale_desc': 'Locale used when displaying dates.',
	'short_date_name': 'Abbreviate month names',
	'short_date_desc': 'E.g.: "Jan" instead of "January".',

	'custom_date_format_name': 'Custom format',
	'custom_date_format_desc': 'Custom date format via <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Empty = locale default.',
	'custom_date_format_placeholder': 'e.g., DD/MM/YYYY',
	'show_reading_time_name': 'Show reading time',
	'show_reading_time_desc': 'Displayed next to the date.',
	'wpm_name': 'Reading speed',
	'wpm_desc': 'Words per minute to calculate the estimated time. Default: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Show update label',
	'show_last_updated_desc': 'Displays the last modification date when the note was changed after creation.',

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
	'add_field_name': 'New field',
	'add_field_desc': 'Adds a frontmatter property to the note header.',
	'add_field_button': 'Add',
	'manage_fields_name': 'Manage fields',
	'manage_fields_desc': 'Edit or remove configured fields.',
	'manage_fields_button': 'Manage',

	// ================================================================
	// FIELD EDITOR MODAL
	// ================================================================
	'field_editor_title_add': 'Add field',
	'field_editor_title_edit': 'Edit field',
	'field_key_name': 'YAML key',
	'field_key_desc': 'Property name in the note\'s frontmatter.',
	'field_key_placeholder': 'author',
	'field_label_name': 'Display label',
	'field_label_desc': 'Text shown before the field\'s value.',
	'field_label_placeholder': 'Author',
	'field_show_label_name': 'Show label',
	'field_show_label_desc': 'Show the label before the value.',
	'field_position_name': 'Position',
	'field_position_desc': 'Show the field above or below the title.',
	'field_position_below': 'Below title',
	'field_position_above': 'Above title',
	'save_button': 'Save',
	'cancel_button': 'Cancel',
	'field_key_required': 'Enter the field\'s YAML key.',
	'field_added': 'Field "{key}" created.',
	'field_updated': 'Field "{key}" updated.',
	'field_folder_scope_name': 'Hide in folder',
	'field_folder_scope_desc': 'Hide this field in notes from the listed folders.',
	'field_folder_scope_placeholder': 'Folder name...',
	'field_folder_scope_excluded_label': 'Hidden in',
	'field_already_exists': 'A field with this key already exists.',
	'field_max_items_name': 'Max visible items',
	'field_max_items_desc': 'Set the maximum number of items to display in lists. Use 0 for no limit.',
	'field_max_items_placeholder': '0',

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
	'min_read': 'min read',
	'last_updated': 'Last updated',
	'boolean_true': 'True',
	'boolean_false': 'False',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'export_title': 'Export settings',
	'export_desc': 'Exports the current plugin settings to the clipboard.',
	'export_button': 'Export',
	'import_title': 'Import settings',
	'import_desc': 'Applies settings from a previously exported JSON.',
	'import_button': 'Import',

	'export_modal_title': 'Export settings',
	'copy_clipboard_button': 'Copy to clipboard',
	'copy_clipboard_success': 'Settings copied successfully!',
	'export_error': 'Failed to copy to clipboard.',

	'import_modal_title': 'Import settings',
	'import_paste_placeholder': 'Paste your settings JSON here...',
	'import_empty_notice': 'Paste the settings JSON before importing.',
	'import_invalid_json': 'Invalid JSON format.',
	'import_error': 'The JSON does not contain valid settings.',
	'import_success': 'Settings imported successfully!',

	// ================================================================
	// SETTINGS — Tabs navigation
	// ================================================================
	'tab_property_global_name': 'Frontmatter property',
	'tab_property_global_desc': 'YAML key used to activate a tab group in notes.',
	'add_tab_property_name': 'New tab group',
	'add_tab_property_desc': 'Create a named group of tabs to use as navigation.',
	'tab_group_new_button': 'Create',
	'manage_tab_properties_name': 'Manage tab groups',
	'manage_tab_properties_desc': 'Edit or remove configured tab groups.',
	'manage_tab_properties_button': 'Manage',
	'tab_style_name': 'Tab style',
	'tab_style_desc': 'Visual style for the tab navigation bar.',
	'tab_style_underline': 'Underline',
	'tab_style_pill': 'Pill',
	'tab_style_minimal': 'Minimal',

	// ================================================================
	// TAB EDITOR MODAL
	// ================================================================
	'tab_editor_title_add': 'New tab group',
	'tab_editor_title_edit': 'Edit tab group',
	'tab_group_name_label': 'Group name',
	'tab_group_name_placeholder': 'Home',
	'tab_property_placeholder': 'Menu',
	'tab_group_name_required': 'Enter a name for this tab group.',
	'tab_group_tabs_label': 'Tabs',
	'tab_group_add_tab': 'Add tab',
	'tab_group_no_tabs': 'No tabs added yet.',
	'tab_group_move_up': 'Move up',
	'tab_property_added': 'Tab group "{key}" created.',
	'tab_property_updated': 'Tab group "{key}" updated.',
	'tab_group_already_exists': 'Group "{name}" already exists.',
	'tab_item_label_name': 'Tab name',
	'tab_item_icon_choose': 'Choose',
	'tab_item_link_name': 'Link',
	'icon_picker_placeholder': 'Search for an icon...',
	'tab_item_name_required_indexed': 'Tab {index} needs a name.',
	'tab_item_link_required_indexed': 'Tab {index} needs a link.',

	// ================================================================
	// TAB MANAGER MODAL
	// ================================================================
	'tab_manager_title': 'Manage tab groups',
	'tab_manager_count': '{count} tab group(s)',
	'tab_manager_empty': 'No tab groups configured yet.',
	'tab_property_deleted': 'Tab group "{name}" removed.',
	'tab_count_singular': '{count} tab',
	'tab_count_plural': '{count} tabs',

	// ================================================================
	// CHANGELOG & NOTICES
	// ================================================================
	'section_info_title': 'Information & Updates',
	'btn_github': 'View on GitHub',
	'btn_understand': 'I understand',

	'changelog_title': "What's new?",
	'changelog_desc': 'See what the latest update brought.',
	'changelog_button': 'View changelog',
	'changelog_badge_new': 'New version',
	'changelog_modal_title': "What's new — Running Head {version}",
	'changelog_modal_date': 'Updated on {date}',
	'changelog_error': 'Could not load update history.',

	'group_new': 'New Features',
	'group_imp': 'Improvements',
	'group_fix': 'Fixes',
	'group_brk': 'Breaking Changes',

	'notices_title': 'Plugin notices',
	'notices_desc': 'Information and alerts about currently active features.',
	'notices_empty': 'No notices at the moment.',
	'notices_button': 'View notices',

	'notices_tab_all': 'All',
	'notices_tab_info': 'Tips',
	'notices_tab_warning': 'Warnings',
	'notices_tab_system': 'System',

	'notice_tabs_title': 'New Tabs Architecture',
	'notice_tabs_desc': 'The tabs system was completely rewritten for better stability. Old tab configurations could not be migrated, so you will need to reconfigure them.',
	'notice_tabs_tutorial_title': 'How to use the new Tabs',
	'notice_tabs_tutorial_desc': '1) Go to the "Tabs navigation" section and define the Global property name (e.g. `menu`). 2) Create a Tab Group and name it (e.g. `project`). 3) Add your tabs (links) inside this group. 4) In your note\'s frontmatter, add the property with the group name (e.g. `menu: project`).',
	'notice_links_title': 'Clickable links in custom fields',
	'notice_links_desc': 'You can now use Markdown links ([name](url)) or raw URLs inside your frontmatter properties. Running Head will detect them and make them clickable right in the note header!',
	'notice_h1_title': 'Hide duplicate titles',
	'notice_h1_desc': 'If you use plugins that sync the file name with the note title, you can now toggle "Hide first header (H1)" in the "Header and appearance" settings to prevent duplicate titles.',
	'notice_list_title': 'Cleaner long lists',
	'notice_list_desc': 'To keep your header elegant, you can now visually truncate long list properties. To use it, edit one of your custom fields and fill in the "Item limit" option. Just click the ellipsis icon (...) in the header to reveal all hidden items.',
};
