# Namngivning (kapitel 2)

Readability
Understandability
Intention-revealing names
Implicity of code
Magic Numbers
Avoid Disinformation
Avoid Encodings
Avoid mental mapping
Class Names - noun
Method Names - verb
Painted types
Don't be cute
Don't pun
Pick One Word per Concept
Use Searchable Names
Use Pronounceable Names
Make Meaningful Distinctions
Use Solution Domain Names
Use Problem Domain Names
Don't Add Gratuitous Context


## `Sprite`, `SpriteRenderer`, `SpriteRegion`, `SpriteAnimation` och `ImageAsset`

### Förklaring:
Klassen som representerar en sprite som kan renderas på en canvas.

### Reflektion:

**Class Names:**
Enligt s.25 skall klassnamn och objekt ha substantiv som namn. Detta stämmer överens med alla mina klassnamn. Ett klassnamn skall inte vara ett verb.

**Avoid Encodings:**
Ingen av mina klassnamn innehåller encoding (ex. `SpriteClass` eller `ISprite`) något som boken nämner, s. 23, att man inte skall använda. Jag har själv inte jobbat med exempelvis Hungarion Notation, jag har sett det tidigare men inte använt mig själv av det. Det var därför lätt att undvika det.

---

## `setImageSource` --> `assignImageAsset`

### Förklaring
Metod i `Sprite` som hämtar (eller skapar) ett `ImageAsset`-objekt via en cache och tilldelar det till fältet `#imageAsset`

### Reflektion
**Use Intention-Revealing Names:**
Ursprungligen hette metoden `setImageSource`, vilket antydde att det enbart sätter en src-sträng på spriten. Egentligen så hämtar metoden ett `ImageAsset`-objekt från en cache och tilldelar fältet `#imageAsset` objektet. Namnet avslöjade allstå inte riktigt vad metoden faktiskt gjorde. Jag valde därför att byta namn till `assignImageAsset` för att förtydliga vad metoden faktiskt gör.

**Avoid Disinformation:**
Det gamla namnet `setImageSource` krockade också med `ImageAssets`s privata metod `#setImageSource(src)`, som faktiskt gjorde det som namnet beskrev den. Det var därför inte mer än rätt att byta namn på metoden.

**Method Names:**
Enligt boken, s. 25, bör metoder namges som verb eller verbfraser eftersom de utför en handling. `assign...` är fortfarande ett verb men pekar nu istället på att det är ett `ImageAsset`-objekt som tilldelas, inte en sträng till en bild.

---

## `xPos` / `yPos` + `positionX`/ `positionY` --> `x` / `y`

### Förklaring
Privata fält och publika metoder i `Sprite` som representerar spritens position i pixlar.

### Reflektion
**Pick One Word per Concept:**
Tidigare hette de privata fälten `#xPos` / `#yPos` något som jag redan vid skapandet reflekterade över. Jag dividerade mellan att döpa dessa till `positionX` / `positionY`, `xPos` / `yPos` och enbart `x`/ `y`. Någonstans hamnade jag i mitten under utvecklingen och döpte dem till olika, med tanken att längre fram justera detta. Jag valde att använda mig av enbart `x`/ `y`. Genom att konsekvent använda samma namn för både fälten och accessorerna säkerställer jag att samma ord används för samma koncept genomgående i klassen.

**Use Searchable Names:**
Boken, s. 26, varnar för att alltför korta namn som `x` och `y` kan vara svåra att söka fram i en stor kodbas. Jag valde ändå att behålla dem eftersom de bara används inom det lilla scopet av `Sprite`-klassen (som fält, accessor och i konstruktorn), och sökningar efter t.ex. `sprite.x` blir ändå specifika nog tack vare kontexten runt omkring.

**Avoid Mental Mapping**
Ett alternativ hade varit att behålla längre namn som `xPosition` / `positionX` för att undvika att läsaren behöver "översätta" `x` till position. Jag anser dock att `x` och `y` är så etablerat inom matematik, grafer och grafik att ingen mental mapping egentligen krävs.

---

## `sourceX` / `sourceY`

### Förklaring
Privata fält och publika accessorer i `SpriteRegion`, vilket representerar regionens position i pixlar på spriten.

