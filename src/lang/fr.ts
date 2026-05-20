export const fr = {
	// ================================================================
	// SETTINGS — Section headings
	// ================================================================
	'section_title': 'En-tête',
	'section_appearance': 'Apparence',
	'section_frontmatter_properties': 'Propriétés',
	'section_date': 'Date et lecture',
	'section_custom_fields': 'Champs personnalisés',

	// ================================================================
	// SETTINGS — Appearance
	// ================================================================
	'title_font_size_name': 'Taille du titre',
	'title_font_size_desc': 'Taille du titre principal, en "em". Par défaut: 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Fil d\'Ariane du dossier',
	'breadcrumb_toggle_desc': 'Affiche le chemin du dossier de la note sous forme de fil d\'Ariane cliquable au-dessus du titre. Masqué pour les notes à la racine du coffre.',
	'breadcrumb_highlight_name': 'Mettre en surbrillance le dossier actuel',
	'breadcrumb_highlight_desc': 'Applique la couleur d\'accentuation au dernier segment du fil d\'Ariane (le dossier parent direct de la note).',
	'breadcrumb_highlight_color_name': 'Couleur de surbrillance du dossier',
	'breadcrumb_highlight_color_desc': 'Couleur personnalisée pour la surbrillance (laisser vide pour la couleur d\'accentuation par défaut).',
	'badge_color_name': 'Couleur du badge de mise à jour',
	'badge_color_desc': 'Couleur personnalisée pour l\'arrière-plan du badge (laisser vide pour la valeur par défaut).',
	'layout_style_name': 'Disposition de l\'en-tête',
	'layout_style_desc': 'Le style Wiki place le badge de mise à jour en haut à droite. Le style Blog le place sous le titre.',
	'layout_style_wiki': 'Style Wiki',
	'layout_style_blog': 'Style Blog',
	'header_font_size_name': 'Taille des métadonnées',
	'header_font_size_desc': 'Taille des textes et badges de métadonnées, en "rem". Par défaut: 0.75.',
	'header_font_size_placeholder': '0.75',

	// ================================================================
	// SETTINGS — Frontmatter properties
	// ================================================================
	'date_field_name': 'Date de création',
	'date_field_desc': 'Clé YAML avec la date de création ou de publication (ex: "date", "published").',
	'date_field_placeholder': 'Date',
	'last_updated_field_name': 'Date de mise à jour',
	'last_updated_field_desc': 'Clé YAML avec la date de dernière modification (ex: "updated", "modified").',
	'last_updated_field_placeholder': 'Mis à jour',

	// ================================================================
	// SETTINGS — Date and reading
	// ================================================================
	'date_locale_name': 'Langue de formatage',
	'date_locale_desc': 'Langue utilisée pour afficher les dates.',
	'short_date_name': 'Abréger les noms des mois',
	'short_date_desc': 'Affiche le mois dans un format plus court.',

	'custom_date_format_name': 'Format personnalisé',
	'custom_date_format_desc': 'Format personnalisé avec la syntaxe <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Vide = par défaut selon la langue.',
	'custom_date_format_placeholder': 'ex: DD/MM/YYYY',
	'show_reading_time_name': 'Afficher le temps de lecture',
	'show_reading_time_desc': 'Temps de lecture estimé affiché à côté de la date.',
	'wpm_name': 'Vitesse de lecture',
	'wpm_desc': 'Mots par minute pour calculer le temps estimé. Par défaut: 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Afficher le badge de mise à jour',
	'show_last_updated_desc': 'Affiche un badge lorsque la note a été modifiée après sa création.',

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
	'add_field_name': 'Nouveau champ',
	'add_field_desc': 'Affiche une propriété supplémentaire du frontmatter sous le titre.',
	'add_field_button': 'Ajouter',
	'manage_fields_name': 'Gérer les champs',
	'manage_fields_desc': 'Modifier le style ou supprimer des champs existants.',
	'manage_fields_button': 'Gérer',

	// ================================================================
	// FIELD EDITOR MODAL
	// ================================================================
	'field_editor_title_add': 'Ajouter un champ',
	'field_editor_title_edit': 'Modifier le champ',
	'field_key_name': 'Clé YAML',
	'field_key_desc': 'Nom de la propriété dans le frontmatter de la note.',
	'field_key_placeholder': 'Auteur',
	'field_label_name': 'Libellé d\'affichage',
	'field_label_desc': 'Texte affiché avant la valeur (visible lorsque "afficher le libellé" est activé).',
	'field_label_placeholder': 'Auteur',
	'field_show_label_name': 'Afficher le libellé',
	'field_show_label_desc': 'Affiche le libellé avant la valeur du champ.',
	'field_position_name': 'Position',
	'field_position_desc': 'Placer ce champ au-dessus ou en dessous du titre.',
	'field_position_below': 'Sous le titre',
	'field_position_above': 'Au-dessus du titre',
	'save_button': 'Enregistrer',
	'cancel_button': 'Annuler',
	'field_key_required': 'Saisissez la clé YAML du champ.',
	'field_added': 'Champ "{key}" créé.',
	'field_updated': 'Champ "{key}" mis à jour.',
	'field_folder_scope_name': 'Masquer dans le dossier',
	'field_folder_scope_desc': 'Si défini, ce champ sera masqué dans les notes de ces dossiers. Utilisez des virgules pour séparer plusieurs dossiers. Laissez vide pour afficher partout.',
	'field_folder_scope_placeholder': 'Tapez le nom du dossier...',
	'field_folder_scope_excluded_label': 'Masqué dans',

	// ================================================================
	// FIELD MANAGER MODAL
	// ================================================================
	'field_manager_title': 'Gérer les champs',
	'field_manager_count': '{count} champ(s)',
	'field_manager_empty': 'Aucun champ ajouté pour le moment.',
	'field_manager_group_above': 'Au-dessus du titre',
	'field_manager_group_below': 'Sous le titre',
	'edit_field_tooltip': 'Modifier le champ',
	'delete_field_tooltip': 'Supprimer le champ',
	'delete_confirm': 'Supprimer "{name}" ?',
	'delete_button': 'Supprimer',
	'field_deleted': 'Champ "{name}" supprimé.',

	// ================================================================
	// METADATA HEADER — Runtime labels
	// ================================================================
	'min_read': 'Min de lecture',
	'last_updated': 'Mis à jour',
	'field_already_exists': 'Le champ "{key}" existe déjà.',

	// ================================================================
	// BASES ICONS
	// ================================================================
	'section_bases_icons': 'Icônes de table',
	'bases_icons_notice': 'Ce style n\'affecte que l\'en-tête des propriétés du plugin Bases lorsque le mode d\'affichage est réglé sur table.',
	'bases_icon_label': 'Icône : ',
	'add_bases_icon_name': 'Nouvelle icône de propriété',
	'add_bases_icon_desc': 'Configurez une icône personnalisée à afficher dans l\'en-tête d\'une propriété.',
	'add_bases_icon_button': 'Ajouter',
	'manage_bases_icons_name': 'Gérer les icônes',
	'manage_bases_icons_desc': 'Modifier ou supprimer des configurations d\'icônes existantes.',
	'manage_bases_icons_button': 'Gérer',
	
	'bases_icons_title': 'Gérer les icônes',
	'bases_icon_editor_title_add': 'Ajouter une icône',
	'bases_icon_editor_title_edit': 'Modifier l\'icône',
	'bases_icon_property': 'Nom de la propriété',
	'bases_icon_property_desc': 'Nom exact de la propriété dans la table (ex: status, category).',
	'bases_icon_name': 'Icône',
	'bases_icon_name_desc': 'Icône sélectionnée pour s\'afficher dans l\'en-tête.',
	
	'bases_icon_property_required': 'Saisissez la clé YAML du champ.',
	'bases_icon_name_required': 'Sélectionnez une icône.',
	'bases_icon_added': 'Icône pour "{property}" créée.',
	'bases_icon_updated': 'Icône pour "{property}" mise à jour.',
	'bases_icon_deleted': 'Icône pour "{property}" supprimée.',
	'existing_bases_icons': '{count} icône(s)',
	'no_bases_icons': 'Aucune icône ajoutée pour le moment.',
	
	'add_button': 'Sélectionner une icône',
	'icon_picker_placeholder': 'Rechercher une icône...',

	// ================================================================
	// SETTINGS — Scroll Progress
	// ================================================================
	'scroll_progress_bar_name': 'Barre de progression du défilement',
	'scroll_progress_bar_desc': 'Afficher une barre de progression de lecture en haut de la note.',
	'scroll_progress_color_name': 'Couleur de progression du défilement',
	'scroll_progress_color_desc': 'Couleur personnalisée (laisser vide pour la couleur d\'accentuation par défaut).',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'section_data_management_title': 'Gestion des données',
	'export_title': 'Exporter les paramètres',
	'export_desc': 'Copiez les paramètres actuels du plugin dans le presse-papiers.',
	'export_button': 'Exporter',
	'import_title': 'Importer les paramètres',
	'import_desc': 'Collez un JSON de paramètres précédemment exporté pour l\'appliquer.',
	'import_button': 'Importer',

	'export_modal_title': 'Exporter les paramètres',
	'copy_clipboard_button': 'Copier dans le presse-papiers',
	'copy_clipboard_success': 'Paramètres copiés dans le presse-papiers !',
	'export_error': 'Échec de la copie dans le presse-papiers.',

	'import_modal_title': 'Importer les paramètres',
	'import_paste_placeholder': 'Collez votre JSON de paramètres ici...',
	'import_empty_notice': 'Veuillez coller votre JSON de paramètres.',
	'import_invalid_json': 'Format JSON invalide.',
	'import_error': 'Le JSON fourni ne contient pas de paramètres valides.',
	'import_success': 'Paramètres importés avec succès !',
};
