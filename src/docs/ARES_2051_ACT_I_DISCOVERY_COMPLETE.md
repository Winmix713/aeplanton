
ARES MISSION 2051 — Campaign Narrative Specification

Document ID: ARES_2051_ACT_I_DISCOVERY_COMPLETE.md
Status: Canonical Design Document
Framework Version: Integrated Systems, AP, & Advisor Trust Models

CANONICAL CONFIGURATION MATRIX

A küldetések logikai futtatása előtt a játék motorja az alábbi, rögzített adatbázist használja elsődleges referenciaként.

1. Advisor Baseline Directory

• NAV: Dr. Imani Okafor (41, nigériai-brit). Fókusz: Kiszámíthatóság, biztonság, igazolt útvonalak. Titok: Rejtett Delta-gerinc instabilitási adatok.
• SCI: Dr. Lena Varga (36, magyar). Fókusz: Felfedezés, innováció, marsi anomáliák. Titok: Delta-gerinc nem azonosított kémiai mintái.
• SYS: Dr. Marco Bellini (48, olasz). Fókusz: Zárt körfolyamatok, gépépség, strukturális integritás. Titok: A Sabatier-reaktor hibás katalizátorágya.
• COMM: Alex Mercer (29, kanadai). Fókusz: Transzparencia, morál, mentális egészség. Titok: Legénységi metaadat-figyelő algoritmus / Földi szabotázs-akták.

2. Trust Range Thresholds

• 81% – 100% (Absolute Loyalty): AP-költség csökkenés (-1 AP az adott részlegnél), titkok feltárulnak.
• 36% – 80% (Operational Baseline): Alapértelmezett értékek és viselkedés.
• 15% – 35% (Passive Friction): Súrlódási adó (+1 AP Friction Tax minden részleg-akcióra). Információ-visszatartás.
• 0% – 14% (Open Defiance): Parancsok megtagadása, automatikus belső erőforrás-lefoglalási projektek indítása.

PHASE 1: ARRIVAL (SOL 1–3)


MISSION 001 — THE FIRST BREATH

• Sol: 1 | Priority: Critical
• Location / Environment: Chryse Planitia, Landing Zone Alpha. Külső légnyomás: 0.6 kPa. Háttérsugárzás: 22 mSv/év.
• Narrative Briefing: Az ARES-1 sikeresen landolt. A modulok épek, de a hosszú távú életfenntartás inaktív. 36 órányi vészhelyzeti oxigéntartalék van érvényben. A Sabatier és a WRS rendszerek hidegindításra várnak.

Advisor Dialogues & Conflicts

• SYS (Marco): "Parancsnok, 36 óránk van, mielőtt megfulladunk. Azonnal az oxigéngenerálásra és a légfrissítő hálózatra kell irányítani az összes energiát! A víz megvár minket."
• SCI (Lena): "Marco a múltban él! Hidrogén- és tiszta vízáramlás nélkül az elektrolízis cellák órákon belül kiszáradnak és tönkremennek. A WRS-t kell elsőként stabilizálni, különben az oxigénrendszer is leáll!"
• NAV (Imani): "A leszállási telemetria szerint a dűnék elmozdulása miatt az elsődleges külső jégbányászati útvonal bizonytalan. Óvatosan kell elosztanunk az energiát, ha mozgatni akarjuk a nehézgépeket."
• COMM (Alex): "A telepesek látják a kijelzőkön a visszaszámlálást. Ha nem kapnak egyértelmű, transzparens tájékoztatást a rendszerek állapotáról, pánik tör ki, mielőtt az első Sol véget érne."

Player Decisions

• A. Prioritás: Oxigéngenerálás indítása azonnal.
	• Immediate Cost/Resource: +25% Oxigéntartalék, -15% Vízellátási stabilitás, Power: -20 kW. AP: -3 AP.
	• Trust Changes: SYS +10, SCI -10.
	• Hidden Variables: M001_Priority = OXYGEN.
	• Delayed Consequence (Sol 4): A WRS csöveiben lévő maradék víz megfagy az inaktivitás miatt, a Sol 4-en a WRS hatékonysága 90%-ról 75%-ra esik.
