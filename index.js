const example = [
	{
		train: '№ 105E',
		route: 'NIZHVEVAR 1 - VOLGOGR 1',
		departure: {
			time: '3:45',
			date: '14.07.2021',
			station: 'IANAUL'
		},
		destination: {
			time: '11:18',
			date: '14.07.2021',
			station: 'KAZAN'
		},
		isDirect: 'direct train',
		duration: '7h 33min',
		tickets: [
			{
				type: '1-cl. sleeping compt.',
				seats: 50,
				price: 5000
			},
			{
				type: '2-cl. sleeping compt.',
				seats: 35,
				price: 3648
			},
			{
				type: '3-cl. open sleeping',
				seats: 15,
				price: 1337
			},
		]
	},
]

class Ticket {
    createElem({parent, child = 'div', className}) {
        const elem = document.createElement(child)
        if (className) {
            elem.className = className
        }
        parent.append(elem)
        return elem
    }

    printTicket(data) {
        const wrapper = this.createElem({parent: document.body, className: 'wrapper'})
        for (let train = 0; train < data.length; train++) {
            const card = this.createElem({parent: wrapper, className: 'card'})
            for (let key in data[train]) {
                const cell = this.createElem({parent: card, className: 'cell' + ' ' + key})
                if (key === 'departure' || key === 'destination' ) {
                    for (let subkey in data[train][key]) {
                        cell.innerHTML += `<p class='${subkey}'>${data[train][key][subkey]}</p>`
                    }
                } else if (key === 'tickets') {
                    let index = 2
                    cell.innerHTML += `<div class='subcell-0 header-type'></div>
                                       <div class='subcell-1 header-seats'>Seats</div>
                                       <div class='subcell-2 header-price'>Price</div>`
                    for (let ticket in data[train][key]) {
                        for (let subkey in data[train][key][ticket]) {
                            const subcell = this.createElem({parent: cell, className: 'subcell-' + (++index) + ' ' + subkey})
                            if (subkey === 'price') {
                                subcell.innerHTML += `from ${data[train][key][ticket][subkey]}`
                            } else {
                                subcell.innerHTML += data[train][key][ticket][subkey]
                            }
                        }
                    }
                } else {
                    cell.innerHTML += data[train][key]
                }
            }
        }
    }
}

const rzd = Array(8).fill(example[0])
// new Ticket().printTicket(rzd)
const ticket = new Ticket
ticket.printTicket(rzd)
