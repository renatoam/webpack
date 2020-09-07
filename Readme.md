# Ambiente de desenvolvimento com Webpack

Objetivo: criar um boilerplate básico que permita rodar aplicações JS e React sem precisar ficar criando toda vez. Além disso, a ideia é seguir como um guide também, com os comentários inseridos no corpo dos arquivos.

Para o HMR funcionar, é necessário criar um arquivo _.env.local_ com _CHOKIDAR_USEPOLLING=true_ para funcionar.

O package-lock.json e o yarn.lock DEVEM sempre ser commitados, nunca colocar no .gitignore

O [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig) serve pra adicionar alguns recursos ao intellisense do vs code

Git Hook + Commitizen

Why exec < /dev/tty? By default, git hooks are not interactive. This command allows the user to use their terminal to interact with Commitizen during the hook.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
