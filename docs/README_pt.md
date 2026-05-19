<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-1.0.0-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | Português | [Español](./README_es.md) | [Français](./README_fr.md) | [简体中文](./README_zh-CN.md)

</div>

---

Transforme suas notas com um belo cabeçalho de metadados no estilo blog! 📝✨

O Running Head é um plugin para Obsidian que adiciona automaticamente um cabeçalho personalizável abaixo dos títulos das suas notas, exibindo a data de publicação, tempo estimado de leitura, um badge de última atualização e qualquer propriedade personalizada do frontmatter que você desejar.

## Recursos

- **📝 Múltiplos Layouts**: Escolha entre o estilo Blog (tudo abaixo do título) ou o estilo Wiki (badges no canto superior direito).
- **⏱️ Tempo de Leitura e Datas**: Calcule e exiba automaticamente o tempo de leitura e datas maravilhosamente formatadas com base no seu idioma.
- **🧩 Campos Personalizados**: Exiba qualquer propriedade YAML como belas "pílulas", links ou texto logo no cabeçalho.
- **📁 Escopo de Pastas**: Mantenha o seu vault limpo ocultando campos personalizados específicos em certas pastas.
- **🍞 Breadcrumb de Pastas**: Navegue facilmente com um breadcrumb clicável mostrando exatamente onde sua nota está localizada.
- **🤝 Integrações Poderosas**: Integra-se perfeitamente com o plugin **Bases** (injetando ícones personalizados em cabeçalhos de tabela) e o plugin **Typify** (herdando belos estilos de pílula).
- **🌍 Internacionalização**: Totalmente traduzido para Inglês, Português (Brasil), Espanhol, Francês e Chinês Simplificado.

## Como Usar

1. **Configurar Datas**: Nas configurações do plugin, defina as chaves YAML usadas para a sua data de criação (ex: `date`) e data de atualização (ex: `updated`).
2. **Adicionar Campos Personalizados**:
   - Vá para **Configurações > Running Head**.
   - Em "Campos personalizados", clique em **Adicionar**.
   - Digite a chave YAML da propriedade que você quer exibir (ex: `Autor` ou `Categoria`).
   - Opcionalmente, adicione um rótulo de exibição ou restrinja o campo para não aparecer em pastas específicas.
3. **Personalizar a Aparência**: Ajuste tamanhos de fonte, formatos de data, velocidade de leitura (WPM) e escolha se deseja exibir o breadcrumb.

Voilá! Seus metadados agora são exibidos de forma elegante abaixo do título da nota ✨

## Instalação

### Instalação Manual
1. Baixe o release mais recente: `main.js`, `manifest.json` e `styles.css`.
2. Crie uma pasta chamada `running-head` dentro do diretório `.obsidian/plugins/`.
3. Cole os arquivos lá.
4. Recarregue o Obsidian e ative o plugin.

## Avisos

> [!Important]  
> Se você estiver usando propriedades do tipo Caixa de Seleção (Checkbox), elas serão exibidas atualmente como texto bruto (`true` ou `false`) no cabeçalho. Recomendamos o uso de outros tipos de propriedade (como tags ou texto) para uma representação visual melhor no contexto do cabeçalho.

> [!Note]  
> A funcionalidade de **Ícones das tabelas** afeta apenas o cabeçalho de propriedades do plugin **Bases** quando o modo de exibição está definido como Tabela.

> [!Tip]  
> Se você tem o plugin **Typify** instalado, o Running Head irá detectar e aplicar automaticamente os seus estilos do Typify às pílulas correspondentes no cabeçalho de metadados!

## Desenvolvimento

Se você quiser compilar o plugin por conta própria, faça o seguinte:

1. Clone este repositório.
2. Execute `npm install`.
3. Execute `npm run dev` para iniciar a compilação em modo *watch*.

## Aviso Legal

Este plugin foi projetado para trazer uma sensação mais elegante e "publicada" para as notas do seu vault no Obsidian.

Um agradecimento especial à [Antigravity](https://antigravity.google/) pela inestimável assistência na construção, refatoração e otimização do código-fonte. 

Se você encontrar algum bug, por favor, abra uma *issue* e farei o possível para consertar. Contribuições via *pull requests* são sempre bem-vindas! 😉
