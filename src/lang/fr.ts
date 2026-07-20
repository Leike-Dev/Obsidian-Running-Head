export const fr = {
	// ================================================================
	// SETTINGS — En-têtes de section
	// ================================================================
	'section_title': 'En-tête et apparence',
	'section_date': 'Date et lecture',
	'section_custom_fields': 'Champs personnalisés',
	'section_data_management_title': 'Gestion des données',
	'section_tabs': 'Navigation par onglets',

	// ================================================================
	// SETTINGS — Apparence
	// ================================================================
	'toggles_section_name': 'Composants de l\'interface',
	'toggles_section_desc': 'Activez ou désactivez les composants visuels de l\'en-tête.',
	'colors_section_name': 'Couleurs personnalisées',
	'colors_section_desc': 'Définissez les couleurs pour la surbrillance, la barre de progression et les libellés.',
	'title_font_size_name': 'Taille du titre',
	'title_font_size_desc': 'Par défaut : 3.',
	'title_font_size_placeholder': '3',
	'breadcrumb_toggle_name': 'Chemin de la note',
	'breadcrumb_toggle_desc': 'Affiche le chemin de dossiers de la note au-dessus du titre. Masqué pour les notes à la racine du coffre.',
	'hide_first_h1_name': 'Masquer le premier en-tête (H1)',
	'hide_first_h1_desc': 'Masque visuellement le premier H1 du document. Utile si vous utilisez des plugins de synchronisation de nom de fichier et avez désactivé le titre natif.',

	'format_title_as_date_name': 'Formater le titre comme date',
	'format_title_as_date_desc': 'Si le nom du fichier est une date (ex. 2026-05-26), formate le titre affiché selon la langue sélectionnée.',
	'breadcrumb_highlight_name': 'Mettre en surbrillance le dossier actuel',
	'breadcrumb_highlight_desc': 'Applique la couleur d\'accentuation au dernier segment du chemin.',
	'breadcrumb_highlight_color_name': 'Couleur de surbrillance du dossier',
	'badge_color_name': 'Couleur du libellé de mise à jour',
	'layout_style_name': 'Disposition de l\'en-tête',
	'layout_style_desc': 'Wiki : métadonnées au-dessus du titre, chemin en dessous. Blog : chemin au-dessus du titre, métadonnées en dessous.',
	'layout_style_wiki': 'Style Wiki',
	'layout_style_blog': 'Style Blog',
	'header_font_size_name': 'Taille des métadonnées',
	'header_font_size_desc': 'Par défaut : 0.75.',
	'header_font_size_placeholder': '0.75',
	'scroll_progress_bar_name': 'Barre de progression du défilement',
	'scroll_progress_bar_desc': 'Affiche une barre de progression de lecture en haut de la note.',
	'scroll_progress_color_name': 'Couleur de la barre de progression',
	'reset_color_tooltip': 'Réinitialiser',

	// ================================================================
	// SETTINGS — Propriétés du frontmatter
	// ================================================================
	'date_field_name': 'Date de création',
	'date_field_desc': 'Clé YAML de la date de création ou de publication. Ex : date, published.',
	'date_field_placeholder': 'Date',
	'last_updated_field_name': 'Date de mise à jour',
	'last_updated_field_desc': 'Clé YAML de la dernière modification. Ex : updated, modified.',
	'last_updated_field_placeholder': 'Mis à jour',

	// ================================================================
	// SETTINGS — Date et lecture
	// ================================================================
	'date_locale_name': 'Langue de formatage',
	'date_locale_desc': 'Langue utilisée pour afficher les dates.',
	'short_date_name': 'Abréger les noms des mois',
	'short_date_desc': 'Ex : « janv. » au lieu de « janvier ».',

	'custom_date_format_name': 'Format personnalisé',
	'custom_date_format_desc': 'Format de date personnalisé via <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js</a>. Vide = par défaut selon la langue.',
	'custom_date_format_placeholder': 'ex : DD/MM/YYYY',
	'show_reading_time_name': 'Afficher le temps de lecture',
	'show_reading_time_desc': 'Affiché à côté de la date.',
	'wpm_name': 'Vitesse de lecture',
	'wpm_desc': 'Mots par minute pour calculer le temps estimé. Par défaut : 200.',
	'wpm_placeholder': '200',
	'show_last_updated_name': 'Afficher le libellé de mise à jour',
	'show_last_updated_desc': 'Affiche la date de dernière modification lorsque la note a été modifiée après sa création.',

	// ================================================================
	// SETTINGS — Options du menu de langue
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
	// SETTINGS — Champs personnalisés
	// ================================================================
	'add_field_name': 'Nouveau champ',
	'add_field_desc': 'Ajoute une propriété du frontmatter à l\'en-tête de la note.',
	'add_field_button': 'Ajouter',
	'manage_fields_name': 'Gérer les champs',
	'manage_fields_desc': 'Modifiez ou supprimez les champs configurés.',
	'manage_fields_button': 'Gérer',

	// ================================================================
	// MODAL DE L'ÉDITEUR DE CHAMPS
	// ================================================================
	'field_editor_title_add': 'Ajouter un champ',
	'field_editor_title_edit': 'Modifier le champ',
	'field_key_name': 'Clé YAML',
	'field_key_desc': 'Nom de la propriété dans le frontmatter de la note.',
	'field_key_placeholder': 'auteur',
	'field_label_name': 'Libellé d\'affichage',
	'field_label_desc': 'Texte affiché avant la valeur du champ.',
	'field_label_placeholder': 'Auteur',
	'field_show_label_name': 'Afficher le libellé',
	'field_show_label_desc': 'Affiche le libellé avant la valeur.',
	'field_position_name': 'Position',
	'field_position_desc': 'Affiche le champ au-dessus ou en dessous du titre.',
	'field_position_below': 'Sous le titre',
	'field_position_above': 'Au-dessus du titre',
	'save_button': 'Enregistrer',
	'cancel_button': 'Annuler',
	'field_key_required': 'Saisissez la clé YAML du champ.',
	'field_added': 'Champ "{key}" créé.',
	'field_updated': 'Champ "{key}" mis à jour.',
	'field_folder_scope_name': 'Masquer dans le dossier',
	'field_folder_scope_desc': 'Masque ce champ dans les notes des dossiers indiqués.',
	'field_folder_scope_placeholder': 'Nom du dossier...',
	'field_folder_scope_excluded_label': 'Masqué dans',
	'field_already_exists': 'Un champ avec cette clé existe déjà.',
	'field_max_items_name': 'Éléments visibles maximum',
	'field_max_items_desc': "Définit le nombre maximum d'éléments à afficher dans les listes. Utilisez 0 pour aucune limite.",
	'field_max_items_placeholder': '0',

	// ================================================================
	// MODAL DU GESTIONNAIRE DE CHAMPS
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
	// EN-TÊTE DE MÉTADONNÉES — Libellés d'exécution
	// ================================================================
	'min_read': 'min de lecture',
	'last_updated': 'Mis à jour',
	'boolean_true': 'Vrai',
	'boolean_false': 'Faux',

	// ================================================================
	// DATA MANAGEMENT (IMPORT/EXPORT)
	// ================================================================
	'export_title': 'Exporter les paramètres',
	'export_desc': 'Exporte les paramètres actuels du plugin dans le presse-papiers.',
	'export_button': 'Exporter',
	'import_title': 'Importer les paramètres',
	'import_desc': 'Applique des paramètres à partir d\'un JSON précédemment exporté.',
	'import_button': 'Importer',

	'export_modal_title': 'Exporter les paramètres',
	'copy_clipboard_button': 'Copier dans le presse-papiers',
	'copy_clipboard_success': 'Paramètres copiés avec succès !',
	'export_error': 'Échec de la copie dans le presse-papiers.',

	'import_modal_title': 'Importer les paramètres',
	'import_paste_placeholder': 'Collez votre JSON de paramètres ici...',
	'import_empty_notice': 'Collez le JSON de paramètres avant d\'importer.',
	'import_invalid_json': 'Format JSON invalide.',
	'import_error': 'Le JSON ne contient pas de paramètres valides.',
	'import_success': 'Paramètres importés avec succès !',

	// ================================================================
	// SETTINGS — Navigation par onglets
	// ================================================================
	'tab_property_global_name': 'Propriété du frontmatter',
	'tab_property_global_desc': 'Clé YAML utilisée pour activer un groupe d\'onglets dans les notes.',
	'add_tab_property_name': 'Nouveau groupe d\'onglets',
	'add_tab_property_desc': 'Créez un groupe d\'onglets nommé à utiliser comme navigation.',
	'tab_group_new_button': 'Créer',
	'manage_tab_properties_name': 'Gérer les groupes d\'onglets',
	'manage_tab_properties_desc': 'Modifier ou supprimer les groupes d\'onglets configurés.',
	'manage_tab_properties_button': 'Gérer',
	'tab_style_name': 'Style d\'onglet',
	'tab_style_desc': 'Style visuel de la barre de navigation par onglets.',
	'tab_style_underline': 'Souligné',
	'tab_style_pill': 'Pastille',
	'tab_style_minimal': 'Minimaliste',

	// ================================================================
	// MODAL DE L'ÉDITEUR D'ONGLETS
	// ================================================================
	'tab_editor_title_add': 'Nouveau groupe d\'onglets',
	'tab_editor_title_edit': 'Modifier le groupe d\'onglets',
	'tab_group_name_label': 'Nom du groupe',
	'tab_group_name_placeholder': 'Home',
	'tab_property_placeholder': 'Menu',
	'tab_group_name_required': 'Saisissez un nom pour ce groupe d\'onglets.',
	'tab_group_tabs_label': 'Onglets',
	'tab_group_add_tab': 'Ajouter un onglet',
	'tab_group_no_tabs': 'Aucun onglet ajouté pour le moment.',
	'tab_group_move_up': 'Monter',
	'tab_property_added': 'Groupe d\'onglets "{key}" créé.',
	'tab_property_updated': 'Groupe d\'onglets "{key}" mis à jour.',
	'tab_group_already_exists': 'Le groupe "{name}" existe déjà.',
	'tab_item_label_name': 'Nom de l\'onglet',
	'tab_item_icon_choose': 'Choisir',
	'tab_item_link_name': 'Lien',
	'icon_picker_placeholder': 'Rechercher une icône...',
	'tab_item_name_required_indexed': 'L\'onglet {index} a besoin d\'un nom.',
	'tab_item_link_required_indexed': 'L\'onglet {index} a besoin d\'un lien.',

	// ================================================================
	// MODAL DU GESTIONNAIRE D'ONGLETS
	// ================================================================
	'tab_manager_title': 'Gérer les groupes d\'onglets',
	'tab_manager_count': '{count} groupe(s) d\'onglets',
	'tab_manager_empty': 'Aucun groupe d\'onglets configuré pour le moment.',
	'tab_property_deleted': 'Groupe d\'onglets "{name}" supprimé.',
	'tab_count_singular': '{count} onglet',
	'tab_count_plural': '{count} onglets',

	'notices_tab_info': 'Astuces',
	'notices_tab_warning': 'Avertissements',
	'notices_tab_system': 'Système',

	'notice_tabs_title': 'Nouvelle architecture des onglets',
	'notice_tabs_desc': 'Le système d\'onglets a été entièrement réécrit pour une meilleure stabilité. Les anciennes configurations n\'ont pas pu être migrées, vous devrez donc les reconfigurer.',
	'notice_tabs_tutorial_title': 'Comment utiliser les nouveaux onglets',
	'notice_tabs_tutorial_desc': '1) Allez dans la section "Navigation par onglets" et définissez le nom de la Propriété globale (ex : `menu`). 2) Créez un Groupe d\'onglets et nommez-le (ex : `projet`). 3) Ajoutez vos onglets (liens) dans ce groupe. 4) Dans le frontmatter de votre note, ajoutez la propriété avec le nom du groupe (ex : `menu: projet`).',
	'notice_links_title': 'Liens cliquables dans les champs personnalisés',
	'notice_links_desc': 'Vous pouvez désormais utiliser des liens Markdown ([nom](url)) ou des URL brutes dans les propriétés de votre frontmatter. Running Head les détectera et les rendra cliquables directement dans l\'en-tête de la note !',
	'notice_h1_title': 'Masquer les titres en double',
	'notice_h1_desc': 'Si vous utilisez des plugins qui synchronisent le nom du fichier avec le titre de la note, vous pouvez désormais activer "Masquer le premier en-tête (H1)" dans les paramètres "En-tête et apparence" pour éviter les titres en double.',
	'notice_list_title': 'Listes longues plus claires',
	'notice_list_desc': 'Pour garder un en-tête élégant, vous pouvez désormais tronquer visuellement les propriétés de liste. Pour l\'utiliser, modifiez l\'un de vos champs personnalisés et remplissez l\'option "Limite d\'éléments". Cliquez simplement sur l\'icône de points de suspension (...) dans l\'en-tête pour révéler tous les éléments masqués.',
	'notice_format_title_title': 'Formater le titre en tant que date',
	'notice_format_title_desc': 'Vous pouvez désormais formater le titre de votre note comme une date ! Astuce : Nous vous recommandons d\'utiliser cela avec le titre natif d\'Obsidian désactivé (Paramètres > Apparence > Afficher le titre en ligne). Notez que lorsque cette option est activée, le titre ne peut pas être modifié manuellement.',
};
