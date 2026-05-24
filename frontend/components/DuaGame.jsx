import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import duaGroups from '../assets/data/duas.json';

const flatDuas = duaGroups.flatMap((group) =>
  group.icerik.map((dua) => ({
    ...dua,
    kategori: group.kategori,
  }))
);

export default function DuaGame({ onBack, onComplete }) {
  const [selectedCategory, setSelectedCategory] = useState(duaGroups[0].kategori);
  const [selectedDuaId, setSelectedDuaId] = useState(flatDuas[0].id);

  const visibleDuas = useMemo(
    () => flatDuas.filter((dua) => dua.kategori === selectedCategory),
    [selectedCategory]
  );
  const selectedDua = flatDuas.find((dua) => dua.id === selectedDuaId) || visibleDuas[0] || flatDuas[0];

  const handleCategoryPress = (category) => {
    const firstDua = flatDuas.find((dua) => dua.kategori === category);
    setSelectedCategory(category);
    if (firstDua) {
      setSelectedDuaId(firstDua.id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={onBack}>
          <Text style={styles.navButtonText}>Haritaya Dön</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Dua Adası</Text>
        <View style={styles.navButtonSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.sidebar}>
          <View style={styles.categoryTabs}>
            {duaGroups.map((group) => {
              const isSelected = group.kategori === selectedCategory;

              return (
                <TouchableOpacity
                  key={group.kategori}
                  activeOpacity={0.84}
                  style={[styles.categoryTab, isSelected && styles.categoryTabActive]}
                  onPress={() => handleCategoryPress(group.kategori)}
                >
                  <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                    {group.kategori}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView contentContainerStyle={styles.duaList}>
            {visibleDuas.map((dua) => {
              const isSelected = dua.id === selectedDua.id;

              return (
                <TouchableOpacity
                  key={dua.id}
                  activeOpacity={0.84}
                  style={[styles.duaButton, isSelected && styles.duaButtonActive]}
                  onPress={() => setSelectedDuaId(dua.id)}
                >
                  <Text style={[styles.duaButtonTitle, isSelected && styles.duaButtonTitleActive]}>
                    {dua.baslik}
                  </Text>
                  <Text style={[styles.duaButtonHint, isSelected && styles.duaButtonHintActive]}>
                    {dua.okunma_zamani}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView style={styles.cardPanel} contentContainerStyle={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleGroup}>
              <Text style={styles.cardCategory}>{selectedDua.kategori}</Text>
              <Text style={styles.cardTitle}>{selectedDua.baslik}</Text>
            </View>
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>{selectedDua.okunma_zamani}</Text>
            </View>
          </View>

          <View style={styles.arabicBox}>
            <Text style={styles.arabicText}>{selectedDua.arapca}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Okunuşu</Text>
            <Text style={styles.readingText}>{selectedDua.okunus}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Anlamı</Text>
            <Text style={styles.meaningText}>{selectedDua.anlam}</Text>
          </View>

          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.completeButtonText}>Dua Görevini Bitir</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6EC',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navButton: {
    width: 120,
    backgroundColor: '#607D66',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonSpacer: {
    width: 120,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: '#284434',
    fontSize: 24,
    fontWeight: '900',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 14,
  },
  sidebar: {
    width: '34%',
    minWidth: 250,
    borderRadius: 14,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#DDBD80',
    padding: 12,
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  categoryTab: {
    flex: 1,
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDBD80',
    backgroundColor: '#FFF8E9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  categoryTabActive: {
    backgroundColor: '#607D66',
    borderColor: '#49664F',
  },
  categoryText: {
    color: '#5A422B',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  duaList: {
    gap: 8,
    paddingBottom: 4,
  },
  duaButton: {
    minHeight: 64,
    borderRadius: 10,
    backgroundColor: '#F8F2E5',
    borderWidth: 1,
    borderColor: '#E1CAA0',
    padding: 10,
    justifyContent: 'center',
  },
  duaButtonActive: {
    backgroundColor: '#F0D68F',
    borderColor: '#C9913E',
  },
  duaButtonTitle: {
    color: '#314B39',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },
  duaButtonTitleActive: {
    color: '#3D2B17',
  },
  duaButtonHint: {
    color: '#6C604E',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
  },
  duaButtonHintActive: {
    color: '#4B351D',
  },
  cardPanel: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#DDBD80',
  },
  cardContent: {
    padding: 16,
    paddingBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 12,
  },
  cardTitleGroup: {
    flex: 1,
  },
  cardCategory: {
    color: '#B36C37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 3,
  },
  cardTitle: {
    color: '#284434',
    fontSize: 26,
    fontWeight: '900',
  },
  timeBadge: {
    maxWidth: '42%',
    backgroundColor: '#EAF6EC',
    borderWidth: 1,
    borderColor: '#AFC8B2',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  timeBadgeText: {
    color: '#3E5A44',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
    textAlign: 'center',
  },
  arabicBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1CAA0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  arabicText: {
    color: '#1F1F1F',
    fontSize: 28,
    lineHeight: 46,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  infoBox: {
    backgroundColor: '#F7F1E3',
    borderWidth: 1,
    borderColor: '#DFC58B',
    borderRadius: 12,
    padding: 13,
    marginTop: 10,
  },
  infoLabel: {
    color: '#5F7E63',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  readingText: {
    color: '#3C4E34',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  meaningText: {
    color: '#4F463A',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
  },
  completeButton: {
    marginTop: 14,
    backgroundColor: '#C9784A',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
