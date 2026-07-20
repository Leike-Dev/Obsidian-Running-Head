export const es = {
	// ================================================================
	// SETTINGS — Encabezados de sección
	// ================================================================
	'section_title': 'Encabezado y apariencia',
	'section_date': 'Fecha y lectura',
	'section_custom_fields': 'Campos personalizados',
	'section_data_management_title': 'Gestión de datos',
	'section_tabs': 'Navegación por pestañas',

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
	'hide_first_h1_name': 'Ocultar primer encabezado (H1)',
	'hide_first_h1_desc': 'Oculta visualmente el primer H1 del documento. Útil si usa plugins de sincronización de nombre de archivo y desactivó el título nativo.',

	'format_title_as_date_name': 'Formatear título como fecha',
	'format_title_as_date_desc': 'Si el nombre del archivo es una fecha (ej. 2026-05-26), formatea el título mostrado según el idioma seleccionado.',
	'breadcrumb_highlight_name': 'Resaltar carpeta actual',
	'breadcrumb_highlight_desc': 'Aplica el color de acento al último segmento de la ruta.',
	'breadcrumb_highlight_color_name': 'Color de resaltado de carpeta',
	'badge_color_name': 'Color de la etiqueta de actualización',
	'layout_style_name': 'Diseño del encabezado',
	'layout_style_desc': 'Wiki: metadatos encima del título, ruta debajo. Blog: ruta encima del título, metadatos debajo.',
	'layout_style_wiki': 'Estilo Wiki',
	'layout_style_blog': 'Estilo Blog',
	'header_font_size_name': 'Tamaño de los metadados',
	'header_font_size_desc': 'Por defecto: 0.75.',
	'header_font_size_placeholder': '0.75',
	'scroll_progress_bar_name': 'Barra de progreso de desplazamiento',
	'scroll_progress_bar_desc': 'Muestra una barra de progreso de lectura en la parte superior de la nota.',
	'scroll_progress_color_name': 'Color de la barra de progreso',
	'reset_color_tooltip': 'Restablecer',

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
	'field_key_placeholder': 'autor',
	'field_label_name': 'Etiqueta de visualización',
	'field_label_desc': 'Texto mostrado antes del valor del campo.',
	'field_label_placeholder': 'Autor',
	'field_show_label_name': 'Mostrar etiqueta',
	'field_show_label_desc': 'Muestra la etiqueta antes del valor.',
	'field_position_name': 'Posición',
	'field_position_desc': 'Muestra el campo por encima o por debajo del título.',
	'field_position_below': 'Debajo del título',
	'field_position_above': 'Por encima del título',
	'save_button': 'Guardar',
	'cancel_button': 'Cancelar',
	'field_key_required': 'Introduce la clave YAML del campo.',
	'field_added': 'Campo "{key}" creado.',
	'field_updated': 'Campo "{key}" actualizado.',
	'field_folder_scope_name': 'Ocultar en carpeta',
	'field_folder_scope_desc': 'Oculta este campo en notas de las carpetas listadas.',
	'field_folder_scope_placeholder': 'Nombre de carpeta...',
	'field_folder_scope_excluded_label': 'Oculto en',
	'field_already_exists': 'Ya existe un campo con esta clave.',
	'field_max_items_name': 'Máximo de elementos visibles',
	'field_max_items_desc': 'Establece el número máximo de elementos para mostrar en listas. Use 0 para no tener límite.',
	'field_max_items_placeholder': '0',

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
	'boolean_true': 'Verdadero',
	'boolean_false': 'Falso',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
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

	// ================================================================
	// SETTINGS — Navegación por pestañas
	// ================================================================
	'tab_property_global_name': 'Propiedad del frontmatter',
	'tab_property_global_desc': 'Clave YAML usada para activar un grupo de pestañas en las notas.',
	'add_tab_property_name': 'Nuevo grupo de pestañas',
	'add_tab_property_desc': 'Cree un grupo de pestañas con nombre para usar como navegación.',
	'tab_group_new_button': 'Crear',
	'manage_tab_properties_name': 'Gestionar grupos de pestañas',
	'manage_tab_properties_desc': 'Edite o elimine los grupos de pestañas configurados.',
	'manage_tab_properties_button': 'Gestionar',
	'tab_style_name': 'Estilo de pestaña',
	'tab_style_desc': 'Estilo visual de la barra de navegación por pestañas.',
	'tab_style_underline': 'Subrayado',
	'tab_style_pill': 'Píldora',
	'tab_style_minimal': 'Minimalista',

	// ================================================================
	// MODAL DEL EDITOR DE PESTAÑAS
	// ================================================================
	'tab_editor_title_add': 'Nuevo grupo de pestañas',
	'tab_editor_title_edit': 'Editar grupo de pestañas',
	'tab_group_name_label': 'Nombre del grupo',
	'tab_group_name_placeholder': 'Home',
	'tab_property_placeholder': 'Menu',
	'tab_group_name_required': 'Introduzca un nombre para este grupo de pestañas.',
	'tab_group_tabs_label': 'Pestañas',
	'tab_group_add_tab': 'Añadir pestaña',
	'tab_group_no_tabs': 'Ninguna pestaña añadida aún.',
	'tab_group_move_up': 'Mover arriba',
	'tab_property_added': 'Grupo de pestañas "{key}" creado.',
	'tab_property_updated': 'Grupo de pestañas "{key}" actualizado.',
	'tab_group_already_exists': 'El grupo "{name}" ya existe.',
	'tab_item_label_name': 'Nombre de la pestaña',
	'tab_item_icon_choose': 'Elegir',
	'tab_item_link_name': 'Enlace',
	'icon_picker_placeholder': 'Buscar un icono...',
	'tab_item_name_required_indexed': 'La pestaña {index} necesita un nombre.',
	'tab_item_link_required_indexed': 'La pestaña {index} necesita un enlace.',

	// ================================================================
	// MODAL DEL GESTOR DE PESTAÑAS
	// ================================================================
	'tab_manager_title': 'Gestionar grupos de pestañas',
	'tab_manager_count': '{count} grupo(s) de pestañas',
	'tab_manager_empty': 'Ningún grupo de pestañas configurado aún.',
	'tab_property_deleted': 'Grupo de pestañas "{name}" eliminado.',
	'tab_count_singular': '{count} pestaña',
	'tab_count_plural': '{count} pestañas',

	'notices_tab_info': 'Consejos',
	'notices_tab_warning': 'Advertencias',
	'notices_tab_system': 'Sistema',

	'notice_tabs_title': 'Nueva arquitectura de pestañas',
	'notice_tabs_desc': 'El sistema de pestañas ha sido reescrito completamente para mayor estabilidad. Las configuraciones antiguas no pudieron ser migradas, por lo que deberá reconfigurarlas.',
	'notice_tabs_tutorial_title': 'Cómo usar las nuevas pestañas',
	'notice_tabs_tutorial_desc': '1) Vaya a la sección "Navegación por pestañas" y defina el nombre de la Propiedad global (ej: `menu`). 2) Cree un Grupo de pestañas y póngale un nombre (ej: `proyecto`). 3) Agregue sus pestañas (enlaces) dentro de este grupo. 4) En el frontmatter de su nota, agregue la propiedad con el nombre del grupo (ej: `menu: proyecto`).',
	'notice_links_title': 'Enlaces clicables en campos personalizados',
	'notice_links_desc': 'Ahora puede usar enlaces Markdown ([nombre](url)) o URLs puras dentro de las propiedades del frontmatter. ¡Running Head los detectará y los hará clicables directamente en el encabezado de la nota!',
	'notice_h1_title': 'Ocultar títulos duplicados',
	'notice_h1_desc': 'Si usa plugins que sincronizan el nombre del archivo con el título de la nota, ahora puede activar "Ocultar primer encabezado (H1)" en la configuración de "Encabezado y apariencia" para evitar títulos duplicados.',
	'notice_list_title': 'Listas largas más limpias',
	'notice_list_desc': 'Para mantener elegante el encabezado de su nota, ahora puede limitar visualmente las propiedades de lista. Para usarlo, edite uno de sus campos personalizados y complete la opción "Límite de elementos". Solo haga clic en el ícono de puntos suspensivos (...) en el encabezado para revelar todos los elementos ocultos.',
	'notice_format_title_title': 'Formatear título como fecha',
	'notice_format_title_desc': '¡Ahora puede formatear el título de su nota como una fecha! Consejo: Recomendamos usar esto con el título nativo de Obsidian desactivado (Configuración > Apariencia > Mostrar título integrado). Tenga en cuenta que cuando esta opción está activada, el título no se puede editar manualmente.',
};
