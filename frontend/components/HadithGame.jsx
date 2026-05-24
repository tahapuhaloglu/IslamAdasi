import React, { useState, useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';
import hadiths from '../assets/data/hadiths.json';

const { width } = Dimensions.get('window');

export default function HadithGame({ onBack, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledHadiths, setShuffledHadiths] = useState(() => {
    // Hadisleri karıştır
    const shuffled = [...hadiths].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        // Sağ swipe - sonraki hadis
        if (dx > 50 && vx > 0.5) {
          handlePrevious();
        }
        // Sol swipe - önceki hadis
        else if (dx < -50 && vx < -0.5) {
          handleNext();
        } else {
          // Geri dön
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleNext = () => {
    if (currentIndex < shuffledHadiths.length - 1) {
      setCurrentIndex(currentIndex + 1);
      pan.setValue({ x: 0, y: 0 });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      pan.setValue({ x: 0, y: 0 });
    }
  };

  const currentHadith = shuffledHadiths[currentIndex];
  const progress = ((currentIndex + 1) / shuffledHadiths.length) * 100;

  return (
    <ImageBackground
      source={require('../assets/images/game_background.png')}
      style={styles.container}
      resizeMode="stretch"
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={onBack}>
          <Text style={styles.navButtonText}>Haritaya Dön</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Hadis Adası</Text>
        <View style={styles.navButtonSpacer} />
      </View>

      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {shuffledHadiths.length}
        </Text>

        {/* Hadith Card */}
        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <ImageBackground
            source={require('../assets/images/frame_hadith_bg.png')}
            style={styles.card}
            resizeMode="stretch"
          >
            <ScrollView
              contentContainerStyle={styles.cardContent}
              scrollEnabled={false}
            >
              <Text style={styles.hadithTitle}>{currentHadith.title}</Text>
              
              <View style={styles.hadithSection}>
                <Text style={styles.hadithText}>{currentHadith.hadith}</Text>
                <Text style={styles.reference}>{currentHadith.reference}</Text>
              </View>

              <View style={styles.childNoteSection}>
                <Text style={styles.childNoteLabel}>Çocuklara Not:</Text>
                <Text style={styles.childNoteText}>{currentHadith.childNote}</Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </Animated.View>

        {/* Navigation Hints */}
        <View style={styles.navigationHints}>
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              {currentIndex > 0 ? '← Geri' : ''}
            </Text>
          </View>
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              {currentIndex < shuffledHadiths.length - 1 ? 'İleri →' : ''}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        {currentIndex === shuffledHadiths.length - 1 && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={onComplete}
          >
            <Text style={styles.completeButtonText}>Tamamla</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    width: 110,
    backgroundColor: '#607D66',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  navButtonSpacer: {
    width: 110,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a472a',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressContainer: {
    width: '85%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4A574',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 14,
    fontWeight: '500',
  },
  cardContainer: {
    width: width - 60,
    height: 340,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  cardContent: {
    width: '100%',
    justifyContent: 'center',
  },
  hadithTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1a472a',
    marginBottom: 14,
    textAlign: 'center',
  },
  hadithSection: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26, 71, 42, 0.15)',
  },
  hadithText: {
    fontSize: 15,
    color: '#1a472a',
    lineHeight: 23,
    marginBottom: 8,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  reference: {
    fontSize: 11,
    color: '#888',
    textAlign: 'right',
    fontWeight: '500',
  },
  childNoteSection: {
    backgroundColor: 'rgba(212, 165, 116, 0.12)',
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4A574',
  },
  childNoteLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A574',
    marginBottom: 3,
  },
  childNoteText: {
    fontSize: 12,
    color: '#1a472a',
    lineHeight: 19,
  },
  navigationHints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  hintContainer: {
    flex: 1,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 11,
    color: '#bbb',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 6,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});


