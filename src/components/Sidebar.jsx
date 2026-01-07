import React from 'react';
import styles from './Sidebar.module.css';
import { DollarSign, TrendingUp, Users, Percent } from 'lucide-react';

const InputGroup = ({ title, children }) => (
  <div className={styles.group}>
    <div className={styles.groupTitle}>{title}</div>
    {children}
  </div>
);

const Control = ({ label, value, onChange, min, max, step, prefix = '', suffix = '' }) => (
  <div className={styles.inputControl}>
    <div className={styles.label}>
      <span>{label}</span>
      <span className={styles.value}>{prefix}{value}{suffix}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={styles.slider}
    />
  </div>
);

export default function Sidebar({
  fixedAmount, setFixedAmount,
  variablePercent, setVariablePercent,
  contentShare, setContentShare,
  initialLeads, setInitialLeads,
  conversionRate, setConversionRate,
  ticketPrice, setTicketPrice,
  growthRate, setGrowthRate,
  // New Props
  businessModel, setBusinessModel,
  launchLeads, setLaunchLeads,
  evergreenLeads, setEvergreenLeads,
  launchesPerYear, setLaunchesPerYear,
  simulationMonths, setSimulationMonths
}) {
  return (
    <aside className={styles.sidebar}>
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>Configuração</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ajuste as premissas</p>
      </div>

      <div className={styles.group}>
        <Control
          label="Período Simulado"
          value={simulationMonths}
          onChange={setSimulationMonths}
          min={12}
          max={60}
          step={6}
          suffix=" meses"
        />
      </div>

      <div className={styles.group}>
        <div className={styles.groupTitle} style={{ color: 'var(--secondary)' }}>Modelo de Negócio</div>
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
          {['linear', 'launch', 'hybrid'].map((model) => (
            <button
              key={model}
              onClick={() => setBusinessModel(model)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${businessModel === model
                ? model === 'linear' ? 'bg-blue-600 text-white shadow-lg' : model === 'launch' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {model === 'linear' ? 'Recorrência' : model === 'launch' ? 'Lançamentos' : 'Misto'}
            </button>
          ))}
        </div>
      </div>

      <InputGroup title="Estratégia de Remuneração">
        <Control
          label="Fixo Mensal"
          value={fixedAmount}
          onChange={setFixedAmount}
          min={1000}
          max={20000}
          step={500}
          prefix="R$ "
        />
        <Control
          label="Comissão Variável"
          value={variablePercent}
          onChange={setVariablePercent}
          min={1}
          max={50}
          step={0.5}
          suffix="%"
        />
        <Control
          label="Atribuição (Conteúdo)"
          value={contentShare}
          onChange={setContentShare}
          min={0}
          max={100}
          step={1}
          suffix="%"
        />
      </InputGroup>

      {(businessModel === 'linear' || businessModel === 'hybrid') && (
        <>
          <div className={styles.group}>
            <div className={styles.groupTitle} style={{ color: 'var(--accent)' }}>Cenários de Impacto (Conteúdo)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => { setGrowthRate(2); setConversionRate(1.0); }}
                className="px-2 py-2 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Seguro
              </button>
              <button
                onClick={() => { setGrowthRate(5); setConversionRate(1.5); }}
                className="px-2 py-2 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Moderado
              </button>
              <button
                onClick={() => { setGrowthRate(15); setConversionRate(2.5); }}
                className="px-2 py-2 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Agressivo
              </button>
            </div>
            <p style={{ fontSize: '0.7em', color: 'var(--text-muted)', lineHeight: '1.2' }}>
              Simule como a produção de conteúdo afeta o crescimento mensal.
            </p>
          </div>

          <InputGroup title={businessModel === 'hybrid' ? "Base Recorrente (Linear)" : "Premissas de Crescimento"}>
            <Control
              label="Leads Iniciais"
              value={initialLeads}
              onChange={setInitialLeads}
              min={100}
              max={10000}
              step={100}
            />
            <Control
              label="Taxa de Conversão"
              value={conversionRate}
              onChange={setConversionRate}
              min={0.1}
              max={40}
              step={0.1}
              suffix="%"
            />
            <Control
              label="Ticket Médio"
              value={ticketPrice}
              onChange={setTicketPrice}
              min={50}
              max={2500}
              step={10}
              prefix="R$ "
            />
            <Control
              label="Crescimento Mensal"
              value={growthRate}
              onChange={setGrowthRate}
              min={0}
              max={50}
              step={1}
              suffix="%"
            />
          </InputGroup>
        </>
      )}

      {(businessModel === 'launch' || businessModel === 'hybrid') && (
        <InputGroup title={businessModel === 'hybrid' ? "Lançamentos (Extras)" : "Configuração de Lançamentos"}>
          <Control
            label="Leads (Lançamento)"
            value={launchLeads}
            onChange={setLaunchLeads}
            min={1000}
            max={20000}
            step={500}
          />
          <Control
            label="Leads (Perpétuo)"
            value={evergreenLeads}
            onChange={setEvergreenLeads}
            min={100}
            max={5000}
            step={100}
          />
          <Control
            label="Lançamentos / Ano"
            value={launchesPerYear}
            onChange={setLaunchesPerYear}
            min={1}
            max={12}
            step={1}
          />
          <Control
            label="Taxa de Conversão"
            value={conversionRate}
            onChange={setConversionRate}
            min={0.1}
            max={10}
            step={0.1}
            suffix="%"
          />
          <Control
            label="Ticket Médio"
            value={ticketPrice}
            onChange={setTicketPrice}
            min={50}
            max={1000}
            step={10}
            prefix="R$ "
          />
        </InputGroup>
      )}
    </aside>
  );
}
