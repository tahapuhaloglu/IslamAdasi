import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MiniIslandScreen({ title, subtitle, tasks, actionLabel, onBack, onComplete }) {
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.navButtonSpacer} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.taskRow}>
          {tasks.map((task) => (
            <View key={task} style={styles.taskCard}>
              <Text style={styles.taskText}>{task}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={onComplete}>
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 120,
    backgroundColor: '#607D66',
    paddingVertical: 8,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  panel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  subtitle: {
    width: '72%',
    color: '#284434',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  taskRow: {
    width: '86%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  taskCard: {
    flex: 1,
    minHeight: 74,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#DEB887',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  taskText: {
    color: '#3E5A44',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#C9784A',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
