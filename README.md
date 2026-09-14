# Traquejo e Talento, Unipessoal Lda · proposta de website

Proposta de website em duas versões para a Traquejo e Talento, empresa de construção com sede nas Gaeiras, Óbidos. Feita pela Elevia Digital em setembro de 2026.

**Ver online:** [elevia-digital.github.io/traquejo-e-talento](https://elevia-digital.github.io/traquejo-e-talento/)

Destino previsto na Hostinger: `https://elevia.pt/traquejo-e-talento/`.

## A empresa

| | |
|---|---|
| Nome | Traquejo e Talento, Unipessoal Lda |
| NIF | 517127253 |
| Sede | Rua da Corujeira, n.º 14, Alto Moinho Saloio, 2510-708 Gaeiras, Óbidos |
| Constituída | 7 de setembro de 2022 |
| Atividade | Construção de edifícios (residenciais e não residenciais) |
| Capital social | 500 € |

Os resumos de pesquisa do racius.com referem também projetos de arquitetura e compra e venda de imóveis no objeto social (a página em si estava em baixo e não deu para confirmar). Isso não entrou no site; confirmar com a empresa.

## Estrutura

```
index.html              página de escolha: as duas propostas, preços e comparação
essencial/index.html    Versão Essencial (850 €), uma página
completa/index.html     Versão Completa (1.200 €), sete páginas por separadores
completa/completa.css   estilos da Completa
completa/completa.js    navegação, obras, opiniões e pedido de orçamento
assets/marca.css        cores, letra, botões e formulários comuns às três páginas
img/                    14 fotografias e o favicon
_fotos-nao-usadas/      fotografias postas de lado (só na cópia local, fora do repositório e do zip)
```

Não há dependências nem build. A única ligação externa é o Google Fonts (Schibsted Grotesk).

## Como mudar conteúdos

* **Essencial:** diretamente no `essencial/index.html`.
* **Completa:** as listas no início do `completa/completa.js`: `SERVICOS`, `OBRAS`, `DESTAQUE` (as obras do carrossel da página inicial, que avança sozinho a cada 6 segundos e para quando alguém lhe mexe) e `OPINIOES`. O resto do texto está no `completa/index.html`.

## Formulários

Nesta demonstração os formulários não enviam nada: validam os campos e mostram a mensagem de confirmação. As opiniões enviadas ficam guardadas só no navegador de quem as escreve, marcadas como pendentes.

Para o site final é preciso ligar os formulários a um email (na Hostinger, um pequeno script PHP, ou um serviço como o Formspree) e, no caso das opiniões, decidir como a empresa as aprova antes de aparecerem.

## Quando o cliente escolher uma versão

1. Copiar o `index.html` da versão escolhida para a raiz, no lugar da página de escolha.
2. Trocar `../img/` por `img/` e `../assets/` por `assets/` (na Completa, também dentro do `completa.js`, e juntar `completa.css` e `completa.js` à raiz).
3. Retirar a `proposta-barra`, a `demo-nota` e a linha `<meta name="robots" content="noindex,nofollow">`.
4. Apagar a pasta da versão que não foi escolhida.

## Por preencher (pedir à empresa)

* Telefone, email e horário. No site aparecem como "A indicar". Ao pôr o telefone, juntar a indicação do custo da chamada (por exemplo "Chamada para a rede fixa nacional").
* Número de WhatsApp. Até lá, o botão da Completa leva à página de contactos.
* Número de alvará ou certificado de empreiteiro.
* Logótipo, se existir. O atual é provisório: dois T, um escuro e outro amarelo.
* Fotografias de obras reais, com o tipo de obra e a localidade.
* Opiniões reais de clientes (ou ligação às avaliações do Google).
* Confirmar a zona de atuação, a visita e o orçamento gratuitos, a resposta "em poucos dias úteis" e o texto da política de privacidade.

## Fotografias

Todas do [Unsplash](https://unsplash.com), com a Licença Unsplash (uso comercial permitido, sem atribuição obrigatória). Não são de domínio público. Identificador de cada uma em `images.unsplash.com`:

| Ficheiro | Fotografia |
|---|---|
| andaimes-fachada.jpg | photo-1646608220368-c604d8e8130f |
| casa-antiga.jpg | photo-1760539750877-a23876cad963 |
| equipa-obra.jpg | photo-1673865641469-34498379d8af |
| estrutura-betao.jpg | photo-1615461476249-718ef8bc369c |
| habitacao-obra.jpg | photo-1747192904662-e03e8da1e0ab |
| moradia-betao.jpg | photo-1730170787463-53a7074137fa |
| moradia-jardim.jpg | photo-1582268611958-ebfd161ef9cf |
| moradia-nova.jpg | photo-1684691376857-5dfb87f6bc65 |
| obidos-rua.jpg | photo-1697394491967-c6faf458ced7 |
| obidos-telhados.jpg | photo-1586029714704-d864f4603de0 |
| obra-tijolo.jpg | photo-1760955307883-84c5f4c9ceda |
| oficio-colher.jpg | photo-1704005445445-2747074be8ac |
| pavilhao.jpg | photo-1716418461570-b4fb203ec83a |
| remodelacao-cozinha.jpg | photo-1618832515490-e181c4794a45 |

Escolhidas para não repetir as fotografias do site da Sweet Sketch e para parecerem obra real em Portugal (betão e tijolo, casas caiadas, Óbidos). Foram postas de lado as moradias de catálogo e os interiores encenados.

## Publicar na Hostinger

O zip e as instruções de carregamento (`traquejo-e-talento-INSTRUCOES-UPLOAD.txt`) ficam fora do repositório, junto da pasta do projeto. O zip leva `index.html`, `assets`, `essencial`, `completa` e `img`, para extrair em `public_html/traquejo-e-talento/`.

## GitHub Pages

Publicado a partir do ramo `main`, na raiz. Cada `git push` atualiza o endereço público em um ou dois minutos. A cópia na Hostinger é atualizada à parte, com um zip novo.
