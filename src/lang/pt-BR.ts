export const ptBR = {
	// ================================================================
	// SETTINGS — Cabeçalhos de seção
	// ================================================================
	'section_title': 'Cabeçalho',
	'section_appearance': 'Aparência',
	'section_frontmatter_properties': 'Propriedades',
	'section_date': 'Data e leitura',
	'section_custom_fields': 'Campos personalizados',

	// ================================================================
	// SETTINGS — Aparência
	// ================================================================
	'title_font_size_name': 'Tamanho do título',
	'title_font_size_desc': 'Tamanho do título principal, em "em". Padrão: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Breadcrumb de pasta',
	'breadcrumb_toggle_desc': 'Exibe o caminho da pasta da nota como um breadcrumb clicável acima do título. Oculto para notas na raiz do vault.',
	'breadcrumb_highlight_name': 'Destacar pasta atual',
	'breadcrumb_highlight_desc': 'Aplica a cor de destaque ao último segmento do breadcrumb (a pasta direta da nota).',
	'layout_style_name': 'Layout do cabeçalho',
	'layout_style_desc': 'O estilo Wiki coloca a badge de atualização no topo à direita. O estilo Blog coloca tudo abaixo do título.',
	'layout_style_wiki': 'Estilo Wiki',
	'layout_style_blog': 'Estilo Blog',
	'header_font_size_name': 'Tamanho dos metadados',
	'header_font_size_desc': 'Tamanho dos textos e badges de metadados, em "rem". Padrão: 0.75.',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Propriedades do frontmatter
	// ================================================================
	'date_field_name': 'Data de criação',
	'date_field_desc': 'Chave YAML com a data de criação ou publicação (ex: "date", "published").',
	'date_field_placeholder': 'Data',
	'last_updated_field_name': 'Data de atualização',
	'last_updated_field_desc': 'Chave YAML com a data da última modificação (ex: "updated", "modified").',
	'last_updated_field_placeholder': 'Atualizado',

	// ================================================================
	// SETTINGS — Data e leitura
	// ================================================================
	'date_locale_name': 'Idioma de formatação',
	'date_locale_desc': 'Localização usada ao exibir datas.',
	'short_date_name': 'Abreviar nomes dos meses',
	'short_date_desc': 'Exibe o mês de forma encurtada.',

	'custom_date_format_name': 'Formatação personalizada',
	'custom_date_format_desc': 'Formato personalizado com sintaxe <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Vazio = padrão do idioma.',
	'custom_date_format_placeholder': 'ex: DD/MM/YYYY',
	'show_reading_time_name': 'Exibir tempo de leitura',
	'show_reading_time_desc': 'Estimativa de tempo de leitura exibida ao lado da data.',
	'wpm_name': 'Velocidade de leitura',
	'wpm_desc': 'Palavras por minuto para calcular o tempo estimado. Padrão: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Exibir badge de atualização',
	'show_last_updated_desc': 'Exibe um badge quando a nota foi modificada após a criação.',

	// ================================================================
	// SETTINGS — Opções do dropdown de idioma
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
	'add_field_name': 'Novo campo',
	'add_field_desc': 'Exibe uma propriedade extra do frontmatter abaixo do título.',
	'add_field_button': 'Adicionar',
	'manage_fields_name': 'Gerenciar campos',
	'manage_fields_desc': 'Editar estilo ou remover campos existentes.',
	'manage_fields_button': 'Gerenciar',

	// ================================================================
	// MODAL DO EDITOR DE CAMPOS
	// ================================================================
	'field_editor_title_add': 'Adicionar campo',
	'field_editor_title_edit': 'Editar campo',
	'field_key_name': 'Chave YAML',
	'field_key_desc': 'Nome da propriedade no frontmatter da nota.',
	'field_key_placeholder': 'Autor',
	'field_label_name': 'Rótulo de exibição',
	'field_label_desc': 'Texto exibido antes do valor (visível quando "mostrar rótulo" está ativo).',
	'field_label_placeholder': 'Autor',
	'field_show_label_name': 'Mostrar rótulo',
	'field_show_label_desc': 'Mostra o rótulo antes do valor do campo.',
	'field_position_name': 'Posição',
	'field_position_desc': 'Posicionar este campo acima ou abaixo do título.',
	'field_position_below': 'Abaixo do título',
	'field_position_above': 'Acima do título',
	'save_button': 'Salvar',
	'cancel_button': 'Cancelar',
	'field_key_required': 'Insira a chave YAML do campo.',
	'field_added': 'Campo "{key}" criado.',
	'field_updated': 'Campo "{key}" atualizado.',
	'field_folder_scope_name': 'Ocultar na pasta',
	'field_folder_scope_desc': 'Se definido, este campo será ocultado em notas dentro destas pastas. Use vírgulas para separar múltiplas pastas. Deixe vazio para exibir em todo lugar.',
	'field_folder_scope_placeholder': 'Digite o nome da pasta...',
	'field_folder_scope_excluded_label': 'Oculto em',

	// ================================================================
	// MODAL DO GERENCIADOR DE CAMPOS
	// ================================================================
	'field_manager_title': 'Gerenciar campos',
	'field_manager_count': '{count} campo(s)',
	'field_manager_empty': 'Nenhum campo adicionado ainda.',
	'field_manager_group_above': 'Acima do título',
	'field_manager_group_below': 'Abaixo do título',
	'edit_field_tooltip': 'Editar campo',
	'delete_field_tooltip': 'Remover campo',
	'delete_confirm': 'Remover "{name}"?',
	'delete_button': 'Remover',
	'field_deleted': 'Campo "{name}" removido.',

	// ================================================================
	// CABEÇALHO DE METADADOS — Labels de tempo de execução
	// ================================================================
	'min_read': 'Min de leitura',
	'last_updated': 'Atualizado em',
	'field_already_exists': 'O campo "{key}" já existe.',

	// ================================================================
	// BASES ICONS
	// ================================================================
	'section_bases_icons': 'Ícones das tabelas',
	'bases_icons_notice': 'Esta estilização afeta apenas o cabeçalho das propriedades do plugin Bases quando o modo de visualização é tabela.',
	'bases_icon_label': 'Ícone: ',
	'add_bases_icon_name': 'Novo ícone de propriedade',
	'add_bases_icon_desc': 'Configure um ícone personalizado para ser exibido no cabeçalho de uma propriedade específica.',
	'add_bases_icon_button': 'Adicionar',
	'manage_bases_icons_name': 'Gerenciar ícones',
	'manage_bases_icons_desc': 'Edite ou remova as configurações de ícones previamente criadas.',
	'manage_bases_icons_button': 'Gerenciar',
	
	'bases_icons_title': 'Gerenciar ícones',
	'bases_icon_editor_title_add': 'Adicionar ícone',
	'bases_icon_editor_title_edit': 'Editar ícone',
	'bases_icon_property': 'Nome da propriedade',
	'bases_icon_property_desc': 'O nome exato da propriedade na tabela (ex: status, category).',
	'bases_icon_name': 'Ícone',
	'bases_icon_name_desc': 'O ícone selecionado para exibição no cabeçalho.',
	
	'bases_icon_property_required': 'Informe a chave YAML do campo.',
	'bases_icon_name_required': 'Selecione um ícone.',
	'bases_icon_added': 'Ícone de "{property}" criado com sucesso.',
	'bases_icon_updated': 'Ícone de "{property}" atualizado.',
	'bases_icon_deleted': 'Ícone de "{property}" removido.',
	'existing_bases_icons': '{count} ícone(s)',
	'no_bases_icons': 'Nenhum ícone adicionado ainda.',
	
	'add_button': 'Selecionar ícone',
	'icon_picker_placeholder': 'Buscar ícone...',

	// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': 'Barra de progresso de rolagem',
	'scroll_progress_bar_desc': 'Exibe uma barra de progresso de leitura no topo da nota.',
	'scroll_progress_color_name': 'Cor do progresso de rolagem',
	'scroll_progress_color_desc': 'Cor personalizada (deixe vazio para usar a cor de destaque padrão).',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': 'Gerenciamento de dados',
	'export_title': 'Exportar configurações',
	'export_desc': 'Copia as configurações atuais do plugin para a área de transferência.',
	'export_button': 'Exportar',
	'import_title': 'Importar configurações',
	'import_desc': 'Cole um JSON de configurações previamente exportado para aplicá-lo.',
	'import_button': 'Importar',

	'export_modal_title': 'Exportar configurações',
	'copy_clipboard_button': 'Copiar para a área de transferência',
	'copy_clipboard_success': 'Configurações copiadas com sucesso!',
	'export_error': 'Falha ao copiar para a área de transferência.',

	'import_modal_title': 'Importar configurações',
	'import_paste_placeholder': 'Cole seu JSON de configurações aqui...',
	'import_empty_notice': 'Por favor, cole seu JSON de configurações.',
	'import_invalid_json': 'Formato JSON inválido.',
	'import_error': 'O JSON fornecido não contém configurações válidas.',
	'import_success': 'Configurações importadas com sucesso!',
};
