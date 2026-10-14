# Sistema de Gerenciamento de Eventos

Aplicação web desenvolvida para a Avaliação 1 da disciplina **FACET-SNP-310 – Frameworks Modernos para Desenvolvimento de Sistemas**, da UNEMAT, turma 2026.2.

O sistema permite cadastrar, editar, excluir e consultar eventos, com filtros para facilitar a busca dos registros.

## Funcionalidades

* Cadastro, listagem, edição e exclusão de eventos.
* Validação dos campos obrigatórios do formulário.
* Confirmação antes de excluir um evento.
* Mensagens de retorno após cadastrar, editar ou excluir.
* Consulta de eventos com busca textual geral.
* Filtros por categoria, intervalo de datas e situação das inscrições.
* Combinação dos filtros e opção para limpar todos os filtros.
* Exibição da quantidade de resultados encontrados.
* Compartilhamento dos dados entre o gerenciamento e a consulta.
* Persistência dos registros no `localStorage` do navegador.
* Carregamento de estados e municípios brasileiros por meio da API do IBGE.
* Menu de navegação entre a página inicial, o gerenciamento e a consulta.

## Campos dos eventos

Cada evento possui os seguintes campos:

* Nome do evento;
* Categoria;
* Quantidade de vagas;
* Data do evento;
* Estado;
* Município;
* Situação das inscrições (abertas ou encerradas).

## Tecnologias utilizadas

* Vue 3
* Vite
* Vuetify
* Vue Router
* Axios
* vee-validate
* JavaScript
* localStorage
* API pública do IBGE

## API utilizada

O sistema utiliza a API de Localidades do IBGE para carregar os estados brasileiros e os municípios correspondentes ao estado selecionado no formulário.

A integração é realizada com Axios, incluindo indicadores de carregamento e tratamento de erros.

Documentação: https://servicodados.ibge.gov.br/api/docs/localidades

## Como executar o projeto

É necessário ter o Node.js e o npm instalados.

1. Clone o repositório:

   ```bash
   git clone https://github.com/karolaineponci/av_1_cadastro_eventos.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd av_1_cadastro_eventos
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie a aplicação:

   ```bash
   npm run dev
   ```

5. Abra no navegador o endereço local informado pelo Vite no terminal.

## Como os dados são armazenados

Os eventos são salvos no `localStorage` do navegador e compartilhados entre as páginas de gerenciamento e consulta. Os registros permanecem disponíveis após recarregar a página no mesmo navegador.

## Integrante

* Karolaine Ponci — [@karolaineponci](https://github.com/karolaineponci)

## Disciplina

**Avaliação 2 — FACET-SNP-310 — Frameworks Modernos para Desenvolvimento de Sistemas**

Universidade do Estado de Mato Grosso (UNEMAT) — 2026.2.
