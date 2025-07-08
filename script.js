const resultInput = document.getElementById('result');

function appendToDisplay(value) {
    resultInput.value += value;
}

function clearResult() {
    resultInput.value = '';
}

function deleteLast() {
    resultInput.value = resultInput.value.slice(0, -1);
}

function calculateResult() {
    try {
        resultInput.value = eval(resultInput.value); 
    } catch (error) {
        resultInput.value = 'Erro';
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const showCalculatorBtn = document.getElementById('show-calculator-btn');
    const calculatorContainer = document.getElementById('calculator-container');

    if (showCalculatorBtn && calculatorContainer) {
        showCalculatorBtn.addEventListener('click', () => {
            if (calculatorContainer.style.display === 'none' || calculatorContainer.style.display === '') {
                calculatorContainer.style.display = 'block'; 
                showCalculatorBtn.textContent = 'Esconder Calculadora';
            } else {
                calculatorContainer.style.display = 'none';
                showCalculatorBtn.textContent = 'Mostrar Calculadora';
            }
        });
    }

    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            history.pushState(null, '', '#' + sectionId);

            if (sectionId === 'portfolio') {
                calculatorContainer.style.display = 'none';
                showCalculatorBtn.textContent = 'Mostrar Calculadora';
            }
        });
    });

    if (window.location.hash) {
        showSection(window.location.hash.substring(1));
        if (window.location.hash.substring(1) === 'portfolio') {
             if (calculatorContainer) {
                calculatorContainer.style.display = 'none';
                if (showCalculatorBtn) {
                    showCalculatorBtn.textContent = 'Mostrar Calculadora';
                }
            }
        }
    } else {
        showSection('sobre-mim'); 
    }
});