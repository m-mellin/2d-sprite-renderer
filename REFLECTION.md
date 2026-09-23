# Reflektion

## Namngivning

### 1. Sprite

#### Variabler

**Namn:** `imageAsset`

**Förklaring:** Variabelnamn för `ImageAsset`-objektet i `Sprite`.

**Reflektion:** Jag använde tidigare namnen `asset` och `image`. Efter att jag implementerade klassen `ImageAsset` blev dessa namn inte lika tydliga. `image` kan exempelvis tolkas som själva bilden, medan `asset` inte säger särskilt mycket om vad variabeln innehåller. `imageAsset` beskriver därför tydligare vad variabeln faktiskt representerar.

**Slutsats:** `imageAsset`

---

**Namn:** `xPos` och `yPos`

**Förklaring:** Variabelnamn för `Sprite`-objektets x- och y-koordinater.

**Reflektion:** Här har jag funderat fram och tillbaka på hur tydliga namnen behöver vara. Ett alternativ är att använda `x` och `y`, medan ett annat är `xPosition` och `yPosition`. Enligt boken behöver man tänka på både tydlighet och läsbarhet. Jag tycker att `x` och `y` är tillräckligt tydliga i detta sammanhang eftersom de används för koordinater. Det blir också enklare att använda klassen, t.ex. `sprite.x = 0` istället för `sprite.xPosition = 0`. Eftersom en `Sprite` arbetar med koordinater anser jag därför att sammanhanget gör `x` och `y` tillräckligt tydliga.

**Slutsats:** `x` och `y`

---

**Namn:** `width` och `height`

**Förklaring:** Bredden och höjden på `Sprite`-objektet.

**Reflektion:** Det hade gått att göra namnen mer specifika, exempelvis `spriteWidth` och `spriteHeight`. Det hade gjort det tydligare vad bredden och höjden tillhör. Samtidigt blir namnen längre utan att ge särskilt mycket extra information i detta sammanhang. Eftersom variablerna finns i `Sprite`-klassen tycker jag att `width` och `height` är tillräckligt tydliga. Det gör också koden enklare att läsa.

**Slutsats:** Behåller `width` och `height`.

---

**Namn:** `region`

**Förklaring:** En rektangulär region av bilden som ska användas av spriten.

**Reflektion:** Här tycker jag att namnet `region` hade kunnat vara tydligare. I JSDoc framgår det att variabeln är av typen `SpriteRegion`, men det hjälper inte lika mycket när man bara läser själva variabelnamnet. Ett alternativ är `spriteRegion`, vilket tydligare visar vad regionen tillhör. Jag har även funderat på namn som `area`, men det tycker jag blir mer otydligt eftersom en area kan betyda flera olika saker. Jag tycker att `spriteRegion` ger en bättre beskrivning utan att namnet blir onödigt långt. Däremot anser jag att när användaren ska hämta en region genom `Sprite.region` så är det ett bättre metodnamn än `Sprite.spriteRegion`, då man upprepar "sprite" ytterligare en gång, något som boken Clean Code nämner.

**Slutsats:** `region` behålls.

#### Funktioner

**Namn:** `setImageSource`

**Förklaring:** Tilldelar `imageAsset` ett `ImageAsset`-objekt.

**Reflektion:** Här tänkte jag att metoden tilldelar en variabel ett värde och valde därför namnet `setImageSource`. Efter att ha arbetat vidare med modulen började jag fundera på om namnet verkligen beskriver vad metoden gör. Metoden hämtar, eller skapar, ett `ImageAsset`-objekt, vilket skulle kunna tala för ett namn som `getImageSource`. I min `ImageAsset`-klass har jag också en metod som heter `setImageSource` vilket skulle kunna skapa förvirring. Även om metoderna gör olika saker, `ImageAsset` metoden `setImageSource` sätter `<img>`-elementets `src`-attribut och den är privat anser jag att namnet ändå bör bytas för att undvika förvirring. Jag kommer därför ändra metodens namn till `assignImageAsset` i `Sprite`-klassen.

**Slutsats:** `setImageSource` blir `assignImageAsset`.

---

**Namn:** `get positionX` & `get positionY`

**Förklaring:** Returnerar x och y-koordinaten av sprite-objektet.

**Reflektion:** Efter att ha beslutat mig om att ändra variabelnamnet från `xPos` & `yPos` blir det lite osemantiskt att använda andra namn när man hämtar. Det var det redan innan, då metoderna borde ha hetat `get posX` om det ska vara enhetligt.

**Slutsats:** `get x` & `get y` är bättre metodnamn.

---

**Namn:** `set positionX` & `set positionY`

**Förklaring:** Sätter x och y-koordinaten av sprite-objektet.

**Reflektion:** Samma som tidigare, gör allt enhetligt.

**Slutsats:** `set x` & `set y` kommer användas.

---

**Namn:** `get width` & `get height`

**Förklaring:** Returnerar bredden och höjden på spriten.

**Reflektion:** Eftersom `width` och `height` redan är tydliga substantiv blir accessor-namnen naturliga rakt av. Enligt boken bör en accessor för ett fält heta samma sak som fältet (get/set-konventionen), vilket jag redan följer här. Jag har inte funderat på att lägga till `get`/`Get` i namnet (t.ex. `getWidth`) eftersom JS:s inbyggda `get`-syntax redan signalerar att det är en accessor – att då även skriva ut "get" i namnet hade varit ett onödigt brusord.

**Slutsats:** Jag behåller `width` och `height`.

---

**Namn:** `get region` & `set region`

**Förklaring:** Returnerar respektive sätter regionen av källbilden som spriten använder.

**Reflektion:** Samma resonemang som för `width`/`height`.

**Slutsats:** Jag behåller `get region` & `set region`.

---

**Namn:** `get isLoaded`

**Förklaring:** Returnerar om bildens tillgång har laddats klart eller inte.

**Reflektion:** Boken rekommenderar att booleska metoder/egenskaper namnges som predikat, t.ex. med prefix som `is` eller `has`, för att namnet ska läsas som en fråga eller ett påstående. `isLoaded` följer redan detta mönster och jag ser ingen anledning att ändra det.

**Slutsats:** Jag behåller `isLoaded`.

---

**Namn:** `waitForLoad`

**Förklaring:** En asynkron metod som väntar tills bildens tillgång har laddats klart.

**Reflektion:** Boken menar att funktionsnamn bör vara verb eller verbfraser eftersom en funktion utför en handling. `waitForLoad` beskriver tydligt vad metoden gör (väntar tills laddning är klar) och läses naturligt vid anropsplatsen: `await sprite.waitForLoad()`. Jag har inte hittat något bättre alternativ.

**Slutsats:** Jag behåller `waitForLoad`.

---

**Namn:** `image`

**Förklaring:** Returnerar `HTMLImageElement` från spritens `ImageAsset`.

**Reflektion:** Jag har funderat på om `image` är tillräckligt tydligt, eftersom namnet inte avslöjar att det handlar om ett `HTMLImageElement` specifikt. Ett alternativ hade varit `imageElement`. Men eftersom JSDoc redan anger returtypen, och eftersom kontexten (en `Sprite`) gör det tydligt att det rör sig om bilden som ska ritas, tycker jag att `image` är tillräckligt tydligt utan att bli missvisande.

**Slutsats:** Jag behåller `image`.