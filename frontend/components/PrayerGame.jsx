import React from 'react';
import MiniIslandScreen from './MiniIslandScreen';

export default function PrayerGame({ onBack, onComplete }) {
  return (
    <MiniIslandScreen
      title="Namaz Adası"
      subtitle="Namaz hareketleri için eşleştirme oyunu burada büyüyecek."
      tasks={['Niyet', 'Rükû', 'Secde', 'Selam']}
      actionLabel="Mini Görevi Bitir"
      onBack={onBack}
      onComplete={onComplete}
    />
  );
}
