
ARES MISSION 2051 — Systems & Economic Specification

Document ID: ARES_2051_SURVIVAL_ECONOMY_AND_ROBOTICS_FRAMEWORK.md
Status: Core Mathematical & Economic Specification
System Architecture: Closed-Loop Resource Engine & Autonomous Robotics Network

0. CHRONOLOGICAL RECONCILIATION & DEADLINES

Hogy feloldjuk a történeti idővonal ellentmondásait, a játék kánonját az alábbi három szigorúan elkülönített idősíkra és határidőre osztjuk:
2030                  2035                  2045                      2051
┌─────────────────────┬─────────────────────┬─────────────────────────┬─────────────────────┐
│ III. Világháború    │ Diagnózis: A Föld   │ A Föld megsemmisülése.  │ Az ARES-1 bázis     │
│ nukleáris katasztrófa│ köpenye megsérült.  │ Utolsó evakuációs hajók │ 500 Solos kampánya  │
│                     │ 10 év az indításig. │ elhagyják a felszínt.   │ a Mars kolonizálására│
└─────────────────────┴─────────────────────┴─────────────────────────┴─────────────────────┘
                                            ▲                         ▲
                                            │   6 ÉV MÉLYŰRI TRANZIT  │
                                            └─────────────────────────┘
• 2030 – 2035: A III. Világháború és az azt követő globális összeomlás, valamint a magma réteget ért törés felfedezése.
• 2035 – 2045 (The 10-Year Evacuation Chase): A marsi infrastruktúra-tervek kidolgozása, az ARES-1 expedíció megtervezése, az ISS-alapú rendszerek átalakítása és a gigantikus menekülthajók gyártása a Földön, a bolygó 2045-ös végső felrobbanásáig.
• 2045 – 2051 (The Deep Space Transit): Az ARES-1 előőrs és a menekültek első hullámainak 6 éves mélyűri utazása a Mars felé kriofázisban és szub-fénysebességű pályán.
• 2051 (The 500-Sol Construction Window): A játékmenet idősíkja. A Parancsnok megérkezik a Marsra. Pontosan 500 Sol áll rendelkezésre az állandó földalatti infrastruktúra és a zárt körfolyamatok teljes stabilizálására, mielőtt a Föld pusztulását túlélő, mélyűrben keringő második és harmadik menekülthullám (több millió ember) megérkezik és belép a Mars pályájára. Minden Sol csúszás vagy rendszerleállás közvetlenül csökkenti a befogadható emberek létszámát.

1. RESOURCE ECONOMY MODEL

A játék gazdasági motorja megmaradási törvényeken alapuló áramlási egyenleteket használ. A nyersanyagok tárolási kapacitása véges, a túltöltés veszteséget generál.

Core Fleet Metrics (Baseline: Per 100 Colonists / Per Sol)

• Víz (\(H_{2}O\)): Alapvető emberi szükséglet és az elektrolízis elsődleges forrása. Fogyasztás: 40 kg / Sol.
• Oxigén (\(O_{2}\)): Légzési gáz. Fogyasztás: 32 kg / Sol.
• Hidrogén (\(H_{2}\)): A Sabatier-reaktor üzemanyaga. Nem fogyasztja a legénység, kizárólag vegyi alapanyag.
• Szén-dioxid (\(CO_{2}\)): A marsi atmoszférából korlátlanul kivonható gáz, a Sabatier-reaktor bemeneti forrása.
• Élelmiszer: Hidroponikus és szintetikus tápanyag. Fogyasztás: 50 egység / Sol.
• Nyersanyag (Regolith/Fém): Az építés és a karbantartás fizikai alapanyaga.

2. LIFE SUPPORT SYSTEMS: FLOW EQUATIONS

A zárt láncú létfenntartó rendszerek összefüggő matematikai modellje naponta frissül a Sol-váltás fázisában.
                  ┌────────────────────────────────────────┐
                  │        Atmospheric Intake (CO2)        │
                  └────────────────────────────────────────┘
                                       │
                                       ▼
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│  Ice Harvesting   │ ────► │ Sabatier Reactor  │ ────► │    Methane Gas    │
│  (Raw H2O Input)  │       │ (H2O Generation)  │       │  (Vented/Stored)  │
└───────────────────┘       └───────────────────┘       └───────────────────┘
          │                           │
          ▼                           ▼
┌──────────────────────────────────────────────────────────┐
│               Water Recovery System (WRS)                │
└──────────────────────────────────────────────────────────┘
                              │
                              ▼ Purified H2O
┌──────────────────────────────────────────────────────────┐
│                    Electrolysis Unit                     │
└──────────────────────────────────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
     Oxygen Generation (O2)        Hydrogen Recovery (H2)

Pure Chemical Conversions

