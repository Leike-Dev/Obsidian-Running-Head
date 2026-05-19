<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-1.0.0-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | [Português](./README_pt.md) | [Español](./README_es.md) | Français | [简体中文](./README_zh-CN.md)

</div>

---

Transformez vos notes avec un magnifique en-tête de métadonnées style blog ! 📝✨

Running Head est un plugin Obsidian qui ajoute automatiquement un en-tête personnalisable sous les titres de vos notes, affichant la date de publication, le temps de lecture estimé, un badge de dernière mise à jour et toutes les propriétés frontmatter personnalisées que vous souhaitez.

## Fonctionnalités

- **📝 Plusieurs Dispositions**: Choisissez entre un style Blog (tout sous le titre) ou un style Wiki (badges en haut à droite).
- **⏱️ Temps de Lecture & Dates**: Calcule et affiche automatiquement le temps de lecture et des dates joliment formatées selon votre langue.
- **🧩 Champs Personnalisés**: Affichez n'importe quelle propriété YAML sous forme de magnifiques badges (pills), de liens ou de texte directement dans l'en-tête.
- **📁 Portées de Dossier**: Gardez votre coffre-fort propre en masquant des champs personnalisés spécifiques dans certains dossiers.
- **🍞 Fil d'Ariane**: Naviguez facilement avec un fil d'ariane cliquable montrant exactement où se trouve votre note.
- **🤝 Intégrations Puissantes**: S'intègre parfaitement avec le plugin **Bases** (en injectant des icônes personnalisées dans les en-têtes de tableau) et le plugin **Typify** (en héritant de superbes styles de badges).
- **🌍 Internationalisation**: Entièrement traduit en anglais, portugais (Brésil), espagnol, français et chinois simplifié.

## Comment Utiliser

1. **Configurer les Dates**: Dans les paramètres du plugin, définissez les clés YAML utilisées pour votre date de création (ex: `date`) et votre date de mise à jour (ex: `updated`).
2. **Ajouter des Champs Personnalisés**:
   - Allez dans **Paramètres > Running Head**.
   - Sous "Champs personnalisés", cliquez sur **Ajouter**.
   - Tapez la clé YAML de la propriété que vous souhaitez afficher (ex: `Auteur` ou `Catégorie`).
   - Ajoutez éventuellement une étiquette d'affichage ou empêchez le champ d'apparaître dans des dossiers spécifiques.
3. **Personnaliser l'Apparence**: Modifiez les tailles de police, le format des dates, la vitesse de lecture (WPM) et choisissez si vous souhaitez afficher le fil d'ariane.

Voilà ! Vos métadonnées sont maintenant affichées avec élégance sous le titre de votre note ✨

## Installation

### Installation Manuelle
1. Téléchargez la dernière version : `main.js`, `manifest.json` et `styles.css`.
2. Créez un dossier appelé `running-head` dans votre répertoire `.obsidian/plugins/`.
3. Collez-y les fichiers.
4. Rechargez Obsidian et activez le plugin.

## Remarques

> [!Important]  
> Si vous utilisez des propriétés de type Case à cocher (Checkbox), elles seront actuellement affichées sous forme de texte brut (`true` ou `false`) dans l'en-tête. Nous vous recommandons d'utiliser d'autres types de propriétés (comme des tags ou du texte) pour une meilleure représentation visuelle.

> [!Note]  
> La fonctionnalité des **Icônes de tableau** affecte uniquement l'en-tête des propriétés du plugin **Bases** lorsque le mode d'affichage est défini sur Tableau.

> [!Tip]  
> Si le plugin **Typify** est installé, Running Head détectera et appliquera automatiquement vos styles Typify aux badges correspondants dans l'en-tête de métadonnées !

## Développement

Si vous souhaitez compiler le plugin vous-même, procédez comme suit :

1. Clonez ce dépôt.
2. Exécutez `npm install`.
3. Exécutez `npm run dev` pour démarrer la compilation en mode surveillance (watch).

## Avertissement

Ce plugin a été conçu pour apporter une touche plus élégante et "publiée" aux notes de votre coffre-fort Obsidian.

Un remerciement spécial à [Antigravity](https://antigravity.google/) pour l'aide inestimable apportée à la construction, la refactorisation et l'optimisation de ce code source.

Si vous trouvez des bugs, veuillez ouvrir un *issue* et je ferai de mon mieux pour le corriger. Les contributions via pull requests sont toujours les bienvenues ! 😉
