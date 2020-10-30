<p align="center">
  <img alt="happy" title="happy" src="./assets/banner.png" />
</p>

<h1 align="center">
  Leve felicidade para o mundo
</h1>

## 🎉 Sobre

**happy** é uma plataforma que ajuda pessoas a encontrarem orfanatos próximos para levar felicidade a milhares de crianças.

Este projeto foi desenvolvido usando Node.js, ReactJS e React Native, durante a 3ª edição da Next Level Week ministrada pela [Rocketseat](https://rocketseat.com.br/).

<br />

## 🎨 Layout

Os layouts da aplicação estão disponíveis no Figma: [Web](http://figma.com/file/X5vjP69Y0H9C8aa5QqorzH/Happy-Web), [Mobile](https://www.figma.com/file/5lunlSxDHchxU312BJntQL/Happy-Mobile).

<br />

## 🔌 Tecnologias

### Front-end
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Styled Components](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Expo](https://expo.io/)

### Back-end
- [Node.js](https://nodejs.org/pt-br/)
- [Express](https://github.com/expressjs/express)
- [TypeORM](https://typeorm.io/)
- [Typescript](https://www.typescriptlang.org/)

### Ambiente de desenvolvimento
- [VS Code](https://code.visualstudio.com/)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://prettier.io/)

<br />

## 🤔 Como executar

Para clonar esse repositório pelo terminal, é necessário possuir o [Git](https://git-scm.com/) instalado em sua máquina.

```bash
# Clone o repositório
$ git clone https://github.com/dsilva01/nlw-03-omnistack.git

# Entre na pasta do projeto
$ cd nlw-03-omnistack
```

<br />

Para instalar as dependências e executar o projeto, é necessário possuir o [Node.js](https://nodejs.org/pt-br/) instalado em sua máquina, bem como um gerenciador de pacotes: [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/).

<table style="width:100%;">
<tr>
<td align="center"> <strong>Usando Yarn</strong> </td> <td align="center"> <strong>Usando npm</strong> </td>
</tr>
<tr>
<td>


```bash
# Instale as dependências do back-end
$ cd backend && yarn

# Execute as migrations do TypeORM
$ yarn typeorm

# Execute a api em Node.js
$ yarn dev

# Instale as dependências do front-end web
$ cd ../web && yarn

# Execute o front-end em ReactJS
$ yarn start
```

</td>
<td>


```bash
# Instale as dependências do back-end
$ cd backend && npm install

# Execute as migrations do TypeORM
$ npm run typeorm

# Execute a api em Node.js
$ npm run dev

# Instale as dependências do front-end web
$ cd ../web && npm install

# Execute o front-end em ReactJS
$ npm start
```

</td>
</table>
