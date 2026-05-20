export const es = {
	// ================================================================
	// SETTINGS — Section headings
	// ================================================================
	'section_title': 'Apariencia',
	'section_frontmatter_properties': 'Propiedades de frontmatter',
	'section_date': 'Fecha y lectura',
	'section_custom_fields': 'Campos personalizados',

	// ================================================================
	// SETTINGS — Appearance
	// ================================================================
	'title_font_size_name': 'Tamaño del título',
	'title_font_size_desc': 'Tamaño del título principal, en "em". Por defecto: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Breadcrumb de carpeta',
	'breadcrumb_toggle_desc': 'Muestra la ruta de carpeta de la nota como un breadcrumb clicable encima del título. Oculto para notas en la raíz del vault.',
	'breadcrumb_highlight_name': 'Resaltar carpeta actual',
	'breadcrumb_highlight_desc': 'Aplica el color de acento al último segmento del breadcrumb (la carpeta directa de la nota).',
	'layout_style_name': 'Diseño del encabezado',
	'layout_style_desc': 'El estilo Wiki coloca el badge de actualización en la parte superior derecha. El estilo Blog coloca todo debajo del título.',
	'layout_style_wiki': 'Estilo Wiki',
	'layout_style_blog': 'Estilo Blog',
	'header_font_size_name': 'Tamaño de los metadatos',
	'header_font_size_desc': 'Tamaño de textos y badges de metadatos, en "rem". Por defecto: 0.75.',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Frontmatter properties
	// ================================================================
	'date_field_name': 'Fecha de creación',
	'date_field_desc': 'Clave YAML con la fecha de creación o publicación (ej: "date", "published").',
	'date_field_placeholder': 'Fecha',
	'last_updated_field_name': 'Fecha de actualización',
	'last_updated_field_desc': 'Clave YAML con la fecha de última modificación (ej: "updated", "modified").',
	'last_updated_field_placeholder': 'Actualizado',

	// ================================================================
	// SETTINGS — Date and reading
	// ================================================================
	'date_locale_name': 'Idioma de formato',
	'date_locale_desc': 'Idioma usado al mostrar fechas.',
	'short_date_name': 'Abreviar nombres de meses',
	'short_date_desc': 'Muestra el mes en un formato más corto.',

	'custom_date_format_name': 'Formato personalizado',
	'custom_date_format_desc': 'Formato personalizado con sintaxis de <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Vacío = predeterminado del idioma.',
	'custom_date_format_placeholder': 'ej. DD/MM/YYYY',
	'show_reading_time_name': 'Mostrar tiempo de lectura',
	'show_reading_time_desc': 'Tiempo estimado de lectura mostrado junto a la fecha.',
	'wpm_name': 'Velocidad de lectura',
	'wpm_desc': 'Palabras por minuto para calcular el tiempo estimado. Por defecto: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Mostrar badge de actualización',
	'show_last_updated_desc': 'Muestra un badge cuando la nota fue modificada después de la creación.',

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
	'add_field_name': 'Nuevo campo',
	'add_field_desc': 'Muestra una propiedad extra de frontmatter debajo del título.',
	'add_field_button': 'Añadir',
	'manage_fields_name': 'Gestionar campos',
	'manage_fields_desc': 'Editar estilos o eliminar campos existentes.',
	'manage_fields_button': 'Gestionar',

	// ================================================================
	// FIELD EDITOR MODAL
	// ================================================================
	'field_editor_title_add': 'Añadir campo',
	'field_editor_title_edit': 'Editar campo',
	'field_key_name': 'Clave YAML',
	'field_key_desc': 'Nombre de la propiedad en el frontmatter de la nota.',
	'field_key_placeholder': 'Autor',
	'field_label_name': 'Etiqueta de visualización',
	'field_label_desc': 'Texto mostrado antes del valor (visible cuando "mostrar etiqueta" está activo).',
	'field_label_placeholder': 'Autor',
	'field_show_label_name': 'Mostrar etiqueta',
	'field_show_label_desc': 'Muestra la etiqueta antes del valor del campo.',
	'field_position_name': 'Posición',
	'field_position_desc': 'Colocar este campo encima o debajo del título.',
	'field_position_below': 'Debajo del título',
	'field_position_above': 'Encima del título',
	'save_button': 'Guardar',
	'cancel_button': 'Cancelar',
	'field_key_required': 'Introduce la clave YAML del campo.',
	'field_added': 'Campo "{key}" creado.',
	'field_updated': 'Campo "{key}" actualizado.',
	'field_folder_scope_name': 'Ocultar en carpeta',
	'field_folder_scope_desc': 'Si se establece, este campo se ocultará en las notas dentro de estas carpetas. Usa comas para separar varias carpetas. Déjalo vacío para mostrarlo en todas partes.',
	'field_folder_scope_placeholder': 'Escribe el nombre de la carpeta...',
	'field_folder_scope_excluded_label': 'Oculto en',

	// ================================================================
	// FIELD MANAGER MODAL
	// ================================================================
	'field_manager_title': 'Gestionar campos',
	'field_manager_count': '{count} campo(s)',
	'field_manager_empty': 'Ningún campo añadido aún.',
	'field_manager_group_above': 'Encima del título',
	'field_manager_group_below': 'Debajo del título',
	'edit_field_tooltip': 'Editar campo',
	'delete_field_tooltip': 'Eliminar campo',
	'delete_confirm': '¿Eliminar "{name}"?',
	'delete_button': 'Eliminar',
	'field_deleted': 'Campo "{name}" eliminado.',

	// ================================================================
	// METADATA HEADER — Runtime labels
	// ================================================================
	'min_read': 'Min de lectura',
	'last_updated': 'Actualizado',
	'field_already_exists': 'El campo "{key}" ya existe.',

	// ================================================================
	// BASES ICONS
	// ================================================================
	'section_bases_icons': 'Iconos de tabla',
	'bases_icons_notice': 'Este estilo solo afecta el encabezado de las propiedades del plugin Bases cuando el modo de vista es tabla.',
	'bases_icon_label': 'Icono: ',
	'add_bases_icon_name': 'Nuevo icono de propiedad',
	'add_bases_icon_desc': 'Configura un icono personalizado para mostrar en el encabezado de una propiedad específica.',
	'add_bases_icon_button': 'Añadir',
	'manage_bases_icons_name': 'Gestionar iconos',
	'manage_bases_icons_desc': 'Editar o eliminar configuraciones de iconos creadas previamente.',
	'manage_bases_icons_button': 'Gestionar',
	
	'bases_icons_title': 'Gestionar iconos',
	'bases_icon_editor_title_add': 'Añadir icono',
	'bases_icon_editor_title_edit': 'Editar icono',
	'bases_icon_property': 'Nombre de la propiedad',
	'bases_icon_property_desc': 'El nombre exacto de la propiedad en la tabla (ej. status, category).',
	'bases_icon_name': 'Icono',
	'bases_icon_name_desc': 'Icono seleccionado para mostrar en el encabezado.',
	
	'bases_icon_property_required': 'Introduce la clave YAML del campo.',
	'bases_icon_name_required': 'Selecciona un icono.',
	'bases_icon_added': 'Icono para "{property}" creado.',
	'bases_icon_updated': 'Icono para "{property}" actualizado.',
	'bases_icon_deleted': 'Icono para "{property}" eliminado.',
	'existing_bases_icons': '{count} icono(s)',
	'no_bases_icons': 'Ningún icono añadido aún.',
	
	'add_button': 'Seleccionar icono',
	'icon_picker_placeholder': 'Buscar icono...',

	// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': 'Barra de progreso de desplazamiento',
	'scroll_progress_bar_desc': 'Muestra una barra de progreso de lectura en la parte superior de la nota.',
	'scroll_progress_color_name': 'Color del progreso de desplazamiento',
	'scroll_progress_color_desc': 'Color personalizado (dejar vacío para usar el color de acento predeterminado).',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': 'Gestión de datos',
	'export_title': 'Exportar ajustes',
	'export_desc': 'Copia los ajustes actuales del plugin al portapapeles.',
	'export_button': 'Exportar',
	'import_title': 'Importar ajustes',
	'import_desc': 'Pega un JSON de ajustes exportado previamente para aplicarlo.',
	'import_button': 'Importar',

	'export_modal_title': 'Exportar ajustes',
	'copy_clipboard_button': 'Copiar al portapapeles',
	'copy_clipboard_success': '¡Ajustes copiados al portapapeles!',
	'export_error': 'Error al copiar al portapapeles.',

	'import_modal_title': 'Importar ajustes',
	'import_paste_placeholder': 'Pega tu JSON de ajustes aquí...',
	'import_empty_notice': 'Por favor, pega tu JSON de ajustes.',
	'import_invalid_json': 'Formato JSON no válido.',
	'import_error': 'El JSON proporcionado no contiene ajustes válidos.',
	'import_success': '¡Ajustes importados con éxito!',
};
