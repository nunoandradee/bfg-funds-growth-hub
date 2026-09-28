# Corrigir conformidade 10-DLC

## Resultado
O site passará a exibir a identidade legal e os contatos registrados, terá páginas legais funcionais e apresentará consentimento SMS explícito, separado e não obrigatório nos formulários.

## Alterações
- Criar páginas públicas em `/privacy-policy`, `/terms-of-service`, `/sms-terms` e `/contact`, cada uma com título e descrição próprios.
- Incluir na política de privacidade como telefone e dados de contato são coletados e usados, além da declaração de que dados de opt-in móvel não são vendidos ou compartilhados para marketing.
- Incluir nos termos regras de uso, obrigações, avisos, limitações de responsabilidade e referências às comunicações.
- Incluir nos termos de SMS: mensagens recorrentes automatizadas, frequência variável de até 4 mensagens/mês, tarifas, `STOP` para cancelar e `HELP` para ajuda.
- Atualizar o formulário da página inicial com uma caixa SMS separada, desmarcada por padrão, linguagem completa e links legais próximos ao envio. Telefone e consentimento SMS não impedirão o envio.
- Atualizar o formulário completo para registrar corretamente o estado de cada consentimento, sem presumir aceite quando a caixa não foi marcada.
- Exibir `Luciano Leite LLC d/b/a BFG Funds`, endereço registrado, telefone e e-mail no rodapé e na página de contato.
- Fazer “Contact Us” abrir a página `/contact` e adicionar links legais ao rodapé em todas as páginas que o utilizam; manter a página `/apply` isolada, mas com links legais discretos junto ao formulário.

## Dados usados
- Razão social: Luciano Leite LLC
- Marca: BFG Funds
- Endereço: W Antantic Blvd, Coconut Creek, FL 33066, US
- Telefone: +1 (786) 642-0539
- E-mail: hello@bfgfunds.com

## Verificação
- Confirmar que as quatro novas páginas deixam de retornar 404.
- Testar os formulários sem telefone e sem consentimento SMS.
- Conferir links, texto legal, visual em desktop e celular, além de erros de compilação e navegação.
