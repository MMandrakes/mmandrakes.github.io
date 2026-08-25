let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Reemplazar × por * para evaluación
        let expression = display.value.replace(/×/g, '*');
        
        // Validar expresión segura
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error('Expresión inválida');
        }
        
        // Evaluar la expresión
        let result = eval(expression);
        
        // Mostrar resultado o error
        if (isFinite(result)) {
            display.value = result;
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Agregar soporte para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*') {
        appendToDisplay(key);
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});