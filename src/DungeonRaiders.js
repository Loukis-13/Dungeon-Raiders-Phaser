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


class Aboboda {
	constructor(itens, imagem) {
		this.itens = itens
		this.itens = itens==1 ? ['tocha', 'boladecristal', 'chave', 'espada', {'vida': 1}] : [{'moedas': 1}, {'moedas': 2}, {'vida': 1}, {'moedas': 3}, {'vida': 2}]
		this.imagem = imagem
		this.tipo = 'Abóboda'
		this.escuro = false
	}

	resolver() {
		val = [['', [0, 0, 0, 0]]]*5

		for (let [i, jog] of jogs.entries()) {
			switch (jog.ultima) {
				case '1': {
					if (this.itens == 1) {
						jog.cartas.push('tocha')
						val[i] = ['tocha', [1, 1, 1, 1]]
					}
					else {
						jog.moedas += 1
						val[i] = ['+1', [1, 1, 0, 1]]
					}
					break
				}
				case '2': {
					if (this.itens == 1) {
						jog.cartas.push('boladecristal')
						val[i] = ['boladecristal', [1, 1, 1, 1]]
					}
					else {
						jog.moedas += 2
						val[i] = ['+2', [1, 1, 0, 1]]
					}
					break
				}
				case '3': {
					if (this.itens == 1) {
						jog.cartas.push('chave')
						val[i] = ['chave', [1, 1, 1, 1]]
					}
					else {
						jog.vida += 1
						val[i] = ['+1', [1, 1, 0, 1]]
					}
					break
				}
				case '4': {
					if (this.itens == 1) {
						jog.cartas.push('espada')
						val[i] = ['espada', [1, 1, 1, 1]]
					}
					else {
						jog.moedas += 3
						val[i] = ['+3', [1, 1, 0, 1]]
					}
					break
				}
				case '5': {
					if (this.itens == 1) {
						jog.vida += 1
						val[i] = ['+1', [1, 1, 0, 1]]
					}
					else {
						jog.vida += 2
						val[i] = ['+2', [1, 1, 0, 1]]
					}
					break
				}
			}
			if (jog.moedas > 20) jog.moedas = 20
			if (jog.vida   > 10) jog.vida   = 10
		}

		return ('', val, false)
	}
}


class Monstro {
	constructor(nome, vida, dano, imagem) {
		this.nome = nome
		this.vida = vida
		this.dano = dano
		this.imagem = imagem
		this.tipo = 'Monstro'
		this.escuro = false
	}

	resolver() {
		val_cartas = jogs.map(j=>DICT_CARTAS[j.ultima]).sorted((a,b)=>a-b)
		danos = [['', [0, 0, 0, 0]]]*5
		morto = false

		// dois jogadores
		if (jogs.length == 2) {
			if (val_cartas[0] == val_cartas[1])
				return ('? ? ?', danos, morto)
		}

		if (sum(val_cartas) < self.vida[len(jogs)]) {
			for (let [i, jog] of jogs.entries()) {
				if (DICT_CARTAS[jog.ultima] == val_cartas[0]) {
					jog.vida += self.dano
					danos[i] = [str(self.dano), [1, 0, 0, 1]]
					if (jog.vida < 0)
						jog.vida = 0
				}
			}
		}
		else
			morto = true

		return (str(sum(val_cartas)), danos, morto)
	}
}


class Tesouro {
	constructor(bau1, bau2, imagem) {
		this.bau1 = bau1
		this.bau2 = bau2
		this.imagem = imagem
		this.tipo = 'Tesouro'
		this.escuro = false
	}