• B. Prioritás: WRS vízújrahasznosítás aktiválása.
	• Immediate Cost/Resource: +20% Vízellátási stabilitás, -10% Oxigéntartalék, Power: -15 kW. AP: -3 AP.
	• Trust Changes: SCI +10, SYS -10.
	• Hidden Variables: M001_Priority = WATER.
	• Delayed Consequence (Sol 4): Az oxigénszint kritikus határra süllyed, vészhelyzeti AP-levonást okozva a legénység fáradtsága miatt (Sol 4 Base AP: 10 helyett 6).
• C. Szimultán indítás (Overclocking mindkét rendszeren).
	• Immediate Cost/Resource: +15% Oxigén, +15% Víz. Power: -45 kW (Grid terhelési riasztás). AP: -5 AP.
	• Trust Changes: SYS -5, SCI -5 (Kockázatosnak tartják a parancsnokot).
	• Hidden Variables: M001_Priority = BOTH, Sabatier_Wear_Multiplier = 2.0.
	• Delayed Consequence (Sol 14): A Sabatier katalizátorágyának rejtett kopása korán eszkalálódik, Marco titka hamarabb kiderül.

UI Integration

A központi kijelzőn villogni kezd a választott rendszer ikonja, miközben a lekapcsolt ág sötétben marad a sematikus hálózati térképen.

MISSION 002 — THE UNVERIFIED ROUTE

• Sol: 2 | Priority: High
• Location / Environment: Delta Ridge északi pereme. Instabil regolith dűnék.
• Narrative Briefing: A távolsági spektrométerek tiszta jég jelenlétét mutatják a Delta-gerinc mélyén. Az útvonalat azonban a legutóbbi porvihar teljesen átírta. Egy felderítő rovert kell kiküldeni a mintákért.

Advisor Dialogues & Conflicts

• NAV (Imani): "Nem engedélyezhetem ezt az útvonalat. A terep nincs igazolva, a műholdképek vakok. Előbb egy radar-drónt kell küldenünk, különben elveszítjük a rovert."
• SCI (Lena): "Ha várunk, a hőmérsékleti ingadozás szublimálja a felszínhöz közeli jégréteget, és a spektrométeres adatok pontatlanná válnak. Most kell lépnünk!"
• SYS (Marco): "Ha a rover elakad, a kimentése értékes energiát és hidrogént fog felemészteni a telepekről."
• COMM (Alex): "A legénység tudni akarja, hogy miért kockáztatjuk a drága felszerelést a második napon. Ha drónt küldünk, az megnyugtatja őket."

Player Decisions

• A. A rover azonnali indítása (SCI javaslat).
	• Immediate Cost/Resource: AP: -2 AP. Rover állapot: Risk of Damage.
	• Trust Changes: SCI +10, NAV -10.
	• Hidden Variables: M002_Delta_Route = DIRECT. Roll 1-100: Ha <40, Rover_Damaged = TRUE.
	• Delayed Consequence (Sol 5): Ha Rover_Damaged == TRUE, Lena a Sol 5-ön elismeri, hogy a begyűjtött minták gyanús kémiai vegyületeket tartalmaznak (Delta_Ridge_Contaminated = TRUE), de a rover javítása 4 AP-be kerül.
• B. Radar-drón küldése útvonal-ellenőrzésre (NAV javaslat).
	• Immediate Cost/Resource: AP: -4 AP (Magas koordinációs költség). Power: -5 kW.
	• Trust Changes: NAV +10, SCI -5.
	• Hidden Variables: M002_Delta_Route = SCOUTED, Rover_Damaged = FALSE.
	• Delayed Consequence (Sol 9): Imani hálás lesz a Parancsnok óvatosságáért, és automatikusan megnyit egy biztonságos, alternatív bányászati folyosót az Act II-ben.
• C. Az expedíció elhalasztása és alternatív forrás keresése.
	• Immediate Cost/Resource: Vízellátás: -10%. Morál: -5%. AP: 0 AP.
	• Trust Changes: SCI -15, NAV -5.
	• Hidden Variables: M002_Delta_Route = ABANDONED.
	• Delayed Consequence (Sol 14): A kolónia vízszűkébe kerül, ami miatt a Sabatier reaktort kényszerűen túl kell pörgetni.