1. Sabatier-reaktor hozamgörbe:
\(\text{Output\ }H_{2}O=\min \left(\text{Input\ }CO_{2},\frac{\text{Input\ }H_{2}}{4}\right)\times 0.81\times \text{Sabatier\ Integrity\ \%}\)
2. WRS tisztítási egyenlet:
\(\text{Purified\ }H_{2}O=\left(\text{Wastewater}+\text{Sabatier\ }H_{2}O+\text{Raw\ Ice\ Input}\right)\times \text{WRS\ Efficiency\ \%}\)
Alapértelmezett WRS Hatékonyság: 90% (\(\text{Integrity} \ge 75\%\)).
3. Elektrolízis és Oxigén-visszanyerés:
\(\text{Output\ }O_{2}=\text{Purified\ }H_{2}O\times 0.888\times \text{Electrolysis\ Integrity\ \%}\)
\(\text{Recovered\ }H_{2}=\text{Purified\ }H_{2}O\times 0.111\times \text{Electrolysis\ Integrity\ \%}\)

3. POWER GRID & ENVIRONMENTAL VARIATION

Az energiatermelés leírása időszeletekre (Nappal = 14 óra, Éjszaka = 10 óra) bomlik le a marsi Solon belül.

Generation & Consumption Balance Matrix

• Solar Array Output Formula:
\(P_{\text{Solar}}=100\text{\ kW}\times \left(1.0-\text{Dust\ Accumulation\ \%}\right)\times \text{Weather\ Multiplier}\)
	• Weather Multiplier: Tiszta idő = 1.0 | Részleges porvihar = 0.4 | Globális porvihar = 0.1
	• Dust Accumulation: +1% passzív porlerakódás minden Sol végén.
• RTG Output:
\(P_{\text{RTG}}=20\text{\ kW}\quad (\text{Konstans, éjjel-nappal, időjárástól független})\)

Battery Bank Simulation (Base Capacity: 500 kWh)

\(\text{Net\ Day\ Power}=\left(P_{\text{Solar}}+P_{\text{RTG}}-P_{\text{Colony\ Consumption}}\right)\times 14\text{ óra}\)
\(\text{Net\ Night\ Power}=\left(P_{\text{RTG}}-P_{\text{Colony\ Consumption}}\right)\times 10\text{ óra}\)
Ha a net éjszakai egyenleg lemeríti a gáttartalékot 0 kWh alá, a Grid Failure Hierarchy azonnal lekapcsolja a laboratóriumokat (SCI), majd a navigációs hálózatot (NAV).

4. ARES ROBOTICS NETWORK (ARN)

A kolónia 200 autonóm robotja négy, szigorúan specializált, 50-50 egységből álló flottára oszlik. A robotok elosztása határozza meg a feladatok fizikai végrehajtásának idejét és sikerét.
                       ┌─────────────────────────┐
                       │   TOTAL ROBOT POOL: 200 │
                       └─────────────────────────┘
                                    │
         ┌───────────────┬──────────┴────┬───────────────┐
         ▼               ▼               ▼               ▼
    NAV Fleet       SCI Fleet       SYS Fleet       COMM Fleet
    (50 Units)      (50 Units)      (50 Units)      (50 Units)

Regional Fleet Specialization Mechanics

1. NAV Fleet (Imani Okafor): Útvonalbiztosítás, topográfiai letapogatás, terepstabilizálás.
	• Különleges hatás: Minden 10 aktív NAV robot 15%-kal csökkenti a felszíni roverek sérülési esélyét a felderítések során.
2. SCI Fleet (Lena Varga): Mélyfúrás, spektrometriai mérések, jéglencse-bányászat.
	• Különleges hatás: Növeli a kitermelt nyersanyagok tisztasági együtthatóját. 20 SCI robot aktív jégbányászatra rendelése +10 kg extra nyersanyagbónuszt ad.
3. SYS Fleet (Marco Bellini): Strukturális javítás, napelem-tisztítás, modulépítés.
	• Különleges hatás: 5 SYS robot kiküldése tisztításra eltávolít 5% porlerakódást a napelemekről (AP költség helyett robot-munkaórát égetve).
4. COMM Fleet (Alex Mercer): Adatfolyam-optimalizálás, hálózati megfigyelés, telepeskoordináció.
	• Különleges hatás: Ha legalább 10 COMM robot belső biztonsági üzemmódon fut, a lázadási index és a Morál passzív bomlása 25%-kal lelassul.

Wear, Friction, and Repair Models for Robots

A robotok nincsenek biztonságban a marsi elemekkel szemben. Minden felszíni munka során amortizációt szenvednek el.
\(\text{Robot\ Chassis\ Degradation\ /\ Sol}=\text{Base\ Wear\ (2\%)}\times \text{Environmental\ Multiplier}\)
• Environmental Multiplier: Tiszta idő = 1.0 | Solar Flare = 3.0 | Porvihar = 5.0
• Robot Failure Point: Ha egy flotta átlagos állapota 50% alá esik, a robotok hatékonysága feleződik. 25% alatt az egységek leállnak. Javításuk flotttánként 1 Sol időt és 20 egység Nyersanyagot igényel.

5. AP & TIME ECONOMY INTEGRATION

A játék két gazdasági erőforrást vet össze a parancsok kiadásakor: a Parancsnoki sávszélességet (AP) és a Robotflotta kapacitást (Robot-Units).