### Reflektion
**Use Solution Domain Names:**
Efter att ha tänkt igenom det mer kom jag fram till att `sourceX` / `sourceY` faktiskt är rätt val, snarare än att byta till `x`/`y`. `SpriteRegion` är i praktiken bara en wrapper runt argumenten till `CanvasRenderingContext2D.drawImage()`, och där heter parametrarna redan `sx`/`sy` (source x/y) i Canvas-API:et. Boken nämner att man ska använda namn från lösningsdomänen när det gör namnet tydligare för andra programmerare, och eftersom `drawImage` redan är en etablerad konvention tycker jag `sourceX`/`sourceY` blir tydligare än ett bytt `x`/`y` hade blivit.

**Avoid Disinformation:**
Om jag istället bytt `SpriteRegion` till `x`/`y` för att matcha `Sprite` hade jag nog skapat förvirring åt andra hållet istället. `sprite.x` och `region.x` hade sett ut att betyda samma sak, fast den ena är var spriten ska ritas på canvasen och den andra är varifrån i källbilden man klipper ut en region. Det är typ två helt olika saker som råkar vara samma datatyp. `source`-prefixet gör det tydligt att det är skillnad, vilket märks extra mycket i `SpriteRenderer.render()` där båda används i samma `drawImage`-anrop.

**Pick One Word per Concept:**
Jag trodde tidigare att "ett ord per koncept" betydde att jag borde byta namn så att både `Sprite` och `SpriteRegion` använder `x`/`y`. Men nu inser jag att det inte är samma koncept egentligen, bara samma typ av värde (en koordinat). Den ena är en destination, den andra är en källposition. Regeln handlar om att inte kalla *samma sak* för olika namn, inte om att tvinga fram samma namn på två olika saker bara för att de råkar vara siffror av samma typ. Så jag behåller `sourceX`/`sourceY` som eget namn istället för att byta.

---

## `isLoaded`

### Förklaring
Getter i både `Sprite` och `ImageAsset` som returnerar om bildens tillgång har laddats klart eller inte.

### Reflektion
**Method Names:**
Boken nämner att booleska metoder/attribut bör namnges så att de läses som en fråga eller ett påstående, gärna med prefix som `get`, `set` eller `is`. `isLoaded` följer det här mönstret rakt av, det är tydligt att det handlar om ett sant/falskt-värde redan av namnet.

**Don't Pun:**
Jag funderade på om `isLoaded` betyder exakt samma sak i båda klasserna eftersom namnet är identiskt i `Sprite` och `ImageAsset`. Efter att ha kollat igenom koden ser jag att `Sprite.isLoaded` bara vidarebefordrar värdet från `this.#imageAsset.isLoaded`, så det är faktiskt samma koncept i båda fallen, bara på olika nivåer i kedjan. Det är alltså inte ett exempel på pun (samma namn men olika betydelse) s.26, utan snarare ett medvetet val att låta samma namn följa med genom lagren, vilket jag tycker känns rätt eftersom det är samma information som bara "syns igenom" `Sprite`.

**Slutsats:** Jag behåller `isLoaded` i båda klasserna eftersom det är samma koncept som förs vidare, inte två olika betydelser som råkar dela namn.


## Reflektion

Jag tycker att det finns mycket i kapitel 2 som är bra. En del är överdrivet, men jag tar med mig mycket till framtiden, bland annat att sätta mig i användarens ögon istället för mina egna. Jag har flera gånger gått tillbaka och ändrat variabelnamn, och vissa delar missade jag helt. I början av laborationen hade jag redan läst båda kapitlen och förstått syftet med uppgiften. Jag började därför tidigt med att namnge variabler och separera funktioner enligt bokens lärosätt. Vissa delar hade jag dock inte full koll på och fick gå tillbaka och kontrollera.

En sak jag tar med mig är att bra namngivning handlar mer om avvägningar än om fastbestämda regler. Exempelvis kan readability och understandability ibland vara motpoler. Den ena säger att koden ska vara så läsbar som möjligt, medan den andra säger att namnen ska vara så förståeliga som möjligt. Ett exempel är `x`, som för många är en okänd variabel: vad betyder den? För att förbättra namnet kan man välja `xPos`, `positionX` eller `xPosition`. Alla är oftast mer förståeliga än enbart `x`, men de är också mer omständiga att använda. Mitt resonemang är att den som använder modulen vet att den handlar om sprites och att syftet är att rendera dem på en canvas. Modulen heter 2D-sprite-renderer, vilket säger att det finns två dimensioner, något man lär sig i skolan med koordinatsystem och grafer i matematiken. Jag ansåg därför att `sprite.x = 10` var mer intuitivt för användaren än `sprite.xPos = 10` eller `sprite.xPosition = 10`.