UI Integration

A NAV almenüben a Delta Ridge szektor "Unverified" (Ellenőrizetlen) státuszban marad, piros felkiáltójellel.

MISSION 003 — THE SABATIER IMPULSE

• Sol: 3 | Priority: High
• Location / Environment: Hab-1 Központi Mérnöki Blokk.
• Narrative Briefing: A Sabatier-reaktor első teljes gőzzel való indítása közben a COMM részleg kritikus szoftveres anomáliát észlel. A belső kamra nyomásértékei nem frissülnek a fő UI-on.

Advisor Dialogues & Conflicts

• COMM (Alex): "A szoftveres telemetria vak. Nem látjuk a hidrogén-nitrogén arányt. Azonnali leállítást és kód-diagnosztikát javaslok. Nem kockáztathatunk egy robbanást!"
• SYS (Marco): (Idegesen) "Ha most leállítjuk, a katalizátorágyak lehűlnek. Az újraindítás napokig tart és felemészti a megmaradt energiánkat. A gép stabil, mennünk kell tovább manuális szeleppel!"
• SCI (Lena): "Ha a reaktor leáll, nincs víztermelés a WRS számára. Választanunk kell a szoftveres biztonság és a fizikai valóság között."
• NAV (Imani): "Ha a reaktor megsérül, a bázis pozíciója tarthatatlanná válik. Én Mercernek adok igazat."

Player Decisions

• A. Kényszerített indítás manuális szeleppel (SYS javaslat).
	• Immediate Cost/Resource: Sabatier termelés: +25%. AP: -1 AP. Power: -15 kW.
	• Trust Changes: SYS +15, COMM -15.
	• Conditional Dialogue: Ha a Sol 1-en a játékos a C. Szimultán indítást választotta: Marco halkan megjegyzi: "Köszönöm, Parancsnok. Nem bírta volna ki a rendszer a hűtési ciklust."
	• Hidden Variables: Sabatier_Blind_Run = TRUE, Structural_Micro_Fractures + 10.
	• Delayed Consequence (Sol 22): A reaktor belső mikroszkopikus repedései miatt egy váratlan gázszivárgás történik a mérnöki blokkban, ami lezárja a SYS részleg parancsait 2 Solra, hacsak a játékos nem rendelkezik egy korábban feltárt ásványi összetevővel a javításhoz.
• B. Biztonsági leállítás és szoftveres debug (COMM javaslat).
	• Immediate Cost/Resource: AP: -4 AP. Sabatier output: 0 erre a Solra. Oxigéntartalék: -15%.
	• Trust Changes: COMM +15, SYS -15.
	• Hidden Variables: Sabatier_Blind_Run = FALSE.
	• Delayed Consequence (Sol 5): A reaktor szoftvere tiszta lesz, de az oxigén- és víztartalékok kritikus szintre esnek, elindítva az életfenntartó rendszerek stabilizációs krízisét.

PHASE 2: STABILIZATION (SOL 4–7)


MISSION 004 — LIFE SUPPORT CRUNCH

• Sol: 5 | Priority: Critical
• Location / Environment: Hab-1 Elsődleges Életfenntartó Csomópont.
• Narrative Briefing: A bázis elérte az első stabilizációs küszöböt, de a korábbi döntések számlája megérkezett. A rendszerek egyensúlya felborult, a telepesek fizikai fáradtsága eléri a kritikus szintet.

Advisor Dialogues & Conflicts

• SYS (Marco): (Ha M001_Priority == OXYGEN) "Ahogy mondtam, az oxigén megvan, de a WRS csövei elfagytak. A jég elzárja a keringést. AP-t kell áldoznunk a manuális leolvasztásra!"
• SCI (Lena): (Ha M001_Priority == WATER) "A vízrendszerünk tökéletes, de a légnyomás ingadozik. A legénység feje fáj, a koncentráció csökken. Ha nem kalibráljuk újra az elektrolízist, leáll a munka."
• COMM (Alex): "A telepesek érzik a feszültséget. Ha a Parancsnok nem vonja be őket a döntésekbe, a morál visszafordíthatatlanul zuhanni kezd."
• NAV (Imani): "Bármit is választ, Parancsnok, a nehézgépek üzemanyagát ne pazaroljuk fűtésre."

