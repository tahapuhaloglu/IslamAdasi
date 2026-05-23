import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import lettersData from '../assets/data/letters.json';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PAIR_COUNT = 10;
const CARD_COUNT = PAIR_COUNT * 2;
const MATCH_POINTS = 10;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildDeck() {
  const selectedLetters = shuffle(lettersData).slice(0, PAIR_COUNT);
  const pairedCards = selectedLetters.flatMap((letter) => [
    { ...letter, uniqueId: `${letter.id}-a` },
    { ...letter, uniqueId: `${letter.id}-b` },
  ]);

  return shuffle(pairedCards);
}

export default function LetterMatchingGame({ onGameComplete, onBack }) {
  const [gridItems, setGridItems] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const totalScore = useMemo(() => matchedIds.length / 2 * MATCH_POINTS, [matchedIds.length]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setGridItems(buildDeck());
    setOpenIds([]);
    setMatchedIds([]);
    setFirstCard(null);
    setIsLocked(false);
    setMoves(0);
    setGameFinished(false);
  };

  const completeGame = (nextMatchedIds, nextMoves) => {
    if (nextMatchedIds.length !== CARD_COUNT) {
      return;
    }

    const bonus = Math.max(0, 50 - nextMoves);
    const earnedPoints = PAIR_COUNT * MATCH_POINTS + bonus;
    setGameFinished(true);
    onGameComplete?.(earnedPoints);
    Alert.alert('Tebrikler', `${nextMoves} hamlede tüm harfleri eşleştirdin!`);
  };

  const closeUnmatchedCards = (firstUniqueId, secondUniqueId) => {
    setTimeout(() => {
      setOpenIds((currentIds) =>
        currentIds.filter((id) => id !== firstUniqueId && id !== secondUniqueId)
      );
      setFirstCard(null);
      setIsLocked(false);
    }, 1000);
  };

  const handleCardPress = (item) => {
    if (
      isLocked ||
      gameFinished ||
      openIds.includes(item.uniqueId) ||
      matchedIds.includes(item.uniqueId)
    ) {
      return;
    }

    const nextOpenIds = [...openIds, item.uniqueId];
    setOpenIds(nextOpenIds);

    if (!firstCard) {
      setFirstCard(item);
      return;
    }

    const nextMoves = moves + 1;
    setMoves(nextMoves);

    if (firstCard.id === item.id) {
      const nextMatchedIds = [...matchedIds, firstCard.uniqueId, item.uniqueId];
      setMatchedIds(nextMatchedIds);
      setFirstCard(null);
      completeGame(nextMatchedIds, nextMoves);
      return;
    }

    setIsLocked(true);
    closeUnmatchedCards(firstCard.uniqueId, item.uniqueId);
  };

  return (
    <ImageBackground
      source={require('../assets/images/game_background.png')}
      style={styles.container}
      resizeMode="stretch"
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Haritaya Dön</Text>
        </TouchableOpacity>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>Elifba Hafıza Oyunu</Text>
          <Text style={styles.metaText}>Puan: {totalScore} | Hamle: {moves}</Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={startNewGame}>
          <Text style={styles.resetButtonText}>Yeniden Oyna</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {gridItems.map((item) => {
          const isOpen = openIds.includes(item.uniqueId) || matchedIds.includes(item.uniqueId);
          const isMatched = matchedIds.includes(item.uniqueId);

          return (
            <TouchableOpacity
              key={item.uniqueId}
              activeOpacity={0.86}
              onPress={() => handleCardPress(item)}
              style={[
                styles.cardWrapper,
                isOpen && styles.openCard,
                isMatched && styles.matchedCard,
              ]}
            >
              <ImageBackground
                source={require('../assets/images/frame_letter_green.png')}
                style={styles.frame}
                resizeMode="stretch"
              >
                {isOpen ? (
                  <>
                    <Text style={styles.arabicText}>{item.letter}</Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                  </>
                ) : (
                  <Text style={styles.cardBackText}>?</Text>
                )}
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>

      {gameFinished && (
        <View style={styles.finishBanner}>
          <Text style={styles.finishTitle}>Tebrikler!</Text>
          <Text style={styles.finishText}>10 çiftin tamamını buldun.</Text>
          <TouchableOpacity style={styles.finishButton} onPress={startNewGame}>
            <Text style={styles.finishButtonText}>Yeniden Oyna</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    marginBottom: 10,
  },
  titleGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#284434',
  },
  metaText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: '#607D66',
  },
  backButton: {
    width: 112,
    backgroundColor: '#607D66',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resetButton: {
    width: 112,
    backgroundColor: '#C9784A',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-around',
  },
  cardWrapper: {
    width: '18%',
    height: SCREEN_HEIGHT * 0.17,
    minHeight: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 2,
    borderColor: '#E2EFE0',
    transform: [{ scale: 1 }],
  },
  openCard: {
    borderColor: '#DEB887',
    transform: [{ scale: 1.04 }],
  },
  matchedCard: {
    borderColor: '#5F9B6E',
    opacity: 0.72,
  },
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  arabicText: {
    fontSize: 29,
    color: '#284434',
    fontWeight: 'bold',
    lineHeight: 36,
  },
  nameText: {
    marginTop: 2,
    fontSize: 11,
    color: '#607D66',
    fontWeight: '700',
    textAlign: 'center',
  },
  cardBackText: {
    fontSize: 28,
    color: '#C9784A',
    fontWeight: 'bold',
  },
  finishBanner: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
    width: 280,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DEB887',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  finishTitle: {
    color: '#284434',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finishText: {
    color: '#607D66',
    fontSize: 13,
    fontWeight: '600',
    marginVertical: 4,
  },
  finishButton: {
    backgroundColor: '#607D66',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
