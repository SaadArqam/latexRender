import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import LatexView from './components/LatexView';

export default function App() {
  // Sample data: a list of LaTeX formulas (mixed with some text)
  // Each item has a unique ID and the formula string.
  const latexData = [
    { id: '1', title: 'Quadratic Formula', formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { id: '2', title: 'Calculus Integral', formula: '\\int_0^\\infty x^2 dx' },
    { id: '3', title: 'Pythagorean Theorem', formula: 'a^2 + b^2 = c^2' },
    { id: '4', title: 'Euler\'s Identity', formula: 'e^{i\\pi} + 1 = 0' },
    { id: '5', title: 'Matrix', formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
    { id: '6', title: 'Maxwell\'s Equations', formula: '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}' },
    { id: '7', title: 'Invalid Formula', formula: '\\frac{1}{0' }, // Missing brace
    { id: '8', title: 'Summation', formula: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}' },
    { id: '9', title: 'Limit', formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
    { id: '10', title: 'Einstein', formula: 'E = mc^2' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <LatexView latex={item.formula} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Math Formula Viewer</Text>
      </View>
      <FlatList
        data={latexData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, // Avoid status bar overlap nicely
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    gap: 16, // Adds space between items
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
});