	resolver() {
		val_cartas = jogs.map(j=>DICT_CARTAS[j.ultima]).sorted((a,b)=>a-b)
		din = [['', [0, 0, 0, 0]]]*5

		for (let [i, jog] of jogs.entries()) {
			if (DICT_CARTAS[jog.ultima] == val_cartas[-1]) {
				x = Math.floor(self.bau1/val_cartas.count(val_cartas[-1]))
				jog.moedas += x
				if (jog.moedas > 20)
					jog.moedas = 20
				din[i] = ['+'+x, [1, 1, 0, 1]]
			}
		}

		if (self.bau2) {
			val_cartas = val_cartas.filter(i=>i!=val_cartas[-1])
			if (val_cartas.length == 0)
				return ('', din, false)
			for (let [i, jog] of jogs.entries()) {
				if (DICT_CARTAS[jog.ultima] == val_cartas[-1]) {
					x = Math.floor(self.bau1/val_cartas.count(val_cartas[-1]))
					jog.moedas += x
					if (jog.moedas > 20)
						jog.moedas = 20
					din[i] = ['+'+x, [1, 1, 0, 1]]
				}
			}
		}

		return ('', din, false)
	}
}


class Armadilha {
	constructor(nome, afeto, valor, quant, imagem) {
		this.nome = nome
		this.afeto = afeto
		this.valor = valor
		this.quant = quant
		this.imagem = imagem
		this.tipo = 'Armadilha'
		this.escuro = false
	}

	resolver() {
		val_cartas = jogs.map(j=>DICT_CARTAS[j.ultima]).sorted((a,b)=>a-b)
		val = [['', [0, 0, 0, 0]]]*5

		if (self.afeto == 'todos') {
			if (1 in val_cartas)
				for (let [i, jog] of jogs.entries())
					if (self.valor == 'moedas') {
						jog.moedas = Math.floor(jog.moedas/2)
						val[i] = ['/2', [1, 1, 0, 1]]
					} else {
						jog.vida = Math.floor(jog.vida/2)
						val[i] = ['/2', [1, 0, 0, 1]]
					}
			else if (2 in val_cartas)
				for (let [i, jog] of jogs.entries())
					if (self.valor == 'moedas') {
						jog.moedas -= 2
						if (jog.moedas < 0)
							jog.moedas = 0
						val[i] = ['-2', [1, 1, 0, 1]]
					} else {
						jog.vida -= 2
						if (jog.vida < 0)
							jog.vida = 0
						val[i] = ['-2', [1, 0, 0, 1]]
					}
			else if (3 in val_cartas)
				for (let [i, jog] of jogs.entries())
					if (self.valor == 'moedas') {
						jog.moedas -= 1
						if (jog.moedas < 0)
							jog.moedas = 0
						val[i] = ['-1', [1, 1, 0, 1]]
					} else {
						jog.vida -= 1
						if (jog.vida < 0)
							jog.vida = 0
						val[i] = ['-1', [1, 0, 0, 1]]
					}
		}
		else {
			if (self.valor == 'moedas') {
				a = Math.max(jogs.map(j=>j.moedas))
				if (5 in val_cartas)
					for (let [i, jog] of jogs.entries())
						if (jog.moedas == a) {
							jog.moedas -= 3
							if (jog.moedas < 0)
								jog.moedas = 0
							val[i] = ['-3', [1, 1, 0, 1]]
						}
				else if (4 in val_cartas)
					for (let [i, jog] of jogs.entries())
						if (jog.moedas == a) {
							jog.moedas -= 2
							if (jog.moedas < 0)
								jog.moedas = 0
							val[i] = ['-2', [1, 1, 0, 1]]
						}
				else if (3 in val_cartas)
					for (let [i, jog] of jogs.entries())
						if (jog.moedas == a) {
							jog.moedas -= 1
							if (jog.moedas < 0)
								jog.moedas = 0
							val[i] = ['-1', [1, 1, 0, 1]]
						}
			}
			else {
				a = Math.max(jogs.map(j=>j.vida))
				if (5 in val_cartas)
					for (let [i, jog] of jogs.entries())
						if (jog.vida == a) {
							jog.vida -= 3
							if (jog.vida < 0)
								jog.vida = 0
							val[i] = ['-3', [1, 0, 0, 1]]
						}
				else if (4 in val_cartas)
					for (let [i, jog] of jogs.entries())
						if (jog.vida == a) {
							jog.vida -= 2
							if (jog.vida < 0)
								jog.vida = 0
							val[i] = ['-2', [1, 0, 0, 1]]
						}
				else if (3 in val_cartas)
					for (let [i, jog] of jogs.entries())
						if (jog.vida == a) {
							jog.vida -= 1
							if (jog.vida < 0)
								jog.vida = 0
							val[i] = ['-1', [1, 0, 0, 1]]
						}
			}
		}
		return ('', val, false)
	}
}


