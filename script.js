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

    // Funções auxiliares
    function getPositionalPoetry(position, count) {
        const phrases = {
            superior: [
                `${count} mensagens pairando sobre seu amanhecer`,
                `O vento traz ${count} sinais do que está por vir`,
                `${count} pássaros voando em direção ao seu horizonte`
            ],
            inferior: [
                `${count} raízes nutrindo seu presente`,
                `${count} sombras que moldaram sua luz atual`,
                `${count} sementes plantadas em estações passadas`
            ],
            esquerda: [
                `${count} marés movendo seu oceano interior`,
                `${count} batidas do coração ecoando na alma`,
                `${count} luas cheias iluminando seus sentimentos`
            ],
            direita: [
                `${count} pontes construídas pela razão`,
                `${count} mapas desenhados pelo intelecto`,
                `${count} chaves desvendando lógica oculta`
            ]
        };
        return phrases[position][Math.floor(Math.random() * phrases[position].length)];
    }

    function getSymbolCategory(symbol) {
        for(const category in symbols) {
            if(symbols[category].includes(symbol)) {
                return category;
            }
        }
        return null;
    }

    function getPoeticMeaning(symbol) {
        const category = getSymbolCategory(symbol);
        const metaphors = {
            animals: "Um espírito guia se revela",
            objects: "Um artefato do destino se manifesta",
            nature: "Forças primordiais se agitam",
            celestial: "O cosmos altera seu curso",
            abstract: "O invisível se faz visível"
        };
        return metaphors[category] || "Mensagem oculta nas entrelinhas do universo";
    }

    function getPoeticReflection() {
        const questions = [
            "O que essa forma revela sobre seus medos mais profundos?",
            "Como essa imagem ressoa com suas esperanças secretas?",
            "Que diálogo você estabelece com esse símbolo silencioso?",
            "Que verdade mascarada essa figura desvela?",
            "Qual lição está escrita nas curvas desse símbolo?",
            "Como esse sinal conversa com sua jornada interior?"
        ];
        return questions[Math.floor(Math.random() * questions.length)];
    }

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
        const leaves = Array.from(document.querySelectorAll('.tea-leaf'));
        const cupRect = teaCup.getBoundingClientRect();
        
        const positions = {
            superior: { count: 0, symbols: [], meaning: "O amanhã sussurra" },
            inferior: { count: 0, symbols: [], meaning: "Ecos do que foi" },
            esquerda: { count: 0, symbols: [], meaning: "Ventos da alma" },
            direita: { count: 0, symbols: [], meaning: "Caminhos da mente" }
        };

        leaves.forEach(leaf => {
            const leafRect = leaf.getBoundingClientRect();
            const vertical = (leafRect.top - cupRect.top) / cupRect.height;
            const horizontal = (leafRect.left - cupRect.left) / cupRect.width;

            if(vertical < 0.33) {
                positions.superior.count++;
                positions.superior.symbols.push(leaf.dataset.symbol);
            } else if(vertical > 0.66) {
                positions.inferior.count++;
                positions.inferior.symbols.push(leaf.dataset.symbol);
            }

            if(horizontal < 0.33) {
                positions.esquerda.count++;
                positions.esquerda.symbols.push(leaf.dataset.symbol);
            } else if(horizontal > 0.66) {
                positions.direita.count++;
                positions.direita.symbols.push(leaf.dataset.symbol);
            }
        });

        return `
            <div class="positional-meanings">
                <h4>Linguagem das Posições</h4>
                ${Object.entries(positions).map(([key, pos]) => `
                    <div class="position-section">
                        <p class="poetic-line">${pos.meaning}:</p>
                        ${pos.symbols.length > 0 ? `
                            <p class="symbols-line">${pos.symbols.slice(0,3).join(' • ')}</p>
                            <p class="interpretation-line">${getPositionalPoetry(key, pos.count)}</p>
                        ` : `<p class="interpretation-line">Silêncio revelador nesta região</p>`}
                    </div>
                `).join('')}
            </div>
        `;
    }

    function generateCombinationReadings(symbols) {
        const combinations = [
            { symbols: ['Borboleta', 'Flor'], message: 'Transformação positiva em relacionamentos' },
            { symbols: ['Espada', 'Coração'], message: 'Decisão importante com impacto emocional' },
            { symbols: ['Lua', 'Coruja'], message: 'Sabedoria intuitiva se manifestando' },
            { symbols: ['Rio', 'Montanha'], message: 'Equilíbrio entre fluir e persistir' }
        ];

        const found = combinations.filter(combo => 
            combo.symbols.every(s => symbols.includes(s))
        );

        return found.length > 0 ? `
            <div class="combo-warning">
                <h4>Alquimia de Símbolos</h4>
                ${found.map(combo => `
                    <div class="combo-item">
                        <p class="combo-symbols">${combo.symbols.join(' + ')}</p>
                        <p class="combo-message">${combo.message}</p>
                    </div>
                `).join('')}
            </div>
        ` : '';
    }

    function generateSymbolsAnalysis(symbols) {
        return symbols.map(symbol => {
            const interpretation = interpretations[symbol] || {};
            return `
                <div class="symbol-card">
                    <h4>${symbol}</h4>
                    <p class="meaning">${interpretation.significado || getPoeticMeaning(symbol)}</p>
                    <p class="detail">${interpretation.detalhe || getPoeticReflection()}</p>
                </div>
            `;
        }).join('');
    }

    function showInterpretation() {
        const visibleSymbols = getVisibleSymbols();
        const mainSymbols = visibleSymbols.length > 0 ? selectMainSymbols(visibleSymbols) : ['Círculo', 'Estrela', 'Flor'];
        
        interpretationDiv.style.display = 'block';
        interpretationDiv.innerHTML = `
            <h3>Interpretação das Folhas</h3>
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