Om jag hänvisar till boken säger regeln **Use Searchable Names** att `x` och `y` är för korta namn, medan **Avoid Mental Mapping** och **Use Solution Domain Names** talar för dem. Jag anser därför att boken är lite för svartvit. Sökbarhet spelar mindre roll för namn som bara lever i en enda klass, och jag tycker att sammanhanget är viktigare än namnets längd.

Den tydligaste bristen i min namngivning var `xPos` / `positionX` och `yPos` / `positionY`. Jag visste om problemet men sköt upp det med tanken att fixa det senare. I det fallet bröt jag mot regeln **Pick One Word per Concept** och borde ha tagit tag i det direkt för att undvika inkonsekvenser i koden.

Slutligen tycker jag att reglerna fungerar bäst som en fråga att ställa sig när man granskar sin kod, till exempel "skulle någon annan förstå detta utan att läsa implementationen?", snarare än som en checklista där saker ska bockas av.


# Funktioner

Small
- Blocks and Indenting
Do One Thing
One Level of Abstraction per Function
- The Stepdown Rule
Switch Statements
Use Descriptive Names
Function Arguments
- Flaggargument
- Monadic Functions
- Dyadic Functions
- Triadic Functions
- Argument Objects
- Argument Lists
- Verbs and Keywords
Have No Side Effects
Command Query Separation
Prefer Exceptions to Returning Error Codes
Don't Repeat Yourself
Structured Programming
How Do You Write Functions Like This?


## `SpriteRenderer.render()`

### Förklaring
Renderar alla laddade sprites på canvasen. Metoden rensar först canvasen och går sedan igenom alla sprites. Sprites vars bild inte är laddad hoppas över. Sprites med en `region` (ett utsnitt ur en sprite sheet) ritas med utsnittet, övriga ritas med hela bilden.

### Reflektion

**Small:**
Metoden är 27 rader lång. Enligt boken (s. 34–35) ska funktioner vara små, och sedan ännu mindre än så. De bör sällan vara över ca 20 rader, och exemplen i boken är ofta bara 2–4 rader. Denna metod bryter därmed mot regeln.

**Blocks and Indenting:**
Boken säger att blocken i `if`, `else` och `while` bör vara en rad långa (helst ett funktionsanrop) och att indenteringsnivån inte bör vara över en eller två. Här finns två `if`-satser inuti en `for`-loop, vilket ger indenteringsnivå på 2, och `if`-satsen är alltså nästlad i loopen.

**Do One Thing / One Level of Abstraction per Function:**
Metoden gör flera saker på olika abstraktionsnivåer: den rensar canvasen, loopar, filtrerar bort ej laddade sprites, väljer ritsätt och anger alla detaljerade `drawImage`-argument. Den bryter därför mot båda reglerna.

**Function Arguments:**
Funktionen använder inga argument vilket är idealiskt enligt författaren, s. 40.

### Förbättring & Analys
En förbättring är att dela upp metoden i flera mindre metoder. Jag anser dock själv att detta inte är något jag hade gjort utanför kursen då det skapar, enligt mig, onödigt många metoder för en väldigt enkel metod. Jag förstår dock syftet och kan anse att läsbarheten absolut förbättras. Efter uppdelningen är render() 6 rader, #drawSprite() 8, #drawWhole() 9 och #drawRegion() 14. Alla ligger under 20 rader och ingen har mer än en indenteringsnivå.

```javascript
render () {
  this.#clearCanvas()

  for (const sprite of this.#sprites) {
    this.#drawSprite(sprite)
  }
} 

#drawSprite (sprite) {
  if (!sprite.isLoaded) return

  if (sprite.region) {
    this.#drawRegion(sprite)
  } else {
    this.#drawWhole(sprite)
  }
}

#drawRegion (sprite) {
  const region = sprite.region

  this.#context.drawImage(
    sprite.image,
    region.sourceX,
    region.sourceY,
    region.width,
    region.height,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height
  )
}

#drawWhole (sprite) {
  this.#context.drawImage(
    sprite.image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height
  )
}
```

## `SpriteAnimation.update()`

## `ImageAsset.getAsset()`

## `SpriteRenderer.add()`

## `SpriteRenderer.remove()`