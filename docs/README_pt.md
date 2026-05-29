<div align="center">
  <img src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.1-lightgreen.svg)

</div>

<div align="center">

[English](../README.md) | Português | [Español](./README_es.md) | [Français](./README_fr.md) | [简体中文](./README_zh-CN.md)

</div>

---

**Running Head** é um plugin incrível para Obsidian que adiciona um cabeçalho de metadados altamente personalizável. Acompanhe datas, propriedades personalizadas do frontmatter, caminhos de pastas e navegação por abas de forma integrada sem complicações.


## 🌟 Recursos em Ação

### 1. 📅 Datas de Criação & Última Atualização
Acompanhe a linha do tempo das suas notas de forma dinâmica. Formate as datas usando 18 idiomas padrão ou seus próprios padrões do [Moment.js](https://momentjs.com/). Uma etiqueta inteligente de modificação é exibida automaticamente quando uma nota é alterada após sua criação.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/creation_dates.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/last_update_dates.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 2. 📐 Estilos de Layout
Escolha entre os layouts **Estilo Blog** (caminho da pasta acima do título, metadados abaixo) ou **Estilo Wiki** (metadados acima do título, caminho abaixo) para se adequar à estética das suas notas.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/layout_styles.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 3. 🍞 Caminho da Nota (Breadcrumbs)
Navegue facilmente com um caminho de pastas clicável mostrando exatamente onde sua nota está localizada, com destaque opcional da pasta atual.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/breadcrumbs.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 4. 🏷️ Campos Personalizados do YAML & Escopo de Pastas
Renderize qualquer propriedade do frontmatter (texto, listas, caixas de seleção) como campos personalizados ou belos estilos de pílula no seu cabeçalho. Oculte campos específicos em determinados diretórios usando escopos de pasta flexíveis para manter seu espaço de trabalho limpo.

> [!NOTE]
> A demonstração adicionando um campo de texto serve como ilustração; essas opções aplicam-se a qualquer propriedade de metadado personalizado.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/custom_fields.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/folder_scopes.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 5. 🗂️ Navegação Interativa por Abas
Crie barras de navegação elegantes para alternar entre notas relacionadas usando propriedades de frontmatter. Personalize o estilo visual das abas (**Sublinhado**, **Pílula** ou **Minimalista**) e adicione ícones do Lucide ou nomes personalizados facilmente.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/tabs_navigation.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 6. 📊 Progresso de Leitura & Integração com o Typify
Adicione uma barra discreta e altamente personalizável no topo da nota para acompanhar o seu progresso de leitura em tempo real. O Running Head também se integra perfeitamente ao plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** para herdar cores e estilos de pílula automaticamente.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/scroll_progress.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/typify_integration.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


## ⚙️ Recursos Adicionais

* **🎨 Cores Personalizadas**: Defina as cores da etiqueta de atualização, do caminho da nota ou da barra de progresso de forma simples e individual.
* **💾 Gerenciamento de Dados**: Exporte as configurações completas como JSON e importe em outro vault ou dispositivo facilmente.
* **🌍 Internacionalização**: Interface totalmente traduzida para Inglês, Português (Brasil), Espanhol, Frances e Chinês Simplificado (basta usar o Obsidian em um desses idiomas). Se houver erros de tradução ou melhorias, diga-me.


## 🚀 Início Rápido

1. **Ative o Plugin**: Abra as configurações do Obsidian $\rightarrow$ Plugins de comunidade, procure por **Running Head** e ative-o.
2. **Defina Datas no Frontmatter**: Configure suas chaves YAML para criação (padrão `date`) e atualização (padrão `updated`):
   ```yaml
   date: 2026-05-29
   updated: 2026-05-29
   ```
3. **Configure Campos Personalizados**: Vá para as configurações do plugin $\rightarrow$ **Campos Personalizados** e clique em **Adicionar** para mapear qualquer chave YAML (ex: `Autor`, `tags`) ao cabeçalho.
4. **Crie Abas**: Em **Navegação por Abas**, registre uma propriedade YAML do tipo lista (ex: `tabs-home`) e defina os links das notas relacionadas.

### 📝 Exemplo de Estrutura YAML para Abas
```yaml
tabs-home:
  - "[[Nota Principal]]"
  - "[icon, home]"
  - "[name, Painel]"
```

> [!Note]
> - A ordem em que você insere os itens da lista (`[name, ...]`, `[icon, ...]` e `[[Link]]`) não importa para o funcionamento.
> - Se houver mais de um link de nota na lista da propriedade, a aba apontará para o último link adicionado.


## 📦 Instalação

### Manual Installation
1. Download the files `main.js`, `manifest.json` and `styles.css` from the latest release.
2. Create a folder named `running-head` inside `<Your-Vault>/.obsidian/plugins/`.
3. Move the downloaded files into that folder.
4. Reload Obsidian and enable the plugin under **Settings → Community plugins**.


## 🛠️ Desenvolvimento

Para compilar o plugin localmente:
1. Clone este repositório.
2. Instale as dependências: `npm install`
3. Inicie o servidor de compilação em tempo real: `npm run dev`


## ⚠️ Aviso legal

Este plugin foi projetado para trazer uma sensação mais elegante e "publicada" para as notas do seu vault no Obsidian. E como outras vezes, nasceu do meu desejo de customizar meu cofre (às vezes os desejos nos fazem criar coisas incriveis, como também despender horas e horas até ficar do jeito que queremos... rs).

Um agradecimento especial à [Antigravity](https://antigravity.google/) pela inestimável assistência na construção, refatoração e otimização do código-fonte. Mas nada é feito de forma magica, esse plugin foi testado, retestado, virado do avesso para ficar o mais otimizado, leve, bom, bonito e funcional possivel para todos que buscam algo do tipo.

Se você encontrar algum bug, por favor, abra uma *issue* e farei o possível para consertar. Contribuições via *pull requests* são sempre bem-vidas! 😉