class Chefe {
	constructor(nome, vida, dano, imagem, hab) {
		this.nome = nome
		this.vida = vida
		this.dano = dano
		this.tipo = 'Chefe'
		this.imagem = imagem
		this.escuro = true
		this.hab = hab
	}

// 	def resolver(self):
// 		CHEFE_DICT_CARTAS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, 'espada': 5, 'chave': 0, 'boladecristal': 0, 'tocha': 0}
// 		danos = [['', [0, 0, 0, 0]]]*5
// 		morto = false

// 		if 4 in self.hab:
// 			if self.nome == 'Múmia':
// 				CHEFE_DICT_CARTAS['tocha'] = 5
// 			else if self.nome == 'Vampiro':
// 				CHEFE_DICT_CARTAS['tocha'] = 3
// 		if 6 in self.hab:
// 			CHEFE_DICT_CARTAS['boladecristal'] = 5

// 		val_cartas = sorted([sum(CHEFE_DICT_CARTAS[i] for i in j.ultima) for j in jogs])
// 		val_cartas = jogs.map(j=>CHEFE_DICT_CARTAS[j.ultima]).sorted((a,b)=>a-b)

// 		if 8 in self.hab:
// 			self.dano = -min(val_cartas[-1], 5)

// 		if sum(val_cartas) >= self.vida[len(jogs)]:
// 			morto = true
// 			if 5 in self.hab:
// 				moedas_bau_chefe = sorted(
// 					[max(DICT_CARTAS[i] if i != 'espada' else 0 for i in j.ultima) for j in jogs])
// 				for (let [i, jog] of jogs.entries())
// 					if max(DICT_CARTAS[i] for i in jog.ultima) == moedas_bau_chefe[-1]:
// 						jog.moedas += self.bau1//moedas_bau_chefe.count(
// 							moedas_bau_chefe[-1])
// 						if jog.moedas > 20:
// 							jog.moedas = 20
// 						danos[i] = [
// 							self.bau1//moedas_bau_chefe.count(moedas_bau_chefe[-1]), [1, 1, 0, 1]]
// 		else:
// 			for (let [i, jog] of jogs.entries())
// 				if 2 not in self.hab:
// 					if sum(CHEFE_DICT_CARTAS[j] for j in jog.ultima) == val_cartas[0]:
// 						if 11 in self.hab:
// 							if 'tocha' in jog.ultima:
// 								continue
// 						jog.vida += self.dano
// 						danos[i] = [str(self.dano), [1, 0, 0, 1]]
// 						if jog.vida < 0:
// 							jog.vida = 0
// 						if 9 in self.hab:
// 							jog.moedas -= val_cartas[-1] if val_cartas[-1] < 5 else 5
// 							if jog.moedas < 0:
// 								jog.moedas = 0
// 				else:
// 					if max(CHEFE_DICT_CARTAS[i] for i in jog.ultima) == val_cartas[-1] if val_cartas[-1] < 5 else 5:
// 						jog.vida += self.dano
// 						danos[i] = [str(self.dano), [1, 0, 0, 1]]
// 						if jog.vida < 0:
// 							jog.vida = 0

// 			if 1 in self.hab:
// 				val_cartas = [i for i in val_cartas if i != val_cartas[0]]
// 				for i, p in enumerate(jogs):
// 					if min(CHEFE_DICT_CARTAS[i] for i in jog.ultima) == val_cartas[0]:
// 						jog.vida += self.dano
// 						danos[i] = [str(self.dano), [1, 0, 0, 1]]
// 						if jog.vida < 0:
// 							jog.vida = 0

// 		return (str(sum(val_cartas)), danos, morto)
}


