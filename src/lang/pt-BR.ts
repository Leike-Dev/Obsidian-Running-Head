export const ptBR = {
	// ================================================================
	// SETTINGS — Cabeçalhos de seção
	// ================================================================
	'section_title': 'Cabeçalho e aparência',
	'section_date': 'Data e leitura',
	'section_custom_fields': 'Campos personalizados',

	// ================================================================
	// SETTINGS — Aparência
	// ================================================================
	'toggles_section_name': 'Componentes da interface',
	'toggles_section_desc': 'Ative ou desative os componentes visuais do cabeçalho.',
	'colors_section_name': 'Cores personalizadas',
	'colors_section_desc': 'Defina cores para destaque, barra de progresso e etiquetas.',
	'title_font_size_name': 'Tamanho do título',
	'title_font_size_desc': 'Padrão: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Caminho da nota',
	'breadcrumb_toggle_desc': 'Exibe o caminho de pastas da nota acima do título. Ocultado em notas na raiz do vault.',
	'hide_first_h1_name': 'Ocultar primeiro cabeçalho (H1)',
	'hide_first_h1_desc': 'Oculta o primeiro H1 do documento. Útil se você usa plugins de sincronização de título e desativou o título nativo.',

	'format_title_as_date_name': 'Formatar título como data',
	'format_title_as_date_desc': 'Se o nome do arquivo for uma data (ex: 2026-05-26), formata o título exibido para texto usando o idioma escolhido.',
	'breadcrumb_highlight_name': 'Destacar pasta atual',
	'breadcrumb_highlight_desc': 'Aplica a cor de destaque ao último segmento do caminho.',
	'breadcrumb_highlight_color_name': 'Cor de destaque da pasta',
	'breadcrumb_highlight_color_desc': 'Cor de destaque personalizada. Vazio = cor de acento do tema.',
	'badge_color_name': 'Cor da etiqueta de atualização',
	'badge_color_desc': 'Cor de fundo da etiqueta. Vazio = cor padrão.',
	'layout_style_name': 'Layout do cabeçalho',
	'layout_style_desc': 'Wiki: metadados acima do título, caminho abaixo. Blog: caminho acima do título, metadados abaixo.',
	'layout_style_wiki': 'Estilo Wiki',
	'layout_style_blog': 'Estilo Blog',
	'header_font_size_name': 'Tamanho dos metadados',
	'header_font_size_desc': 'Padrão: 0.75.',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Propriedades do frontmatter
	// ================================================================
	'date_field_name': 'Data de criação',
	'date_field_desc': 'Chave YAML da data de criação ou publicação. Ex: date, published.',
	'date_field_placeholder': 'Data',
	'last_updated_field_name': 'Data de atualização',
	'last_updated_field_desc': 'Chave YAML da última modificação. Ex: updated, modified.',
	'last_updated_field_placeholder': 'Atualizado',

	// ================================================================
	// SETTINGS — Data e leitura
	// ================================================================
	'date_locale_name': 'Idioma de formatação',
	'date_locale_desc': 'Localização usada ao exibir datas.',
	'short_date_name': 'Abreviar nomes dos meses',
	'short_date_desc': 'Ex: "jan." em vez de "janeiro".',

	'custom_date_format_name': 'Formatação personalizada',
	'custom_date_format_desc': 'Formato de data personalizado via <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Vazio = padrão do idioma.',
	'custom_date_format_placeholder': 'ex: DD/MM/YYYY',
	'show_reading_time_name': 'Exibir tempo de leitura',
	'show_reading_time_desc': 'Exibido ao lado da data.',
	'wpm_name': 'Velocidade de leitura',
	'wpm_desc': 'Palavras por minuto para calcular o tempo estimado. Padrão: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Exibir etiqueta de atualização',
	'show_last_updated_desc': 'Exibe a data da última modificação da nota quando ela foi alterada após a criação.',

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
	'add_field_desc': 'Adiciona uma propriedade do frontmatter ao cabeçalho da nota.',
	'add_field_button': 'Adicionar',
	'manage_fields_name': 'Gerenciar campos',
	'manage_fields_desc': 'Edite ou remova os campos configurados.',
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
	'field_label_desc': 'Texto exibido antes do valor do campo.',
	'field_label_placeholder': 'Autor',
	'field_show_label_name': 'Exibir rótulo',
	'field_show_label_desc': 'Exibido antes do valor do campo.',
	'field_position_name': 'Posição',
	'field_position_desc': 'Define se o campo aparece acima ou abaixo do título.',
	'field_position_below': 'Abaixo do título',
	'field_position_above': 'Acima do título',
	'save_button': 'Salvar',
	'cancel_button': 'Cancelar',
	'field_key_required': 'Insira a chave YAML do campo.',
	'field_added': 'Campo "{key}" criado.',
	'field_updated': 'Campo "{key}" atualizado.',
	'field_folder_scope_name': 'Ocultar na pasta',
	'field_folder_scope_desc': 'Oculta este campo em notas das pastas informadas. Separe múltiplas pastas por vírgula. Vazio = exibir em todo lugar.',
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
	'min_read': 'min de leitura',
	'last_updated': 'Atualizado em',
	'field_already_exists': 'O campo "{key}" já existe.',
	'boolean_true': 'Verdadeiro',
	'boolean_false': 'Falso',

	// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': 'Barra de progresso de rolagem',
	'scroll_progress_bar_desc': 'Exibe uma barra de progresso de leitura no topo da nota.',
	'scroll_progress_color_name': 'Cor da barra de progresso',
	'scroll_progress_color_desc': 'Cor da barra de progresso. Vazio = cor de destaque padrão.',
	'reset_color_tooltip': 'Redefinir',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': 'Gerenciamento de dados',
	'export_title': 'Exportar configurações',
	'export_desc': 'Exporta as configurações atuais do plugin para a área de transferência.',
	'export_button': 'Exportar',
	'import_title': 'Importar configurações',
	'import_desc': 'Aplica configurações a partir de um JSON previamente exportado.',
	'import_button': 'Importar',

	'export_modal_title': 'Exportar configurações',
	'copy_clipboard_button': 'Copiar para a área de transferência',
	'copy_clipboard_success': 'Configurações copiadas com sucesso!',
	'export_error': 'Falha ao copiar para a área de transferência.',

	'import_modal_title': 'Importar configurações',
	'import_paste_placeholder': 'Cole seu JSON de configurações aqui...',
	'import_empty_notice': 'Cole o JSON de configurações antes de importar.',
	'import_invalid_json': 'Formato JSON inválido.',
	'import_error': 'O JSON não contém configurações válidas.',
	'import_success': 'Configurações importadas com sucesso!',

	// ================================================================
	// TABS NAVIGATION FEATURE
	// ================================================================
	'section_tabs': 'Abas de navegação',
	'tab_property_global_name': 'Propriedade do frontmatter',
	'tab_property_global_desc': 'Chave YAML usada para ativar um grupo de abas nas notas.',
	'add_tab_property_name': 'Novo grupo de abas',
	'add_tab_property_desc': 'Crie um grupo nomeado de abas para usar como navegação.',
	'tab_group_new_button': 'Criar',
	'manage_tab_properties_name': 'Gerenciar grupos de abas',
	'manage_tab_properties_desc': 'Edite ou remova os grupos de abas configurados.',
	'manage_tab_properties_button': 'Gerenciar',
	'tab_editor_title_add': 'Novo grupo de abas',
	'tab_editor_title_edit': 'Editar grupo de abas',
	'tab_group_name_label': 'Nome do grupo',
	'tab_group_name_placeholder': 'Home',
	'tab_property_placeholder': 'Menu',

	'tab_group_name_required': 'Insira um nome para este grupo de abas.',
	'tab_group_tabs_label': 'Abas',

	'tab_group_add_tab': 'Adicionar aba',
	'tab_group_no_tabs': 'Nenhuma aba adicionada ainda.',
	'tab_group_move_up': 'Mover para cima',
	'tab_property_added': 'Grupo de abas "{key}" criado.',
	'tab_property_updated': 'Grupo de abas "{key}" atualizado.',
	'tab_property_deleted': 'Grupo de abas "{name}" removido.',
	'tab_group_already_exists': 'O grupo "{name}" já existe.',
	'tab_count_singular': '{count} aba',
	'tab_count_plural': '{count} abas',
	'tab_item_name_required_indexed': 'Aba {index} precisa de um nome.',
	'tab_item_link_required_indexed': 'Aba {index} precisa de um link.',
	'tab_manager_title': 'Gerenciar grupos de abas',
	'tab_manager_count': '{count} grupo(s) de abas',
	'tab_manager_empty': 'Nenhum grupo de abas configurado ainda.',
	'tab_item_label_name': 'Nome da aba',
	'tab_item_icon_choose': 'Escolher',
	'tab_item_link_name': 'Link',
	'icon_picker_placeholder': 'Buscar por um ícone...',
	'tab_style_name': 'Estilo da aba',
	'tab_style_desc': 'Estilo visual da barra de navegação por abas.',
	'tab_style_underline': 'Sublinhado',
	'tab_style_pill': 'Pílula',
	'tab_style_minimal': 'Minimalista',
};
