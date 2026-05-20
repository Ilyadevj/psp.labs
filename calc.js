class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.displaySub = document.getElementById('displaySub');
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.waitingForOperand = false;
        this.memory = 0;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.bindEvents();
        this.bindThemeToggle();
        this.bindDisplayColorToggle();
    }

    updateDisplay() {
        this.display.textContent = this.currentValue;
    }

    updateSubDisplay(text) {
        this.displaySub.textContent = text;
    }

    inputDigit(digit) {
        if (digit === '000') {
            if (this.waitingForOperand) {
                this.currentValue = '0';
                this.waitingForOperand = false;
            }
            if (this.currentValue === '0') {
                this.currentValue = '0';
            } else {
                this.currentValue += '000';
            }
        } else if (digit === '.') {
            if (this.waitingForOperand) {
                this.currentValue = '0.';
                this.waitingForOperand = false;
            } else if (this.currentValue.indexOf('.') === -1) {
                this.currentValue += '.';
            }
        } else {
            if (this.waitingForOperand) {
                this.currentValue = digit;
                this.waitingForOperand = false;
            } else {
                this.currentValue = this.currentValue === '0' ? digit : this.currentValue + digit;
            }
        }
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.waitingForOperand = false;
        this.updateSubDisplay('');
        this.updateDisplay();
    }

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    changeSign() {
        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
        this.updateDisplay();
    }

    percent() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    }

    sqrt() {
        const value = parseFloat(this.currentValue);
        if (value < 0) {
            alert('Ошибка: квадратный корень из отрицательного числа');
            return;
        }
        this.currentValue = Math.sqrt(value).toString();
        this.updateDisplay();
    }

    square() {
        const value = parseFloat(this.currentValue);
        this.currentValue = (value * value).toString();
        this.updateDisplay();
    }

    factorial() {
        let value = parseFloat(this.currentValue);
        if (value < 0 || !Number.isInteger(value)) {
            alert('Ошибка: факториал только для целых неотрицательных чисел');
            return;
        }
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        this.currentValue = result.toString();
        this.updateDisplay();
    }

    sumOfDigits() {
        let value = Math.abs(parseFloat(this.currentValue));
        let sum = 0;
        let str = value.toString().replace('.', '');
        for (let i = 0; i < str.length; i++) {
            sum += parseInt(str[i]);
        }
        this.currentValue = sum.toString();
        this.updateDisplay();
        this.updateSubDisplay(`Сумма цифр: ${sum}`);
        setTimeout(() => this.updateSubDisplay(''), 2000);
    }

    performOperation(nextOp) {
        const inputValue = parseFloat(this.currentValue);
        if (this.previousValue === '') {
            this.previousValue = inputValue;
        } else if (this.operation) {
            let result = 0;
            const prev = parseFloat(this.previousValue);
            switch (this.operation) {
                case '+': result = prev + inputValue; break;
                case '-': result = prev - inputValue; break;
                case '*': result = prev * inputValue; break;
                case '/': 
                    if (inputValue === 0) {
                        alert('Деление на ноль!');
                        this.clear();
                        return;
                    }
                    result = prev / inputValue;
                    break;
                default: return;
            }
            this.currentValue = result.toString();
            this.previousValue = result;
        }
        this.waitingForOperand = true;
        this.operation = nextOp;
        this.updateDisplay();
        this.updateSubDisplay(`${this.previousValue} ${this.getOpSymbol(nextOp)}`);
    }

    getOpSymbol(op) {
        const symbols = { '+': '+', '-': '-', '*': '×', '/': '÷' };
        return symbols[op] || op;
    }

    computeEquals() {
        if (this.operation === null || this.waitingForOperand) return;
        const inputValue = parseFloat(this.currentValue);
        let result = 0;
        const prev = parseFloat(this.previousValue);
        switch (this.operation) {
            case '+': result = prev + inputValue; break;
            case '-': result = prev - inputValue; break;
            case '*': result = prev * inputValue; break;
            case '/': 
                if (inputValue === 0) {
                    alert('Деление на ноль!');
                    this.clear();
                    return;
                }
                result = prev / inputValue;
                break;
            default: return;
        }
        this.currentValue = result.toString();
        this.updateSubDisplay(`${this.previousValue} ${this.getOpSymbol(this.operation)} ${inputValue} = ${result}`);
        this.previousValue = '';
        this.operation = null;
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentValue);
        this.updateSubDisplay(`M+ : ${this.memory}`);
        setTimeout(() => this.updateSubDisplay(''), 1500);
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentValue);
        this.updateSubDisplay(`M- : ${this.memory}`);
        setTimeout(() => this.updateSubDisplay(''), 1500);
    }

    memoryRecall() {
        this.currentValue = this.memory.toString();
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    memoryClear() {
        this.memory = 0;
        this.updateSubDisplay('Memory cleared');
        setTimeout(() => this.updateSubDisplay(''), 1000);
    }

    bindEvents() {
        document.querySelectorAll('.calc-btn.number').forEach(btn => {
            btn.addEventListener('click', () => this.inputDigit(btn.getAttribute('data-num')));
        });
        document.querySelectorAll('.calc-btn.operator').forEach(btn => {
            btn.addEventListener('click', () => this.performOperation(btn.getAttribute('data-op')));
        });
        document.querySelectorAll('.calc-btn.special').forEach(btn => {
            const action = btn.getAttribute('data-action');
            btn.addEventListener('click', () => {
                if (action === 'clear') this.clear();
                else if (action === 'backspace') this.backspace();
                else if (action === 'sign') this.changeSign();
            });
        });
        document.querySelectorAll('.calc-btn.scientific').forEach(btn => {
            const action = btn.getAttribute('data-action');
            btn.addEventListener('click', () => {
                if (action === 'sqrt') this.sqrt();
                else if (action === 'square') this.square();
                else if (action === 'factorial') this.factorial();
                else if (action === 'percent') this.percent();
            });
        });
        document.querySelectorAll('.calc-btn.memory').forEach(btn => {
            const action = btn.getAttribute('data-action');
            btn.addEventListener('click', () => {
                if (action === 'mPlus') this.memoryAdd();
                else if (action === 'mMinus') this.memorySubtract();
                else if (action === 'mRecall') this.memoryRecall();
                else if (action === 'mClear') this.memoryClear();
            });
        });
        document.querySelector('.calc-btn.equals')?.addEventListener('click', () => this.computeEquals());
        
        const individualBtn = document.createElement('button');
        individualBtn.textContent = 'Σ';
        individualBtn.className = 'calc-btn scientific';
        individualBtn.title = 'Сумма цифр';
        individualBtn.addEventListener('click', () => this.sumOfDigits());
        const buttonsGrid = document.querySelector('.buttons-grid');
        if (buttonsGrid) buttonsGrid.appendChild(individualBtn);
    }

    bindThemeToggle() {
        const themeBtn = document.getElementById('themeToggleBtn');
        themeBtn?.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeBtn.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
    }

    bindDisplayColorToggle() {
        const colorBtn = document.getElementById('changeDisplayColorBtn');
        const colors = ['#f97316', '#2563eb', '#22c55e', '#eab308', '#ec4899'];
        let idx = 0;
        colorBtn?.addEventListener('click', () => {
            idx = (idx + 1) % colors.length;
            document.querySelector('.display').style.color = colors[idx];
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Calculator());