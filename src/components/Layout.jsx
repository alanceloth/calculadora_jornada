import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <div className="glass-panel w-full max-w-7xl h-[90vh] flex rounded-[24px] overflow-hidden">
                {children}
            </div>
        </div>
    );
}
