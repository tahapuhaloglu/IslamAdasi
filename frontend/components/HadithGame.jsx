import React from 'react';
import MiniIslandScreen from './MiniIslandScreen';

export default function HadithGame({ onBack, onComplete }) {
  return (
    <MiniIslandScreen
      title="Hadis Adası"
      subtitle="Kısa hadis kartları ve anlam eşleştirmeleri için hazır bölüm."
      tasks={['Güzel söz', 'Paylaşmak', 'Doğruluk', 'Merhamet']}
      actionLabel="Mini Görevi Bitir"
      onBack={onBack}
      onComplete={onComplete}
    />
  );
}
