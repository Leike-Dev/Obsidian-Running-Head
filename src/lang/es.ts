export const es = {
	// ================================================================
	// SETTINGS — Encabezados de sección
	// ================================================================
	'section_title': 'Encabezado y apariencia',
	'section_appearance': 'Apariencia',
	'section_frontmatter_properties': 'Propiedades',
	'section_date': 'Fecha y lectura',
	'section_custom_fields': 'Campos personalizados',

	// ================================================================
	// SETTINGS — Apariencia
	// ================================================================
	'toggles_section_name': 'Componentes de la interfaz',
	'toggles_section_desc': 'Active o desactive los componentes visuales del encabezado.',
	'colors_section_name': 'Colores personalizados',
	'colors_section_desc': 'Defina colores para resaltado, barra de progreso y etiquetas.',
	'title_font_size_name': 'Tamaño del título',
	'title_font_size_desc': 'Por defecto: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Ruta de la nota',
	'breadcrumb_toggle_desc': 'Muestra la ruta de carpetas de la nota encima del título. Oculto en notas de la raíz del vault.',
	'breadcrumb_highlight_name': 'Resaltar carpeta actual',
	'breadcrumb_highlight_desc': 'Aplica el color de acento al último segmento de la ruta.',
	'breadcrumb_highlight_color_name': 'Color de resaltado de carpeta',
	'breadcrumb_highlight_color_desc': 'Color de resaltado personalizado. Vacío = color de acento del tema.',
	'badge_color_name': 'Color de la etiqueta de actualización',
	'badge_color_desc': 'Color de fondo de la etiqueta. Vacío = color predeterminado.',
	'layout_style_name': 'Diseño del encabezado',
	'layout_style_desc': 'Wiki: metadatos encima del título, ruta debajo. Blog: ruta encima del título, metadatos debajo.',
	'layout_style_wiki': 'Estilo Wiki',
	'layout_style_blog': 'Estilo Blog',
	'header_font_size_name': 'Tamaño de los metadatos',
	'header_font_size_desc': 'Por defecto: 0.75.',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Propiedades del frontmatter
	// ================================================================
	'date_field_name': 'Fecha de creación',
	'date_field_desc': 'Clave YAML de la fecha de creación o publicación. Ej: date, published.',
	'date_field_placeholder': 'Fecha',
	'last_updated_field_name': 'Fecha de actualización',
	'last_updated_field_desc': 'Clave YAML de la última modificación. Ej: updated, modified.',
	'last_updated_field_placeholder': 'Actualizado',

	// ================================================================
	// SETTINGS — Fecha y lectura
	// ================================================================
	'date_locale_name': 'Idioma de formato',
	'date_locale_desc': 'Idioma usado al mostrar fechas.',
	'short_date_name': 'Abreviar nombres de meses',
	'short_date_desc': 'Ej: "ene." en vez de "enero".',

	'custom_date_format_name': 'Formato personalizado',
	'custom_date_format_desc': 'Formato de fecha personalizado vía <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Vacío = predeterminado del idioma.',
	'custom_date_format_placeholder': 'ej. DD/MM/YYYY',
	'show_reading_time_name': 'Mostrar tiempo de lectura',
	'show_reading_time_desc': 'Se muestra junto a la fecha.',
	'wpm_name': 'Velocidad de lectura',
	'wpm_desc': 'Palabras por minuto para calcular el tiempo estimado. Por defecto: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Mostrar etiqueta de actualización',
	'show_last_updated_desc': 'Muestra la fecha de última modificación cuando la nota fue alterada después de su creación.',

	// ================================================================
	// SETTINGS — Opciones del menú de idioma
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
	// SETTINGS — Campos personalizados
	// ================================================================
	'add_field_name': 'Nuevo campo',
	'add_field_desc': 'Añade una propiedad del frontmatter al encabezado de la nota.',
	'add_field_button': 'Añadir',
	'manage_fields_name': 'Gestionar campos',
	'manage_fields_desc': 'Edite o elimine los campos configurados.',
	'manage_fields_button': 'Gestionar',

	// ================================================================
	// MODAL DEL EDITOR DE CAMPOS
	// ================================================================
	'field_editor_title_add': 'Añadir campo',
	'field_editor_title_edit': 'Editar campo',
	'field_key_name': 'Clave YAML',
	'field_key_desc': 'Nombre de la propiedad en el frontmatter de la nota.',
	'field_key_placeholder': 'Autor',
	'field_label_name': 'Etiqueta de visualización',
	'field_label_desc': 'Texto mostrado antes del valor del campo.',
	'field_label_placeholder': 'Autor',
	'field_show_label_name': 'Mostrar etiqueta',
	'field_show_label_desc': 'Se muestra antes del valor del campo.',
	'field_position_name': 'Posición',
	'field_position_desc': 'Define si el campo aparece encima o debajo del título.',
	'field_position_below': 'Debajo del título',
	'field_position_above': 'Encima del título',
	'save_button': 'Guardar',
	'cancel_button': 'Cancelar',
	'field_key_required': 'Introduzca la clave YAML del campo.',
	'field_added': 'Campo "{key}" creado.',
	'field_updated': 'Campo "{key}" actualizado.',
	'field_folder_scope_name': 'Ocultar en carpeta',
	'field_folder_scope_desc': 'Oculta este campo en notas de las carpetas indicadas. Separe varias carpetas con comas. Vacío = mostrar en todas partes.',
	'field_folder_scope_placeholder': 'Escriba el nombre de la carpeta...',
	'field_folder_scope_excluded_label': 'Oculto en',

	// ================================================================
	// MODAL DEL GESTOR DE CAMPOS
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
	// ENCABEZADO DE METADATOS — Etiquetas en tiempo de ejecución
	// ================================================================
	'min_read': 'min de lectura',
	'last_updated': 'Actualizado',
	'field_already_exists': 'El campo "{key}" ya existe.',

// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': 'Barra de progreso de desplazamiento',
	'scroll_progress_bar_desc': 'Muestra una barra de progreso de lectura en la parte superior de la nota.',
	'scroll_progress_color_name': 'Color de la barra de progreso',
	'scroll_progress_color_desc': 'Color de la barra de progreso. Vacío = color de acento predeterminado.',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': 'Gestión de datos',
	'export_title': 'Exportar ajustes',
	'export_desc': 'Exporta los ajustes actuales del plugin al portapapeles.',
	'export_button': 'Exportar',
	'import_title': 'Importar ajustes',
	'import_desc': 'Aplica ajustes a partir de un JSON previamente exportado.',
	'import_button': 'Importar',

	'export_modal_title': 'Exportar ajustes',
	'copy_clipboard_button': 'Copiar al portapapeles',
	'copy_clipboard_success': '¡Ajustes copiados con éxito!',
	'export_error': 'Error al copiar al portapapeles.',

	'import_modal_title': 'Importar ajustes',
	'import_paste_placeholder': 'Pegue su JSON de ajustes aquí...',
	'import_empty_notice': 'Pegue el JSON de ajustes antes de importar.',
	'import_invalid_json': 'Formato JSON no válido.',
	'import_error': 'El JSON no contiene ajustes válidos.',
	'import_success': '¡Ajustes importados con éxito!',
};
