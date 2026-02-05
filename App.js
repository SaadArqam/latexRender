import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LatexView from './components/LatexView';

export default function App() {
  const [input, setInput] = useState('c = \\pm\\sqrt{a^2 + b^2}');


  const latexData = [
    { id: '1', title: 'Quadratic Formula', formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { id: '2', title: 'Calculus Integral', formula: '\\int_0^\\infty x^2 dx' },
    { id: '3', title: 'Pythagorean Theorem', formula: 'a^2 + b^2 = c^2' },
    { id: '4', title: 'Euler\'s Identity', formula: 'e^{i\\pi} + 1 = 0' },
    { id: '5', title: 'Matrix', formula: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
    { id: '6', title: 'Maxwell\'s Equations', formula: '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}' },
    { id: '7', title: 'Invalid Formula', formula: '\\frac{1}{0' }, 
    { id: '8', title: 'Summation', formula: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}' },
    { id: '9', title: 'Limit', formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
    { id: '10', title: 'Einstein', formula: 'E = mc^2' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => setInput(item.formula)}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View pointerEvents="none">
        <LatexView latex={item.formula} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Math Formula Viewer</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardContainer}
      >

        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>Try it yourself:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setInput}
            value={input}
            placeholder="Type LaTeX here... e.g. E=mc^2"
            autoCapitalize="none"
            autoCorrect={false}
            multiline
          />
        </View>


        <View style={styles.previewSection}>
          <Text style={styles.sectionLabel}>Preview:</Text>
          <View style={styles.previewContainer}>
            <LatexView latex={input} />
          </View>
        </View>


        <Text style={styles.listHeader}>Examples (Tap to edit):</Text>
        <FlatList
          data={latexData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled" 
        />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
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
  keyboardContainer: {
    flex: 1,
  },
  inputSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff9c4', 
  },
  previewSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  previewContainer: {
    height: 120, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden', 
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 8,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
});
