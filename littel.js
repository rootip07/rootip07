document.addEventListener('DOMContentLoaded', function() {
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('.calc-button');
    let expression = '';

    function updateScreen(value) {
        screen.textContent = value;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const btnText = button.textContent.trim();
            if (btnText === 'C') {
                expression = '';
                updateScreen('0');
            } else if (btnText === '←') {
                expression = expression.slice(0, -1);
                updateScreen(expression || '0');
            } else if (btnText === '=') {
                try {
                    // Replace symbols for eval
                    let evalExpr = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/,/g, '.');
                    let result = eval(evalExpr);
                    updateScreen(result);
                    expression = result.toString();
                } catch {
                    updateScreen('Error');
                    expression = '';
                }
            } else if (btnText === '+' || btnText === '−' || btnText === '×' || btnText === '÷' || !isNaN(btnText)) {
                expression += btnText;
                updateScreen(expression);
            }
        });
    });

    updateScreen('0');
});
