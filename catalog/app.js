const open = require('open')
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

const host = 'localhost'
const port = process.env.PORT || 8000
const url = `http://${host}:${port}/`

const card_files = [
	'/../src/data/cards1.asm',
	'/../src/data/cards2.asm'
]

const deck_files = [
	'/../src/data/decks.asm'
]

String.prototype.cleanEnd = function(to_remove) {
	return this.substring(0, this.length - to_remove.length)
}

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/data.json', (req, res) => {
	let card_lookup = {

	}
	let data = {
		cards: { },
		decks: { }
	}
	card_files.forEach((file) => {
		let lines = fs.readFileSync(path.join(__dirname, file), 'utf8').split('\n')
		while(lines.length > 0) {
			var card = {
				appearances: 0
			}
			
			card.key_name = lines[0].cleanEnd(':')
			
			lines.shift()
			card.typing = lines[0].split(' ')[1]
			card.type = lines[0].split(' ')[1].split('_')[1]
			lines.shift()
			if(card.type != 'PKMN') {
				lines.shift()
				card.evolution_name = lines[0].split(' ')[1]
				lines.shift()
				card.rarity = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.set = lines[0].split(' ')[1]
				lines.shift()
				card.name = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.description_1 = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				lines.shift()
			} else {
				card.attacks = {
					0: { },
					1: { }
				}
				lines.shift()
				card.evolution_name = lines[0].split(' ')[1]
				lines.shift()
				card.rarity = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.set = lines[0].split(' ')[1]
				lines.shift()
				card.name = lines[0].split(' ')[1]
				lines.shift()
				card.hp = lines[0].split(' ')[1]
				lines.shift()
				card.stage = lines[0].split(' ')[1]
				lines.shift()
				card.previous_evolution_name = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				lines.shift()
				card.attacks[0].energies = lines[0].split('	energy ')[1].cleanEnd(' ; energies')
				lines.shift()
				card.attacks[0].name = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[0].description_1 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[0].description_2 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[0].damage = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[0].category = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.attacks[0].flags_1 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[0].flags_2 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[0].flags_3 = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.attacks[0].animation = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				lines.shift()
				card.attacks[1].energies = lines[0].split('	energy ')[1].cleanEnd(' ; energies')
				lines.shift()
				card.attacks[1].name = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[1].description_1 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[1].description_2 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[1].damage = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[1].category = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.attacks[1].flags_1 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[1].flags_2 = lines[0].split(' ')[1]
				lines.shift()
				card.attacks[1].flags_3 = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.attacks[1].animation = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
				card.retreat = lines[0].split(' ')[1]
				lines.shift()
				card.weakness = lines[0].split(' ')[1]
				lines.shift()
				card.resistance = lines[0].split(' ')[1]
				lines.shift()
				card.category = lines[0].split(' ')[1]
				lines.shift()
				card.pokedex = lines[0].split(' ')[1]
				lines.shift()
				card.dark = lines[0].split(' ')[1]
				lines.shift()
				card.level = lines[0].split(' ')[1]
				lines.shift()
				card.length = lines[0].split(' ')[1]
				lines.shift()
				card.weight = lines[0].split(' ')[1]
				lines.shift()
				card.description = lines[0].split(' ')[1]
				lines.shift()
				card.ai = lines[0].split(' ')[1]
				lines.shift()
				lines.shift()
			}

			data.cards[card.name] = card
			card_lookup[card.key_name] = card.name
		}
	})

	deck_files.forEach((file) => {let lines = fs.readFileSync(path.join(__dirname, file), 'utf8').split('\n')
		lines.shift()
		while(lines[0] != '	dw $0000') {
			lines.shift()
		}
		lines.shift()
		lines.shift()

		while(lines.length > 0 && lines[0] != undefined) {
			var deck = {
				cards: [ ]
			}
			deck.key_name = lines[0].cleanEnd(':')
			lines.shift()

			while(lines[0].startsWith('	dbw') && lines[0] != undefined) {
				let [ count, card ] = lines[0].split('	dbw ')[1].trimStart().split(', ')
				for(let i = 0; i < Number(count); i++) {
					deck.cards.push(card)
				}
				lines.shift()
			}

			data.decks[deck.key_name] = deck

			lines.shift()
			lines.shift()
		}
	})

	decks_to_ignore = [
		'StarterDeck',
		'SweatAntiGR1Deck',
		'GiveInAntiGR2Deck',
		'VengefulAntiGR3Deck',
		'UnforgivingAntiGR4Deck',
		'UnusedSamsPracticeDeck',
		'AaronPracticeDeck1',
		'AaronPracticeDeck2',
		'AaronPracticeDeck3',
		'AaronsStep1Deck',
		'AaronsStep2Deck',
		'AaronsStep3Deck',
		'PlayerPracticeDeck'
	]

	for(let deck_key_name in data.decks) {
		if(decks_to_ignore.indexOf(deck_key_name) > -1) {
			continue
		}
		data.decks[deck_key_name].cards.forEach((card) => {
			data.cards[card].appearances++
		})
	}

	res.send(JSON.stringify(data, null, "\t"))
})

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
	console.log(`In your web browser, visit: ${url}`)
	open(`${url}`)
})