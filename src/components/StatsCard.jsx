import React from 'react';
import styles from './StatsCard.module.css';

export default function StatsCard({ title, value, description, icon: Icon, color }) {
    return (
        <div className={styles.card} style={color ? { borderColor: color } : {}}>
            <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon size={18} color={color || 'var(--text-muted)'} />}
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.value} style={color ? { color } : {}}>{value}</div>
            {description && <div className={styles.description}>{description}</div>}
        </div>
    );
}
