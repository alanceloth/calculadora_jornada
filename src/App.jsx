import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import ChartSection from './components/ChartSection';
import StatsCard from './components/StatsCard';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

function App() {
  const [fixedAmount, setFixedAmount] = useState(5000);
  const [variablePercent, setVariablePercent] = useState(20);
  const [contentShare, setContentShare] = useState(30); // 100% means User owns 100% of content revenue

  const [initialLeads, setInitialLeads] = useState(4019);
  const [conversionRate, setConversionRate] = useState(9.3);
  const [ticketPrice, setTicketPrice] = useState(500);
  const [growthRate, setGrowthRate] = useState(4.6);
  const [simulationMonths, setSimulationMonths] = useState(24);

  // Launch Mode State
  const [businessModel, setBusinessModel] = useState('linear'); // 'linear' | 'launch'
  const [launchLeads, setLaunchLeads] = useState(8000);
  const [evergreenLeads, setEvergreenLeads] = useState(2000);
  const [launchesPerYear, setLaunchesPerYear] = useState(4);

  const { data, monthlyCrossOver, totalCrossOver, totalVariable, totalFixed } = useMemo(() => {
    const months = simulationMonths;
    const chartData = [];
    let currentLeads = initialLeads;
    let accumulatedVariable = 0;
    let accumulatedFixed = 0;
    let monthlyCrossOver = null;
    let totalCrossOver = null;

    const launchInterval = Math.round(12 / launchesPerYear);

    for (let i = 1; i <= months; i++) {
      let revenue = 0;
      let leads = 0;

      // --- HYBRID / LINEAR ---
      if (businessModel === 'linear' || businessModel === 'hybrid') {
        // Calculate Recurring Base
        const baseRevenue = currentLeads * (conversionRate / 100) * ticketPrice;
        revenue += baseRevenue;
        leads += Math.round(currentLeads);

        // Apply growth to base for next month
        currentLeads = currentLeads * (1 + growthRate / 100);
      }

      // --- LAUNCH / HYBRID ---
      if (businessModel === 'launch' || businessModel === 'hybrid') {
        const isLaunchMonth = (i % launchInterval === 0);

        if (businessModel === 'launch') {
          // Pure Launch Mode logic
          const launchModeLeads = isLaunchMonth ? launchLeads : evergreenLeads;
          const launchModeRevenue = launchModeLeads * (conversionRate / 100) * ticketPrice;
          revenue = launchModeRevenue; // Override, don't add
          leads = launchModeLeads;
        } else {
          // Hybrid Mode (Additive Spike)
          if (isLaunchMonth) {
            // Add Launch Spike ON TOP of base
            const launchRevenue = launchLeads * (conversionRate / 100) * ticketPrice;
            revenue += launchRevenue;
            leads += launchLeads;
          }
        }
      }

      const vIncome = (revenue * (contentShare / 100)) * (variablePercent / 100);
      const fIncome = fixedAmount;

      accumulatedVariable += vIncome;
      accumulatedFixed += fIncome;

      // For crossover, we care about the ACCUMULATED trend more than monthly spikes in Launch mode?
      // Or maybe we still check monthly. Let's keep monthly for now, but Total Difference is key.
      if (!monthlyCrossOver && accumulatedVariable > accumulatedFixed) {
        // Changed logic: Crossover based on TOTAL accumulator for Launch mode makes more sense?
        // Actually, let's keep "Monthly Income" crossover for visual graph, but users should look at Total.
        // For the graph line:
      }

      // Let's stick to the visual crossover of "Income received this month" for the dot.
      if (!monthlyCrossOver && vIncome > fIncome) {
        monthlyCrossOver = { month: i, value: vIncome };
      }

      if (!totalCrossOver && accumulatedVariable > accumulatedFixed) {
        totalCrossOver = { month: i, value: accumulatedVariable };
      }

      chartData.push({
        month: i,
        fixedIncome: fIncome,
        variableIncome: vIncome,
        revenue: revenue,
        leads: leads
      });
    }

    return {
      data: chartData,
      monthlyCrossOver,
      totalCrossOver,
      totalVariable: accumulatedVariable,
      totalFixed: accumulatedFixed
    };
  }, [fixedAmount, variablePercent, contentShare, initialLeads, conversionRate, ticketPrice, growthRate, businessModel, launchLeads, evergreenLeads, launchesPerYear, simulationMonths]);

  return (
    <Layout>
      <div style={{ width: '300px', flexShrink: 0 }}>
        <Sidebar
          fixedAmount={fixedAmount} setFixedAmount={setFixedAmount}
          variablePercent={variablePercent} setVariablePercent={setVariablePercent}
          contentShare={contentShare} setContentShare={setContentShare}
          initialLeads={initialLeads} setInitialLeads={setInitialLeads}
          conversionRate={conversionRate} setConversionRate={setConversionRate}
          ticketPrice={ticketPrice} setTicketPrice={setTicketPrice}
          growthRate={growthRate} setGrowthRate={setGrowthRate}
          businessModel={businessModel} setBusinessModel={setBusinessModel}
          launchLeads={launchLeads} setLaunchLeads={setLaunchLeads}
          evergreenLeads={evergreenLeads} setEvergreenLeads={setEvergreenLeads}
          launchesPerYear={launchesPerYear} setLaunchesPerYear={setLaunchesPerYear}
          simulationMonths={simulationMonths} setSimulationMonths={setSimulationMonths}
        />
      </div>

      <div className="flex-1 p-8 flex flex-col gap-8 bg-slate-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <StatsCard
            title="Virada Mensal (Salário)"
            value={monthlyCrossOver ? `Mês ${monthlyCrossOver.month}` : "Nunca"}
            description={monthlyCrossOver ? `Passa a ganhar mais no mês ${monthlyCrossOver.month}` : "Variável nunca supera o fixo"}
            icon={Target}
            color={monthlyCrossOver ? "var(--primary)" : "var(--text-muted)"}
          />
          <StatsCard
            title="Virada Acumulada (Total)"
            value={totalCrossOver ? `Mês ${totalCrossOver.month}` : "Nunca"}
            description={totalVariable > totalFixed ? "Total ganho já é maior" : "Ainda não compensou o início"}
            icon={TrendingUp}
            color={totalCrossOver ? "var(--accent)" : "var(--text-muted)"}
          />
          <StatsCard
            title={`Total Fixo (${simulationMonths}m)`}
            value={`R$ ${(totalFixed / 1000).toFixed(1)}k`}
            description="Acumulado"
            icon={DollarSign}
          />
          <StatsCard
            title={`Total Variável (${simulationMonths}m)`}
            value={`R$ ${(totalVariable / 1000).toFixed(1)}k`}
            description="Acumulado"
            icon={TrendingUp}
            color="var(--secondary)"
          />
          <StatsCard
            title="Diferença Final"
            value={`R$ ${(Math.abs(totalVariable - totalFixed) / 1000).toFixed(1)}k`}
            description={totalVariable > totalFixed ? "Vantagem para Variável" : "Vantagem para Fixo"}
            icon={Calendar}
            color={totalVariable > totalFixed ? "var(--primary)" : "#ef4444"}
          />
        </div>

        <div className="flex-1 glass-panel rounded-xl p-6" style={{ minHeight: '400px' }}>
          <ChartSection data={data} crossOverPoint={monthlyCrossOver} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
