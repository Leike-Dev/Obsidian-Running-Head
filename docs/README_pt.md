# Running Head

<div align="center">
  <img src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.1.0-lightgreen.svg)
  [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/azurita_a)

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
  <video src="https://github.com/user-attachments/assets/f5a54a1a-2d71-4cb3-98ac-40298601d842" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/eeff569f-b336-4487-9d87-a1d5c9367d52" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 2. 📐 Estilos de Layout
Escolha entre os layouts **Estilo Blog** (caminho da pasta acima do título, metadados abaixo) ou **Estilo Wiki** (metadados acima do título, caminho abaixo) para se adequar à estética das suas notas.

<div align="center">
  <video src="https://github.com/user-attachments/assets/726ab137-ebf8-4a23-b49c-df2c1c7064a6" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 3. 🍞 Caminho da Nota (Breadcrumbs)
Navegue facilmente com um caminho de pastas clicável mostrando exatamente onde sua nota está localizada, com destaque opcional da pasta atual.

<div align="center">
  <video src="https://github.com/user-attachments/assets/481eb3b1-1c31-4df6-a1af-d826c86f98b0" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 4. 🏷️ Campos Personalizados do YAML & Escopo de Pastas
Renderize qualquer propriedade do frontmatter (texto, listas, caixas de seleção) como campos personalizados ou belos estilos de pílula no seu cabeçalho. Oculte campos específicos em determinados diretórios usando escopos de pasta flexíveis para manter seu espaço de trabalho limpo.

> [!NOTE]
> A demonstração adicionando um campo de texto serve como ilustração; essas opções aplicam-se a qualquer propriedade de metadado personalizado.

<div align="center">
  <video src="https://github.com/user-attachments/assets/46fc5fcd-b34b-4586-b35d-659e1ea97860" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/5b1382cd-4245-42a4-96b0-15816d587793" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 5. 🗂️ Navegação Interativa por Abas
Crie barras de navegação elegantes para alternar entre notas relacionadas usando propriedades de frontmatter. Personalize o estilo visual das abas (**Sublinhado**, **Pílula** ou **Minimalista**) e adicione ícones do Lucide ou nomes personalizados facilmente.

<div align="center">
  <p><em>(Vídeo em breve)</em></p>
</div>


### 6. 📊 Progresso de Leitura & Integração com o Typify
Adicione uma barra discreta e altamente personalizável no topo da nota para acompanhar o seu progresso de leitura em tempo real. O Running Head também se integra perfeitamente ao plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** para herdar cores e estilos de pílula automaticamente.

<div align="center">
  <video src="https://github.com/user-attachments/assets/c0e6d91a-6e36-4c78-9348-1d29b9e860d1" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/user-attachments/assets/31fad83c-f11a-4a0d-b99b-bc8af3981ea9" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


## ⚙️ Recursos Adicionais

* **🎨 Cores Personalizadas**: Defina as cores da etiqueta de atualização, do caminho da nota ou da barra de progresso de forma simples e individual.
* **🚫 Ocultar Primeiro H1**: Evite títulos duplicados na tela se você usa plugins que sincronizam o nome do arquivo com o H1.
* **📅 Formatar Título como Data**: Transforme o título da sua nota em uma data formatada de forma elegante.
> [!NOTE]
> Para que isso funcione, o nome do arquivo da nota deve conter **apenas** a data (e opcionalmente a hora), sem nenhum outro texto.
> **Formatos Suportados:**
> - `YYYY-MM-DD`, `YYYYMMDD`, `DD-MM-YYYY`, `YYYY.MM.DD`, `DD/MM/YYYY`, etc.
> - Com horário: `YYYY-MM-DD HH:mm`, `YYYYMMDDHHmmss`, `DD-MM-YYYY HH:mm`, etc.
* **💾 Gerenciamento de Dados**: Exporte as configurações completas como JSON e importe em outro vault ou dispositivo facilmente.
* **🌍 Internacionalização**: Interface totalmente traduzida para Inglês, Português (Brasil), Espanhol, Frances e Chinês Simplificado (basta usar o Obsidian em um desses idiomas). Se houver erros de tradução ou melhorias, diga-me.


## ⚡ Uso e Início Rápido

1. **Ative o Plugin**: Abra as configurações do Obsidian $\rightarrow$ Plugins de comunidade, procure por **Running Head** e ative-o.
2. **Defina Datas no Frontmatter**: Configure suas chaves YAML para criação (padrão `date`) and atualização (padrão `updated`):
   ```yaml
   date: 2026-05-29
   updated: 2026-05-29
   ```
3. **Configure Campos Personalizados**: Vá para as configurações do plugin $\rightarrow$ **Campos Personalizados** e clique em **Adicionar** para mapear qualquer chave YAML (ex: `Autor`, `tags`) ao cabeçalho.
4. **Crie Abas**: Em **Navegação por Abas**, defina o nome de uma propriedade global (ex: `menu`), crie um grupo de abas (ex: `projeto`) e adicione suas abas. Depois, no frontmatter da sua nota, use `menu: projeto`.




## 📦 Instalação

### Instalação Manual
1. Faça o download dos arquivos `main.js`, `manifest.json` e `styles.css` a partir do último release.
2. Crie uma pasta chamada `running-head` dentro de `pasta-do-seu-cofre/.obsidian/plugins/`.
3. Mova os arquivos baixados para essa pasta.
4. Recarregue o Obsidian e ative o plugin em **Configurações → Plugins Comunitários**.


## 🛠️ Desenvolvimento

Para compilar o plugin localmente:
1. Baixe o código-fonte para a sua máquina.
2. Instale as dependências: `npm install`
3. Inicie o servidor de compilação em tempo real: `npm run dev`


## ⚠️ Aviso legal

Este plugin foi projetado para trazer uma sensação mais elegante e "publicada" para as notas do seu vault no Obsidian. E como outras vezes, nasceu do meu desejo de customizar meu cofre (às vezes os desejos nos fazem criar coisas incriveis, como também despender horas e horas até ficar do jeito que queremos... rs).

Um agradecimento especial à [Antigravity](https://antigravity.google/) pela inestimável assistência na construção, refatoração e otimização do código-fonte. Mas nada é feito de forma magica, esse plugin foi testado, retestado, virado do avesso para ficar o mais otimizado, leve, bom, bonito e funcional possivel para as pessoas que buscam algo do tipo.

Se você encontrar algum bug, por favor, abra uma *issue* e farei o possível para consertar. Contribuições via *pull requests* são sempre bem-vidas! 😉