Conditional Dialogue (Öröklődés-ellenőrzés)

• Ha a Sol 2-n a játékos a rovert küldte és Delta_Ridge_Contaminated == TRUE:
Lena (SCI): "Parancsnok, a Delta-gerincről hozott minták reaktív perklorátokat tartalmaznak. Ez mérgezi a WRS szűrőit. Ha nem tisztítjuk meg azonnal, a tiszta vízhozamunk 30%-kal csökken!"

Player Decisions

• A. Sürgősségi AP-átirányítás a karbantartásra (Manuális leolvasztás / kalibráció).
	• Immediate Cost/Resource: AP: -5 AP (A Sol fele elvész). Rendszer integritás: +20%. Power: -10 kW.
	• Trust Changes: SYS +10, SCI +5.
	• Hidden Variables: LS_Crunch_Resolved = COORD.
• B. Vegyi adalékanyagok használata a szűrők tisztítására (Gyors, de korrozív megoldás).
	• Immediate Cost/Resource: AP: -1 AP. WRS hatékonyság: Ideiglenesen visszaáll 90%-ra.
	• Trust Changes: SCI +15, SYS -15 (Marco gyűlöli a korrozív anyagokat).
	• Hidden Variables: LS_Crunch_Resolved = CHEMICAL, Sabatier_Wear_Multiplier + 1.5.
	• Delayed Consequence (Sol 19): A vegyi anyagok kikezdik a másodlagos szelepeket, ami egy későbbi Solon hirtelen nyomásesést okoz a hidrogén-visszaforgatónál.

MISSION 005 — THE DEEP RADAR

• Sol: 7 | Priority: Medium
• Location / Environment: Hab-1 Külső Antenna-mező. Erősödő napszél.
• Narrative Briefing: A NAV részleg az első mélyradaros letapogatást végzi a bázis alatt, hogy kijelölje a jövőbeli lakómodulok helyét. A radar azonban egy hatalmas, föld alatti üreget (Láva-csatornát) mutat, aminek a mélyéről szabálytalan elektromágneses impulzusok szivárognak fel.

Advisor Dialogues & Conflicts

• NAV (Imani): "A láva-csatorna tökéletes védelmet nyújtana a sugárzás ellen, de a mélyéből jövő jel zavarja a rovereink irányítását. Le kell pecsételnünk a bejáratot, amíg nem tudjuk, mi az."
• SCI (Lena): "Lepecsételni? Ez egy egyedülálló geológiai vagy talán... asztrobiológiai jelenség! Azonnal le kell küldenünk egy mélységi szondát, hogy rögzítsük a frekvenciát."
• COMM (Alex): "A jel frekvenciája kísértetiesen hasonlít azokra a régi földi katonai kódolásokra, amiket a háború utolsó napjaiban használtak. Parancsnok, ezt meg kell hallgatnunk."
• SYS (Marco): "Engem nem érdekel a jel, de a láva-csatorna szerkezeti stabilitása igen. Ha oda leköltözünk, a bázis sugárzásvédelme 95%-ra nő. Ez tény, a többi csak fantáziálás."

Player Decisions

• A. A jel azonnali izolálása és a csatorna lezárása (NAV/SYS prioritás).
	• Immediate Cost/Resource: Sugárzás elleni védelem: Előkészítve (+10% jövőbeli bónusz). AP: -2 AP.
	• Trust Changes: NAV +10, SYS +10, SCI -15, COMM -10.
	• Hidden Variables: Anomalous_Signal_State = ISOLATED.
	• Delayed Consequence (Sol 25): A jel izolálása miatt a SCI részleg lemarad az első frekvenciaváltásról. A Sol 25-ön a mélyből jövő anomália felerősödik, és közvetlenül a bázis fő áramellátását kezdi szívni, mert nem lett időben dekódolva.
