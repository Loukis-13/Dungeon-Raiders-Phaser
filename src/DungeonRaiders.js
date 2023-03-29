import { ColetorDeImpostos, Esfinge, Golem, Hidra, MatilhaDeLobos, Medusa, Megadragao, Minotauro, Mumia, Necromante, Vampiro } from "./dungeon-raiders/chefes.js";
import { Personagem } from "./dungeon-raiders/personagens.js";
import { Aboboda } from "./dungeon-raiders/aboboda.js";
import { Monstro } from "./dungeon-raiders/monstro.js";
import { Tesouro } from "./dungeon-raiders/tesouro.js";
import { Armadilha } from "./dungeon-raiders/Armadilha.js";

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function gerarMasmorra() {
	// gerar salas
	let salas = [
		new Aboboda(1, 'aboboda0'),  // 3
		new Aboboda(1, 'aboboda0'),
		new Aboboda(1, 'aboboda0'),
		new Aboboda(2, 'aboboda1'),  // 2
		new Aboboda(2, 'aboboda1'),

		new Monstro('Cobra',           {3: 8,  4: 10, 5: 13}, 3, 'cobra'),
		new Monstro('Zumbi',           {3: 11, 4: 14, 5: 18}, 1, 'zumbi'),
		new Monstro('Esqueleto',       {3: 11, 4: 14, 5: 18}, 3, 'esqueleto'),
		new Monstro('Cubo gelatinoso', {3: 14, 4: 18, 5: 23}, 1, 'cubo'),
		new Monstro('Troll',           {3: 14, 4: 18, 5: 23}, 2, 'troll'),  // 2
		new Monstro('Troll',           {3: 14, 4: 18, 5: 23}, 2, 'troll'),
		new Monstro('Dragão',          {3: 14, 4: 18, 5: 23}, 3, 'dragao'),  // 2
		new Monstro('Dragão',          {3: 14, 4: 18, 5: 23}, 3, 'dragao'),
		new Monstro('Goblin',          {3: 11, 4: 14, 5: 18}, 2, 'goblin'),  // 2
		new Monstro('Goblin',          {3: 11, 4: 14, 5: 18}, 2, 'goblin'),

		new Tesouro([1],    'tesouro0'),
		new Tesouro([2],    'tesouro1'),
		new Tesouro([3],    'tesouro2'),
		new Tesouro([4],    'tesouro3'),
		new Tesouro([2, 1], 'tesouro4'),  // 2
		new Tesouro([2, 1], 'tesouro4'),
		new Tesouro([3, 2], 'tesouro5'),  // 2
		new Tesouro([3, 2], 'tesouro5'),
		new Tesouro([4, 2], 'tesouro6'),  // 2
		new Tesouro([4, 2], 'tesouro6'),

		new Armadilha('Armadilha de imã',     false,  true,  'armadilha0'),  // 2
		new Armadilha('Armadilha de imã',     false,  true,  'armadilha0'),
		new Armadilha('Armadilha de pedra',   false,  false, 'armadilha1'),
		new Armadilha('Armadilha de estacas', true,   false, 'armadilha2'),
		new Armadilha('Armadilha de lava',    true,   true,  'armadilha3'),
	]

	const chefes = [ColetorDeImpostos, Esfinge, Golem, Hidra, MatilhaDeLobos, Medusa, Megadragao, Minotauro, Mumia, Necromante, Vampiro]
	const chefe = chefes[Math.floor(Math.random() * chefes.length)]

	// gerar masmorra
	shuffle(salas)
	salas.splice(0, 6)
	salas.slice(0, 12).forEach(x=>x.escuro=true)
	shuffle(salas)
	salas.push(new chefe())

	let masmorras = []
	for (let i=0; i<25; i+=5)
		masmorras.push(salas.slice(i, i+5))

	return masmorras
}

export function gerarJogadores(quant_jogs, escolha) {
	let pers = [
		['Guerreiro',   10, 2, 'gue', ['1', '2', '3', '4', '5']],
		['Mago',        9,  1, 'mag', ['1', '2', '3', '4', '5', 'bola_de_cristal', 'bola_de_cristal']],
		['Ladra',       8,  2, 'lad', ['1', '2', '3', '4', '5', 'chave']],
		['Exploradora', 8,  3, 'exp', ['1', '2', '3', '4', '5', 'tocha']],
		['Cavaleiro',   9,  1, 'cav', ['1', '2', '3', '4', '5', 'espada']],
	]

	let jogs = []

	if (escolha != 'aleatorio') {
		let persIndex = {'guerreiro': 0, 'mago': 1, 'ladra': 2, 'exploradora': 3, 'cavaleiro': 4}
        jogs.push(pers.splice(persIndex[escolha], 1)[0]);
		quant_jogs--;
	}
	for (let i=0; i<quant_jogs; i++)
        jogs.push(pers.splice(Math.floor(Math.random()*pers.length), 1)[0])

	return jogs.map(j => new Personagem(...j))
}
