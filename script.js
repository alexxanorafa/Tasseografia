document.addEventListener("DOMContentLoaded", () => {
    // ========== CÓDIGO DO MENU ==========
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    // Abrir/Fechar menu
    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    // Animar itens do menu
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

    // ========== CÓDIGO DA TASSEOGRAFIA ==========
    const teaCup = document.getElementById('teaCup');
    const teaLeaves = document.getElementById('teaLeaves');
    const startBtn = document.getElementById('startReading');
    const interpretationDiv = document.getElementById('interpretation');

    const symbols = {
        animals: [
            'Pássaro', 'Cão', 'Gato', 'Cavalo', 'Serpente',
            'Coruja', 'Borboleta', 'Tartaruga', 'Fênix', 'Lobo'
        ],
        objects: [
            'Chave', 'Coração', 'Árvore', 'Casa', 'Anel',
            'Espada', 'Ponte', 'Livro', 'Relógio', 'Escada'
        ],
        nature: [
            'Montanha', 'Rio', 'Nuvem', 'Flor', 'Sol',
            'Lua', 'Tempestade', 'Arco-Íris', 'Vulcão', 'Céu Estrelado'
        ],
        abstract: [
            'Círculo', 'Triângulo', 'Espiral', 'Cruz', 'Estrela',
            'Labirinto', 'Infinito', 'Olho', 'Máscara', 'Ondas'
        ],
        celestial: [
            'Cometa', 'Eclipse', 'Via Láctea', 'Aurora Boreal', 
            'Constelação', 'Meteoro', 'Planeta', 'Galáxia'
        ]
    };
    
    const interpretations = {
        // Animais
        'Pássaro': { significado: 'Liberdade e mensagens importantes', detalhe: 'Boas notícias estão a caminho' },
        'Coruja': { significado: 'Sabedoria e mistério', detalhe: 'Desenvolva sua intuição' },
        'Fênix': { significado: 'Renascimento', detalhe: 'Transformação radical em sua vida' },
        'Borboleta': { significado: 'Transformação', detalhe: 'Mudanças positivas em breve' },
        'Lobo': { significado: 'Instinto protetor', detalhe: 'Confie em seus impulsos' },

        // Objetos
        'Chave': { significado: 'Novas oportunidades', detalhe: 'Portas se abrindo' },
        'Coração': { significado: 'Amor', detalhe: 'Relações significativas' },
        'Espada': { significado: 'Decisão', detalhe: 'Corte com o passado' },
        'Livro': { significado: 'Conhecimento', detalhe: 'Busque aprendizado' },
        'Relógio': { significado: 'Tempo', detalhe: 'Momento de agir' },

        // Natureza
        'Montanha': { significado: 'Desafios', detalhe: 'Persistência necessária' },
        'Rio': { significado: 'Fluxo', detalhe: 'Deixe-se levar' },
        'Lua': { significado: 'Intuição', detalhe: 'Olhe para dentro' },
        'Tempestade': { significado: 'Mudanças', detalhe: 'Caos antes da calmaria' },
        'Arco-Íris': { significado: 'Esperança', detalhe: 'Tempos melhores virão' },

        // Celestial
        'Cometa': { significado: 'Mudanças rápidas', detalhe: 'Aproveite oportunidades' },
        'Eclipse': { significado: 'Revelações', detalhe: 'Verdades ocultas surgirão' },
        'Aurora Boreal': { significado: 'Inspiração', detalhe: 'Siga sua criatividade' },

        // Combinações
        'Borboleta & Flor': { significado: 'Crescimento gracioso', detalhe: 'Transformação positiva' },
        'Espada & Coração': { significado: 'Decisão emocional', detalhe: 'Equilíbrio entre razão e emoção' }
    };

    function createTeaLeaves() {
        teaLeaves.innerHTML = '';
        const numberOfLeaves = Math.floor(Math.random() * 15) + 10;
        const categories = Object.keys(symbols);
        
        for(let i = 0; i < numberOfLeaves; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'tea-leaf';
            
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${Math.random() * 100}%`;
            
            const category = categories[Math.floor(Math.random() * categories.length)];
            const symbolList = symbols[category];
            leaf.dataset.symbol = symbolList[Math.floor(Math.random() * symbolList.length)];
            
            teaLeaves.appendChild(leaf);
        }
    }

    function animateLeaves() {
        const leaves = document.querySelectorAll('.tea-leaf');
        teaCup.classList.add('swirling');
        
        setTimeout(() => {
            teaCup.classList.remove('swirling');
            leaves.forEach(leaf => {
                leaf.style.left = `${Math.random() * 80 + 10}%`;
                leaf.style.top = `${Math.random() * 80 + 10}%`;
            });
            showInterpretation();
        }, 3000);
    }

    function getVisibleSymbols() {
        const cupRect = teaCup.getBoundingClientRect();
        return Array.from(document.querySelectorAll('.tea-leaf'))
            .filter(leaf => {
                const leafRect = leaf.getBoundingClientRect();
                return (
                    leafRect.top >= cupRect.top &&
                    leafRect.bottom <= cupRect.bottom &&
                    leafRect.left >= cupRect.left &&
                    leafRect.right <= cupRect.right
                );
            })
            .map(leaf => leaf.dataset.symbol);
    }

    function selectMainSymbols(symbolList) {
        const counts = symbolList.reduce((acc, symbol) => {
            acc[symbol] = (acc[symbol] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(entry => entry[0]);
    }

    function generatePositionalMeanings() {
        return `
            <div class="positional-meanings">
                <h4>Posição na Xícara</h4>
                <p><strong>Superior:</strong> Futuro próximo</p>
                <p><strong>Inferior:</strong> Influências passadas</p>
                <p><strong>Esquerda:</strong> Aspectos emocionais</p>
                <p><strong>Direita:</strong> Fatores racionais</p>
            </div>
        `;
    }

    function generateCombinationReadings(symbols) {
        const combinations = [
            { symbols: ['Borboleta', 'Flor'], message: 'Transformação positiva em relacionamentos' },
            { symbols: ['Espada', 'Coração'], message: 'Decisão importante com impacto emocional' }
        ];

        const found = combinations.filter(combo => 
            combo.symbols.every(s => symbols.includes(s))
        );

        return found.length > 0 ? `
            <div class="combo-warning">
                <h4>Combinações Especiais</h4>
                ${found.map(combo => `<p>${combo.symbols.join(' + ')}: ${combo.message}</p>`).join('')}
            </div>
        ` : '';
    }

    function generateSymbolsAnalysis(symbols) {
        return symbols.map(symbol => `
            <div class="symbol-card">
                <h4>${symbol}</h4>
                <p class="meaning">${interpretations[symbol]?.significado || 'Mensagem única para você'}</p>
                <p class="detail">${interpretations[symbol]?.detalhe || 'Reflita sobre este símbolo em sua vida'}</p>
            </div>
        `).join('');
    }

    function showInterpretation() {
        const visibleSymbols = getVisibleSymbols();
        const mainSymbols = visibleSymbols.length > 0 ? selectMainSymbols(visibleSymbols) : ['Círculo', 'Estrela', 'Flor'];
        
        interpretationDiv.style.display = 'block';
        interpretationDiv.innerHTML = `
            <h3>Interpretação Completa</h3>
            ${generateSymbolsAnalysis(mainSymbols)}
            ${generateCombinationReadings(mainSymbols)}
            ${generatePositionalMeanings()}
        `;
    }

    startBtn.addEventListener('click', () => {
        interpretationDiv.style.display = 'none';
        createTeaLeaves();
        animateLeaves();
    });

    // Inicialização
    createTeaLeaves();
});