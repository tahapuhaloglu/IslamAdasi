import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const prayerData = [
  {
    vakit: 'Sabah',
    icon: '☾',
    accent: '#F6C66B',
    rekat: '2 Sünnet + 2 Farz',
    steps: [
      'Önce 2 rekat sünnet kılınır.',
      'Sonra 2 rekat farz kılınır.',
      'Her rekatta kıyam, rükû, secde ve oturuş sırasına dikkat edilir.',
    ],
    sureler: [
      'Sübhaneke',
      'Fatiha',
      'Zamm-ı Sure',
      'Tahiyyat',
      'Salli-Barik',
      'Rabbena',
    ],
  },
  {
    vakit: 'Öğle',
    icon: '☀',
    accent: '#F5A94D',
    rekat: '4 İlk Sünnet + 4 Farz + 2 Son Sünnet',
    steps: [
      'Önce 4 rekat ilk sünnet kılınır.',
      'Ardından 4 rekat farz kılınır.',
      'Son olarak 2 rekat son sünnet kılınır.',
    ],
    sureler: ['Fatiha', 'Zamm-ı Sure', 'Tahiyyat', 'Salli-Barik', 'Rabbena'],
  },
  {
    vakit: 'İkindi',
    icon: '◐',
    accent: '#EFAE62',
    rekat: '4 Sünnet + 4 Farz',
    steps: [
      'Önce 4 rekat sünnet kılınır.',
      'Sonra 4 rekat farz kılınır.',
      'Namaz boyunca her rekatta hareket sırası korunur.',
    ],
    sureler: ['Fatiha', 'Zamm-ı Sure', 'Tahiyyat', 'Salli-Barik', 'Rabbena'],
  },
  {
    vakit: 'Akşam',
    icon: '☽',
    accent: '#D8906F',
    rekat: '3 Farz + 2 Sünnet',
    steps: [
      'Önce 3 rekat farz kılınır.',
      'Farzdan sonra 2 rekat sünnet kılınır.',
      'Akşam namazının farzı 3 rekat olduğu için dikkatle takip edilir.',
    ],
    sureler: ['Fatiha', 'Zamm-ı Sure', 'Tahiyyat', 'Salli-Barik', 'Rabbena'],
  },
  {
    vakit: 'Yatsı',
    icon: '✦',
    accent: '#8E86C7',
    rekat: '4 İlk Sünnet + 4 Farz + 2 Son Sünnet + 3 Vitir',
    steps: [
      'Önce 4 rekat ilk sünnet kılınır.',
      'Ardından 4 rekat farz kılınır.',
      'Sonra 2 rekat son sünnet kılınır.',
      'En sonda 3 rekat vitir namazı kılınır.',
    ],
    sureler: [
      'Fatiha',
      'Zamm-ı Sure',
      'Tahiyyat',
      'Salli-Barik',
      'Rabbena',
      'Kunut Duaları',
    ],
  },
];

export default function PrayerGame({ onBack, onComplete }) {
  const [selectedVakit, setSelectedVakit] = useState(prayerData[0].vakit);
  const [detailOpen, setDetailOpen] = useState(false);
  const selectedItem = prayerData.find((item) => item.vakit === selectedVakit) || prayerData[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={onBack}>
          <Text style={styles.navButtonText}>Haritaya Dön</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Namaz Adası</Text>
        <View style={styles.navButtonSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.imagePanel}>
          <View style={styles.imageFrame}>
            <Image
              source={require('../assets/images/Namaz.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.detailPanel}>
          {!detailOpen ? (
            <ScrollView contentContainerStyle={styles.detailPanelContent}>
              <Text style={styles.sectionTitle}>Vakitler</Text>

              <View style={styles.vakitGrid}>
                {prayerData.map((item) => {
                  const isSelected = item.vakit === selectedVakit;

                  return (
                    <TouchableOpacity
                      key={item.vakit}
                      activeOpacity={0.82}
                      style={[
                        styles.vakitButton,
                        { borderColor: item.accent },
                        isSelected && styles.vakitButtonActive,
                      ]}
                      onPress={() => {
                        setSelectedVakit(item.vakit);
                        setDetailOpen(true);
                      }}
                    >
                      <View style={[styles.vakitGlow, { backgroundColor: item.accent }]}>
                        <Text style={styles.vakitIcon}>{item.icon}</Text>
                      </View>
                      <Text style={[styles.vakitButtonText, isSelected && styles.vakitButtonTextActive]}>
                        {item.vakit}
                      </Text>
                      <Text style={[styles.vakitSubText, isSelected && styles.vakitButtonTextActive]}>
                        Namazı
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <ScrollView contentContainerStyle={styles.detailPanelContent}>
              <View style={styles.selectedCard}>
                <View style={styles.detailHeader}>
                  <Text style={styles.selectedTitle}>{selectedItem.vakit} Namazı</Text>
                  <TouchableOpacity style={styles.backToTimesButton} onPress={() => setDetailOpen(false)}>
                    <Text style={styles.backToTimesText}>Vakitlere Dön</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Kaç Rekat?</Text>
                  <Text style={styles.infoText}>{selectedItem.rekat}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Nasıl Kılınır?</Text>
                  {selectedItem.steps.map((step, index) => (
                    <View key={step} style={styles.stepRow}>
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Hangi Sure ve Dualar Okunur?</Text>
                  <View style={styles.sureGrid}>
                    {selectedItem.sureler.map((sure) => (
                      <View key={sure} style={styles.surePill}>
                        <Text style={styles.sureText}>{sure}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
                <Text style={styles.completeButtonText}>Mini Görevi Bitir</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6EC',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navButton: {
    width: 120,
    backgroundColor: '#5F7E63',
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
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 14,
  },
  imagePanel: {
    width: '31%',
    minWidth: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E0B77D',
    padding: 6,
  },
  imageFrame: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailPanel: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E0B77D',
  },
  detailPanelContent: {
    padding: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3E5A44',
    marginBottom: 12,
  },
  vakitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  vakitButton: {
    width: 116,
    minHeight: 124,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8E9',
    borderWidth: 2,
    borderRadius: 58,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#DFA24F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  vakitButtonActive: {
    backgroundColor: '#5F7E63',
    transform: [{ scale: 1.03 }],
  },
  vakitGlow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  vakitIcon: {
    color: '#4A2A18',
    fontSize: 27,
    fontWeight: '900',
  },
  vakitButtonText: {
    color: '#50331E',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  vakitButtonTextActive: {
    color: '#FFFFFF',
  },
  vakitSubText: {
    color: '#735033',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  selectedCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F7F1E3',
    borderWidth: 1,
    borderColor: '#DFC58B',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  backToTimesButton: {
    backgroundColor: '#5F7E63',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  backToTimesText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  selectedTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
    color: '#3E5A44',
  },
  infoRow: {
    backgroundColor: '#FFFDF8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6D0A5',
    padding: 12,
    marginTop: 8,
  },
  infoLabel: {
    color: '#5F7E63',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#3C4E34',
    lineHeight: 22,
    fontWeight: '700',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 7,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F6C66B',
    color: '#4A321D',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 24,
    textAlign: 'center',
    marginRight: 8,
  },
  stepText: {
    flex: 1,
    color: '#3C4E34',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  sureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  surePill: {
    backgroundColor: '#FFEFCB',
    borderWidth: 1,
    borderColor: '#E8B866',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  sureText: {
    color: '#5B3C1E',
    fontSize: 13,
    fontWeight: '900',
  },
  completeButton: {
    marginTop: 18,
    backgroundColor: '#C9784A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
