/* Funções da Calculadora */
const resultInput = document.getElementById('result'); // Campo de exibição do resultado da calculadora

// Adiciona um valor ao campo de exibição da calculadora
function appendToDisplay(value) {
    resultInput.value += value;
}

// Limpa o campo de exibição da calculadora
function clearResult() {
    resultInput.value = '';
}

// Remove o último caractere do campo de exibição
function deleteLast() {
    resultInput.value = resultInput.value.slice(0, -1);
}

// Calcula o resultado da expressão no campo de exibição
function calculateResult() {
    try {
        resultInput.value = eval(resultInput.value); 
    } catch (error) {
        resultInput.value = 'Erro';
    }
}

/* Função para Exibir Seções do Portfólio */

// Esconde todas as seções e mostra apenas a seção desejada
function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    
    sections.forEach(section => {
        section.style.display = 'none'; // Esconde a seção
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block'; // Mostra a seção alvo
    }
}

/* Lógica Executada Quando o Documento HTML é Totalmente Carregado */
document.addEventListener('DOMContentLoaded', () => {
    // Referências para o botão e container da calculadora
    const showCalculatorBtn = document.getElementById('show-calculator-btn');
    const calculatorContainer = document.getElementById('calculator-container');

    // Lógica para o botão "Mostrar/Esconder Calculadora"
    if (showCalculatorBtn && calculatorContainer) {
        showCalculatorBtn.addEventListener('click', () => {
            if (calculatorContainer.style.display === 'none' || calculatorContainer.style.display === '') {
                calculatorContainer.style.display = 'block'; // Mostra a calculadora
                showCalculatorBtn.textContent = 'Esconder Calculadora'; // Altera texto do botão
            } else {
                calculatorContainer.style.display = 'none'; // Esconde a calculadora
                showCalculatorBtn.textContent = 'Mostrar Calculadora'; // Altera texto do botão
            }
        });
    }

    // Lógica de Navegação do Menu
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            const sectionId = this.getAttribute('href').substring(1); // Obtém o ID da seção
            showSection(sectionId); // Mostra a seção correspondente
            history.pushState(null, '', '#' + sectionId); // Atualiza a URL sem recarregar

            // Garante que a calculadora esteja oculta ao navegar para a seção Portfólio
            if (sectionId === 'portfolio') {
                calculatorContainer.style.display = 'none';
                showCalculatorBtn.textContent = 'Mostrar Calculadora';
            }
        });
    });

    // Lógica para carregar a seção correta na inicialização ou recarga da página
    if (window.location.hash) {
        showSection(window.location.hash.substring(1)); // Carrega a seção do hash na URL
        // Oculta a calculadora se a página for recarregada diretamente no Portfólio
        if (window.location.hash.substring(1) === 'portfolio') {
             if (calculatorContainer) {
                calculatorContainer.style.display = 'none';
                if (showCalculatorBtn) {
                    showCalculatorBtn.textContent = 'Mostrar Calculadora';
                }
            }
        }
    } else {
        showSection('sobre-mim'); // Mostra a seção "Sobre Mim" por padrão
    }
});