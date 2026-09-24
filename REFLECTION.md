# Namngivning

| Namn | Regler som tas upp | Ändring |
| --- | --- | --- |
| [Klassnamn](#sprite-spriterenderer-spriteregion-spriteanimation-och-imageasset) | Class Names, Avoid Encodings | Ingen |
| [`setImageSource` → `assignImageAsset`](#setimagesource-assignimageasset) | Use Intention-Revealing Names, Avoid Disinformation, Method Names | Namnbyte |
| [`xPos` / `yPos` → `x` / `y`](#xpos-ypos-positionx-positiony-x-y) | Pick One Word per Concept, Use Searchable Names, Avoid Mental Mapping | Namnbyte |
| [`sourceX` / `sourceY`](#sourcex-sourcey) | Use Solution Domain Names, Avoid Disinformation, Pick One Word per Concept | Behölls |
| [`isLoaded`](#isloaded) | Method Names, Don't Pun | Behölls |

Övergripande reflektion: [Reflektion kring kapitel 2](#reflektion-kring-kapitel-2)

---

## `Sprite`, `SpriteRenderer`, `SpriteRegion`, `SpriteAnimation` och `ImageAsset`

### Förklaring

Klassen som representerar en sprite som kan renderas på en canvas.

### Reflektion

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

Tidigare hette de privata fälten `#xPos` / `#yPos` något som jag redan vid skapandet reflekterade över. Jag dividerade mellan att döpa dessa till `positionX` / `positionY`, `xPos` / `yPos` och enbart `x`/ `y`. Någonstans hamnade jag i mitten under utvecklingen och döpte dem till olika, med tanken att längre fram justera detta.

Jag valde att använda mig av enbart `x`/ `y`. Genom att konsekvent använda samma namn för både fälten och accessorerna säkerställer jag att samma ord används för samma koncept genomgående i klassen.

**Use Searchable Names:**

Boken, s. 26, varnar för att alltför korta namn som `x` och `y` kan vara svåra att söka fram i en stor kodbas. Jag valde ändå att behålla dem eftersom de bara används inom det lilla scopet av `Sprite`-klassen (som fält, accessor och i konstruktorn), och sökningar efter t.ex. `sprite.x` blir ändå specifika nog tack vare kontexten runt omkring.

**Avoid Mental Mapping:**

Ett alternativ hade varit att behålla längre namn som `xPosition` / `positionX` för att undvika att läsaren behöver "översätta" `x` till position. Jag anser dock att `x` och `y` är så etablerat inom matematik, grafer och grafik att ingen mental mapping egentligen krävs.

---

## `sourceX` / `sourceY`

### Förklaring

Privata fält och publika accessorer i `SpriteRegion`, vilket representerar regionens position i pixlar på spriten.

### Reflektion

**Use Solution Domain Names:**

Efter att ha tänkt igenom det mer kom jag fram till att `sourceX` / `sourceY` faktiskt är rätt val, snarare än att byta till `x`/`y`. `SpriteRegion` är i praktiken bara en wrapper runt argumenten till `CanvasRenderingContext2D.drawImage()`, och där heter parametrarna redan `sx`/`sy` (source x/y) i Canvas-API:et.

Boken nämner att man ska använda namn från lösningsdomänen när det gör namnet tydligare för andra programmerare, och eftersom `drawImage` redan är en etablerad konvention tycker jag `sourceX`/`sourceY` blir tydligare än ett bytt `x`/`y` hade blivit.

**Avoid Disinformation:**

Om jag istället bytt `SpriteRegion` till `x`/`y` för att matcha `Sprite` hade jag nog skapat förvirring åt andra hållet istället. `sprite.x` och `region.x` hade sett ut att betyda samma sak, fast den ena är var spriten ska ritas på canvasen och den andra är varifrån i källbilden man klipper ut en region. Det är typ två helt olika saker som råkar vara samma datatyp.

`source`-prefixet gör det tydligt att det är skillnad, vilket märks extra mycket i `SpriteRenderer.render()` där båda används i samma `drawImage`-anrop.

**Pick One Word per Concept:**

Jag trodde tidigare att "ett ord per koncept" betydde att jag borde byta namn så att både `Sprite` och `SpriteRegion` använder `x`/`y`. Men nu inser jag att det inte är samma koncept egentligen, bara samma typ av värde (en koordinat). Den ena är en destination, den andra är en källposition.

Regeln handlar om att inte kalla *samma sak* för olika namn, inte om att tvinga fram samma namn på två olika saker bara för att de råkar vara siffror av samma typ. Så jag behåller `sourceX`/`sourceY` som eget namn istället för att byta.

---

## `isLoaded`

### Förklaring

Getter i både `Sprite` och `ImageAsset` som returnerar om bildens tillgång har laddats klart eller inte.

### Reflektion

**Method Names:**

Boken nämner att booleska metoder/attribut bör namnges så att de läses som en fråga eller ett påstående, gärna med prefix som `get`, `set` eller `is`. `isLoaded` följer det här mönstret rakt av, det är tydligt att det handlar om ett sant/falskt-värde redan av namnet.

**Don't Pun:**

Jag funderade på om `isLoaded` betyder exakt samma sak i båda klasserna eftersom namnet är identiskt i `Sprite` och `ImageAsset`. Efter att ha kollat igenom koden ser jag att `Sprite.isLoaded` bara vidarebefordrar värdet från `this.#imageAsset.isLoaded`, så det är faktiskt samma koncept i båda fallen, bara på olika nivåer i kedjan.

Det är alltså inte ett exempel på pun (samma namn men olika betydelse) s.26, utan snarare ett medvetet val att låta samma namn följa med genom lagren, vilket jag tycker känns rätt eftersom det är samma information som bara "syns igenom" `Sprite`.

**Slutsats:**

Jag behåller `isLoaded` i båda klasserna eftersom det är samma koncept som förs vidare, inte två olika betydelser som råkar dela namn.

---

## Reflektion kring kapitel 2

Jag tycker att det finns mycket i kapitel 2 som är bra. En del är överdrivet, men jag tar med mig mycket till framtiden, bland annat att sätta mig i användarens ögon istället för mina egna. Jag har flera gånger gått tillbaka och ändrat variabelnamn, och vissa delar missade jag helt.

I början av laborationen hade jag redan läst båda kapitlen och förstått syftet med uppgiften. Jag började därför tidigt med att namnge variabler och separera funktioner enligt bokens lärosätt. Vissa delar hade jag dock inte full koll på och fick gå tillbaka och kontrollera.

En sak jag tar med mig är att bra namngivning handlar mer om avvägningar än om fastbestämda regler. Exempelvis kan readability och understandability ibland vara motpoler. Den ena säger att koden ska vara så läsbar som möjligt, medan den andra säger att namnen ska vara så förståeliga som möjligt.

Ett exempel är `x`, som för många är en okänd variabel: vad betyder den? För att förbättra namnet kan man välja `xPos`, `positionX` eller `xPosition`. Alla är oftast mer förståeliga än enbart `x`, men de är också mer omständiga att använda.

Mitt resonemang är att den som använder modulen vet att den handlar om sprites och att syftet är att rendera dem på en canvas. Modulen heter 2D-sprite-renderer, vilket säger att det finns två dimensioner, något man lär sig i skolan med koordinatsystem och grafer i matematiken. Jag ansåg därför att `sprite.x = 10` var mer intuitivt för användaren än `sprite.xPos = 10` eller `sprite.xPosition = 10`.

Om jag hänvisar till boken säger regeln **Use Searchable Names** att `x` och `y` är för korta namn, medan **Avoid Mental Mapping** och **Use Solution Domain Names** talar för dem. Jag anser därför att boken är lite för svartvit. Sökbarhet spelar mindre roll för namn som bara lever i en enda klass, och jag tycker att sammanhanget är viktigare än namnets längd.

Den tydligaste bristen i min namngivning var `xPos` / `positionX` och `yPos` / `positionY`. Jag visste om problemet men sköt upp det med tanken att fixa det senare. I det fallet bröt jag mot regeln **Pick One Word per Concept** och borde ha tagit tag i det direkt för att undvika inkonsekvenser i koden.

Slutligen tycker jag att reglerna fungerar bäst som en fråga att ställa sig när man granskar sin kod, till exempel "skulle någon annan förstå detta utan att läsa implementationen?", snarare än som en checklista där saker ska bockas av.

---

# Funktioner

| Metod | Regler som tas upp | Förändring |
| --- | --- | --- |
| [`SpriteRenderer.render()`](#spriterendererrender) | Small, Blocks and Indenting, Do One Thing, Function Arguments | Delas upp i `#drawSprite()`, `#drawRegion()` och `#drawWhole()` |
| [`ImageAsset.#createLoadPromise()`](#imageassetcreateloadpromise) | Blocks and Indenting, Have No Side Effects | `#handleLoad()` och `#image` som fält |
| [`SpriteAnimation.update()`](#spriteanimationupdate) | Small, Blocks and Indenting, Do One Thing, Function Arguments, Have No Side Effects | Delas upp i tre metoder |
| [`SpriteRenderer.add()`](#spriterendereradd) | Small, Blocks and Indenting, Do One Thing, Have No Side Effects | `#renderWhenLoaded()` |
| [`Sprite.constructor()`](#spriteconstructor) | Function Arguments | Options-objekt |

Övergripande reflektion: [Reflektion kring kapitel 3](#reflektion-kring-kapitel-3)

---

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

En förbättring är att dela upp metoden i flera mindre metoder. Jag anser dock själv att detta inte är något jag hade gjort utanför kursen då det skapar, enligt mig, onödigt många metoder för en väldigt enkel metod. Jag förstår dock syftet och kan anse att läsbarheten absolut förbättras.

Efter uppdelningen är render() 6 rader, #drawSprite() 8, #drawWhole() 9 och #drawRegion() 14. Alla ligger under 20 rader och ingen har mer än en indenteringsnivå.

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

---

## `ImageAsset.#createLoadPromise()`

### Förklaring

Skapar ett löfte (promise) som löses när bilden har laddats och avvisas om laddningen misslyckas. Metoden kopplar `onload` och `onerror` till bilden och startar sedan laddningen genom att sätta bildens källa. När bilden har laddats sätts även flaggan `#isLoaded`.

### Reflektion

**Blocks and Indenting:**

Metoden har två indenteringsnivåer. Blocket i `onload` innehåller dessutom två instruktioner: det sätter flaggan `this.#isLoaded` och löser löftet. Enligt boken, s. 35, bör indenteringsnivån inte vara större än en eller två nivåer. Blocken inuti `if`, `else` och `while` bör dessutom helst endast innehålla en rad, gärna ett funktionsanrop.

Samma princip kan tillämpas här genom att flytta ansvaret för vad som händer när bilden har laddats till en separat metod.

**Have No Side Effects:**

Namnet på metoden `#createLoadPromise()` antyder att metoden enbart skapar ett löfte. Metoden gör dock även flera andra saker. Den startar laddningen av bilden genom `this.#setImageSource()`, sätter händelsehanterare för `onload` och `onerror` samt ändrar flaggan `#isLoaded`.

Metoden är även beroende av att `this.#image = new Image()` har körts innan metoden anropas. Genom att skapa bilden direkt vid deklarationen försvinner detta beroende på ordningen i konstruktorn.

### Förbättring & Analys

Jag skulle göra två förändringar här. Den första är att flytta det som händer när bilden laddas till en egen metod. På så sätt kan `onload` endast innehålla ett funktionsanrop och metoden får ett tydligare ansvar.

Jag skulle även flytta skapandet av bilden från konstruktorn till fältdeklarationen. På så sätt är `#image` initierad innan konstruktorn börjar köras och metoden blir inte beroende av att en viss ordning används i konstruktorn.

Sidoeffekten att `#createLoadPromise()` startar laddningen av bilden ser jag däremot ingen anledning att bryta ut. Att skapa löftet och starta laddningen hör ihop eftersom löftet representerar resultatet av just den laddning som metoden startar. Jag har därför valt att behålla detta i samma metod och istället tydliggjort ansvaret i JSDoc-kommentaren.

Jag hade tidigare inte skrivit några JSDoc-kommentarer för metoderna i `ImageAsset`, vilket jag ser som en miss. I samband med analysen har jag därför även lagt till kommentarer som beskriver metodernas ansvar och parametrar.

```javascript
#image = new Image()

constructor (src) {
  this.#loaded = this.#createLoadPromise(src)
  this.#loaded.catch(() => {})
}

/**
 * Starts loading the image and creates a promise for the result.
 *
 * @param {string} src - Source of the image.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the image when it has loaded.
 */
#createLoadPromise (src) {
  return new Promise((resolve, reject) => {
    this.#image.onload = () => this.#handleLoad(resolve)
    this.#image.onerror = (err) => reject(err)

    this.#setImageSource(src)
  })
}

/**
 * Marks the asset as loaded and resolves the load promise.
 *
 * @param {Function} resolve - Resolves the load promise with the image.
 */
#handleLoad (resolve) {
  this.#isLoaded = true
  resolve(this.#image)
}
```

---

## `SpriteAnimation.update()`

### Förklaring

Uppdaterar animationen med hjälp av förfluten tid. Den förflutna tiden läggs till i en räknare. När räknaren har nått bildrutans varaktighet går animationen vidare till nästa bildruta. Om animationen har nått den sista bildrutan återställs den till den första.

### Reflektion

**Small:**

Metoden är 8 rader lång, vilket jag anser inte är så farligt, dock så går nog det att minska.

**Blocks and Indenting:**

Metoden har en indenteringsnivå, vilket följer regeln. Däremot innehåller blocket inuti `if`-satsen flera rader. Boken, s. 35, beskriver att ett sådant block helst enbart ska innehålla ett funktionsanrop. Detta kan därför förbättras genom att flytta ansvaret till separata metoder.

**Do One Thing:**

Metoden gör flera saker. Den räknar upp den förflutna tiden (`this.#elapsedTime += deltaTime`), kontrollerar om det är dags att byta bildruta och uppdaterar sedan den aktuella bildrutan. Den ansvarar även för att återställa animationen när den sista bildrutan har nåtts.

**Function Arguments:**

Metoden tar endast ett argument, vilket gör den monadisk, s. 40. Enligt boken är en monadisk funktion att föredra framför funktioner med flera argument, även om en funktion utan argument är ännu bättre.

**Have No Side Effects:**

Metoden har en sidoeffekt eftersom den ändrar animationens interna tillstånd genom att uppdatera `elapsedTime` och `currentFrame`. Detta är dock en del av metodens avsedda ansvar eftersom syftet med `update()` är att uppdatera animationens tillstånd. Metoden gör alltså det som förväntas av den: den för animationen framåt och börjar om från den första bildrutan när den sista har nåtts.

### Förbättring & Analys

Jag anser att det finns ett par saker som kan göras annorlunda för att lösa de problem som har identifierats. Genom att dela upp ansvaret i mindre metoder blir `update()` kortare och varje metod får ett tydligare ansvar.

Jag anser även att namnet `resetCurrentFrame` är något missvisande. Metoden återställer inte den aktuella bildrutan varje gång den anropas, utan gör det endast när animationen har nått slutet. Jag väljer därför att ändra namnet till `resetCurrentFrameIfFinished`, eftersom namnet bättre beskriver när återställningen sker.

Jag valde först att samla flera operationer i metoden `advanceOneFrame()`:

```javascript
update (deltaTime) {
  this.#elapsedTime += deltaTime

  if (this.#elapsedTime >= this.#frameDuration) {
    this.#advanceOneFrame()
  }
}

#advanceOneFrame () {
  this.#elapsedTime -= this.#frameDuration
  this.#currentFrame++
  this.#resetCurrentFrameIfFinished()
}
```

Detta gör `update()` kortare, men `advanceOneFrame()` får fortfarande flera ansvarsområden. Den ändrar både den förflutna tiden, den aktuella bildrutan och återställer bildrutan vid behov.

Jag valde därför att dela upp detta ytterligare:

```javascript
update (deltaTime) {
  this.#elapsedTime += deltaTime

  if (this.#elapsedTime >= this.#frameDuration) {
    this.#subtractFrameDuration()
    this.#advanceFrame()
    this.#resetCurrentFrameIfFinished()
  }
}

#subtractFrameDuration () {
  this.#elapsedTime -= this.#frameDuration
}

#advanceFrame () {
  this.#currentFrame++
}

#resetCurrentFrameIfFinished () {
  if (this.#currentFrame >= this.#frames.length) {
    this.#currentFrame = 0
  }
}
```

På detta sätt har varje metod ett mer avgränsat ansvar och namnen beskriver vad respektive metod gör. `update()` blir samtidigt enklare att läsa eftersom den beskriver animationens flöde på en högre nivå.

---

## `SpriteRenderer.add()`

### Förklaring

Lägger till en sprite i renderaren. Om spritens bild inte är laddad ännu väntar metoden på att bilden ska laddas och schemalägger därefter en ny rendering. Om laddningen misslyckas ignoreras felet och spriten ritas då inte.

### Reflektion

**Small:**

Metoden är 8 rader lång, vilket enligt författaren ligger inom en den nivå som tagits upp tidigare. Metoden skulle dock kunna förbättras genom att flytta delar av ansvaret till en separat metod.

**Blocks and Indenting:**

Metoden har endast en indenteringsnivå, vilket är i enlighet med regeln, s. 35. Däremot innehåller `if`-blocket inte endast ett enkelt funktionsanrop i den ursprungliga implementationen:

```javascript
sprite.waitForLoad().then(() => this.#scheduleRender()).catch(() => {})
```

Enligt boken bör blocken helst endast innehålla ett funktionsanrop. Detta kan förbättras genom att flytta ansvaret för att vänta på laddningen till en separat metod.

**Do One Thing:**

Metoden gör för närvarande två saker. Den lägger till spriten i arrayen (`this.#sprites.push(sprite)`) och ser samtidigt till att renderingen uppdateras när bilden har laddats.

Detta innebär att metoden både hanterar lagringen av spriten och laddningen av dess bild. Ansvaret för att vänta på laddningen kan därför flyttas till en separat metod.

**Have No Side Effects:**

Metoden ändrar renderarens interna tillstånd genom att lägga till spriten i `this.#sprites`. Detta är dock inte en oväntad sidoeffekt, eftersom det är själva syftet med metoden `add()`.

Metoden påverkar däremot även renderingen genom att schemalägga en ny rendering när bilden har laddats. Detta är en del av det beteende som krävs för att en ny sprite ska kunna visas även om bilden ännu inte är laddad. Jag väljer därför att behålla detta ansvar i `SpriteRenderer`, men flyttar väntan på laddningen till en separat metod för att göra `add()` enklare.

### Förbättring & Analys

Jag valde efter genomgången av reglerna att flytta ut väntan på laddningen till en egen metod. På så sätt blir `if`-blocket endast en rad och ett funktionsanrop.

Jag döper metoden till `#renderWhenLoaded()`, vilket beskriver vad metoden gör: den ser till att en ny rendering schemaläggs när spritens bild har laddats.

```javascript
/**
 * Adds a sprite to the renderer.
 * If the sprite is not loaded yet, a render is scheduled once it has loaded.
 *
 * @param {Sprite} sprite - Sprite to add.
 */
add (sprite) {
  this.#sprites.push(sprite)

  if (!sprite.isLoaded) {
    this.#renderWhenLoaded(sprite)
  }
}

/**
 * Schedules a render when the sprite has loaded.
 *
 * @param {Sprite} sprite - The sprite to wait for.
 */
#renderWhenLoaded (sprite) {
  sprite.waitForLoad()
    .then(() => this.#scheduleRender())
    .catch(() => {})
}
```

---

## `Sprite.constructor()`

### Förklaring

Skapar en sprite med en bildkälla, position, storlek och eventuellt en region. Konstruktorn sätter fälten och hämtar bildtillgången genom `assignImageAsset()`.

### Reflektion

**Function Arguments:**

Här bryter konstruktorn tydligt mot regeln om antalet argument. Konstruktorn har sex argument (`src`, `x`, `y`, `width`, `height` och `region`). Boken beskriver att fler än tre argument kräver särskild motivering och att man helst bör undvika så många argument (s. 40).

Boken föreslår att argument som hör ihop istället kan samlas i ett objekt, s. 43. I det här fallet hör `x`, `y`, `width`, `height` och `region` ihop eftersom de beskriver spritens egenskaper.

Anropet `new Sprite(src, 0, 0, 32, 32)` är dessutom svårt att läsa eftersom det inte framgår vad de olika värdena representerar. Det är också lätt att råka ange argumenten i fel ordning.

Det finns även ett problem med standardvärdena. `x` och `y` har standardvärdet `0`, medan `width` och `height` saknar standardvärden. Eftersom JavaScript inte tillåter att man hoppar över argument i mitten måste en användare ändå ange `x` och `y` om den vill ange `width` och `height`. Detta var något jag inte hade reflekterat över tidigare.

### Förbättring

Jag tog hjälp av en LLM (Claude Sonnet 5 Medium) för att undersöka hur detta kunde lösas, eftersom jag inte hade tidigare kunskap om options-objekt som lösning på många funktionsargument. Förslaget var att använda ett objekt för position, storlek och region:

> Jag skulle ta emot positionen, storleken och regionen i ett objekt. Antalet rader ändras inte (8), men argumenten går från sex till två, anropen blir läsbara (`new Sprite('hero.png', { width: 32, height: 32 })`) och standardvärdena för `x` och `y` går att använda. Nackdelen är att alla anrop av konstruktorn måste ändras. Om jag följde boken strikt hade jag skapat en egen klass för position och storlek, men det känns som överkonstruktion i ett litet spritebibliotek.
>
> ```javascript
> /**
>  * Creates an instance of the Sprite class.
>  *
>  * @param {string} src The source of the image.
>  * @param {object} options The position, size and region of the sprite.
>  * @param {number} [options.x] The X coordinate in pixels (default: 0).
>  * @param {number} [options.y] The Y coordinate in pixels (default: 0).
>  * @param {number} options.width The width of the sprite in pixels.
>  * @param {number} options.height The height of the sprite in pixels.
>  * @param {SpriteRegion|null} [options.region] The region of the source image to use (default: null).
>  */
> constructor (src, { x = 0, y = 0, width, height, region = null }) {
>   this.#x = x
>   this.#y = y
>   this.#width = width
>   this.#height = height
>   this.#region = region
>   this.assignImageAsset(src)
> }
> ```

Ett annat alternativ är att följa bokens förslag mer strikt och skapa egna klasser för värden som hör ihop. Positionen skulle då kunna representeras av en Point-klass:

```javascript
export class Point {
  #x = 0
  #y = 0

  constructor (x, y) {
    this.#x = x
    this.#y = y
  }
}
```

På samma sätt skulle storleken kunna representeras av en Size-klass:

```javascript
export class Size {
  #width = 0
  #height = 0

  constructor (width, height) {
    this.#width = width
    this.#height = height
  }
}
```

Konstruktorn skulle då kunna användas på följande sätt:

```javascript
new Sprite(
  'hero.png',
  new Point(0, 0),
  new Size(32, 32)
)
```

Jag kan förstå hur detta kan vara en fördel ur ett objektorienterat perspektiv, eftersom `Point` och `Size` samlar värden som hör ihop i egna objekt. Däremot anser jag att det blir onödigt komplext för användaren av min modul. Användaren behöver då skapa två extra objekt för att skapa en enkel sprite.

Jag väljer därför options-objektet som lösning. Det minskar antalet argument från sex till två, gör anropet tydligare och gör det möjligt att använda standardvärden för `x` och `y`, utan att introducera ytterligare klasser som jag inte anser tillför tillräckligt mycket funktionalitet.

---

## Reflektion kring kapitel 3
Jag tycker att det finns mycket bra att ta med sig från kapitlet. Att tänka efter vad en funktion faktiskt gör, och inte bara vad jag tror att den gör, ger mycket renare kod. De viktigaste reglerna tycker jag är **Do One Thing**, **Small**, **Blocks and Indenting** och **Function Arguments**. Det tydligaste exemplet i min egen kod var `SpriteRenderer.render()`, som rensade canvasen, loopade, filtrerade bort sprites, valde ritsätt och innehöll ett `drawImage`-anrop med nio argument. Först när jag räknade rader och såg de nästlade `if`-satserna blev det svårt att hävda att den gjorde en sak. **Blocks and Indenting** är den regel jag tycker är enklast att använda i praktiken, eftersom ett block på flera rader inuti en `if`-sats direkt visar att något borde flyttas till en egen metod, och namnet på metoden blir en form av dokumentation.

Den största överraskningen var **Function Arguments**. `Sprite`-konstruktorn hade sex argument, och jag hade inte tänkt på att standardvärdena på `x` och `y` inte går att använda när `width` och `height` kommer efter dem. Ett anrop som `new Sprite(src, 0, 0, 32, 32)` säger dessutom inget om vad siffrorna betyder. Jag kände inte till options-objekt som lösning och tog hjälp av en LLM för att hitta den. Jag övervägde också att skapa egna klasser för position och storlek, som boken föreslår, men det kändes för tungt för den som ska använda modulen.

Jag håller dock inte med om allt. När jag delade upp `update()` blev två av metoderna bara en rad var, och `render()` blev fyra metoder för något som egentligen är enkelt, så man får hoppa mer mellan metoder för att förstå helheten. Även **Have No Side Effects** ser jag som ett sätt att upptäcka problem snarare än en regel som alltid måste följas. Jag tog bort ordningsberoendet i `#createLoadPromise()`, men behöll att metoden startar laddningen, eftersom löftet och laddningen hör ihop, och dokumenterade det i stället. Precis som i kapitel 2 handlar det alltså om avvägningar, och det jag tar med mig är målet snarare än siffrorna: en metod ska göra en sak, ligga på en abstraktionsnivå och gå att förklara utan ordet "och".

---

## Användning av LLM/AI

Jag har använt LLM i den här laborationen för mer komplexa problem. Bland annat behövde jag hjälp med att minska tiden det tog att ladda in sprites, och där föreslog LLM:en att jag skulle använda en cache i `ImageAsset`, något jag inte hade tänkt på själv. Det är ett bra exempel på hur jag vill använda AI: som stöd för att hitta lösningar jag inte känner till, medan jag själv fattar besluten.

I övrigt vill jag inte att LLM ska programmera åt mig. Programmeringen är det jag själv vill göra, och jag vill att AI ska hjälpa mig att lära mig, ge tips och öka min egen förmåga, inte göra mitt jobb. Jag har även använt LLM för att formulera vissa JSDoc-kommentarer bättre. Då har jag alltid skrivit kommentaren själv först och sedan bett om råd för att formulera den korrekt. Det tycker jag är det bästa sättet att använda AI utan att ge bort ansvaret.

Just nu vill jag inte heller använda AI direkt i VS Code. Jag upplever att det stör mitt arbetsflöde, och jag tror dessutom att det finns en risk att man tappar både förståelsen och greppet om sitt eget lärande.