# LatexRenderer

A React Native application for rendering LaTeX mathematical formulas using Expo and `react-native-webview`.

## Architecture Decisions

The core architectural requirement was to render complex LaTeX formulas accurately within a React Native environment.

### 1. Rendering Engine: WebView with KaTeX
We chose a **WebView-based approach** utilizing the **KaTeX** library.
- **Why:** React Native does not implement a native TeX typesetting engine. Recreating the layout algorithms (boxes, glue, penalty) of TeX natively would be prohibitively complex for this scope.
- **Implementation:** The `LatexView` component acts as a wrapper around a `WebView`. It injects a minimal HTML shell that loads KaTeX from a CDN and executes the rendering logic via JavaScript.

### 2. Framework: Expo Managed Workflow
- **Decision:** Used Expo to accelerate the bootstrap process and avoid initial native build configuration complexity.
- **Impact:** We rely on the `react-native-webview` library compatible with Expo to handle the underlying native View implementations (Android `WebView` / iOS `WKWebView`).

---

## Native ↔ RN Boundary

The application traverses the React Native Bridge to render content, but differs from a standard Native Module implementation.

### The Boundary Model
1.  **React Native (JS Layer):** Manages the application state (list of formulas, user input) and component lifecycle.
2.  **The Bridge:** Data (`latex` string) is passed from the JS layer to the Native layer (WebView).
3.  **WebView (Native/Web Layer):**
    - The `react-native-webview` component instantiates a native Android `WebView` or iOS `WKWebView`.
    - **Data Injection:** We strictly pass data one-way by injecting the HTML source directly via the `source` prop. The LaTeX string is serialized (`JSON.stringify`) and embedded into the HTML template script.
    
    ```javascript
    // App.js (JS) -> Bridge -> WebView (Native) -> DOM (Web)
    const htmlContent = `... const latexString = ${JSON.stringify(latex)}; ...`;
    ```

### Boundary Considerations
- **Crossing Frequency:** The boundary is crossed whenever the `latex` prop updates.
- **Serialization:** String serialization is cheap for small formulas but technically adds overhead compared to shared memory (JSI), though negligible here compared to the DOM layout cost.

---

## Performance Considerations

Rendering multiple WebViews is the primary performance bottleneck in this architecture.

### 1. Memory Overhead
- **Issue:** Each `LatexView` creates a full browser instance context. On a `FlatList` with 50+ items, this would consume significant memory (hundreds of MBs).
- **Mitigation:**
    - `FlatList` windowing (virtualization) ensures only visible WebViews are kept in memory/DOM.
    - `androidLayerType="software"` (or similar props) can sometimes be used to trade GPU memory for CPU cycles, though default hardware acceleration is smoother.

### 2. Network Dependency & Latency
- **Issue:** The current implementation loads KaTeX from a CDN (`cdn.jsdelivr.net`).
- **Impact:**
    - **First Paint:** There is a noticeable delay on first load while assets are fetched.
    - **Reliability:** The renderer fails if the device is offline.
    - **Mitigation Strategy (Future):** Bundle `katex.min.js` and CSS files locally within the app assets to remove network dependency and speed up initialization.

### 3. Layout Thrashing
- **Issue:** The WebView height is currently fixed (`height: 100`).
- **Edge Case:** Large formulas (matrices, long integrals) may be clipped.
- **Solution:** Implementing automatic height adjustment would require a callback from the WebView (`window.ReactNativeWebView.postMessage(document.body.scrollHeight)`) to the RN parent to update the layout state, which introduces a "flash" of resizing content.

---

## Tradeoffs

| Feature | Decision Made | Tradeoff |
| :--- | :--- | :--- |
| **Rendering Accuracy** | **KaTeX (Web)** | **Pros:** Perfect LaTeX compliance, beautiful type handling.<br>**Cons:** Heavy rendering engine (WebView). |
| **Development Speed** | **Expo + HTML Injection** | **Pros:** Extremely fast implementation (hours v. weeks).<br>**Cons:** Limited control over native touch events inside the view. |
| **List Performance** | **Multiple WebViews** | **Pros:** Simple component isolation.<br>**Cons:** High per-item resource cost. A "Native" solution (Canvas drawing) would look worse but scroll 60fps effortlessly. |
| **Asset Delivery** | **CDN** | **Pros:** Zero app bundle size increase.<br>**Cons:** Requires internet connection; slower startup. |

## Evaluation Summary
This project demonstrates a pragmatic approach to bridging the gap between Native mobile UI and complex text typesetting, prioritizing correctness and ease of use while acknowledging the performance costs inherent in WebView-based list rendering.