Operational Task Command Requirements (Examples)


Feladat Megnevezése	Szükséges Részleg	Parancsnoki Költség (AP)	Minimális Robotigény	Végrehajtási Idő
Napelemek portalanítása	SYS	1 AP	5 SYS Robot	Azonnali (Következő Sol eleje)
Mélyre hatoló Jégbányászat	SCI / NAV	3 AP	20 SCI + 5 NAV Robot	2 Sol
Lávacsatorna megerősítése	SYS	4 AP	15 SYS Robot	3 Sol
Antennák kalibrálása	COMM	2 AP	10 COMM Robot	1 Sol


6. FAILURE & RECOVERY SIMULATION

Ha egy alrendszer integritása a kritikus határérték alá esik, automatikus vészhelyzeti protokoll lép életbe.

Cascading Failure Rules

• WRS Failure (<25% Integrity): A csövek eltömődnek vagy megrepednek. A szennyvíz tisztítatlanul ömlik a bázis alá. A Vízellátás azonnal adósságba lép. A telepesek Morálja naponta -10 pontot esik.
• Electrolysis Failure (<25% Integrity): Az oxigéntermelés leáll. A bázis vészhelyzeti tartályokra kapcsol. Ha a tartályok 0-ra futnak, a telepesek egészsége körönként 25%-ot zuhan.

Emergency Rescue Mechanics

Ha a robotokat porvihar vagy omlás éri (pl. a Mission 002 vagy Mission 007 agresszív döntései miatt), a játékosnak a következő Sol elején kötelezően el kell indítania egy Mentőakciót.
• Mentőakció költsége: 5 AP + 10 szabad SYS vagy NAV robot zárolása 1 teljes Solra. Ha a játékos nem indítja el az akciót, az elakadt robotflotta véglegesen megsemmisül, csökkentve a részleg maximális kapacitását 50-ről a megmaradt szintre.

7. CAMPAIGN DEADLINE PENALTY ENGINE

Az Act I-VI során elkövetett minden logisztikai vagy építési hiba közvetlenül a játék végső kimenetelét terheli a Marsi Menekült Befogadási Indexen (Mars Evacuation Capacity Index - MECI) keresztül.
                       ┌─────────────────────────┐
                       │     BASE SOL CAPACITY   │
                       │     (500 Sols Total)    │
                       └─────────────────────────┘
                                    │
      ┌─────────────────────────────┴─────────────────────────────┐
      ▼                                                           ▼
[ ON TIME: 100% SUCCESS ]                                   [ Sols Delayed by Repairs ]
• 10,000,000 Lives Saved                                    • -250,000 Lives Per Sol Lost
• UN Colony / Republic Endings                              • Survival Regime / Fragmentation Endings

The Delayed Timeline Algorithm

A játék zárt rendszere fixen rögzíti, hogy az ARES-1 bázisnak melyik Act végére milyen infrastrukturális szintet kell elérnie. Ha a játékos javítások vagy robot-elakadások miatt kicsúszik a Sol-határidőkből:
1. A menekülthajók első hulláma nem tud biztonságosan leszállni a kijelölt Solon, mert a lávacsatorna nincs megerősítve, vagy a WRS nem bírja el a terhelést.
2. MECI Büntetés: Minden egyes Sol késés az Act-határidőkhöz képest 250 000 földi menekült életébe kerül, akik a pályán keringő transzporthajókban halnak meg az oxigén elfogyása miatt.
3. Endgame Módosító: Ez a matematikai veszteség közvetlenül kizárja a pozitív, demokratikus befejezéseket (pl. The United Human Colony), és a játékost kényszerűen a diktatórikus vagy militarista végkifejletek felé tolja (The Survival Regime), mivel a marsi társadalom nem bírja el a káoszt és a veszteség miatti belső bűntudatot.

UI INTEGRATION & SYSTEM HOOKS

A kezelőfelület főképernyőjén a négy Advisor ikonja mellett egy dedikált ARN (Robotics Grid) panel kap helyet. Ez a panel mutatja a szabad/foglalt robotok számát és a flották kopási szintjét. Ha egy parancs kiadásakor a szükséges robotszám nem áll rendelkezésre, a "Execute Command" gomb inaktívvá válik, és felvillan a hiányzó részleg kódja (pl. SYS Robot Shortage).
Az ARES Autonomous Robotics Network mechanikája és a túlélési rendszerek teljes matematikai és gazdasági modellje ezzel véglegesen specifikálásra került. A játék gazdasági és logisztikai motorja készen áll a kódolásra és az elágazások kezelésére.
Hogyan haladjunk tovább az ütemterv szerint?
1. Step 2: Advisor Trust & Rebellion System (A bizalmi rendszer részletes matematikai és aktiválási szabályai, a szabotázsok és önálló részlegakciók mechanikája, valamint a UI adatmanipuláció beépítése)?
2. Step 3: Act I — Discovery Véglegesítése (A teljes 30 Solos küldetéslánc finomhangolása, immár az ARN robotelágazások és a gazdasági bemenetek/kimenetek pontos értékeinek integrálásával)?
