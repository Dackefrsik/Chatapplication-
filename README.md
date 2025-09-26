# Chatapplication
Chatapplication created in React.js with backend in Node.js

<h3>Colorscheme</h3>
<img src="/Chat-webb-app/src/assets/Colorscheme.png"/>

```css

:root{
    /* CSS HEX */
    --PrimaryBackground: #0a1c14ff;
    --SecundaryBackground: #243843ff;
    --Highlight: #ffd433ff;
    --LightText: #e8f1f0ff;
    --DarkText: #5c664dff;
}

```

<h5>Class diagram</h5>

<img src="/Chat-webb-app/UML/classDiagram.png">

<h3>Start application</h3>

<h5>Server</h3>

Öppna terminalen i mappen server och kör ` node server.js `  

<h5>Klienten</h5>

Öppna terminalen i mappen Chat-webb-app och kör ` npm run dev `

<h4>emit/ on</h4>

<p>emit > skickar en händelse</p>
<p>on > lysnar på händelsen med en callbackfunktion</p>

<h4>socket/ io </h4>

<p>socket > motsvarar en enskild klient</p>
<p>io > motsvarar alla klienter </p>