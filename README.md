# Simple Latex Viewer

Hi! This is my internship assignment project. I built a simple React Native app using Expo that shows math formulas on the screen.

## What the app does
It displays a list of math formulas (like the quadratic formula, integrals, etc.). You can scroll through them, and they look just like they do in a textbook. If a formula is typed wrong, it shows "Invalid LaTeX" instead of crashing the app.

## How it works (The Techy Part)
I needed a way to render LaTeX (the math code) because React Native doesn't understand it by default. 
1. I used a component called `LatexView` which is basically a mini web browser (WebView).
2. Inside that WebView, I load a popular library called **KaTeX** from the internet.
3. When I pass a math string (like `E=mc^2`) to the component, the WebView uses KaTeX to turn that text into a nice looking math picture using HTML and CSS.

## Why I used Expo
I'm still new to mobile development, and I was advised to use Expo because:
- It's super easy to set up (`npx create-expo-app`).
- I don't have to deal with Xcode or Android Studio directly, which is scary for now.
- I can run it on my phone quickly.

## Limitations
There are some standard drawbacks to my simple approach:
- **Internet Required**: Is uses a CDN (Content Delivery Network) to load KaTeX. If you are offline, the math rendering might not work properly (unless I download the files into the app, which I haven't done yet).
- **Performance**: Listing many WebViews (one for each formula) can be heavy for the phone. A native solution would be faster, but this works for a simple list!
- **Sizing**: The height of each formula box is fixed right now. If a formula is huge, it might get cut off or look small.

## Future Improvements
Once I learn more about native modules, I would like to:
- Use a detailed native library instead of a WebView for better performance.
- Handle dynamic height so big formulas fit perfectly.
- Add support for offline rendering.

## How to Run it
1. Make sure you have Node.js installed.
2. Run `npm install` inside the project folder.
3. Run `npx expo start`.
4. Scan the QR code with the **Expo Go** app on your phone.

Thanks for checking it out!
# latexRender
