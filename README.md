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

<h4>emit, io & on</h4>

<p>socket.on lyssnar på inkommande events frå servern eller medelanden via servern till andra klienten</p>
<p>socket.emit används för att skicka events från en klient till server eller från en server till en specifik klient</p>
<p>io.emit skickar händelser med data till alla klienter</p>