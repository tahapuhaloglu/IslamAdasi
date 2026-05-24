import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import islamSartlari from '../assets/data/islam_sartlari.json';
import ahlakRehberi from '../assets/data/ahlak_rehberi.json';
import ezanKamet from '../assets/data/ezan_kamet.json';
import namazRehberi from '../assets/data/namaz_rehberi.json';
import abdestCesitleri from '../assets/data/abdest_cesitleri.json';

const mainIslandAreas = [
  {
    id: 'namaz',
    title: 'Namaz',
    styleName: 'namazHotspot',
  },
  {
    id: 'abdest',
    title: 'Abdest',
    styleName: 'abdestHotspot',
  },
  {
    id: 'ezan',
    title: 'Ezan',
    styleName: 'ezanHotspot',
  },
  {
    id: 'guzel-ahlak',
    title: 'Güzel Ahlak',
    styleName: 'guzelAhlakHotspot',
  },
  {
    id: 'islamin-sartlari',
    title: "İslam'ın Şartları",
    styleName: 'islamSartlariHotspot',
  },
  {
    id: 'ana-ada',
    title: 'Ana Ada Merkezi',
    styleName: 'anaAdaHotspot',
  },
  {
    id: 'ogrenme-merkezi',
    title: 'İslam Öğrenme Merkezi',
    styleName: 'ogrenmeMerkeziHotspot',
  },
];