• B. Szonda leeresztése és a jel folyamatos monitorozása (SCI/COMM prioritás).
	• Immediate Cost/Resource: AP: -4 AP. Tudományos adatok: +30 SCI pont. Power: -5 kW.
	• Trust Changes: SCI +15, COMM +15, NAV -10, SYS -5.
	• Hidden Variables: Anomalous_Signal_State = MONITORED.
	• Delayed Consequence (Sol 14 / Sol 25): A rögzített adatokból Lena a Sol 14-en rájön, hogy a jel nem természetes eredetű (Signal_Is_Artificial = TRUE), ami teljesen átírja az Act I utolsó harmadának narratíváját.

PHASE 3: EXPLORATION (SOL 8–12)


MISSION 006 — THE SOLAR FLARE

• Sol: 10 | Priority: Critical
• Location / Environment: Marsi felszín / Láva-csatorna bejárata. Solar Particle Event (SPE): 4500 mSv/év.
• Narrative Briefing: A COMM részleg riasztást ad ki: egy gyilkos erejű napkitörés éri el a Marsot 6 órán belül. A felszíni Hab-1 modulok pajzsa nem bírja el a terhelést. Minden telepest és kritikus mobil berendezést be kell menekíteni a föld alatti láva-csatornába. A logisztika kritikus: a nehéz WRS komponensek és az antennák áthelyezése időbe és AP-be kerül.
[ SOLAR FLARE ALERT: 4500 mSv/year ]
                 │
  ┌──────────────┴──────────────┐
  ▼                             ▼
[ DECISION A: SLOW & SAFE ]   [ DECISION B: FAST EVAC ]
• Cost: 100% AP (All Sols)    • Cost: 1 AP
• Systems: 100% Intact        • Systems: 20% Damage
• Morale: Stable              • Morale: Critical Drop

Advisor Dialogues & Conflicts

• NAV (Imani): "A menekülési útvonal szűk. Ha a roverek egyszerre indulnak meg a nehéz gépekkel, elakadnak a csatorna szájában, és kint égünk el a sugárzásban. A legénységet kell előrehoznunk, a felszerelést hátrahagyva!"
• SYS (Marco): "Ha a felszínen hagyjuk a Sabatier másodlagos hűtőegységeit, a sugárzás és a töltött részecskék tönkreteszik az elektronikát. Romokban lesz a kolónia, ha elmúlik a vihar!"
• COMM (Alex): "Az emberek rettegnek. Ha azt látják, hogy a gépeket többre tartjuk az életüknél, fellázadnak. Az evakuációnak transzparensnek és emberközpontúnak kell lennie!"
• SCI (Lena): (Ha Anomalous_Signal_State == MONITORED) "A láva-csatorna mélyén lévő jel a napkitöréssel szinkronban felerősödött. Ha lent leszünk, közvetlen közelről vizsgálhatjuk meg, de a műszereket is le kell vinnünk!"

Player Decisions

• A. Lassú, szisztematikus evakuálás (Minden AP-t feláldozunk a biztonságért).
	• Immediate Cost/Resource: AP: 100% AP (0 AP marad más parancsra ezen a Solon). Rendszerek állapota: 100% védett. Morál: Stabil.
	• Trust Changes: NAV +10, COMM +10, SYS +5.
	• Hidden Variables: Evacuation_Strategy = PERFECT.
	• Delayed Consequence (Sol 13): A bázis zökkenőmentesen kezdi meg az Act II-t a föld alatt, nincs szerkezeti sérülés.
• B. Rohamtempójú menekülés (A nehéz berendezések egy részét a felszínen hagyjuk).
	• Immediate Cost/Resource: AP: -1 AP (Rengeteg AP marad másra). Anyagi kár: A felszíni rendszerek Integrity értéke -20%-kal csökken a sugárzás okozta elektronikai degradáció miatt. Morál: -15%.
	• Trust Changes: SYS -20, NAV +5, COMM -10.
	• Hidden Variables: Evacuation_Strategy = RUSHED.
	• Delayed Consequence (Sol 13 / Sol 22): Az Act II kezdetén a víz- és oxigéntermelés alapból -15%-os hatékonysággal indul az elektronikai sérülések miatt. Marco rejtett reaktorproblémája közelebb kerül a kritikus ponthoz.
