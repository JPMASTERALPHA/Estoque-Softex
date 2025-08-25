const readlineSync = require('readline-sync');


let estoque = [{nome: 'laranja', qtd: 100, valor: 2}, {nome: 'uva', qtd: 30, valor: 5}];
let input;

function w(a, f) {
    if (/^[a-z]+$/.test(`${a}`)) {
        return f(a);
    }
    console.log("\n--!!!--Entrada Inválida!\n");
}

function in_stock(nome) {
  for (let i in estoque) {
    if (estoque[i].nome == nome) return i;
  }
}

function look_stock(nome) {
    let y = in_stock(nome);
    if (y) {
        console.log(`--+++--Produto está disponível em estoque:\n\nStatus do produto> Item: ${nome}; Quantidade: ${estoque[y].qtd}; Preço: ${estoque[y].valor}\n`)
    }
    else {
        console.log("\n--!!!--PRODUTO FORA DE ESTOQUE!\n");
    }
}

function add_stock(nome, qtd, valor) {
    if (/\w+ \d+ \d+/.test(`${nome} ${qtd} ${valor}`)) {
        let y = in_stock(nome);
        if (y) {
        estoque[y].qtd += qtd;
        estoque[y].valor = valor;
        console.log(`\n--***--Produto atualizado com sucesso!\n\nStatus do produto> Item: ${nome}; Quantidade: ${estoque[y].qtd}; Preço: ${valor}\n`);
        }
        else {
            estoque.push({nome, qtd, valor});
            console.log(`\n--***--Produto adicionado com sucesso!\n\nStatus do produto> Item: ${nome}; Quantidade: ${qtd}; Preço: ${valor}\n`);
        }
    }
    else {
        console.log("\n--!!!--Entrada Inválida!\n");
    }
}

function remove_stock(nome) {
    let y = in_stock(nome);
    if (y) {
        let qtd = Number(readlineSync.question("Digite a quantidade que deseja pedir ('0' cancelará a compra): "));
        if (/\d+/.test(qtd)) {
            if (qtd > estoque[y].qtd) {
                console.log(`\n--!!!--QUANTIDADE INSSUFICIENTE NO ESTOQUE!\n\nStatus do produto> Item: ${nome}; Quantidade: ${estoque[y].qtd}; Preço: ${estoque[y].valor}\n`);
            }
            else if (qtd > 0) { 
                let valor = estoque[y].valor;
                if (qtd == estoque[y].qtd) {
                    estoque = estoque.filter(obj => obj.nome != nome);
                }
                else {
                    estoque[y].qtd -= qtd;
                }
                console.log(`\n--***--Pedido concluído com sucesso!\n\nComprovante: Item: ${nome}; Quantidade: ${qtd}; Preço: ${valor}\n\nVALOR TOTAL DA COMPRA: R$${valor * qtd}\n`);
            }
            else {
                console.log("--***--COMPRA CANCELADA!");
            }
        }
        else {
            console.log("\n--!!!--Entrada Inválida!\n");
        }
    }
    else {
        console.log("\n--!!!--PRODUTO FORA DE ESTOQUE!\n");
    }
}

function consultar(input) {
  if ( (input == '0' || input == '1' || input == '2') && estoque.length == 0) {
      console.log("\n--!!!--O ESTOQUE ESTÁ ATUALMENTE VAZIO!\n");
  }
  else {
    switch (input) {
      case '0':
        console.log("\n-----Produtos no estoque da SofTex:\n");
        for (let obj of estoque) {
            console.log(`--+++--Item: ${obj.nome}; Quantidade: ${obj.qtd}; Preço: ${obj.valor}\n`);
        }
        break;
      case '1':
        let x1 = readlineSync.question("\n--???--Digite o nome do produto que deseja consultar em estoque, [Ex: laranja]: ").toLowerCase();
        w(x1, look_stock);
        break;
      case '2':
        let x2 = readlineSync.question("\n--???--Digite o nome do produto que deseja pedir, [Ex: laranja]: ").toLowerCase();
        w(x2, remove_stock);
        break;
      case '3':
        let x3 = readlineSync.question("\n--???--Para adicionar ao estoque um produto, digite o nome, a quantidade e o valor, [Ex: laranja 100 1.90]: ").split(" ");
        add_stock(x3[0], Number(x3[1]), Number(x3[2]));
        break;
      default:
        console.log("\n-----ESTOQUE SOFTEX-----\n\nComandos de Instrução:\n[-1] Sair do Programa\n[0] Ver todo estoque\n[1] Consultar produto\n[2] Realizar pedido de produto\n[3] Inserir/Atualizar produto\n");
        break;
    }
  }
}

do {
    consultar(input);
    input = readlineSync.question("\nDigite a operação desejada: ");
} while (input != -1)