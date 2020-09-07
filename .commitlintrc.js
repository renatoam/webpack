module.exports = { extends: ['@commitlint/config-conventional'] }
// essa configuração informa ao Commitlint que use essas convenções para avaliar as mensagens de commit
// o husky permite adicionar um git hook diretamente e serve pra disparar o commitlint quando uma nova mensagem de commit é criada
