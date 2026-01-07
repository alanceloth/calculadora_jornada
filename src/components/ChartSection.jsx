import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel" style={{ padding: '12px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>Mês {label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.stroke, fontSize: '0.9rem', fontWeight: 600 }}>
                        {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function ChartSection({ data, crossOverPoint }) {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Projeção de Faturamento</h2>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#64748b' }}></div>
                        <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Fixo</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Variável</span>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorVariable" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="var(--text-muted)"
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => `M${val}`}
                        />
                        <YAxis
                            stroke="var(--text-muted)"
                            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="fixedIncome"
                            name="Fixo"
                            stroke="#64748b"
                            strokeWidth={2}
                            fill="transparent"
                            strokeDasharray="5 5"
                        />
                        <Area
                            type="monotone"
                            dataKey="variableIncome"
                            name="Variável"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            fill="url(#colorVariable)"
                        />
                        {crossOverPoint && (
                            <ReferenceDot x={crossOverPoint.month} y={crossOverPoint.value} r={6} fill="#fff" stroke="var(--primary)" />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
