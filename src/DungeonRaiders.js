const DICT_CARTAS = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, 'espada': 5, 'chave': 5, 'bola_de_cristal': 0, 'tocha': 0}

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
			carta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
			if (((carta == 'chave') && (tipo != 'Tesouro')) || ((carta == 'espada') && (tipo != 'Monstro')))
				continue;
			if ((carta == 'tocha') || (carta == 'bola_de_cristal'))
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
			if ((3 in hab) && (carta == 'espada'))
				continue;
			if ((7 in hab) && (carta == 'bola_de_cristal'))
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
			if (7 in hab && carta == 'bola_de_cristal')
				continue;
			break;
        }
		this.ultima[1] = carta;
		this.cartas.splice(this.cartas.indexOf(carta), 1);
    }

	redefinir() {
		this.cartas = this.cartas.filter(c => !(c in ['1', '2', '3', '4', '5']))
		this.cartas = ['1', '2', '3', '4', '5', ...this.cartas]
    }
}

class Aboboda {
	constructor(itens, imagem) {
		this.itens = itens
		this.imagem = imagem
		this.tipo = 'Abóboda'
		this.escuro = false
	}

	resolver(jogs) {
		let val = Array(5).fill(['', '#fff'])

		for (let [i, jog] of jogs.entries()) {
			switch (jog.ultima) {
				case '1': {
					if (this.itens == 1) {
						jog.cartas.push('tocha')
						val[i] = ['tocha', '#fff']
					}
					else {
						jog.moedas += 1
						val[i] = ['+1', '#ff0']
					}
					break
				}
				case '2': {
					if (this.itens == 1) {
						jog.cartas.push('bola_de_cristal')
						val[i] = ['bola_de_cristal', '#fff']
					}
					else {
						jog.moedas += 2
						val[i] = ['+2', '#ff0']
					}
					break
				}
				case '3': {
					if (this.itens == 1) {
						jog.cartas.push('chave')
						val[i] = ['chave', '#fff']
					}
					else {
						jog.vida += 1
						val[i] = ['+1', '#f00']
					}
					break
				}
				case '4': {
					if (this.itens == 1) {
						jog.cartas.push('espada')
						val[i] = ['espada', '#fff']
					}
					else {
						jog.moedas += 3
						val[i] = ['+3', '#ff0']
					}
					break
				}
				case '5': {
					if (this.itens == 1) {
						jog.vida += 1
						val[i] = ['+1', '#f00']
					}
					else {
						jog.vida += 2
						val[i] = ['+2', '#f00']
					}
					break
				}
			}
			if (jog.moedas > 20) jog.moedas = 20
			if (jog.vida   > 10) jog.vida   = 10
		}

		return ['', val, false]
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

	resolver(jogs) {
		let val_cartas = jogs.map(j=>DICT_CARTAS[j.ultima]).sort((a,b)=>a-b)
		let danos = Array(5).fill(['', '#f00'])
		let morto = false

		// dois jogadores
		if (jogs.length == 2) {
			if (val_cartas[0] == val_cartas[1])
				return ('? ? ?', danos, morto)
		}

		if (val_cartas.reduce((x,i)=>x+i, 0) < this.vida[jogs.length]) {
			for (let [i, jog] of jogs.entries()) {
				if (DICT_CARTAS[jog.ultima] == val_cartas[0]) {
					jog.vida += this.dano
					danos[i] = [this.dano, '#f00']
					if (jog.vida < 0)
						jog.vida = 0
				}
			}
		}
		else
			morto = true

		return [val_cartas.reduce((a,b)=>a+b,0), danos, morto]
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

	resolver(jogs) {
		let val_cartas = jogs.map(j=>DICT_CARTAS[j.ultima]).sort((a,b)=>a-b)
		let din = Array(5).fill(['', '#ff0'])

		let x = Math.floor(this.bau1/val_cartas.filter(x => x==val_cartas[val_cartas.length-1]).length)
		for (let [i, jog] of jogs.entries()) {
			if (DICT_CARTAS[jog.ultima] == val_cartas[val_cartas.length-1]) {
				jog.moedas += x
				if (jog.moedas > 20)
					jog.moedas = 20
				din[i] = ['+'+x, '#ff0']
			}
		}

		if (this.bau2) {
			val_cartas = val_cartas.filter(i=>i!=val_cartas[val_cartas.length-1])
			if (val_cartas.length == 0)
				return ('', din, false)
			x = Math.floor(this.bau2/val_cartas.filter(x=>x==val_cartas[val_cartas.length-1]).length)
			for (let [i, jog] of jogs.entries()) {
				if (DICT_CARTAS[jog.ultima] == val_cartas[val_cartas.length-1]) {
					jog.moedas += x
					if (jog.moedas > 20)
						jog.moedas = 20
					din[i] = ['+'+x, '#ff0']
				}
			}
		}

		return ['', din, false]
	}
}

class Armadilha {
	constructor(nome, afeto, valor, imagem) {
		this.nome = nome
		this.afeto = afeto
		this.valor = valor
		this.imagem = imagem
		this.tipo = 'Armadilha'
		this.escuro = false
	}

	resolver(jogs) {
		let val_cartas = jogs.map(j=>DICT_CARTAS[j.ultima]).sort((a,b)=>a-b)
		let val = Array(5).fill(['', '#f00'])

		if (this.afeto == 'todos') {
			if (val_cartas.includes(1))
				for (let [i, jog] of jogs.entries())
					if (this.valor == 'moedas') {
						jog.moedas = Math.floor(jog.moedas/2)
						val[i] = ['/2', '#ff0']
					} else {
						jog.vida = Math.floor(jog.vida/2)
						val[i] = ['/2', '#f00']
					}
			else if (val_cartas.includes(2))
				for (let [i, jog] of jogs.entries())
					if (this.valor == 'moedas') {
						jog.moedas -= 2
						if (jog.moedas < 0)
							jog.moedas = 0
						val[i] = ['-2', '#ff0']
					} else {
						jog.vida -= 2
						if (jog.vida < 0)
							jog.vida = 0
						val[i] = ['-2', '#f00']
					}
			else if (val_cartas.includes(3))
				for (let [i, jog] of jogs.entries())
					if (this.valor == 'moedas') {
						jog.moedas -= 1
						if (jog.moedas < 0)
							jog.moedas = 0
						val[i] = ['-1', '#ff0']
					} else {
						jog.vida -= 1
						if (jog.vida < 0)
							jog.vida = 0
						val[i] = ['-1', '#f00']
					}
		}
		else {
			if (this.valor == 'moedas') {
				let a = Math.max(...jogs.map(j=>j.moedas))
				if (val_cartas.includes(5)) {
					for (let [i, jog] of jogs.entries()) {
						if (jog.moedas == a) {
							jog.moedas -= 3
							if (jog.moedas < 0)
								jog.moedas = 0
							val[i] = ['-3', '#ff0']
						}
					}
				}
				else if (val_cartas.includes(4)) {
					for (let [i, jog] of jogs.entries()) {
						if (jog.moedas == a) {
							jog.moedas -= 2
							if (jog.moedas < 0)
								jog.moedas = 0
							val[i] = ['-2', '#ff0']
						}
					}
				}
				else if (val_cartas.includes(3)) {
					for (let [i, jog] of jogs.entries()) {
						if (jog.moedas == a) {
							jog.moedas -= 1
							if (jog.moedas < 0)
								jog.moedas = 0
							val[i] = ['-1', '#ff0']
						}
					}
				}
			}
			else {
				let a = Math.max(...jogs.map(j=>j.vida))
				if (val_cartas.includes(5)) {
					for (let [i, jog] of jogs.entries()) {
						if (jog.vida == a) {
							jog.vida -= 3
							if (jog.vida < 0)
								jog.vida = 0
							val[i] = ['-3', '#f00']
						}
					}
				}
				else if (val_cartas.includes(4)) {
					for (let [i, jog] of jogs.entries()) {
						if (jog.vida == a) {
							jog.vida -= 2
							if (jog.vida < 0)
								jog.vida = 0
							val[i] = ['-2', '#f00']
						}
					}
				}
				else if (val_cartas.includes(3)) {
					for (let [i, jog] of jogs.entries()) {
						if (jog.vida == a) {
							jog.vida -= 1
							if (jog.vida < 0)
								jog.vida = 0
							val[i] = ['-1', '#f00']
						}
					}
				}
			}
		}
		return ['', val, false]
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

// 	def resolver(this):
// 		CHEFE_DICT_CARTAS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, 'espada': 5, 'chave': 0, 'bola_de_cristal': 0, 'tocha': 0}
// 		danos = Array(5).fill(['', [0, 0, 0, 0]])
// 		morto = false

// 		if 4 in this.hab:
// 			if this.nome == 'Múmia':
// 				CHEFE_DICT_CARTAS['tocha'] = 5
// 			else if this.nome == 'Vampiro':
// 				CHEFE_DICT_CARTAS['tocha'] = 3
// 		if 6 in this.hab:
// 			CHEFE_DICT_CARTAS['bola_de_cristal'] = 5

// 		val_cartas = sort([sum(CHEFE_DICT_CARTAS[i] for i in j.ultima) for j in jogs])
// 		val_cartas = jogs.map(j=>CHEFE_DICT_CARTAS[j.ultima]).sort((a,b)=>a-b)

// 		if 8 in this.hab:
// 			this.dano = -min(val_cartas[-1], 5)

// 		if sum(val_cartas) >= this.vida[len(jogs)]:
// 			morto = true
// 			if 5 in this.hab:
// 				moedas_bau_chefe = sort(
// 					[max(DICT_CARTAS[i] if i != 'espada' else 0 for i in j.ultima) for j in jogs])
// 				for (let [i, jog] of jogs.entries())
// 					if max(DICT_CARTAS[i] for i in jog.ultima) == moedas_bau_chefe[-1]:
// 						jog.moedas += this.bau1//moedas_bau_chefe.count(
// 							moedas_bau_chefe[-1])
// 						if jog.moedas > 20:
// 							jog.moedas = 20
// 						danos[i] = [
// 							this.bau1//moedas_bau_chefe.count(moedas_bau_chefe[-1]), '#ff0']
// 		else:
// 			for (let [i, jog] of jogs.entries())
// 				if 2 not in this.hab:
// 					if sum(CHEFE_DICT_CARTAS[j] for j in jog.ultima) == val_cartas[0]:
// 						if 11 in this.hab:
// 							if 'tocha' in jog.ultima:
// 								continue
// 						jog.vida += this.dano
// 						danos[i] = [str(this.dano), '#f00']
// 						if jog.vida < 0:
// 							jog.vida = 0
// 						if 9 in this.hab:
// 							jog.moedas -= val_cartas[-1] if val_cartas[-1] < 5 else 5
// 							if jog.moedas < 0:
// 								jog.moedas = 0
// 				else:
// 					if max(CHEFE_DICT_CARTAS[i] for i in jog.ultima) == val_cartas[-1] if val_cartas[-1] < 5 else 5:
// 						jog.vida += this.dano
// 						danos[i] = [str(this.dano), '#f00']
// 						if jog.vida < 0:
// 							jog.vida = 0

// 			if 1 in this.hab:
// 				val_cartas = [i for i in val_cartas if i != val_cartas[0]]
// 				for i, p in enumerate(jogs):
// 					if min(CHEFE_DICT_CARTAS[i] for i in jog.ultima) == val_cartas[0]:
// 						jog.vida += this.dano
// 						danos[i] = [str(this.dano), '#f00']
// 						if jog.vida < 0:
// 							jog.vida = 0

// 		return (str(sum(val_cartas)), danos, morto)
}

export function gerarMasmorra() {
	// gerar salas
	let aboboda00 = new Aboboda(1, 'aboboda0')  // 3
	let aboboda01 = new Aboboda(1, 'aboboda0')
	let aboboda02 = new Aboboda(1, 'aboboda0')
	let aboboda10 = new Aboboda(2, 'aboboda1')  // 2
	let aboboda11 = new Aboboda(2, 'aboboda1')

	let monstro00 = new Monstro('Cobra',           {2: 8,  3: 8,  4: 10, 5: 13}, -3, 'cobra')
	let monstro10 = new Monstro('Zumbi',           {2: 11, 3: 11, 4: 14, 5: 18}, -1, 'zumbi')
	let monstro20 = new Monstro('Esqueleto',       {2: 11, 3: 11, 4: 14, 5: 18}, -3, 'esqueleto')
	let monstro30 = new Monstro('Cubo gelatinoso', {2: 14, 3: 14, 4: 18, 5: 23}, -1, 'cubo')
	let monstro40 = new Monstro('Troll',           {2: 14, 3: 14, 4: 18, 5: 23}, -2, 'troll')  // 2
	let monstro41 = new Monstro('Troll',           {2: 14, 3: 14, 4: 18, 5: 23}, -2, 'troll')
	let monstro50 = new Monstro('Dragão',          {2: 14, 3: 14, 4: 18, 5: 23}, -3, 'dragao')  // 2
	let monstro51 = new Monstro('Dragão',          {2: 14, 3: 14, 4: 18, 5: 23}, -3, 'dragao')
	let monstro60 = new Monstro('Goblin',          {2: 11, 3: 11, 4: 14, 5: 18}, -2, 'goblin')  // 2
	let monstro61 = new Monstro('Goblin',          {2: 11, 3: 11, 4: 14, 5: 18}, -2, 'goblin')

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

	let armadilha00 = new Armadilha('Armadilha de imã',     'mais',  'moedas', 'armadilha0')  // 2
	let armadilha01 = new Armadilha('Armadilha de imã',     'mais',  'moedas', 'armadilha0')
	let armadilha10 = new Armadilha('Armadilha de pedra',   'mais',  'vida',   'armadilha1')
	let armadilha20 = new Armadilha('Armadilha de estacas', 'todos', 'vida',   'armadilha2')
	let armadilha30 = new Armadilha('Armadilha de lava',    'todos', 'moedas', 'armadilha3')

	let salas = [
		aboboda00, aboboda01, aboboda02, aboboda10, aboboda11,
		monstro00, monstro10, monstro20, monstro30, monstro40, monstro41, monstro50, monstro51, monstro60, monstro61,
		tesouro00, tesouro10, tesouro20, tesouro30, tesouro40, tesouro41, tesouro50, tesouro51, tesouro60, tesouro61,
		armadilha00, armadilha01, armadilha10, armadilha20, armadilha30
	]

	// gerar chefes
	let matilha_de_lobos = 	  new Chefe('Matilha de Lobos',    {2: 14, 3: 14, 4: 14, 5: 18}, -3,  'matilha_de_lobos',    [11, 0])
	let megadragao = 		  new Chefe('Megadragão',          {2: 16, 3: 16, 4: 23, 5: 29}, -4,  'megadragao',          [5,  0])
	let medusa = 			  new Chefe('Medusa',              {2: 12, 3: 12, 4: 14, 5: 20}, -10, 'medusa',              [10, 0])
	let minotauro =			  new Chefe('Minotauro',           {2: 11, 3: 11, 4: 15, 5: 19}, -4,  'minotauro',           [2,  0])
	let coletor_de_impostos = new Chefe('Coletor de impostos', {2: 14, 3: 14, 4: 18, 5: 23}, -4,  'coletor_de_impostos', [9,  0])
	let golem = 			  new Chefe('Golem',               {2: 14, 3: 14, 4: 18, 5: 23},  0,  'golem',               [3,  8])
	let necromante = 		  new Chefe('Necromante',          {2: 12, 3: 12, 4: 15, 5: 19}, -2,  'necromante',          [7,  1])
	let vampiro = 			  new Chefe('Vampiro',             {2: 14, 3: 14, 4: 18, 5: 23}, -3,  'vampiro',             [4,  1])
	let esfinge = 			  new Chefe('Esfinge',             {2: 14, 3: 14, 4: 18, 5: 23}, -4,  'esfinge',             [6,  0])
	let mumia = 			  new Chefe('Múmia',               {2: 13, 3: 13, 4: 18, 5: 23}, -4,  'mumia',               [4,  0])
	let hidra = 			  new Chefe('Hídra',               {2: 8,  3: 8,  4: 10, 5: 13}, -2,  'hidra',               [12, 0])

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
	salas.splice(0, 6)
	salas.slice(0, 12).forEach(x=>x.escuro=true)
	shuffle(salas)
	salas.push(chefes[Math.floor(Math.random() * chefes.length)])

	let masmorras = []
	for (let i=0; i<25; i+=5)
		masmorras.push(salas.slice(i,i+5))

	return masmorras
}

export function gerarJogadores(quant_jogs, escolha) {
	let guerreiro =   new Personagem('Guerreiro',   10, 2, 'gue', ['1', '2', '3', '4', '5'])
	let mago =        new Personagem('Mago',        9,  1, 'mag', ['1', '2', '3', '4', '5', 'bola_de_cristal', 'bola_de_cristal'])
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

	return jogs
}
