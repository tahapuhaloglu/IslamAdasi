import React from 'react';
import MiniIslandScreen from './MiniIslandScreen';

export default function QiblaGame({ onBack, onComplete }) {
  return (
    <MiniIslandScreen
      title="Kıble Adası"
      subtitle="Yön bulma ve pusula mini oyunu için modüler başlangıç ekranı."
      tasks={['Kuzey', 'Güney', 'Doğu', 'Batı']}
      actionLabel="Mini Görevi Bitir"
      onBack={onBack}
      onComplete={onComplete}
    />
  );
}
