# Visualizador de Algoritmos de Busca

Projeto interativo da disciplina de Sistemas Inteligentes do Centro de Informática - UFPE. Ele demonstra visualmente diferentes algoritmos de busca em um mundo 2D com diferentes tipos de terreno.

# 👤 Integrantes do grupo:

- Alice Buarque
- Aline Fortaleza
- Arthur Marsaro
- Beatriz Leão
- Danilo Lima

## 📋 Descrição

Este projeto utiliza a biblioteca **p5.js** para criar uma visualização interativa de algoritmos de busca. O usuário pode observar como algoritmos diferentes exploram um mundo gerado de forma automática, encontrando o caminho mais eficiente entre um agente (ponto de partida) e um alvo (destino).

## 🎯 Características

- **Mundo Procedural**: Geração automática de terreno usando Perlin Noise
- **Múltiplos Tipos de Terreno**:
  - (Azul claro) **Água** (custo: 10)
  - (Marrom) **Lama** (custo: 5)
  - (Amerelo) **Areia** (custo: 1)
  - (Cinza) **Montanha** (custo: ∞ - intransponível)
- **Algoritmos Implementados**:
  - **BFS** - Busca em Largura
  - **DFS** - Busca em Profundidade
  - **UCS** - Busca de Custo Uniforme
  - **Greedy** - Busca Gulosa
  - **A\*** - Algoritmo A\*
- **Visualização em Tempo Real**: Acompanhe o processo de busca passo a passo
- **Interface Interativa**: Controles por teclado para testar diferentes algoritmos

## 🚀 Como Executar

### Pré-requisitos

- Navegador web moderno
- Servidor local (recomendado)

### Opção 1: Live Server (Recomendado)

1. Instale a extensão "Live Server" no VS Code/Cursor
2. Clique com o botão direito em `pub/index.html`
3. Selecione "Open with Live Server"

### Opção 2: Servidor Python

```bash
cd pub
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 3: Abrir Diretamente

Abra o arquivo `pub/index.html` diretamente no navegador (pode haver limitações de segurança)

## 🎮 Como Usar

### Controles

- **`B`** - Executar Busca em Largura (Breadth-First Search)
- **`D`** - Executar Busca em Profundidade (Depth-First Search)
- **`U`** - Executar Busca de Custo Uniforme (Uniform Cost Search)
- **`G`** - Executar Busca Gulosa (Greedy Search)
- **`A`** - Executar Algoritmo A\* (A-Star)
- **`R`** - Resetar visualização

### Interpretação Visual

- **Roxo**: Agente (ponto de partida)
- **Vermelho**: Alvo (destino)
- **Preto transparente**: Área explorada pela busca
- **Branco transparente**: Fronteira atual do algoritmo
- **Azul**: Caminho encontrado até o alvo

## 🏗️ Estrutura do Projeto

```
IA-search-algorithms/
├── pub/
│   └── index.html          # Arquivo principal
├── src/
│   ├── sketch.js           # Configuração p5.js e controles
│   ├── world.js            # Lógica principal do mundo e algoritmos
│   ├── agent.js            # Classe do agente
│   ├── target.js           # Classe do alvo
│   └── chunk.js            # Classe dos blocos de terreno
├── css/
│   └── style.css           # Estilos CSS
├── lib/
│   └── p5/                 # Biblioteca p5.js
└── res/                    # Recursos (fontes, imagens)
```

## 🔍 Algoritmos Implementados

### 1. Busca em Largura (BFS)

- **Tecla**: `B`
- **Característica**: Explora todos os vizinhos antes de ir mais fundo
- **Vantagem**: Garante o caminho mais curto (menor número de passos)

### 2. Busca em Profundidade (DFS)

- **Tecla**: `D`
- **Característica**: Explora o máximo possível em uma direção antes de voltar
- **Vantagem**: Usa menos memória

### 3. Busca de Custo Uniforme (UCS)

- **Tecla**: `U`
- **Característica**: Considera o custo de cada movimento
- **Vantagem**: Encontra o caminho de menor custo total

### 4. Busca Gulosa (Greedy)

- **Tecla**: `G`
- **Característica**: Sempre escolhe o nó mais próximo do objetivo
- **Vantagem**: Muito rápida, mas pode não encontrar o melhor caminho

### 5. Algoritmo A\*

- **Tecla**: `A`
- **Característica**: Combina custo real + heurística (distância Manhattan)
- **Vantagem**: Geralmente o mais eficiente para encontrar o melhor caminho

## 🎨 Tecnologias Utilizadas

- **p5.js** - Biblioteca JavaScript para gráficos interativos
- **HTML5** - Estrutura da página
- **CSS3** - Estilização
- **JavaScript ES6+** - Lógica dos algoritmos

## 📚 Conceitos Demonstrados

- **Algoritmos de Busca**
- **Geração Procedural de Terreno**
- **Visualização de Dados**
- **Programação Orientada a Objetos**
- **Heurísticas em IA**

---

**Desenvolvido para fins educacionais** 🎓