• C. A COMM hálózat feláldozása (Az antennákat kint hagyjuk, hogy mentsük a WRS-t).
	• Immediate Cost/Resource: AP: -3 AP. COMM infrastruktúra: Súlyosan sérült. WRS: Biztonságban.
	• Trust Changes: COMM -20, SYS +15, SCI +5.
	• Hidden Variables: Evacuation_Strategy = SACRIFICED_COMM.
	• Delayed Consequence (Sol 11–13): A következő 3 Solban a bázis "süket" lesz. A COMM részleg parancsai dupla AP-ba kerülnek a belső hálózat szétesése miatt. Alex Mercer elhidegül a Parancsnoktól.

PHASE 4: EXPANSION (SOL 13–18)


MISSION 007 — THE UNDERGROUND WATER MATRIX

• Sol: 15 | Priority: High
• Location / Environment: Föld alatti Láva-csatorna, Sötét Zóna.
• Narrative Briefing: A kolónia sikeresen átköltözött a föld alá. A túlélés érdekében ki kell építeni a stabil, állandó vízhálózatot. Lena egy hatalmas, megkövesedett jéglencsét talált a csatorna falában, de az kitermelés szempontjából veszélyes helyen van.

Advisor Dialogues & Conflicts

• SCI (Lena): "Ez a jéglencse tiszta, ásványi anyagokban gazdag. Ha ide fúrunk, a WRS hatékonysága tartósan +20%-kal nő. Ez a kolónia aranybányája!"
• NAV (Imani): "A radarom szerint a jéglencse feletti bazaltréteg mikro-repedésekkel teli. Ha ott fúrunk, beomolhat az egész szektor, elvágva a Hab-1-et a menekülési útvonaltól."
• SYS (Marco): "A fúróberendezések működtetése a zárt csatornában megemeli a rezgést. Ha a bazalt instabil, a Sabatier reaktor csővezetékei is elszakadhatnak."
• COMM (Alex): "A telepesek unják a sötétséget és a korlátozott vízadagokat. Ha megnyitjuk ezt a forrást, a morál szárnyalni fog. Megéri a kockázatot."

Conditional Dialogue (Öröklődés-ellenőrzés)

• Ha a Sol 2-n a játékos az A opciót választotta (M002_Delta_Route == DIRECT):
Imani (NAV): "Emlékeztetném a Parancsnokot a Delta-gerincre. Ott is szerencsénk volt / elakadtunk. Nem alapozhatjuk a stratégiánkat a szerencsére!"

Player Decisions

• A. Ellenőrzött, lassú fúrás megerősített tartópillérekkel (Biztonsági protokoll).
	• Immediate Cost/Resource: AP: -6 AP (Hatalmas munkaerő-igény). Erőforrás: +10% Vízellátás. Power: -20 kW.
	• Trust Changes: NAV +15, SYS +10, SCI -10 (Lena szerint elvesztegetett idő).
	• Hidden Variables: Subterranean_Mining = SAFE.
• B. Gyorsított, agresszív repesztéses fúrás (SCI javaslat).
	• Immediate Cost/Resource: AP: -2 AP. Erőforrás: +30% Vízellátás (Azonnali bőség).
	• Trust Changes: SCI +20, NAV -20, SYS -10.
	• Hidden Variables: Subterranean_Mining = AGGRESSIVE, Structural_Micro_Fractures + 25.
	• Delayed Consequence (Sol 22): A felgyülemlett strukturális feszültség miatt a Sol 22-es mérnöki krízis során a bázis mennyezete megreped, és a javítási költségek megduplázódnak.

PHASE 5: CONFLICT (SOL 19–24)


MISSION 008 — THE WHISPER IN THE CODE

• Sol: 21 | Priority: High
• Location / Environment: COMM Adatközpont, Föld alatti bázis.
• Narrative Briefing: Alex Mercer egy titkos találkozóra hívja a Parancsnokot a COMM adatszobába. Felfedezte, hogy a mélyből jövő jel nemcsak statikus zaj, hanem egy kódolt üzenet, ami belső adatokat szivárogtat ki. Ezzel egy időben Marco rejtett Sabatier-problémája (ha korábban overclockolták) fizikailag is jelentkezik: a reaktor teljesítménye ingadozik.

