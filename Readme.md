# Projeto Refactoring
O projeto Refactoring consiste em passar por todos os meus repositórios antigos e refatorar o código existente e finalizar os projetos inacabados.

A ideia também é manter a versão antiga em outra branch, assim posso fazer comparações entre eles.

Disclaimer: esse é um refactor pra atualizar o ambiente de desenvolvimento com Webpack, porque muita coisa mudou desde a época que eu fiz.

## 12. Ambiente de desenvolvimento com Webpack
A ideia deste projeto era criar um ambiente de desenvolvimento com Webpack pra eu usar em futuras aplicações, mas também para aprender sobre a ferramenta e cada um dos pormenores dela. Na época, eu li a doc praticamente inteira do Webpack.

---

Objetivo: criar um boilerplate básico que permita rodar aplicações JS e React sem precisar ficar criando toda vez. Além disso, a ideia é seguir como um guide também, com os comentários inseridos no corpo dos arquivos.

Para o HMR funcionar, é necessário criar um arquivo _.env.local_ com _CHOKIDAR_USEPOLLING=true_ para funcionar.

O package-lock.json e o yarn.lock DEVEM sempre ser commitados, nunca colocar no .gitignore

O [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig) serve pra adicionar alguns recursos ao intellisense do vs code

Git Hook + Commitizen

Why exec < /dev/tty? By default, git hooks are not interactive. This command allows the user to use their terminal to interact with Commitizen during the hook.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

O que falta:

Organizar imports
Adaptar pra funcionar com React tbm

Corrigir: tem um problema para verificar o
