import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LetterMatchingGame from './components/LetterMatchingGame';
import PrayerGame from './components/PrayerGame';
import HadithGame from './components/HadithGame';
import QiblaGame from './components/QiblaGame';
import DuaGame from './components/DuaGame';
import MainIslandScreen from './components/MainIslandScreen';
import KuranAdasiScreen from './components/KuranAdasiScreen';

const SCREENS = {
  HOME: 'Home',
  MAIN: 'Main',
  ELIFBA: 'ElifBa',
  KURAN: 'Kuran',
  NAMAZ: 'Namaz',
  DUA: 'Dua',
  HADIS: 'Hadis',
  KIBLE: 'Kıble',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [score, setScore] = useState(0);

  const handleIslandPress = (screenName) => {
    setCurrentScreen(screenName);
  };

  const handleGameComplete = (points) => {
    setScore((prevScore) => prevScore + points);
  };

  const handleComingSoonPoint = (screenName) => {
    setScore((prevScore) => prevScore + 5);
    Alert.alert('Mini görev tamamlandı', `${screenName} Adası için 5 puan kazandın.`);
  };

  if (currentScreen === SCREENS.ELIFBA) {
    return (
      <LetterMatchingGame
        onBack={() => setCurrentScreen(SCREENS.HOME)}
        onGameComplete={handleGameComplete}
      />
    );
  }

  if (currentScreen === SCREENS.MAIN) {
    return <MainIslandScreen onBack={() => setCurrentScreen(SCREENS.HOME)} />;
  }

  if (currentScreen === SCREENS.KURAN) {
    return <KuranAdasiScreen onBack={() => setCurrentScreen(SCREENS.HOME)} />;
  }

  if (currentScreen === SCREENS.NAMAZ) {
    return (
      <PrayerGame
        onBack={() => setCurrentScreen(SCREENS.HOME)}
        onComplete={() => handleComingSoonPoint(SCREENS.NAMAZ)}
      />
    );
  }

  if (currentScreen === SCREENS.HADIS) {
    return (
      <HadithGame
        onBack={() => setCurrentScreen(SCREENS.HOME)}
        onComplete={() => handleComingSoonPoint(SCREENS.HADIS)}
      />
    );
  }

  if (currentScreen === SCREENS.DUA) {
    return (
      <DuaGame
        onBack={() => setCurrentScreen(SCREENS.HOME)}
        onComplete={() => handleComingSoonPoint(SCREENS.DUA)}
      />
    );
  }

  if (currentScreen === SCREENS.KIBLE) {
    return (
      <QiblaGame
        onBack={() => setCurrentScreen(SCREENS.HOME)}
        onComplete={() => handleComingSoonPoint(SCREENS.KIBLE)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/island_map.png')}
        style={styles.mapBackground}
        resizeMode="stretch"
      >
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Puan: {score}</Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Ana Ada"
          style={[styles.hotspot, styles.mainHotspot]}
          onPress={() => handleIslandPress(SCREENS.MAIN)}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Elifba Adası"
          style={[styles.hotspot, styles.elifbaHotspot]}
          onPress={() => handleIslandPress(SCREENS.ELIFBA)}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Kur'an Adası"
          style={[styles.hotspot, styles.kuranHotspot]}
          onPress={() => handleIslandPress(SCREENS.KURAN)}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Namaz Adası"
          style={[styles.hotspot, styles.prayerHotspot]}
          onPress={() => handleIslandPress(SCREENS.NAMAZ)}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Hadis Adası"
          style={[styles.hotspot, styles.hadithHotspot]}
          onPress={() => handleIslandPress(SCREENS.HADIS)}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Dua Adası"
          style={[styles.hotspot, styles.duaHotspot]}
          onPress={() => handleIslandPress(SCREENS.DUA)}
        />

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Kıble Adası"
          style={[styles.hotspot, styles.qiblaHotspot]}
          onPress={() => handleIslandPress(SCREENS.KIBLE)}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
  },
  hotspot: {
    position: 'absolute',
  },
  elifbaHotspot: {
    top: '34%',
    right: '7%',
    width: '25%',
    height: '34%',
  },
  kuranHotspot: {
    top: '5%',
    right: '3%',
    width: '34%',
    height: '34%',
    zIndex: 12,
  },
  prayerHotspot: {
    top: '5%',
    left: '8%',
    width: '25%',
    height: '35%',
  },
  mainHotspot: {
    top: '31%',
    left: '38%',
    width: '24%',
    height: '28%',
  },
  hadithHotspot: {
    bottom: '8%',
    left: '18%',
    width: '24%',
    height: '30%',
  },
  duaHotspot: {
    top: '39%',
    left: '6%',
    width: '25%',
    height: '25%',
  },
  qiblaHotspot: {
    bottom: '8%',
    left: '43%',
    width: '21%',
    height: '31%',
  },
  scoreContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#607D66',
    zIndex: 10,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E5A44',
  },
});
