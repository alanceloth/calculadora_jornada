# Calculadora de Decisão: Jornada 2026 (Fixo x Variável)

Esta aplicação é uma ferramenta estratégica desenvolvida para auxiliar na tomada de decisão entre manter um salário **Fixo** ou migrar para um modelo de comissão **Variável** na "Jornada de Dados".

A calculadora projeta cenários financeiros futuros baseados em premissas reais de 2025, permitindo simular diferentes estratégias de crescimento (Recorrência Linear ou Modelo de Lançamentos).

## 🎯 Objetivo
Comparar matematicamente o "Ponto de Virada" (Breakeven) onde o modelo Variável se torna mais vantajoso que o Fixo, considerando:
1.  **Virada Mensal**: Quando a comissão mensal supera o salário fixo.
2.  **Virada Acumulada**: Quando o lucro total acumulado do modelo Variável compensa as perdas iniciais ("Payback").

## ⚙️ Funcionalidades Principais

### 1. Modelos de Negócio
-   **Modelo Linear (Recorrência)**:
    -   Crescimento constante mês a mês.
    -   Ideal para produtos de venda perpétua.
-   **Modelo Lançamento (Picos)**:
    -   Alternância entre meses de "Lançamento" (picos de vendas) e meses de "Evergreen" (vendas basais).
    -   Permite definir leads específicos para picos (ex: 8.000) e vales (ex: 2.000).

### 2. Atribuição de Conteúdo (Novo)
-   Reflete a realidade onde a comissão incide apenas sobre o faturamento gerado pelo conteúdo do usuário, e não sobre o total da empresa.
-   **Slider de Atribuição**: Permite filtrar a base de cálculo (ex: se o usuário contribui com 30% do faturamento total, a comissão será calculada sobre esses 30%).

### 3. Análise de Cenários
-   **Cenários Pré-configurados**:
    -   *Conservador*: Crescimento baixo (5%), Leads atuais.
    -   *Moderado*: Crescimento médio (10%).
    -   *Agressivo*: Alto crescimento (20%), alta conversão.
-   **Customização Total**:
    -   Leads Iniciais
    -   Taxa de Conversão (até 40%)
    -   Ticket Médio
    -   Crescimento Mensal
    -   % de Comissão
    -   Valor Fixo

### 4. Período de Simulação Dinâmico
-   Simulação ajustável de **12 a 60 meses** para análises de curto e longo prazo.

## 📊 Premissas e Calibragem (Base 2025)

Os valores padrão ("Default") foram calibrados com base nos dados reais de 2025 fornecidos:

| Métrica | Valor Calibrado | Observação |
| :--- | :--- | :--- |
| **Leads Mensais** | **4.019** | Média de 2025 (Pico: 8.698, Vale: 812). |
| **Conversão** | **9.3%** | Média de 2025 (Variação: 0.5% a 37.7%). |
| **Ticket Médio** | **R$ 500** | Ajustado para nova estratégia (R$ 400-600). O histórico era R$ 889. |
| **Crescimento** | **4.6%** | Média mensal de crescimento de vendas em 2025. |

> **Nota**: O Vitalício (Ticket R$ 2k+) foi descontinuado nas premissas padrão.

## 🛠️ Tecnologias Utilizadas
-   **Frontend**: React (Vite)
-   **Estilização**: Tailwind CSS (Design System Moderno: Glassmorphism, Dark Mode)
-   **Gráficos**: Recharts (Visualização de projeções e crossovers)
-   **Deploy**: Localhost (Vite Dev Server)

## 🚀 Como Executar

### Pré-requisitos
-   Node.js (versão 18+ recomendada)
-   NPM ou Yarn

### Instalação
```bash
# Clone o repositório (se aplicável) ou navegue até a pasta
cd calculadora_jornada

# Instale as dependências
npm install
```

### Rodando Localmente
```bash
# Inicie o servidor de desenvolvimento
npm run dev
```
O projeto estará disponível em `http://localhost:5174/` (ou porta similar indicada no terminal).

## 📝 Regras de Negócio Importantes
1.  **Cálculo Variável**: `Receita Total * % Atribuição * % Comissão`.
2.  **Crescimento**: Aplicado mensalmente sobre a base de leads no modelo Linear.
3.  **Lançamentos**: Ocorrem a cada `12 / LaunchesPerYear` meses.
