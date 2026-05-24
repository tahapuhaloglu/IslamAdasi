import React, { useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import hadiths from '../assets/data/hadiths.json';

export default function HadithGame({ onBack, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const currentHadith = hadiths[currentIndex];
  const progress = ((currentIndex + 1) / hadiths.length) * 100;

  const resetCard = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const goToHadith = (direction) => {
    const nextIndex = currentIndex + direction;

    if (nextIndex < 0 || nextIndex >= hadiths.length) {
      resetCard();
      return;
    }

    Animated.timing(pan, {
      toValue: { x: direction > 0 ? -420 : 420, y: 0 },
      duration: 160,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(nextIndex);
      pan.setValue({ x: direction > 0 ? 420 : -420, y: 0 });
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 8,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -55) {
          goToHadith(1);
          return;
        }

        if (gesture.dx > 55) {
          goToHadith(-1);
          return;
        }

        resetCard();
      },
    })
  ).current;

  return (
    <ImageBackground
      source={require('../assets/images/frame_letter_green.png')}
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
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {hadiths.length}
        </Text>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.cardShadow,
            {
              transform: [
                { translateX: pan.x },
                {
                  rotate: pan.x.interpolate({
                    inputRange: [-260, 0, 260],
                    outputRange: ['-5deg', '0deg', '5deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <ImageBackground
            source={require('../assets/images/frame_hadith_bg.png')}
            style={styles.card}
            imageStyle={styles.cardImage}
            resizeMode="stretch"
          >
            <ScrollView contentContainerStyle={styles.cardContent} scrollEnabled={false}>
              <View style={styles.titleBand}>
                <Text style={styles.hadithTitle}>{currentHadith.title}</Text>
              </View>

              <View style={styles.hadithSection}>
                <Text style={styles.hadithText}>{currentHadith.hadith}</Text>
                <Text style={styles.reference}>{currentHadith.reference}</Text>
              </View>

              <View style={styles.childNoteSection}>
                <Text style={styles.childNoteLabel}>Çocuklara Not</Text>
                <Text style={styles.childNoteText}>{currentHadith.childNote}</Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </Animated.View>

        <View style={styles.controls}>
          <Text style={styles.swipeHint}>Kartı sağa veya sola kaydır</Text>
        </View>

        {currentIndex === hadiths.length - 1 && (
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.completeButtonText}>Hadis Görevini Bitir</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    width: 120,
    backgroundColor: '#607D66',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  navButtonSpacer: {
    width: 120,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  title: {
    color: '#284434',
    fontSize: 24,
    fontWeight: '900',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  progressTrack: {
    width: '72%',
    height: 7,
    backgroundColor: '#EFE5D2',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4A574',
    borderRadius: 999,
  },
  progressText: {
    color: '#746A5C',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardShadow: {
    width: '86%',
    flex: 1,
    maxHeight: 350,
    minHeight: 270,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 7,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 18,
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 38,
    paddingVertical: 24,
  },
  titleBand: {
    alignSelf: 'center',
    minWidth: '44%',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 253, 248, 0.84)',
    borderWidth: 1,
    borderColor: 'rgba(212, 165, 116, 0.45)',
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  hadithTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A472A',
    textAlign: 'center',
  },
  hadithSection: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26, 71, 42, 0.16)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(26, 71, 42, 0.1)',
  },
  hadithText: {
    fontSize: 18,
    color: '#1A472A',
    lineHeight: 28,
    marginBottom: 8,
    fontStyle: 'italic',
    fontWeight: '800',
    textAlign: 'center',
  },
  reference: {
    fontSize: 12,
    color: '#736655',
    textAlign: 'right',
    fontWeight: '800',
  },
  childNoteSection: {
    alignSelf: 'center',
    width: '70%',
    backgroundColor: 'rgba(255, 253, 248, 0.86)',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4A574',
  },
  childNoteLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#C9784A',
    marginBottom: 4,
  },
  childNoteText: {
    fontSize: 13,
    color: '#1A472A',
    lineHeight: 20,
    fontWeight: '700',
  },
  controls: {
    width: '86%',
    alignItems: 'center',
    marginTop: 8,
  },
  swipeHint: {
    color: '#3E5A44',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: '#C9784A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