Advisor Dialogues & Conflicts

• COMM (Alex): "Parancsnok, a jel dekódolása során rábukkantam valami másra is. Marco Bellini eltitkolta előlünk, hogy a Sabatier reaktor katalizátorágya selejtes. Tudatosan kockáztatta az életünket az indulás óta! Követelem, hogy hozzuk ezt nyilvánosságra a legénység előtt."
• SYS (Marco): (Szemtől szemben, feszülten) "Igen, elhallgattam. Mert ha elmondom a Földön, most nem lennénk itt, hanem ott égtünk volna el a háborúban! Ha Alex ezt nyilvánosságra hozza, a telepesek bizalma összeomlik, és meglincselnek. A reaktort meg tudom javítani, de nyugalom kell hozzá."
• SCI (Lena): "A kód... az üzenet, amit Alex talált, nem földi technológia. Ha Marco hazudott, az marsi szempontból másodlagos. A jel forrását kell elérnünk!"
• NAV (Imani): "A parancsnoki lánc nem bomolhat fel. Ha Marco hibázott is, a nyilvános vádaskodás lázadáshoz vezet. Alexnek hallgatnia kell."

Player Decisions

• A. Teljes transzparencia: Marco titkának nyilvánosságra hozatala (COMM javaslat).
	• Immediate Cost/Resource: Morál: -25% (Pánik és düh). SYS Trust: Azonnal 10%-ra esik (Open Defiance állapot). COMM Trust: +25%. AP Generation Penalty: -2 AP a következő 3 Solon a belső vizsgálatok miatt.
	• Hidden Variables: Marco_Secret_Exposed = TRUE.
	• Delayed Consequence (Sol 28): Marco teljesen elzárkózik az együttműködéstől, és a Sol 28-as végső krízisnél nem hajlandó megosztani az áramhálózat vészhelyzeti bypass kódjait, ami kényszerű erőforrás-veszteséget okoz.
• B. A titok elfojtása és Marco támogatása (SYS védelme).
	• Immediate Cost/Resource: SYS Trust: +20% (Hálás). COMM Trust: Azonnal 15%-ra esik (Passive Friction adó érvénybe lép). Morál: Stabil (egyelőre). AP: -2 AP (A fájlok törlése).
	• Hidden Variables: Marco_Secret_Exposed = FALSE, Alex_Subversion_Index + 0.3.
	• Delayed Consequence (Sol 25): Alex Mercer titokban szabotálni kezdi a Parancsnok belső jelentéseit. A Sol 25-ös UI kijelzőn a valós Morál értékek hamisítva jelennek meg, elrejtve egy készülő föld alatti sztrájkot.

PHASE 6: REVELATION (SOL 25–30)


MISSION 009 — THE MARS PARADOX

• Sol: 28 | Priority: Critical
• Location / Environment: A Láva-csatorna legmélyebb pontja, Az Anomália Epicentruma.
• Narrative Briefing: Elérkezett az Act I végkifejlete. A mélyből jövő jel frekvenciája állandósult, és egy fizikai struktúrát azonosítottak a bazaltréteg alatt: egy ősi, mesterségesen létrehozott hermetikus kamrát. A kamra megnyitása hatalmas energiakisülést okoz, ami túlterheli a kolónia jelenlegi akkutelepeit. Választani kell a teljes tudományos áttörés és a bázis fizikai túlélése között.
                  ┌────────────────────────────────────────┐
                  │       ACT I SEASON FINALE: SOL 28      │
                  └────────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     [ DECISION A: OPEN VAULT ]                    [ DECISION B: DRAIN SIGNAL ]
  • SCI Trust:  +25                             • SYS Trust:  +25
  • SYS Trust:  -30 (Defiance)                  • SCI Trust:  -30 (Friction)
  • Unlock:     Alien Tech Branch               • Benefit:    Grid 100% Stabilized
  • Ending:     The Scientific Directorate      • Ending:     The Survival Regime

