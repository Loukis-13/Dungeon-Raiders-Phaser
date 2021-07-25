class Personagem {
    constructor(nome, vida, moedas, imagem, cartas){
        this.nome = nome;
        this.vida = vida;
        this.moedas = moedas;
        this.imagem = imagem;
        this.cartas = cartas;
        this.ultima = '';
    }

    jogar(tipo) {
        var carta;
		while (true) {
			carta = this.cartas[Math.floor(Math.random() * carta.length)];
			if ((carta == 'chave' && tipo != 'Tesouro') || (carta == 'espada' && tipo != 'Monstro'))
				continue;
			if (carta == 'tocha' || carta == 'boladecristal')
				continue;
			break;
        }
		this.ultima = carta;
		this.cartas.splice(this.cartas.indexOf(carta), 1);
    }

	chefe_jogar(hab) {
        var carta;
		while (true) {
			carta = this.cartas[Math.floor(Math.random() * carta.length)];
			if (3 in hab && carta == 'espada')
				continue;
			if (7 in hab && carta == 'boladecristal')
				continue;
			break;
        }
		this.ultima = [carta, '0'];
		this.cartas.splice(this.cartas.indexOf(carta), 1);

		this.cartas.push('0', '0', '0');
		while (true) {
			carta = this.cartas[Math.floor(Math.random() * carta.length)];
			if (3 in hab && carta == 'espada')
				continue;
			if (7 in hab && carta == 'boladecristal')
				continue;
			break;
        }
		this.ultima[1] = carta;
		this.cartas.splice(this.cartas.indexOf(carta), 1);
    }

	redefinir() {
		for (let i of ['1', '2', '3', '4', '5'])
			if (i in this.cartas)
                this.cartas.splice(this.cartas.indexOf(i), 1);
		this.cartas = ['1', '2', '3', '4', '5', ...this.cartas]
    }
}

const DICT_CARTAS = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, 'espada': 5, 'chave': 5, 'boladecristal': 0, 'tocha': 0}

var jogs = []
function gerar_jogadores(quant_jogs, escolha) {
	var guerreiro = new Personagem('Guerreiro', 10, 2, 'img/personagens/guerreiro.png', ['1', '2', '3', '4', '5'])
	var mago = new Personagem('Mago', 9, 1, 'img/personagens/mago.png', ['1', '2', '3', '4', '5', 'boladecristal', 'boladecristal'])
	var cavaleiro = new Personagem('Cavaleiro', 9, 1, 'img/personagens/cavaleiro.png', ['1', '2', '3', '4', '5', 'espada'])
	var exploradora = new Personagem('Exploradora', 8, 3, 'img/personagens/exploradora.png', ['1', '2', '3', '4', '5', 'tocha'])
	var ladra = new Personagem('Ladra', 8, 2, 'img/personagens/ladra.png', ['1', '2', '3', '4', '5', 'chave'])
    var persIndex = {'guerreiro': 0, 'mago': 1, 'ladra': 2, 'exploradora': 3, 'cavaleiro': 4}
	var pers = [guerreiro, mago, ladra, exploradora, cavaleiro]

	jogs = []

	if (escolha != 'aleatorio')
        jogs.push(pers.splice(persIndex[escolha], 1))

    let l = jogs.length;
	for (let i=0; i<quant_jogs-l; i++)
        jogs.push(pers.splice(Math.floor(Math.random()*pers.length), 1))
}

gerar_jogadores(3, 'aleatorio')
console.log(jogs)