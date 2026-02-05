import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LatexView from './components/LatexView';

export default function App() {
  const [input, setInput] = useState('c = \\pm\\sqrt{a^2 + b^2}');


  const latexData = [
    { id: '1', title: 'Speed Formula', formula: 'v = \\frac{d}{t}' },
    { id: '2', title: 'Pythagorean Theorem', formula: 'a^2 + b^2 = c^2' },
    { id: '3', title: 'Logarithm Condition', formula: 'x > 0 \\text{ and } x \\neq 1, \\text{ then } \\log x \\text{ is defined}' },
    { id: '4', title: 'Area Integration', formula: 'A = \\int_a^b f(x)\\,dx' },
    { id: '5', title: 'Complex Rational Function', formula: 'f(x) = \\frac{(x^2 + 3x + 5)(x^3 - 2x + 7)(x^4 + x^2 + 1)}{(x - 1)(x + 2)(x^2 + x + 1)}' },
    { id: '6', title: 'Nested Fraction with Sums', formula: '\\frac{(a_1 + a_2 + a_3 + \\cdots + a_n)^2}{\\sqrt{(b_1^2 + b_2^2 + \\cdots + b_n^2)(c_1^2 + c_2^2 + \\cdots + c_n^2)}}' },
    { id: '7', title: 'Long Sum Expression', formula: '\\left(a_1 + a_2 + a_3 + a_4 + a_5 + a_6 + a_7 + a_8 + a_9 + a_{10} + a_{11} + a_{12} + a_{13} + a_{14} + a_{15} + a_{16} + a_{17} + a_{18} + a_{19} + a_{20} + a_{21} + a_{22} + a_{23} + a_{24} + a_{25} + \\cdots + a_n \\right)^2' },
    { id: '8', title: 'Trig Identities', formula: '\\sin^2 x + \\cos^2 x = 1 \\text{ and } \\tan x = \\frac{\\sin x}{\\cos x}' },
    { id: '9', title: 'Difference of Squares', formula: 'x^2 - 9 = (x-3)(x+3)' },
    { id: '10', title: 'Invalid - Missing Brace', formula: '\\frac{a+b }{ c' },
    { id: '11', title: 'Invalid - Incomplete Sqrt', formula: '\\sqrt{2 +' },
    { id: '12', title: 'Invalid - Unknown Command', formula: '\\unknowncommand{x}' },
    { id: '13', title: 'Dollar Sign Test 1', formula: '\\text{Cost: } \\$500 \\text{ Discount: } \\$50' },
    { id: '14', title: 'Dollar Sign Test 2', formula: '\\text{Earned } \\$1000' },
    { id: '15', title: 'Stress Test Formula', formula: '\\frac{(a_1 + a_2 + a_3 + \\cdots + a_n)^2}{\\sqrt{(b_1^2 + b_2^2 + \\cdots + b_n^2)(c_1^2 + c_2^2 + \\cdots + c_n^2)}}' },
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
