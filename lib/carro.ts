// Todos os dados do carro vivem aqui. Para mudar o preco, uma data ou uma linha
// da descricao, mexe-se neste ficheiro e em mais nenhum.

export const carro = {
  ano: "1994",
  marca: "Mazda",
  modelo: "MX-5",
  geracao: "NA",
  preco: "€14.000",

  // Barra do topo da pagina.
  estadoVenda: "À venda",
  local: "Funchal, Madeira",

  // Titulo em duas linhas, em caixa alta e a toda a largura.
  titulo: { primeira: "Mazda", segunda: "Miata" },

  // Barra por baixo da foto do hero.
  resumo: ["1.6", "115 cv", "Manual", "150.000 km"],

  descricao:
    "Miata (MX-5) NA verde escuro, interior em bege. Hard-top e soft-top com cores de exterior e interior respetivamente. Um NA de primeira série, com os faróis pop-up e a mecânica original. Os dois tejadilhos acompanham o carro.",

  // Duas colunas, preenchidas linha a linha: Modelo/Motor, Primeira
  // matricula/Caixa, e por ai fora.
  ficha: [
    { rotulo: "Modelo", valor: "Mazda MX-5 (NA)" },
    { rotulo: "Motor", valor: "1.6, 115 cv" },
    { rotulo: "Primeira matrícula", valor: "Agosto de 1994" },
    { rotulo: "Caixa", valor: "Manual" },
    { rotulo: "Matrícula", valor: "21-43-LA" },
    { rotulo: "Quilómetros", valor: "150.000 km" },
    { rotulo: "Exterior", valor: "Verde escuro" },
    { rotulo: "Interior", valor: "Bege" },
    { rotulo: "Tejadilhos", valor: "Hard-top e soft-top" },
    { rotulo: "Preço", valor: "€14.000" },
  ],

  manutencao: {
    titulo: "Manutenção no começo de 2026",
    // Distribuidos por duas colunas, de cima para baixo.
    itens: [
      "Correia de distribuição",
      "Óleo e filtros",
      "Pastilhas e líquido de travões",
      "Alinhamento",
      "Pneus dianteiros novos",
    ],
    // Ultima celula da grelha, em destaque.
    inspecao: "Inspeção aprovada em agosto de 2026",
  },

  corrosao:
    "Sem corrosão estrutural: o carro foi fotografado por baixo, ao pormenor. Essas fotos estão na galeria, mais abaixo.",

  // O WhatsApp e o unico contacto da pagina, e o unico link para fora.
  rodape:
    "Para ver o carro ao vivo, pedir mais fotos ou tirar qualquer dúvida, fala comigo diretamente.",
  contacto: {
    rotulo: "WhatsApp 933 144 558",
    ligacao: "https://wa.me/351933144558",
  },
} as const;
