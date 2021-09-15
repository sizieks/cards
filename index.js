let example = [
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

let ticket = {
    css: `
        html {
            font-family: sans-serif;
            font-size: 75%;
        }

        body {
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: #8a8691;
        }

        .wrapper {
            width: 750px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .card {
            display: grid;
            grid-template-areas: "train train train"
                                 "route route route"
                                 "departure isDirect destination"
                                 "departure duration destination"
                                 "tickets tickets tickets";
            grid-template-rows: 25px 25px 30px 30px 85px; 
            grid-template-columns: repeat(3,80px);
            justify-content: center;

            margin: 5px;
            box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        }

        .cell {
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #6D6875;
            color: #FFD166;
        }

        .train {
            grid-area: train;
        }

        .route {
            grid-area: route;
        }

        .departure {
            grid-area: departure;
            color: #06D6A0;
        }

        .destination {
            grid-area: destination;
            color: #06D6A0;
        }

        .isDirect {
            grid-area: isDirect;
            color: #06D6A0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-bottom: 5px;
        }

        .duration {
            grid-area: duration
            color: #06D6A0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-top: 5px;
            border-top: 1px solid #FFD166;
        }

        .tickets {
            grid-area: tickets;
            display: grid;
            grid-template-areas: "subcell-0 subcell-1 subcell-2"
                                 "subcell-3 subcell-4 subcell-5"
                                 "subcell-6 subcell-7 subcell-8"
                                 "subcell-9 subcell-10 subcell-11";
            grid-template-rows: repeat(4, 20px);
            grid-template-columns: repeat(3, auto);
        }

        [class^="subcell"] {
            padding: 5px;
            display: inline-flex;
            justify-content: center;
        }

        .subcell-0 {
            grid-area: subcell-0;
        }

        .subcell-1 {
            grid-area: subcell-1;
        }

        .subcell-2 {
            grid-area: subcell-2;
        }

        .subcell-3 {
            grid-area: subcell-3;
            justify-self: left;
        }

        .subcell-4 {
            grid-area: subcell-4;
        }

        .subcell-5 {
            grid-area: subcell-5;
        }

        .subcell-6 {
            grid-area: subcell-6;
            justify-self: left;
        }

        .subcell-7 {
            grid-area: subcell-7;
        }

        .subcell-8 {
            grid-area: subcell-8;
        }

        .subcell-9 {
            grid-area: subcell-9;
            justify-self: left;
        }

        .subcell-10 {
            grid-area: subcell-10;
        }

        .subcell-11 {
            grid-area: subcell-11;
        }

        .date,
        .time,
        .station {
            margin: 0px;
        }

        .time {
            order: 1;
            font-weight: bold;
            font-size: 175%;
        }

        .station {
            order: 0;
        }

        .date {
            order: 2;
        }

        .price {
            color: #EF476F;
        }
    `,

    createElem({parent, child = 'div', className}) {
        const elem = document.createElement(child)
        elem.className = className
        if (elem.className === 'undefined') {
            elem.removeAttribute('class')
        }
        parent.append(elem)
        return elem
    },

    insertStyle() {
        const style = this.createElem({parent: document.head, child: 'style'})
        style.type = 'text/css'
        style.innerHTML = this.css
    },

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
                    let count = 2
                    cell.innerHTML += `<div class='subcell-0 header-type'></div>
                                       <div class='subcell-1 header-seats'>Seats</div>
                                       <div class='subcell-2 header-price'>Price</div>`
                    for (let ticket in data[train][key]) {
                        for (let subkey in data[train][key][ticket]) {
                            const subcell = this.createElem({parent: cell, className: 'subcell-' + (++count) + ' ' + subkey})
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
    },
}

let rzd = Array(8).fill(example[0])
ticket.insertStyle()
ticket.printTicket(rzd)
