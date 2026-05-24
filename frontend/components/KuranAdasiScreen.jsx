import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import akademiData from '../assets/data/elif_ba_akademi.json';

const modules = [
  { id: 1, title: '1. Kıyafet Değiştirme', icon: '🚂' },
  { id: 2, title: '2. Ses Köprüleri', icon: '🌉' },
  { id: 3, title: '3. Kelime Şelalesi', icon: '🌊' },
];

export default function KuranAdasiScreen({ onBack }) {
  const [selectedModuleId, setSelectedModuleId] = useState(2);
  const [activeResults, setActiveResults] = useState({});
  const [activeLetters, setActiveLetters] = useState({});
  const selectedModule =
    akademiData.find((item) => item.id === selectedModuleId) || akademiData[0];

  const toggleLetter = (bridgeId, letterSide) => {
    const key = `${bridgeId}-${letterSide}`;
    setActiveLetters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const combineBridge = (bridgeId) => {
    setActiveResults((prev) => ({
      ...prev,
      [bridgeId]: true,
    }));
    setActiveLetters((prev) => ({
      ...prev,
      [`${bridgeId}-left`]: true,
      [`${bridgeId}-right`]: true,
    }));
  };

  return (
    <ImageBackground
      source={require('../assets/images/frame_letter_green.png')}
      style={styles.container}
      resizeMode="stretch"
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Haritaya Dön"
        style={styles.backHotspot}
        onPress={onBack}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Kur'an Adası</Text>
            <Text style={styles.title}>Okuma Akademisi</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {selectedModule.id === 2 ? 'Dokun ve Birleştir' : 'Harf Treni'}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.modulePanel}>
            {modules.map((module) => {
              const isSelected = module.id === selectedModule.id;

              return (
                <TouchableOpacity
                  key={module.id}
                  activeOpacity={0.86}
                  style={[styles.moduleCard, isSelected && styles.moduleCardActive]}
                  onPress={() => setSelectedModuleId(module.id)}
                >
                  <Text style={styles.moduleIcon}>{module.icon}</Text>
                  <Text style={[styles.moduleTitle, isSelected && styles.moduleTitleActive]}>
                    {module.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={styles.detailPanel} contentContainerStyle={styles.detailContent}>
            <Text style={styles.detailTitle}>{selectedModule.kisim}</Text>
            <Text style={styles.detailText}>{selectedModule.detay}</Text>

            {selectedModule.id === 1 && (
              <View style={styles.letterTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>Harf</Text>
                  <Text style={styles.headerCell}>Başta</Text>
                  <Text style={styles.headerCell}>Ortada</Text>
                  <Text style={styles.headerCell}>Sonda</Text>
                </View>
                {selectedModule.data.map((item) => (
                  <View key={item.harf} style={styles.tableRow}>
                    <Text style={styles.arabicCell}>{item.harf}</Text>
                    <Text style={styles.arabicCell}>{item.basta}</Text>
                    <Text style={styles.arabicCell}>{item.ortada}</Text>
                    <Text style={styles.arabicCell}>{item.sonda}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedModule.id === 2 && (
              <View style={styles.bridgeList}>
                {selectedModule.data.map((item) => {
                  const isCombined = activeResults[item.id];
                  const isLeftActive = activeLetters[`${item.id}-left`] || isCombined;
                  const isRightActive = activeLetters[`${item.id}-right`] || isCombined;

                  return (
                    <View key={item.id} style={styles.bridgeCard}>
                      <View style={styles.bridgeTopRow}>
                        <View style={styles.bridgeCopy}>
                          <Text style={styles.bridgeTitle}>Ses Köprüsü</Text>
                          <Text style={styles.bridgeSubtitle}>{item.okunus}</Text>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.86}
                          style={[styles.resultButton, isCombined && styles.resultButtonSuccess]}
                          onPress={() => combineBridge(item.id)}
                        >
                          <Text style={styles.resultText}>
                            {isCombined ? item.sonuc : 'Birleştir'}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.bridgeFlow}>
                        <TouchableOpacity
                          activeOpacity={0.86}
                          style={[styles.letterBox, isLeftActive && styles.letterBoxActive]}
                          onPress={() => toggleLetter(item.id, 'left')}
                        >
                          <Text style={styles.bridgeLetter}>{item.harf1}</Text>
                        </TouchableOpacity>

                        <View style={styles.plusCircle}>
                          <Text style={styles.plusText}>+</Text>
                        </View>

                        <TouchableOpacity
                          activeOpacity={0.86}
                          style={[styles.letterBox, isRightActive && styles.letterBoxActive]}
                          onPress={() => toggleLetter(item.id, 'right')}
                        >
                          <Text style={styles.bridgeLetter}>{item.harf2}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {selectedModule.id === 3 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Yakında</Text>
                <Text style={styles.emptyText}>
                  Kelime Şelalesi verilerini birlikte eklediğimizde bu alan canlanacak.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backHotspot: {
    position: 'absolute',
    top: '2%',
    left: '1%',
    width: '10%',
    height: '14%',
    zIndex: 20,
  },
  content: {
    position: 'absolute',
    top: '15%',
    left: '9%',
    right: '8%',
    bottom: '13%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eyebrow: {
    color: '#B36C37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 2,
  },
  title: {
    color: '#284434',
    fontSize: 24,
    fontWeight: '900',
  },
  badge: {
    borderRadius: 12,
    backgroundColor: 'rgba(234, 246, 236, 0.92)',
    borderWidth: 1,
    borderColor: '#AFC8B2',
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  badgeText: {
    color: '#3E5A44',
    fontSize: 13,
    fontWeight: '900',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  modulePanel: {
    width: '31%',
    minWidth: 220,
    justifyContent: 'center',
    gap: 10,
  },
  moduleCard: {
    minHeight: 78,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#D4A574',
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  moduleCardActive: {
    backgroundColor: 'rgba(255, 239, 203, 0.9)',
    transform: [{ scale: 1.03 }],
  },
  moduleIcon: {
    fontSize: 26,
    marginRight: 10,
  },
  moduleTitle: {
    flex: 1,
    color: '#284434',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  moduleTitleActive: {
    color: '#4B351D',
  },
  detailPanel: {
    flex: 1,
  },
  detailContent: {
    padding: 8,
    paddingBottom: 12,
  },
  detailTitle: {
    color: '#284434',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 5,
  },
  detailText: {
    color: '#3C4E34',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 10,
  },
  letterTable: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1CAA0',
    backgroundColor: 'rgba(255, 253, 248, 0.82)',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#607D66',
    paddingVertical: 9,
  },
  headerCell: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E1CAA0',
    paddingVertical: 9,
  },
  arabicCell: {
    flex: 1,
    color: '#1F1F1F',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 38,
    writingDirection: 'rtl',
  },
  bridgeList: {
    gap: 12,
  },
  bridgeCard: {
    borderRadius: 22,
    backgroundColor: 'rgba(255, 253, 248, 0.84)',
    borderWidth: 1,
    borderColor: '#E1CAA0',
    padding: 14,
  },
  bridgeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  bridgeCopy: {
    flex: 1,
  },
  bridgeTitle: {
    color: '#B36C37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 2,
  },
  bridgeSubtitle: {
    color: '#284434',
    fontSize: 18,
    fontWeight: '900',
  },
  resultButton: {
    width: 170,
    borderRadius: 16,
    backgroundColor: '#607D66',
    paddingVertical: 12,
    alignItems: 'center',
  },
  resultButtonSuccess: {
    backgroundColor: '#FF9800',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    writingDirection: 'rtl',
  },
  bridgeFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBox: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#E1CAA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBoxActive: {
    backgroundColor: '#FFEFCB',
    borderColor: '#FF9800',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    transform: [{ scale: 1.05 }],
  },
  bridgeLetter: {
    color: '#1F1F1F',
    fontSize: 38,
    fontWeight: '900',
    writingDirection: 'rtl',
  },
  plusCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF6EC',
    borderWidth: 1,
    borderColor: '#AFC8B2',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  plusText: {
    color: '#3E5A44',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 32,
  },
  emptyCard: {
    borderRadius: 18,
    backgroundColor: 'rgba(255, 239, 203, 0.86)',
    borderWidth: 1,
    borderColor: '#E8B866',
    padding: 18,
  },
  emptyTitle: {
    color: '#284434',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
  },
  emptyText: {
    color: '#3C4E34',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
  },
});