Advisor Dialogues & Conflicts

• SCI (Lena): "Ez az! Ezért jöttünk! A kamra falaiban idegen technológiai minták vannak. Ha megnyitjuk, megváltoztatjuk az emberiség jövőjét. Ne törődjön az akkumulátorokkal, Parancsnok, szakítsa át a zárat!"
• SYS (Marco): "Ha áttöri azt a zárat, az indukciós lökés kisüti a teljes hálózatot. A WRS leáll, az elektrolízis cellák felrobbannak. Tiszta öngyilkosság a kutatásért feláldozni az életünket!"
• NAV (Imani): "A szoftverem nem tudja kiszámítani a kockázatot. Parancsnok, a biztonság azt diktálja, hogy lassan, lépésről lépésre merítsük le a kamra energiáját, még ha ez hetekbe is telik."
• COMM (Alex): "Az emberek látják a mélyből jövő fényt. Ha eltitkoljuk előlük, mi van odalent, vagy ha veszélybe sodorjuk a bázist, a parancsnokságnak vége. Döntsön bölcsen."

Player Decisions

• A. A kamra azonnali megnyitása (SCI prioritás — Tudományos Áttörés).
	• Immediate Cost/Resource: Power Grid Collapse (Minden részleg lekapcsol, kivéve a kritikus életfenntartást). Akkumulátorok: 0 kWh. AP Base a következő Act elején: 5 AP. Tudományos adatok: +150 SCI pont (Feloldja az alternatív "Xeno-Infrastruktúra" technológiai fát az Act II-ben).
	• Trust Changes: SCI +25, SYS -30, NAV -15.
	• Narrative Output: A bázis sötétségbe borul, de a kamra feltárul. Az emberiség rájön, hogy nincs egyedül a Marson.
	• Campaign Ending Alignment: Lépés a The Scientific Directorate vagy a The Fragmented Colony végkimenetelek felé.
• B. Az energia levezetése és a kamra lezárása (SYS/NAV prioritás — Biztonság mindenekelőtt).
	• Immediate Cost/Resource: Power: 100% stabil (+500 kWh teljes töltöttség az akkukban). AP Base a következő Act elején: 12 AP (Maximális hatékonyság). Nyersanyag-tartalékok: Biztosítva.
	• Trust Changes: SYS +25, NAV +15, SCI -30 (Passive Friction állapotba kerül).
	• Hidden Variables: Vault_Status = SEALED.
	• Narrative Output: A bázis biztonságban van, a zárt láncú rendszerek tökéletesen futnak. Lena Varga azonban megfogadja, hogy a Parancsnok háta mögött fogja folytatni a kutatást.
	• Campaign Ending Alignment: Lépés a The Survival Regime vagy a The United Human Colony végkimenetelek felé.

UI INTEGRATION & ENGINE RULES FOR ACT I

1. The Callback Engine: Minden Sol lezárásakor a motor ellenőrzi az aktív flag-eket (Rover_Damaged, Sabatier_Blind_Run, Marco_Secret_Exposed). Ha egy flag egyezik egy küldetés feltételével, a hozzá tartozó dialógus-blokk felülírja a standard szövegeket.
2. Friction Tax Display: Ha a játékos megnyitja a SCI menüt, és a Trust < 35%, a gombok felett egy piros lakatos ikon jelenik meg: "+1 AP Friction Tax Active (Low Trust)".
Az Act I — Discovery teljes, 30 Solos, elágazó struktúrájú narratív dokumentuma ezzel hivatalosan kész és programozható. Minden döntés közvetlen és rejtett láncolatot alkot.
Hogyan folytassuk a fejlesztést a projekt ütemterve alapján?
1. Step 4: Act II — The Foundation megtervezése (Ahol a bázis fizikai bővítése, az új oxigéngenerátorok és az Act I-ből örökölt kamra-státusz határozza meg a túlélést).
2. Technológiai Fa (Research Tree) kidolgozása (Szeretnéd látni, hogy a megszerzett SCI pontokból milyen konkrét WRS, Sabatier vagy Xeno-technológiákat lehet kifejleszteni az AP hatékonyság növelésére)?
