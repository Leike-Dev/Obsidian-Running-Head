<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.0-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | Português | [Español](./README_es.md) | [Français](./README_fr.md) | [简体中文](./README_zh-CN.md)

</div>

---

Transforme suas notas com um belo cabeçalho de metadados no estilo blog! 📝✨

O **Running Head** é um plugin para Obsidian que adiciona automaticamente um cabeçalho personalizável às suas notas, exibindo a data de publicação, tempo estimado de leitura, uma etiqueta de atualização, o caminho de navegação (breadcrumbs), navegação por abas, barra de progresso de rolagem e qualquer propriedade personalizada do frontmatter que você desejar.

## Recursos

- **📝 Múltiplos layouts**: Escolha entre o estilo **Blog** (caminho acima do título, metadados abaixo) ou o estilo **Wiki** (metadados acima do título, caminho abaixo).
- **⏱️ Tempo de leitura e datas**: Calcule e exiba automaticamente o tempo de leitura e datas formatadas de acordo com o seu idioma (suporte para línguas asiáticas).
- **🧩 Campos personalizados**: Exiba qualquer propriedade YAML, como belas "pílulas", links ou texto no cabeçalho e caixas de seleção — com posicionamento **acima** ou **abaixo** do título individualmente.
- **📁 Escopo de pastas**: Mantenha seu vault limpo ocultando campos personalizados em pastas específicas (suporta múltiplas pastas por campo).
- **🍞 Caminho da nota**: Navegue facilmente com um caminho de pastas clicável mostrando exatamente onde sua nota está localizada, com destaque opcional da pasta atual.
- **📊 Barra de progresso de rolagem**: Uma barra de progresso elegante fixa no topo da nota que acompanha sua posição de leitura em tempo real.
- **🎨 Cores personalizadas**: Defina as cores da etiqueta de atualização, do caminho da nota ou da barra de progresso de forma simples e individual.
- **📅 Formato de data flexível**: Escolha o idioma de formatação entre 18 locais disponíveis ou defina uma formatação personalizada usando a sintaxe do [Moment.js](https://momentjs.com/).
- **💾 Gerenciamento de dados**: Exporte as configurações completas como JSON e importe em outro vault ou dispositivo facilmente.
- **🤝 Integrações poderosas**: Integra-se perfeitamente com o plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** (herdando os belos estilos de pílula feitos por você).
- **🌍 Internacionalização**: Interface completamente traduzida para Inglês, Português (Brasil), Espanhol, Francês e Chinês Simplificado (basta usar o Obsidian em um desses idiomas).

## Como usar

### 1. Configure propriedades do frontmatter

Nas configurações do plugin, defina os nomes das chaves YAML utilizadas para:

- **Data de publicação** (padrão: `date`)
- **Última atualização** (padrão: `updated`)

*Ou outras propriedades do tipo data de sua preferência.*

### 2. Personalize o layout e a aparência

- **Tamanho da fonte do título**: Ajusta o tamanho do título das suas notas.
- **Tamanho da fonte do cabeçalho**: Ajusta o tamanho dos metadados que você configurou para aparecer no cabeçalho.
- **Estilo de layout**: Escolha entre Wiki (metadados acima do título, caminho abaixo) ou Blog (caminho acima do título, metadados abaixo).
- **Caminho da nota**: Exibe o caminho de pastas da nota acima do título (ocultado em notas na raiz do vault).
- **Destacar pasta atual**: Aplica a cor de destaque ao último segmento do caminho.
- **Barra de progresso de rolagem**: Exibe uma elegante barra de progresso de leitura no topo da nota.
- **Exibir etiqueta de atualização**: Exibe a data da última modificação da nota quando ela foi alterada após a criação.
- **Cor de destaque da pasta**: Cor personalizada para o caminho (vazio = cor de acento do tema).
- **Cor da barra de progresso**: Cor da barra de rolagem (vazio = cor de acento do tema).
- **Cor da etiqueta de atualização**: Cor de fundo da etiqueta de data (vazio = cor padrão do tema).


### 3. Configurar datas e leitura

- **Idioma de formatação**: Escolha entre 18 idiomas disponíveis (en-US, ja-JP, pt-BR, es-ES e outros).
- **Formatação personalizada**: Use a sintaxe do Moment.js (ex: `DD/MM/YYYY`, `MMMM D, YYYY`). Quando vazio, usa o formato padrão do idioma.
- **Abreviar nomes dos meses**: Opte por nomes de meses curtos (ex: "ago." ao invés de "agosto").
- **Exibir tempo de leitura**: Ative ou desative o tempo estimado exibido ao lado da data.
- **Velocidade de leitura**: Palavras por minuto para calcular o tempo estimado (padrão: `200`) (suporta idiomas asiáticos).

### 4. Adicionar campos personalizados

1. Vá para **Configurações > Running Head**.
2. Em "Campos personalizados", clique em **Adicionar**.
3. Configure as opções do campo:
   - **Chave YAML**: A propriedade do frontmatter a ser exibida (ex: `Autor`, `Categoria`, `tags`).
   - **Rótulo de exibição**: Texto opcional exibido antes do valor.
   - **Mostrar rótulo**: Ative para exibir o rótulo na nota.
   - **Posição**: Escolha **Acima do título** ou **Abaixo do título**.
   - **Ocultar na pasta**: Oculte o campo em pastas específicas (suporta múltiplas pastas).
4. Use o botão **Gerenciar** para editar, reordenar ou excluir campos existentes.

### 5. Configurar abas de navegação

1. Vá para **Configurações > Running Head**.
2. Em **Abas de navegação**, configure o estilo visual das abas (**Sublinhado**, **Pílula** ou **Minimalista**).
3. Clique em **Adicionar** em **Nova propriedade de aba** para cadastrar uma chave de propriedade do frontmatter (ex: `tabs-home`).
4. No frontmatter das suas notas, defina essa propriedade como do tipo **Lista** (List) no Obsidian.
5. Na lista, você pode adicionar:
   - O link para a nota de destino no formato wiki: `"[[Nota de Destino]]"` ou `"[[Nota de Destino|Apelido]]"`
   - Um nome personalizado opcional: `"[name, Meu Nome Personalizado]"`
   - Um ícone do Lucide opcional: `"[icon, home]"` (dica: clique no seletor de ícones nas configurações para copiar a tag pronta para a área de transferência)

> [!Note]
> - A ordem em que você insere os itens da lista (`[name, ...]`, `[icon, ...]` e `[[Link]]`) não importa para o funcionamento.
> - Se houver mais de um link de nota na lista da propriedade, a aba apontará para o último link adicionado.

### 6. Gerenciamento de dados

- **Exportar**: Gere um JSON com toda a sua configuração atual para copiar ou salvar.
- **Importar**: Cole um JSON de configuração para aplicar rapidamente em outro vault ou dispositivo.

E ai está, seus metadados agora são exibidos de forma elegante nas suas notas. ✨

## Instalação

### Instalação manual
1. Baixe o release mais recente: `main.js`, `manifest.json` e `styles.css`.
2. Crie uma pasta chamada `running-head` dentro do diretório `.obsidian/plugins/`.
3. Cole os arquivos lá.
4. Recarregue o Obsidian e ative o plugin em **Configurações > Plugins da comunidade**.

## Avisos


> [!Tip]  
> Se você tem o plugin **Typify** instalado, o Running Head irá detectar e aplicar automaticamente os seus estilos do Typify às pílulas correspondentes no cabeçalho de metadados!

> [!Tip]  
> O tema Minimal, do Kepano, foi o que mais deu dor de cabeça para ajustar e deixar o melhor possível. Funciona perfeitamente nele, okay?

> [!Tip]  
> Utilize o recurso de **Exportar/Importar** para compartilhar suas configurações entre vaults ou fazer backup da sua configuração antes de experimentar novos ajustes.

## Desenvolvimento

Se você quiser compilar o plugin por conta própria, faça o seguinte:

1. Clone este repositório.
2. Execute `npm install`.
3. Execute `npm run dev` para iniciar a compilação em modo *watch*.

## Aviso legal

Este plugin foi projetado para trazer uma sensação mais elegante e "publicada" para as notas do seu vault no Obsidian. E como outras vezes, nasceu do meu desejo de customizar meu cofre (às vezes os desejos nos fazem criar coisas incriveis, como também despender horas e horas até ficar do jeito que queremos... rs).

Um agradecimento especial à [Antigravity](https://antigravity.google/) pela inestimável assistência na construção, refatoração e otimização do código-fonte. Mas nada é feito de forma magica, esse plugin foi testado, retestado, virado do avesso para ficar o mais otimizado, leve, bom, bonito e funcional possivel para todos que buscam algo do tipo.

Se você encontrar algum bug, por favor, abra uma *issue* e farei o possível para consertar. Contribuições via *pull requests* são sempre bem-vindas! 😉
