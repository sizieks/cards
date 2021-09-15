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

    fillUpStationCell(cell, value) {
        Object.keys(value).forEach(key => {
            cell.innerHTML += `<p class='${key}'>${value[key]}</p>`
        })
    }

    fillUpTicketsCell(cell, value) {
        let index = 2

        cell.innerHTML += `<div class='subcell-0 header-type'></div>
                           <div class='subcell-1 header-seats'>Seats</div>
                           <div class='subcell-2 header-price'>Price</div>`
        value.forEach(item => {
            Object.keys(item).forEach(key => {
                const subcell = this.createElem({parent: cell, className: 'subcell-' + (++index) + ' ' + key})
                if (key === 'price') {
                    subcell.innerHTML += `from ${item[key]}`
                } else {
                    subcell.innerHTML += item[key]
                }
            })
        })
    }

    printTicket(trains) {
        const wrapper = this.createElem({parent: document.body, className: 'wrapper'})

        trains.forEach(train => {
            const card = this.createElem({parent: wrapper, className: 'card'})

            Object.keys(train).forEach(key => {
                const cell = this.createElem({parent: card, className: 'cell' + ' ' + key})

                if (key === 'departure' || key === 'destination') {
                    this.fillUpStationCell(cell, train[key])
                } else if (key === 'tickets') {
                    this.fillUpTicketsCell(cell, train[key])
                } else {
                    cell.innerHTML += train[key]
                }
            })
        })
    }
}

const rzd = Array(8).fill(example[0])
const ticket = new Ticket
ticket.printTicket(rzd)