export function gerar_masmorra() {
	// gerar salas
	let aboboda00 = new Aboboda(1, 'aboboda0')  // 3
	let aboboda01 = new Aboboda(1, 'aboboda0')
	let aboboda02 = new Aboboda(1, 'aboboda0')
	let aboboda10 = new Aboboda(2, 'aboboda1')  // 2
	let aboboda11 = new Aboboda(2, 'aboboda1')

	let monstro00 = new Monstro('Cobra', {2: 8, 3: 8, 4: 10, 5: 13}, -3, 'cobra')
	let monstro10 = new Monstro('Zumbi', {2: 11, 3: 11, 4: 14, 5: 18}, -1, 'zumbi')
	let monstro20 = new Monstro('Esqueleto', {2: 11, 3: 11, 4: 14, 5: 18}, -3, 'esqueleto')
	let monstro30 = new Monstro('Cubo gelatinoso', {2: 14, 3: 14, 4: 18, 5: 23}, -1, 'cubo')
	let monstro40 = new Monstro('Troll', {2: 14, 3: 14, 4: 18, 5: 23}, -2, 'troll')  // 2
	let monstro41 = new Monstro('Troll', {2: 14, 3: 14, 4: 18, 5: 23}, -2, 'troll')
	let monstro50 = new Monstro('Dragão', {2: 14, 3: 14, 4: 18, 5: 23}, -3, 'dragao')  // 2
	let monstro51 = new Monstro('Dragão', {2: 14, 3: 14, 4: 18, 5: 23}, -3, 'dragao')
	let monstro60 = new Monstro('Goblin', {2: 11, 3: 11, 4: 14, 5: 18}, -2, 'goblin')  // 2
	let monstro61 = new Monstro('Goblin', {2: 11, 3: 11, 4: 14, 5: 18}, -2, 'goblin')

	let tesouro00 = new Tesouro(1, 0, 'tesouro0')
	let tesouro10 = new Tesouro(2, 0, 'tesouro1')
	let tesouro20 = new Tesouro(3, 0, 'tesouro2')
	let tesouro30 = new Tesouro(4, 0, 'tesouro3')
	let tesouro40 = new Tesouro(2, 1, 'tesouro4')  // 2
	let tesouro41 = new Tesouro(2, 1, 'tesouro4')
	let tesouro50 = new Tesouro(3, 2, 'tesouro5')  // 2
	let tesouro51 = new Tesouro(3, 2, 'tesouro5')
	let tesouro60 = new Tesouro(4, 2, 'tesouro6')  // 2
	let tesouro61 = new Tesouro(4, 2, 'tesouro6')

	let armadilha00 = new Armadilha('Armadilha de imã', 'mais', 'moedas', {5: -3, 4: -2, 3: -1}, 'armadilha0')  // 2
	let armadilha01 = new Armadilha('Armadilha de imã', 'mais', 'moedas', {5: -3, 4: -2, 3: -1}, 'armadilha0')
	let armadilha10 = new Armadilha('Armadilha de pedra', 'mais', 'vida', {5: -3, 4: -2, 3: -1}, 'armadilha1')
	let armadilha20 = new Armadilha('Armadilha de estacas', 'todos', 'vida', {3: -1, 2: -2, 1: '/2'}, 'armadilha2')
	let armadilha30 = new Armadilha('Armadilha de lava', 'todos', 'moedas', {3: -1, 2: -2, 1: '/2'}, 'armadilha3')

	let salas = [
		monstro00, monstro10, monstro20, monstro30, monstro40, monstro41, monstro50, monstro51, monstro60, monstro61,
		armadilha00, armadilha01, armadilha10, armadilha20, armadilha30,
		aboboda00, aboboda01, aboboda02, aboboda10, aboboda11,
		tesouro00, tesouro10, tesouro20, tesouro30, tesouro40, tesouro41, tesouro50, tesouro51, tesouro60, tesouro61
	]

	// gerar chefes
	let matilha_de_lobos = 	  new Chefe('Matilha de Lobos', {2: 14, 3: 14, 4: 14, 5: 18}, -3, 'matilha_de_lobos', [11, 0])
	let megadragao = 		  new Chefe('Megadragão', {2: 16, 3: 16, 4: 23, 5: 29}, -4, 'megadragao', [5, 0])
	let medusa = 			  new Chefe('Medusa', {2: 12, 3: 12, 4: 14, 5: 20}, -10, 'medusa', [10, 0])
	let minotauro =			  new Chefe('Minotauro', {2: 11, 3: 11, 4: 15, 5: 19}, -4, 'minotauro', [2, 0])
	let coletor_de_impostos = new Chefe('Coletor de impostos', {2: 14, 3: 14, 4: 18, 5: 23}, -4, 'coletor_de_impostos', [9, 0])
	let golem = 			  new Chefe('Golem', {2: 14, 3: 14, 4: 18, 5: 23}, 0, 'golem', [3, 8])
	let necromante = 		  new Chefe('Necromante', {2: 12, 3: 12, 4: 15, 5: 19}, -2, 'necromante', [7, 1])
	let vampiro = 			  new Chefe('Vampiro', {2: 14, 3: 14, 4: 18, 5: 23}, -3, 'vampiro', [4, 1])
	let esfinge = 			  new Chefe('Esfinge', {2: 14, 3: 14, 4: 18, 5: 23}, -4, 'esfinge', [6, 0])
	let mumia = 			  new Chefe('Múmia', {2: 13, 3: 13, 4: 18, 5: 23}, -4, 'mumia', [4, 0])
	let hidra = 			  new Chefe('Hídra', {2: 8, 3: 8, 4: 10, 5: 13}, -2, 'hidra', [12, 0])

	let chefes = [matilha_de_lobos, hidra, mumia, vampiro, necromante, coletor_de_impostos, golem, megadragao, medusa, esfinge, minotauro]

	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	// gerar masmorra
	shuffle(salas)
	for (let i=0; i<6; i++)
		salas.pop()
	for (let i=0; i<12; i++)
		salas[i].escuro = true
	shuffle(salas)
	salas.push(chefes[Math.floor(Math.random() * chefes.length)])

	let masmorras = []
	for (let i=0; i<25; i+=5)
		masmorras.push(salas.slice(i,i+5))

	return masmorras;
}

