<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.1-lightgreen.svg)

</div>

<div align="center">

[English](../README.md) | [Português](./README_pt.md) | [Español](./README_es.md) | Français | [简体中文](./README_zh-CN.md)

</div>

---

**Running Head** est un incroyable plugin Obsidian qui ajoute un en-tête de métadonnées hautement personnalisable. Suivez les dates, les propriétés de frontmatter personnalisées, les chemins de dossiers et la navigation par onglets de manière transparente et sans tracas.


## 🌟 Fonctionnalités en Action

### 1. 📅 Dates de Création & Dernière Mise à Jour
Suivez la chronologie de vos notes de manière dynamique. Formatez les dates en utilisant 18 langues par défaut ou vos propres modèles [Moment.js](https://momentjs.com/). Un libellé de mise à jour intelligent s'affiche automatiquement lorsque la note est modifiée après sa création.

<div align="center">
  <video src="./assets/images/creation_dates.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="./assets/images/last_update_dates.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 2. 📐 Styles de Disposition
Choisissez entre le style **Blog** (chemin du dossier au-dessus du titre, métadonnées en dessous) ou le style **Wiki** (métadonnées au-dessus du titre, chemin en dessous) pour adapter l'en-tête à l'esthétique de vos notes.

<div align="center">
  <video src="./assets/images/layout_styles.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 3. 🍞 Chemin de la Note (Breadcrumbs)
Naviguez facilement avec un chemin de dossiers cliquable montrant exactement où se trouve votre note, avec une surbrillance facultative du dossier actif actuel.

<div align="center">
  <video src="./assets/images/breadcrumbs.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 4. 🏷️ Champs Personnalisés YAML & Portée des Dossiers
Affichez toute propriété du frontmatter (texte, listes, cases à cocher) sous forme de champs personnalisés ou de magnifiques pilules dans votre en-tête. Masquez certains champs dans des répertoires spécifiques à l'aide de portées de dossiers flexibles pour garder votre espace de travail propre.

> [!NOTE]
> L'ajout d'un champ texte sert d'illustration ; ces options s'appliquent à toute propriété de métadonnées personnalisée.

<div align="center">
  <video src="./assets/images/custom_fields.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="./assets/images/folder_scopes.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 5. 🗂️ Navigation par Onglets Interactive
Créez d'élégants en-têtes de navigation pour sauter entre des notes associées en utilisant les propriétés du frontmatter. Personnalisez le style visuel des onglets (**Souligné**, **Pastille** ou **Minimaliste**) et ajoutez des icônes Lucide ou des noms personnalisés facilement.

<div align="center">
  <video src="./assets/images/tabs_navigation.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 6. 📊 Progression de Défilement & Intégration Typify
Ajoutez une barre discrète et hautement personnalisable en haut de la note pour suivre votre progression de lecture en temps réel. Running Head s'intègre également parfaitement avec le plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** pour hériter automatiquement de superbes styles de pilules colorées.

<div align="center">
  <video src="./assets/images/scroll_progress.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="./assets/images/typify_integration.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


## ⚙️ Fonctionnalités Additionnelles

* **🎨 Couleurs Personnalisées** : Définissez les couleurs du libellé de mise à jour, du chemin de la note ou de la barre de progression de manière simple et individuelle.
* **💾 Gestion des Données** : Exportez les paramètres complets sous forme de JSON et importez-les facilement dans un autre coffre ou appareil.
* **🌍 Internationalisation** : Interface entièrement traduite en anglais, portugais (Brésil), espagnol, français et chinois simplifié (il suffit d'utiliser Obsidian dans l'une de ces langues). Si vous remarquez des erreurs de traduction ou des améliorations possibles, veuillez me le faire savoir.


## 🚀 Quick Start

1. **Activer le Plugin** : Allez dans les Paramètres d'Obsidian $\rightarrow$ Plugins communautaires, recherchez **Running Head**, et activez-le.
2. **Configurer Frontmatter** : Définissez vos clés YAML pour la création (par défaut `date`) et la mise à jour (par défaut `updated`) :
   ```yaml
   date: 2026-05-29
   updated: 2026-05-29
   ```
3. **Configurer les Champs Personnalisés** : Allez dans Paramètres du plugin $\rightarrow$ **Champs personnalisés** et cliquez sur **Ajouter** pour mapper n'importe quelle clé YAML (ex : `Auteur`, `tags`) à l'en-tête.
4. **Créer des Onglets** : Sous **Navigation par onglets**, enregistrez une propriété YAML de type liste (ex : `tabs-home`) et définissez les liens des notes associées.

### 📝 Exemple de Structure YAML pour les Onglets
```yaml
tabs-home:
  - "[[Note Principale]]"
  - "[icon, home]"
  - "[name, Tableau de bord]"
```

> [!Note]
> - L'ordre dans lequel vous insérez les éléments de la liste (`[name, ...]`, `[icon, ...]` et `[[Link]]`) n'a pas d'importance pour son fonctionnement.
> - S'il y a plus d'un lien de note dans la liste de la propriété, l'onglet pointera vers le dernier lien ajouté.


## 📦 Installation

### Installation manuelle
1. Téléchargez la dernière version : `main.js`, `manifest.json` et `styles.css`.
2. Créez un dossier nommé `running-head` dans le répertoire `<Seu-Vault>/.obsidian/plugins/`.
3. Collez-y les fichiers.
4. Rechargez Obsidian et activez le plugin dans **Paramètres > Plugins communautaires**.


## 🛠️ Développement

Si vous souhaitez compiler le plugin vous-même, procédez comme suit :
1. Clonez ce dépôt.
2. Installez les dépendances : `npm install`
3. Exécutez `npm run dev` pour lancer la compilation en mode *watch*.


## ⚠️ Avertissement

Ce plugin a été conçu pour apporter une sensation plus élégante et « publiée » aux notes de votre coffre Obsidian. Et comme d'autres fois, il est né de mon désir de personnaliser mon coffre (parfois, les désirs nous font créer des choses incroyables, tout comme passer des heures et des heures jusqu'à ce que ce soit comme nous le voulons... lol).

Un grand merci à [Antigravity](https://antigravity.google/) pour l'assistance inestimable dans la création, la refactorisation et l'optimisation de ce code source. Mais rien ne se fait par magie, ce plugin a été testé, retesté, retourné dans tous les sens pour être le plus optimisé, léger, bon, beau et fonctionnel possible pour tous ceux qui recherchent quelque chose comme ça.

Si vous trouvez un bug, veuillez ouvrir une *issue* et je ferai de mon mieux pour le corriger. Les contributions via des *pull requests* sont toujours les bienvenues ! 😉