export default function MainIslandScreen({ onBack }) {
  const [activeAreaId, setActiveAreaId] = useState(null);
  const [selectedStepId, setSelectedStepId] = useState(islamSartlari[0].id);
  const [completedStepIds, setCompletedStepIds] = useState([]);
  const [selectedVirtueId, setSelectedVirtueId] = useState(ahlakRehberi[0].id);
  const [completedVirtueIds, setCompletedVirtueIds] = useState([]);
  const [selectedPrayerId, setSelectedPrayerId] = useState(namazRehberi.guzellikler[0].id);
  const [completedPrayerIds, setCompletedPrayerIds] = useState([]);
  const [selectedAblutionId, setSelectedAblutionId] = useState(abdestCesitleri[0].id);
  const [completedAblutionIds, setCompletedAblutionIds] = useState([]);

  const selectedStep =
    islamSartlari.find((item) => item.id === selectedStepId) || islamSartlari[0];
  const completedCount = completedStepIds.length;
  const selectedVirtue =
    ahlakRehberi.find((item) => item.id === selectedVirtueId) || ahlakRehberi[0];
  const completedVirtueCount = completedVirtueIds.length;
  const ezanItem = ezanKamet.find((item) => item.id === 'ezan') || ezanKamet[0];
  const kametItem = ezanKamet.find((item) => item.id === 'kamet') || ezanKamet[1];
  const prayerItems = [...namazRehberi.guzellikler, ...namazRehberi.farzlar];
  const selectedPrayerItem =
    prayerItems.find((item) => item.id === selectedPrayerId) || prayerItems[0];
  const prayerBadgeEarned = completedPrayerIds.length === prayerItems.length;
  const selectedAblution =
    abdestCesitleri.find((item) => item.id === selectedAblutionId) || abdestCesitleri[0];
  const ablutionBadgeEarned = completedAblutionIds.length === abdestCesitleri.length;

  const handleAreaPress = (area) => {
    if (
      area.id === 'islamin-sartlari' ||
      area.id === 'guzel-ahlak' ||
      area.id === 'ezan' ||
      area.id === 'namaz' ||
      area.id === 'abdest'
    ) {
      setActiveAreaId(area.id);
      return;
    }

    Alert.alert(area.title, 'Bu alanın iç detaylarını sıradaki adımda hazırlayacağız.');
  };

  const handleLearnedPress = () => {
    setCompletedStepIds((prevIds) => {
      if (prevIds.includes(selectedStep.id)) {
        return prevIds;
      }

      return [...prevIds, selectedStep.id];
    });
  };

  const handleVirtueLearnedPress = () => {
    setCompletedVirtueIds((prevIds) => {
      if (prevIds.includes(selectedVirtue.id)) {
        return prevIds;
      }

      return [...prevIds, selectedVirtue.id];
    });
  };

  const handlePrayerLearnedPress = () => {
    setCompletedPrayerIds((prevIds) => {
      if (prevIds.includes(selectedPrayerItem.id)) {
        return prevIds;
      }

      return [...prevIds, selectedPrayerItem.id];
    });
  };

  const handleAblutionLearnedPress = () => {
    setCompletedAblutionIds((prevIds) => {
      if (prevIds.includes(selectedAblution.id)) {
        return prevIds;
      }

      return [...prevIds, selectedAblution.id];
    });
  };

  if (activeAreaId === 'abdest') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/frame_letter_green.png')}
          style={styles.studyBackground}
          resizeMode="stretch"
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ana Ada'ya Dön"
            style={[styles.hotspot, styles.studyBackHotspot]}
            onPress={() => setActiveAreaId(null)}
          >
            <View style={styles.studyBackButton} />
          </TouchableOpacity>

          <View style={styles.studyContent}>
            <View style={styles.studyHeader}>
              <View>
                <Text style={styles.studyEyebrow}>Abdest Şelalesi</Text>
                <Text style={styles.studyTitle}>Arınma Yolları</Text>
              </View>
              <View style={[styles.studyProgressBadge, ablutionBadgeEarned && styles.waterBadgeEarned]}>
                <Text style={styles.studyProgressCount}>
                  {completedAblutionIds.length}/{abdestCesitleri.length}
                </Text>
                <Text style={styles.studyProgressText}>
                  {ablutionBadgeEarned ? 'Abdest Uzmanı' : 'yol öğrenildi'}
                </Text>
              </View>
            </View>

            <View style={styles.ablutionBody}>
              <View style={styles.ablutionChoicePanel}>
                {abdestCesitleri.map((item) => {
                  const isSelected = item.id === selectedAblution.id;
                  const isCompleted = completedAblutionIds.includes(item.id);

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.86}
                      style={[
                        styles.ablutionChoice,
                        { borderColor: item.color },
                        isSelected && styles.ablutionChoiceSelected,
                        isCompleted && { backgroundColor: item.color },
                      ]}
                      onPress={() => setSelectedAblutionId(item.id)}
                    >
                      <View style={[styles.ablutionIcon, { backgroundColor: item.color }]}>
                        <Text style={styles.ablutionIconText}>{item.ikon}</Text>
                      </View>
                      <View style={styles.ablutionChoiceCopy}>
                        <Text
                          style={[
                            styles.ablutionChoiceTitle,
                            isCompleted && styles.stepButtonTextCompleted,
                          ]}
                        >
                          {item.baslik}
                        </Text>
                        <Text
                          style={[
                            styles.ablutionChoiceText,
                            isCompleted && styles.stepButtonTextCompleted,
                          ]}
                        >
                          {item.ozellik}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <ScrollView style={styles.ablutionDetailPanel} contentContainerStyle={styles.ablutionDetailContent}>
                <View style={[styles.virtueDetailHeader, { borderColor: selectedAblution.color }]}>
                  <View style={[styles.bigFlowerIcon, { backgroundColor: selectedAblution.color }]}>
                    <Text style={styles.bigFlowerIconText}>{selectedAblution.ikon}</Text>
                  </View>
                  <View style={styles.virtueTitleCopy}>
                    <Text style={styles.detailStep}>Üç Temiz Yoldan Biri</Text>
                    <Text style={styles.detailTitle}>{selectedAblution.baslik}</Text>
                  </View>
                </View>

                <View style={styles.ablutionDetailGrid}>
                  <View style={styles.ablutionDetailColumn}>
                    <View style={styles.softInfoBox}>
                      <Text style={styles.infoLabel}>Ne Zaman Alınır?</Text>
                      <Text style={styles.infoText}>{selectedAblution.durum}</Text>
                    </View>

                    <View style={styles.noteBox}>
                      <Text style={styles.infoLabel}>İpucu</Text>
                      <Text style={styles.infoText}>{selectedAblution.ipucu}</Text>
                    </View>

                    <View style={styles.quizBox}>
                      <Text style={styles.infoLabel}>Mini Soru</Text>
                      <Text style={styles.infoText}>{selectedAblution.quiz.soru}</Text>
                      <Text style={styles.quizAnswer}>Cevap: {selectedAblution.quiz.cevap}</Text>
                    </View>
                  </View>

                  <View style={styles.ablutionDetailColumn}>
                    <View style={styles.ablutionStepsBox}>
                      <Text style={styles.infoLabel}>Adımlar</Text>
                      {selectedAblution.adimlar.map((step, index) => (
                        <View key={`${selectedAblution.id}-${index}`} style={styles.ablutionStepRow}>
                          <Text style={styles.ablutionStepNumber}>{index + 1}</Text>
                          <Text style={styles.ablutionStepText}>{step}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.learnedButton,
                    completedAblutionIds.includes(selectedAblution.id) && styles.learnedButtonDone,
                  ]}
                  onPress={handleAblutionLearnedPress}
                >
                  <Text style={styles.learnedButtonText}>
                    {completedAblutionIds.includes(selectedAblution.id)
                      ? 'Temizlik Yolu Öğrenildi'
                      : 'Bu Yolu Öğrendim!'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (activeAreaId === 'namaz') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/frame_letter_green.png')}
          style={styles.studyBackground}
          resizeMode="stretch"
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ana Ada'ya Dön"
            style={[styles.hotspot, styles.studyBackHotspot]}
            onPress={() => setActiveAreaId(null)}
          >
            <View style={styles.studyBackButton} />
          </TouchableOpacity>

          <View style={styles.studyContent}>
            <View style={styles.studyHeader}>
              <View>
                <Text style={styles.studyEyebrow}>Namazın Ruhu</Text>
                <Text style={styles.studyTitle}>Allah ile Buluşma Köşesi</Text>
              </View>
              <View style={[styles.studyProgressBadge, prayerBadgeEarned && styles.starBadgeEarned]}>
                <Text style={styles.studyProgressCount}>{completedPrayerIds.length}/{prayerItems.length}</Text>
                <Text style={styles.studyProgressText}>
                  {prayerBadgeEarned ? 'Namaz Yıldızı' : 'adım öğrenildi'}
                </Text>
              </View>
            </View>

            <View style={styles.prayerBody}>
              <View style={styles.prayerJourneyPanel}>
                <Text style={styles.prayerSectionTitle}>Namazın Güzellikleri</Text>
                <View style={styles.prayerBeautyRow}>
                  {namazRehberi.guzellikler.map((item) => {
                    const isSelected = item.id === selectedPrayerItem.id;
                    const isCompleted = completedPrayerIds.includes(item.id);

                    return (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.86}
                        style={[
                          styles.beautyCard,
                          { borderColor: item.color },
                          isSelected && styles.beautyCardSelected,
                          isCompleted && { backgroundColor: item.color },
                        ]}
                        onPress={() => setSelectedPrayerId(item.id)}
                      >
                        <Text style={styles.beautyIcon}>{item.ikon}</Text>
                        <Text style={[styles.beautyTitle, isCompleted && styles.stepButtonTextCompleted]}>
                          {item.baslik}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <Text style={styles.prayerSectionTitle}>Yolculuk Haritası</Text>
                <ScrollView contentContainerStyle={styles.prayerPath}>
                  {namazRehberi.farzlar.map((item, index) => {
                    const isSelected = item.id === selectedPrayerItem.id;
                    const isCompleted = completedPrayerIds.includes(item.id);

                    return (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.86}
                        style={[
                          styles.pathStep,
                          { borderColor: item.color },
                          isSelected && styles.pathStepSelected,
                          isCompleted && { backgroundColor: item.color },
                        ]}
                        onPress={() => setSelectedPrayerId(item.id)}
                      >
                        <View style={[styles.pathNumber, { backgroundColor: item.color }]}>
                          <Text style={styles.pathNumberText}>{index + 1}</Text>
                        </View>
                        <View style={styles.pathCopy}>
                          <Text style={[styles.pathTitle, isCompleted && styles.stepButtonTextCompleted]}>
                            {item.baslik}
                          </Text>
                          <Text style={[styles.pathKind, isCompleted && styles.stepButtonTextCompleted]}>
                            {item.bolum === 'hazirlik' ? 'Hazırlık' : 'Namazın Adımı'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <ScrollView style={styles.detailPanel} contentContainerStyle={styles.detailContent}>
                <View style={[styles.virtueDetailHeader, { borderColor: selectedPrayerItem.color }]}>
                  <View style={[styles.bigFlowerIcon, { backgroundColor: selectedPrayerItem.color }]}>
                    <Text style={styles.bigFlowerIconText}>
                      {selectedPrayerItem.ikon}
                    </Text>
                  </View>
                  <View style={styles.virtueTitleCopy}>
                    <Text style={styles.detailStep}>
                      {selectedPrayerItem.bolum
                        ? selectedPrayerItem.bolum === 'hazirlik'
                          ? 'Namazın Hazırlığı'
                          : 'Namazın İçindeki Farz'
                        : 'Namazın Güzelliği'}
                    </Text>
                    <Text style={styles.detailTitle}>{selectedPrayerItem.baslik}</Text>
                  </View>
                </View>

                <View style={styles.softInfoBox}>
                  <Text style={styles.infoLabel}>Çocuklar İçin Açıklama</Text>
                  <Text style={styles.mainText}>{selectedPrayerItem.aciklama}</Text>
                </View>

                <View style={styles.noteBox}>
                  <Text style={styles.infoLabel}>Hatırla</Text>
                  <Text style={styles.infoText}>
                    {selectedPrayerItem.bolum
                      ? 'Bu kural, namaz yolculuğunda bir sonraki adıma geçmeni sağlar.'
                      : 'Namazı sevmek, onu anlamaya güzel bir başlangıçtır.'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.learnedButton,
                    completedPrayerIds.includes(selectedPrayerItem.id) && styles.learnedButtonDone,
                  ]}
                  onPress={handlePrayerLearnedPress}
                >
                  <Text style={styles.learnedButtonText}>
                    {completedPrayerIds.includes(selectedPrayerItem.id)
                      ? 'Adım Tamamlandı'
                      : 'Bu Adımı Öğrendim!'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (activeAreaId === 'ezan') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/frame_letter_green.png')}
          style={styles.studyBackground}
          resizeMode="stretch"
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ana Ada'ya Dön"
            style={[styles.hotspot, styles.studyBackHotspot]}
            onPress={() => setActiveAreaId(null)}
          >
            <View style={styles.studyBackButton} />
          </TouchableOpacity>

          <View style={styles.studyContent}>
            <View style={styles.studyHeader}>
              <View>
                <Text style={styles.studyEyebrow}>Namaza Çağrı</Text>
                <Text style={styles.studyTitle}>Ezan ve Kamet</Text>
              </View>
              <View style={styles.callBadge}>
                <Text style={styles.callBadgeIcon}>📢</Text>
              </View>
            </View>

            <View style={styles.callBody}>
              {[ezanItem, kametItem].map((item) => (
                <ScrollView
                  key={item.id}
                  style={styles.callColumn}
                  contentContainerStyle={styles.callColumnContent}
                >
                  <View style={styles.callHeader}>
                    <Text style={styles.callTitle}>{item.baslik}</Text>
                    <Text style={styles.callDescription}>{item.aciklama}</Text>
                  </View>

                  <View style={styles.callLines}>
                    {item.cumleler.map((line, index) => {
                      const isKametDifference = line.includes('Kad kâmetis');

                      return (
                        <View
                          key={`${item.id}-${index}-${line}`}
                          style={[
                            styles.callLine,
                            isKametDifference && styles.callLineHighlight,
                          ]}
                        >
                          <Text
                            style={[
                              styles.callLineNumber,
                              isKametDifference && styles.callLineNumberHighlight,
                            ]}
                          >
                            {index + 1}
                          </Text>
                          <Text
                            style={[
                              styles.callLineText,
                              isKametDifference && styles.callLineTextHighlight,
                            ]}
                          >
                            {line}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  <View style={item.id === 'kamet' ? styles.differenceBox : styles.noteBox}>
                    <Text style={styles.infoLabel}>{item.id === 'kamet' ? 'En Önemli Fark' : 'Not'}</Text>
                    <Text style={styles.infoText}>{item.fark || item.not}</Text>
                  </View>
                </ScrollView>
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (activeAreaId === 'guzel-ahlak') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/frame_letter_green.png')}
          style={styles.studyBackground}
          resizeMode="stretch"
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ana Ada'ya Dön"
            style={[styles.hotspot, styles.studyBackHotspot]}
            onPress={() => setActiveAreaId(null)}
          >
            <View style={styles.studyBackButton} />
          </TouchableOpacity>

          <View style={styles.studyContent}>
            <View style={styles.studyHeader}>
              <View>
                <Text style={styles.studyEyebrow}>Erdem Bahçesi</Text>
                <Text style={styles.studyTitle}>Ahlak Çiçekleri</Text>
              </View>
              <View style={styles.studyProgressBadge}>
                <Text style={styles.studyProgressCount}>{completedVirtueCount}/5</Text>
                <Text style={styles.studyProgressText}>çiçek toplandı</Text>
              </View>
            </View>

            <View style={styles.studyBody}>
              <View style={styles.virtueGardenPanel}>
                <ScrollView contentContainerStyle={styles.virtueFlowerGrid}>
                  {ahlakRehberi.map((virtue) => {
                    const isSelected = virtue.id === selectedVirtue.id;
                    const isCompleted = completedVirtueIds.includes(virtue.id);

                    return (
                      <TouchableOpacity
                        key={virtue.id}
                        activeOpacity={0.86}
                        style={[
                          styles.virtueFlower,
                          { borderColor: virtue.color },
                          isSelected && styles.virtueFlowerSelected,
                          isCompleted && { backgroundColor: virtue.color },
                        ]}
                        onPress={() => setSelectedVirtueId(virtue.id)}
                      >
                        <View style={[styles.flowerIcon, { backgroundColor: virtue.color }]}>
                          <Text style={styles.flowerIconText}>{virtue.ikon}</Text>
                        </View>
                        <Text
                          style={[
                            styles.virtueFlowerTitle,
                            isCompleted && styles.stepButtonTextCompleted,
                          ]}
                        >
                          {virtue.baslik.replace(' Çiçeği', '')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <ScrollView style={styles.virtueDetailPanel} contentContainerStyle={styles.virtueDetailContent}>
                <View style={[styles.virtueDetailHeader, { borderColor: selectedVirtue.color }]}>
                  <View style={[styles.bigFlowerIcon, { backgroundColor: selectedVirtue.color }]}>
                    <Text style={styles.bigFlowerIconText}>{selectedVirtue.ikon}</Text>
                  </View>
                  <View style={styles.virtueTitleCopy}>
                  <Text style={styles.detailStep}>Erdem Çiçeği</Text>
                  <Text style={styles.detailTitle}>{selectedVirtue.baslik}</Text>
                  </View>
                </View>

                <View style={styles.softInfoBox}>
                  <Text style={styles.infoLabel}>Çocuklar İçin Anlamı</Text>
                  <Text style={styles.infoText}>{selectedVirtue.kisaAnlam}</Text>
                </View>

                <View style={styles.softInfoBox}>
                  <Text style={styles.infoLabel}>Açıklama</Text>
                  <Text style={styles.mainText}>{selectedVirtue.aciklama}</Text>
                </View>

                <View style={styles.virtueTaskBox}>
                  <Text style={styles.infoLabel}>Günlük Görev</Text>
                  <Text style={styles.infoText}>{selectedVirtue.gorev}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.learnedButton,
                    completedVirtueIds.includes(selectedVirtue.id) && styles.learnedButtonDone,
                  ]}
                  onPress={handleVirtueLearnedPress}
                >
                  <Text style={styles.learnedButtonText}>
                    {completedVirtueIds.includes(selectedVirtue.id)
                      ? 'Ahlak Rozeti Kazanıldı'
                      : 'Çiçeği Topladım!'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (activeAreaId === 'islamin-sartlari') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/frame_letter_green.png')}
          style={styles.studyBackground}
          resizeMode="stretch"
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Ana Ada'ya Dön"
            style={[styles.hotspot, styles.studyBackHotspot]}
            onPress={() => setActiveAreaId(null)}
          >
            <View style={styles.studyBackButton} />
          </TouchableOpacity>

          <View style={styles.studyContent}>
            <View style={styles.studyHeader}>
              <View>
                <Text style={styles.studyEyebrow}>Cennete Giden Merdiven</Text>
                <Text style={styles.studyTitle}>İslam'ın 5 Şartı</Text>
              </View>
              <View style={styles.studyProgressBadge}>
                <Text style={styles.studyProgressCount}>{completedCount}/5</Text>
                <Text style={styles.studyProgressText}>basamak öğrenildi</Text>
              </View>
            </View>

            <View style={styles.studyBody}>
              <View style={styles.stepsPanel}>
                <ScrollView contentContainerStyle={styles.stepList}>
                  {islamSartlari.map((step) => {
                    const isSelected = step.id === selectedStep.id;
                    const isCompleted = completedStepIds.includes(step.id);

                    return (
                      <TouchableOpacity
                        key={step.id}
                        activeOpacity={0.86}
                        style={[
                          styles.stepButton,
                          { borderColor: step.color },
                          isSelected && styles.stepButtonSelected,
                          isCompleted && { backgroundColor: step.color },
                        ]}
                        onPress={() => setSelectedStepId(step.id)}
                      >
                        <View style={[styles.stepNumber, { backgroundColor: step.color }]}>
                          <Text style={styles.stepNumberText}>{step.id}</Text>
                        </View>
                        <View style={styles.stepButtonCopy}>
                          <Text
                            style={[
                              styles.stepButtonTitle,
                              isCompleted && styles.stepButtonTextCompleted,
                            ]}
                          >
                            {step.title}
                          </Text>
                          <Text
                            style={[
                              styles.stepButtonTask,
                              isCompleted && styles.stepButtonTextCompleted,
                            ]}
                          >
                            {step.task}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <ScrollView style={styles.detailPanel} contentContainerStyle={styles.detailContent}>
                <View style={[styles.detailHeader, { borderColor: selectedStep.color }]}>
                  <Text style={styles.detailStep}>{selectedStep.id}. Basamak</Text>
                  <Text style={styles.detailTitle}>{selectedStep.title}</Text>
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Çocuklar İçin Anlamı</Text>
                  <Text style={styles.infoText}>{selectedStep.shortMeaning}</Text>
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Öğretici Metin</Text>
                  <Text style={styles.mainText}>{selectedStep.text}</Text>
                </View>

                <View style={styles.noteBox}>
                  <Text style={styles.infoLabel}>Çocuklara Not</Text>
                  <Text style={styles.infoText}>{selectedStep.childNote}</Text>
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Görev</Text>
                  <Text style={styles.infoText}>{selectedStep.task}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.learnedButton,
                    completedStepIds.includes(selectedStep.id) && styles.learnedButtonDone,
                  ]}
                  onPress={handleLearnedPress}
                >
                  <Text style={styles.learnedButtonText}>
                    {completedStepIds.includes(selectedStep.id) ? 'Öğrenildi' : 'Öğrendim!'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/MainIslandScreen.png')}
        style={styles.background}
        resizeMode="stretch"
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Haritaya Dön"
          style={[styles.hotspot, styles.backHotspot]}
          onPress={onBack}
        />

        {mainIslandAreas.map((area) => (
          <TouchableOpacity
            key={area.id}
            accessibilityRole="button"
            accessibilityLabel={area.title}
            style={[styles.hotspot, styles[area.styleName]]}
            onPress={() => handleAreaPress(area)}
          />
        ))}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
  background: {
    flex: 1,
  },
  studyBackground: {
    flex: 1,
  },
  studyContent: {
    position: 'absolute',
    top: '15%',
    left: '9%',
    right: '8%',
    bottom: '13%',
  },
  studyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  studyEyebrow: {
    color: '#B36C37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 2,
  },
  studyTitle: {
    color: '#284434',
    fontSize: 22,
    fontWeight: '900',
  },
  studyProgressBadge: {
    minWidth: 112,
    borderRadius: 12,
    backgroundColor: 'rgba(234, 246, 236, 0.92)',
    borderWidth: 1,
    borderColor: '#AFC8B2',
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  studyBackHotspot: {
    top: '2%',
    left: '1%',
    width: '10%',
    height: '14%',
    zIndex: 20,
  },
  studyBackButton: {
    width: '100%',
    height: '100%',
  },
  studyProgressCount: {
    color: '#284434',
    fontSize: 20,
    fontWeight: '900',
  },
  studyProgressText: {
    color: '#3E5A44',
    fontSize: 11,
    fontWeight: '800',
  },
  studyBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  prayerBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  ablutionBody: {
    flex: 1,
  },
  ablutionChoicePanel: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  ablutionChoice: {
    flex: 1,
    minHeight: 72,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  ablutionChoiceSelected: {
    backgroundColor: 'rgba(232, 244, 249, 0.94)',
    transform: [{ scale: 1.03 }],
  },
  ablutionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ablutionIconText: {
    fontSize: 24,
  },
  ablutionChoiceCopy: {
    flex: 1,
  },
  ablutionChoiceTitle: {
    color: '#284434',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },
  ablutionChoiceText: {
    color: '#625747',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  ablutionDetailPanel: {
    flex: 1,
  },
  ablutionDetailContent: {
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  ablutionDetailGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  ablutionDetailColumn: {
    flex: 1,
  },
  waterBadgeEarned: {
    backgroundColor: 'rgba(116, 192, 252, 0.2)',
    borderColor: '#74C0FC',
  },
  prayerJourneyPanel: {
    width: '45%',
    minWidth: 330,
  },
  prayerSectionTitle: {
    color: '#284434',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 7,
    marginLeft: 6,
  },
  prayerBeautyRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  beautyCard: {
    flex: 1,
    minHeight: 82,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  beautyCardSelected: {
    backgroundColor: 'rgba(255, 239, 203, 0.9)',
    transform: [{ scale: 1.03 }],
  },
  beautyIcon: {
    color: '#284434',
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 4,
  },
  beautyTitle: {
    color: '#284434',
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 15,
  },
  prayerPath: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 8,
  },
  pathStep: {
    width: '48%',
    minHeight: 62,
    borderRadius: 14,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 253, 248, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  pathStepSelected: {
    backgroundColor: 'rgba(255, 239, 203, 0.9)',
    transform: [{ scale: 1.02 }],
  },
  pathNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pathNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  pathCopy: {
    flex: 1,
  },
  pathTitle: {
    color: '#284434',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 2,
  },
  pathKind: {
    color: '#625747',
    fontSize: 10,
    fontWeight: '800',
  },
  starBadgeEarned: {
    backgroundColor: 'rgba(255, 230, 109, 0.92)',
    borderColor: '#FFB703',
  },
  hotspot: {
    position: 'absolute',
  },
  backHotspot: {
    top: '2%',
    left: '1%',
    width: '7%',
    height: '10%',
  },
  namazHotspot: {
    top: '31%',
    left: '16%',
    width: '20%',
    height: '15%',
  },
  abdestHotspot: {
    top: '31%',
    right: '13%',
    width: '22%',
    height: '15%',
  },
  ezanHotspot: {
    bottom: '20%',
    left: '14%',
    width: '19%',
    height: '15%',
  },
  guzelAhlakHotspot: {
    bottom: '3%',
    left: '42%',
    width: '20%',
    height: '16%',
  },
  islamSartlariHotspot: {
    bottom: '19%',
    right: '11%',
    width: '25%',
    height: '17%',
  },
  anaAdaHotspot: {
    top: '54%',
    left: '39%',
    width: '25%',
    height: '13%',
  },
  ogrenmeMerkeziHotspot: {
    top: '20%',
    left: '39%',
    width: '24%',
    height: '22%',
  },
  stepsPanel: {
    width: '34%',
    minWidth: 210,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DFC58B',
    padding: 8,
  },
  virtueGardenPanel: {
    width: '36%',
    minWidth: 220,
    justifyContent: 'center',
  },
  virtueFlowerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  virtueFlower: {
    width: 94,
    minHeight: 102,
    borderRadius: 47,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 253, 248, 0.74)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  virtueFlowerSelected: {
    backgroundColor: 'rgba(255, 239, 203, 0.88)',
    transform: [{ scale: 1.04 }],
  },
  flowerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  flowerIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  virtueFlowerTitle: {
    color: '#284434',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 16,
  },
  virtueDetailPanel: {
    flex: 1,
  },
  virtueDetailContent: {
    padding: 8,
    paddingBottom: 12,
  },
  virtueDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(247, 241, 227, 0.76)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  bigFlowerIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bigFlowerIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  virtueTitleCopy: {
    flex: 1,
  },
  stepList: {
    gap: 7,
  },
  stepButton: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    backgroundColor: '#FFFDF8',
    borderWidth: 2,
    padding: 8,
  },
  stepButtonSelected: {
    transform: [{ scale: 1.01 }],
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  stepButtonCopy: {
    flex: 1,
  },
  stepButtonTitle: {
    color: '#284434',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 3,
  },
  stepButtonTask: {
    color: '#625747',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },
  stepButtonTextCompleted: {
    color: '#FFFFFF',
  },
  detailPanel: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  detailContent: {
    padding: 12,
    paddingBottom: 14,
  },
  detailHeader: {
    borderLeftWidth: 8,
    borderRadius: 12,
    backgroundColor: '#F7F1E3',
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  detailStep: {
    color: '#B36C37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 3,
  },
  detailTitle: {
    color: '#284434',
    fontSize: 20,
    fontWeight: '900',
  },
  infoBox: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6D0A5',
    padding: 10,
    marginBottom: 8,
  },
  softInfoBox: {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(230, 208, 165, 0.86)',
    padding: 11,
    marginBottom: 8,
  },
  virtueTaskBox: {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 239, 203, 0.82)',
    borderWidth: 1,
    borderColor: '#E8B866',
    padding: 11,
    marginBottom: 8,
  },
  noteBox: {
    borderRadius: 10,
    backgroundColor: '#FFEFCB',
    borderWidth: 1,
    borderColor: '#E8B866',
    padding: 10,
    marginBottom: 8,
  },
  ablutionStepsBox: {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 253, 248, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(230, 208, 165, 0.86)',
    padding: 11,
    marginBottom: 8,
  },
  ablutionStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 7,
  },
  ablutionStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 24,
    textAlign: 'center',
    marginRight: 8,
  },
  ablutionStepText: {
    flex: 1,
    color: '#2D3F30',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  quizBox: {
    borderRadius: 16,
    backgroundColor: 'rgba(234, 246, 236, 0.9)',
    borderWidth: 1,
    borderColor: '#AFC8B2',
    padding: 11,
    marginBottom: 8,
  },
  quizAnswer: {
    color: '#284434',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 7,
  },
  callBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 239, 203, 0.9)',
    borderWidth: 1,
    borderColor: '#E8B866',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBadgeIcon: {
    fontSize: 26,
  },
  callBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  callColumn: {
    flex: 1,
  },
  callColumnContent: {
    padding: 8,
    paddingBottom: 12,
  },
  callHeader: {
    borderRadius: 18,
    backgroundColor: 'rgba(247, 241, 227, 0.76)',
    borderWidth: 1,
    borderColor: 'rgba(230, 208, 165, 0.86)',
    padding: 12,
    marginBottom: 8,
  },
  callTitle: {
    color: '#284434',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 5,
  },
  callDescription: {
    color: '#3C4E34',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  callLines: {
    gap: 7,
    marginBottom: 8,
  },
  callLine: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 253, 248, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(230, 208, 165, 0.86)',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  callLineHighlight: {
    backgroundColor: 'rgba(255, 230, 109, 0.86)',
    borderColor: '#FFB703',
  },
  callLineNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#607D66',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 26,
    textAlign: 'center',
    marginRight: 8,
  },
  callLineNumberHighlight: {
    backgroundColor: '#C9784A',
  },
  callLineText: {
    flex: 1,
    color: '#2D3F30',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  callLineTextHighlight: {
    color: '#4B351D',
  },
  differenceBox: {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 230, 109, 0.86)',
    borderWidth: 1,
    borderColor: '#FFB703',
    padding: 11,
    marginBottom: 8,
  },
  infoLabel: {
    color: '#5F7E63',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 5,
  },
  infoText: {
    color: '#3C4E34',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  mainText: {
    color: '#2D3F30',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 23,
  },
  learnedButton: {
    backgroundColor: '#C9784A',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  learnedButtonDone: {
    backgroundColor: '#607D66',
  },
  learnedButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
