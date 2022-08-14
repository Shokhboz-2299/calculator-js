const removeC = document.querySelector('.remove-element-c')
const removeR = document.querySelector('.remove-element-r')
const display = document.querySelector('#display')
const equal = document.querySelector('.equal')
const dot = document.querySelector('.dot')
const numbers = document.querySelectorAll('.num')
const signs = document.querySelectorAll('.sign')

class Calculator {
	operator = null
	operatorView = null
	isDot = false

	set setDisplay (value) {
		display.value = display.value + value
	}

	get lastValue () {
		return display.value[display.value.length - 1]
	}

	get firstValue () {
		return display.value[0]
	}

	removeC () {
		display.value = ''
		this.operator = null
		this.isDot = false
	}

	removeR () {
		if(this.lastValue == '.') this.isDot = false
		if(['-', '+', '✕', '÷'].includes(this.lastValue)) {
			this.operator = null
			this.operatorView = null
		}
		display.value = display.value.slice(0, -1)
	}

	number (value) {
		if(this.firstValue == 0 && display.value.length == 1) return display.value = value
		if(
			(!(typeof(+value) == 'number') && !isNaN(+value)) ||
			(this.operator && this.lastValue == '0' && !this.isDot)
		) return
		
		this.setDisplay = value
	}

	dot (value) {
		if(
			display.value == '' ||
			this.lastValue == this.operator
		) return this.setDisplay = '0.'

		if(
			this.isDot ||
			this.lastValue == '.' ||
			['-', '+', '✕', '÷'].includes(this.lastValue)
		) return 

		this.isDot = true
		this.setDisplay = value
	}

	sign (operator, operatorView) {
		if(['-', '+', '✕', '÷'].includes(this.lastValue)) {
			this.operator = operator
			this.operatorView = operatorView
			return display.value = display.value.slice(0, -1) + operatorView
		}

		if(
			this.operator ||
			display.value == '' ||
			this.lastValue == '.'
		) return 

		this.isDot = false
		this.operator = operator
		this.operatorView = operatorView
		this.setDisplay = operatorView
	}
	
	calculate () {
		const [num1, num2] = display.value.split(this.operatorView)
		if(
			this.lastValue == '.' ||
			!num2 || !num1
		) return 

		display.value = eval(num1 + this.operator + num2)

		this.operator = null
		this.operatorView = null
		if(!display.value.includes('.')) this.isDot = false
	}
}

let calculator = new Calculator()

for(let number of numbers) {
	number.onclick = () => {
		calculator.number(number.textContent)
	}
}

for(let sign of signs) {
	sign.onclick = () => {
		calculator.sign(sign.dataset.sign, sign.textContent)
	}
}

equal.onclick = () => {
	calculator.calculate()
}

dot.onclick = () => {
	calculator.dot('.')
}

removeC.onclick = () => {
	calculator.removeC()
}

removeR.onclick = () => {
	calculator.removeR()
}