export function gerar_jogadores(quant_jogs, escolha) {
	let guerreiro =   new Personagem('Guerreiro',   10, 2, 'gue', ['1', '2', '3', '4', '5'])
	let mago =        new Personagem('Mago',        9,  1, 'mag', ['1', '2', '3', '4', '5', 'boladecristal', 'boladecristal'])
	let cavaleiro =   new Personagem('Cavaleiro',   9,  1, 'cav', ['1', '2', '3', '4', '5', 'espada'])
	let exploradora = new Personagem('Exploradora', 8,  3, 'exp', ['1', '2', '3', '4', '5', 'tocha'])
	let ladra =       new Personagem('Ladra',       8,  2, 'lad', ['1', '2', '3', '4', '5', 'chave'])

    let persIndex = {'guerreiro': 0, 'mago': 1, 'ladra': 2, 'exploradora': 3, 'cavaleiro': 4}
	let pers = [guerreiro, mago, ladra, exploradora, cavaleiro]

	let jogs = []

	if (escolha != 'aleatorio')
        jogs.push(pers.splice(persIndex[escolha], 1)[0])
	for (let i in '0'.repeat(quant_jogs-jogs.length))
        jogs.push(pers.splice(Math.floor(Math.random()*pers.length), 1)[0])

	return jogs;
}
