import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LatexView({ latex }) {
  // Simple HTML template that loads KaTeX from CDN and renders the latex prop
  // We use JSON.stringify(latex) to safely inject the string into the JavaScript context
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
      <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: transparent;
        }
        #formula {
          font-size: 24px; /* Make it readable */
          text-align: center;
        }
        .error {
          color: red;
          font-family: sans-serif;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div id="formula"></div>
      <script>
        try {
          const latexString = ${JSON.stringify(latex)};
          katex.render(latexString, document.getElementById('formula'), {
            throwOnError: true,
            displayMode: true // Centers it and makes it bigger usually
          });
        } catch (e) {
          document.getElementById('formula').innerHTML = '<span class="error">Invalid LaTeX</span>';
          console.error(e);
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false} // Disable scrolling for better list UX
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // Transparent background to blend in (optional, but looks nice)
        opaque={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100, // Fixed height as requested for the list items
    width: '100%',
    backgroundColor: '#f6f6f6', // Light gray background for the container
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 4,
  },
  webview: {
    backgroundColor: 'transparent',
  },
});
