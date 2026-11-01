
ARES MISSION 2051 — Systems & Gameplay Design Document

Document ID: ARES_2051_SURVIVAL_SYSTEMS_AND_AP_FRAMEWORK.md
Status: Core Gameplay Specification
Target Architecture: NAV, SCI, SYS, COMM Integrated Core

1. THE CORE ENGINE: AP & SOL MECHANICS

The game's loop operates on a discrete time-step engine where 1 Sol (Martian Day) constitutes one full turn. Time progressing is a non-linear resource expenditure framework driven by Action Points (AP).
       [ MORALE / HEALTH ]
                │
                ▼
┌───────────────────────────────┐
│     BASE SOL CAPACITY         │ ───► Modified by Infrastructure State
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│    DEPARTMENTAL TRUST EXAM    │ ───► Low Trust ( < 35 ) = Friction Tax (+1 AP / Action)
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│    NET AVAILABLE SOL AP       │
└───────────────────────────────┘

AP Capacity & Generation Model

Every Sol begins with a Base AP Generation of 10 AP. This represents the baseline cognitive and physical bandwidth of the Command Staff.
The total pool is dynamically scaled at the start of each Sol based on three layers:
\(\text{Net\ Sol\ AP}=\text{Base\ AP\ (10)}+\text{Infrastructure\ Modifiers}-\text{Friction\ Taxes}-\text{Environmental\ Penalties}\)

AP Modifiers & Friction Architecture


Morale & Health Bottlenecks

• Critical Deprivation: If Morale drops below 30% OR life support falls into Oxygen/Water debt, the Base AP is reduced to 6 AP due to physiological and psychological exhaustion.

Departmental Friction Tax

• Each of the four departments (NAV, SCI, SYS, COMM) requires coordination.
• If a Department’s Trust metric drops below 35%, that department enters a state of Passive Non-Cooperation.
• Any command executed within that department’s UI sub-menu or associated mission line costs +1 AP extra (Friction Tax). This tax stacks if multiple departments are alienated.

Environmental Disruptions

• Active surface anomalies (e.g., Radiation Spikes, Dust Storms) inflict a global penalty of -2 to -4 AP per Sol if any tasks are attempted on the Martian surface.

2. SURVIVAL SYSTEMS: PHYSICAL CLOSED-LOOP INFRASTRUCTURE

The survival loop of ARES-1 is an interdependent, multi-stage physical simulation. Resources are not generated out of nothing; they flow through a rigid, conservation-of-mass chemical loop.
                   ┌───────────────────────────────────────┐
                   │          Atmospheric Intake           │
                   └───────────────────────────────────────┘
                                       │ (CO2)
                                       ▼
┌───────────────────┐  (H2)   ┌───────────────────┐  (CH4)   ┌───────────────────┐
│ External Ice Mine │ ──────► │ Sabatier Reactor  │ ──────►  │ Fuel Storage / Vent│
└───────────────────┘         └───────────────────┘          └───────────────────┘
          │                             │
          │ (H2O)                       │ (H2O)
          ▼                             ▼
┌──────────────────────────────────────────────────────────┐
│                 Water Recovery System (WRS)              │
└──────────────────────────────────────────────────────────┘
                                │
                                │ (Purified H2O)
                                ▼
┌──────────────────────────────────────────────────────────┐
│                     Electrolysis Unit                    │
└──────────────────────────────────────────────────────────┘
                                │
                                ├──────────────────────────┐
                                ▼                          ▼
                      ┌───────────────────┐      ┌───────────────────┐
                      │  Oxygen Storage   │      │ Hydrogen Recycle  │
                      └───────────────────┘      └───────────────────┘

Chemical Loop Equations & Operational Balance


Stage 1: Carbon Dioxide & Hydrogen Processing (Sabatier Reactor)

The Sabatier Reactor inputs raw atmospheric Carbon Dioxide (\(CO_{2}\)) captured by the environmental intakes and Hydrogen (\(H_{2}\)) to produce Methane (\(CH_{4}\)) and Water (\(H_{2}O\)):
\(CO_{2}+4H_{2}\xrightarrow{\text{Sabatier\ Catalyst}}CH_{4}+2H_{2}O\)
• System Impact: The Methane (\(CH_{4}\)) is either stored for surface operations or safely vented. The generated Water (\(H_{2}O\)) is fed directly into the WRS input queue.

Stage 2: Purification (Water Recovery System - WRS)

The WRS aggregates unpurified water from the Sabatier output, wastewater from the habitats, and raw melted Martian regolith ice.
\(\text{Gross\ Input\ }H_{2}O\times \text{WRS\ Efficiency\ \%}=\text{Purified\ }H_{2}O\)
• System Impact: A higher efficiency percentage reduces the mass of water lost to irrecoverable toxic sludge during processing.

Stage 3: Life Support Generation (Electrolysis Unit)

Purified water from the WRS is split using electrical energy to yield breathable Oxygen (\(O_{2}\)) and recover Hydrogen (\(H_{2}\)):
\(2H_{2}O\xrightarrow{\text{Electrolysis}}2H_{2}+O_{2}\)
• System Impact: The Oxygen (\(O_{2}\)) feeds the habitat life support systems. The recovered Hydrogen (\(H_{2}\)) is piped back into the Sabatier Reactor to maintain the loop, minimizing the need for new Hydrogen extraction from raw ice.

Base Resource Values (Per 100 Colonists / Sol)


System Component	Resource Input	Resource Output	Base Power Cost	Base AP Maintenance
Sabatier Reactor	44 kg \(CO_{2}\) + 8 kg \(H_{2}\)	16 kg \(CH_{4}\) + 36 kg \(H_{2}O\)	15 kW	1 AP / Sol
WRS Unit	40 kg Wastewater	36 kg Purified \(H_{2}O\) (90% Base Eff.)	10 kW	1 AP / Sol
Electrolysis Unit	36 kg Purified \(H_{2}O\)	32 kg \(O_{2}\) + 4 kg \(H_{2}\)	25 kW	1 AP / Sol
External Ice Mine	N/A	50 kg Raw \(H_{2}O\) Ice	30 kW	3 AP / Harvest


3. POWER GRID & ENERGY ARCHITECTURE

The colony's infrastructure requires constant power synchronization. Energy is managed through generation sources, storage banks, and priority grids.

Generation Sources

• Solar Array Fields: High yield during clear peak hours (+100 kW Base). Zero yield at night. Yield degrades permanently due to dust accumulation (-1% per Sol, cleared via 2 AP EVA maintenance) and drops by up to 90% during global Dust Storms.
• Radioisotope Thermoelectric Generators (RTGs): Constant, unchanging baseline power (+20 kW Stable). Unaffected by night, storms, or dust.

Storage Grid (Battery Banks)

• Excess power generated during peak solar hours automatically charges the battery banks.
• Capacity: Base battery banks hold 500 kWh.
• Drain Phase: During the night cycle, the entire colony draws from the batteries. If batteries hit 0 kWh before dawn, a Grid Collapse occurs.

Grid Failure Hierarchy

If power consumption exceeds production and storage drops to 0, the system automatically shuts down infrastructure down the following priority ladder until stability is reached:
1. SCI (Laboratories & Sensor Arrays): Scientific research halts; data generation freezes.
2. NAV (Comms/Radar & Drone Terminals): Surface rovers cannot be guided; no new map data.
3. SYS (Sabatier & WRS): The physical loop stops. The colony relies exclusively on pressurized reserves.
4. CRITICAL LIFE SUPPORT (Habitat Heating & Oxygen Circulation): If unpowered for more than 12 hours, Colonist Health drops by 25% per Sol. Morale drops by 30% per Sol.

4. DEGRADATION, ANOMALIES, AND LONG-TERM RADIATION


Degradation & Wear Metrics

Every operational piece of infrastructure possesses a Condition Integrity Metric (100% to 0%).
• Passive Wear: Running a system under standard parameters reduces its Integrity by 2% per Sol.
• Overclocking: Running a system at 150% capacity doubles output but inflicts 8% Integrity degradation per Sol.
• Malfunction Thresholds:
	• At <75% Integrity: System efficiency drops by 15% (e.g., WRS loses water mass).
	• At <50% Integrity: A system failure risk rolls at the start of every Sol (20% chance of emergency shutdown).
	• At <25% Integrity: The system suffers a critical failure, venting inputs and halting completely until repaired.

Long-Term Surface Radiation Architecture

Radiation on the Martian surface is not a temporary encounter; it is a persistent, structural game mechanic.
┌──────────────────────────────────────────────────────────┐
│                   Surface Radiation Level                │
└──────────────────────────────────────────────────────────┘
                            │
                            ├──────────────────────────────┐
                            ▼                              ▼
              ┌───────────────────────────┐  ┌───────────────────────────┐
              │     Lava-Tube Habitat     │  │   Surface Living Modules  │
              │  (95% Shielding Baseline) │  │  (30% Shielding Baseline) │
              └───────────────────────────┘  └───────────────────────────┘
                            │                              │
                            ▼                              ▼
              ┌───────────────────────────┐  ┌───────────────────────────┐
              │ Safe Long-Term Operations │  │ Accumulating Dose Metric  │
              └───────────────────────────┘  └───────────────────────────┘
                                                           │
                                                           ▼
                                             ┌───────────────────────────┐
                                             │ Degradation Penalties     │
                                             │ • Morale Decay            │
                                             │ • Operational Efficiency  │
                                             │ • AP Surcharges           │
                                             └───────────────────────────┘

Ambient Surface State

The surface radiation level fluctuates between 20 mSv/year (Baseline) and 5000 mSv/year (Solar Particle Events).

Structural Shielding

• Surface Living Modules: Offer 30% radiation shielding. Exposure inside these structures slowly accumulates over Sols, causing baseline Morale decay and increasing human medical emergencies.
• Lava-Tube Sub-surface Habitats: Offer 95% radiation shielding. Moving living quarters under the regolith neutralizes ambient radiation risks.

Surface Operations (EVA) Surcharges

Every action executed on the surface (mining, solar cleaning, scouting) exposes crew members. If the background radiation is high due to a recent solar flare, performing an EVA incurs a permanent AP surcharge (+2 AP per action) because crews must execute extensive decontamination, suit checks, and medical screens.

5. RECONCILIATION WITH THE "INVISIBLE CONSEQUENCE" PRINCIPLE

To uphold the Choice-Driven Narrative Adventure standard, systemic variables are deeply tied to narrative state flags rather than simple, predictable resource adjustments.
                                  ┌─────────────────────────┐
                                  │ PLAYER CHOICE (Sol 5)   │
                                  └─────────────────────────┘
                                               │
                                               ▼
                              ┌───────────────────────────────────┐
                              │  Systemic Variable Adjusted       │
                              │  (e.g., Corrosive Methane Vented) │
                              └───────────────────────────────────┘
                                               │
                                               ▼
                              ┌───────────────────────────────────┐
                              │     Invisible State Flag Set      │
                              │     "Delta_Ridge_Contaminated"    │
                              └───────────────────────────────────┘
                                               │
                                               ▼
       ( 40 Sols Later... )                    │
 ──────────────────────────────────────────────┼──────────────────────────────────────────────
                                               ▼
                              ┌───────────────────────────────────┐
                              │       Trigger System Check        │
                              └───────────────────────────────────┘
                                               │
                         ┌─────────────────────┴─────────────────────┐
                         ▼                                           ▼
            [ Flag = TRUE ]                             [ Flag = FALSE ]
  ┌───────────────────────────────────┐               ┌───────────────────────────────────┐
  │ Event Triggered:                  │               │ Event Triggered:                  │
  │ Regolith Drill Failure            │               │ Safe Geological Harvest           │
  │ (WRS Filter Damaged, -30% Eff)    │               │ (+40 kg Pure Water)               │
  └───────────────────────────────────┘               └───────────────────────────────────┘

The Delayed Consequence Pipeline

1. The Choice: The player makes a choice to bypass a safety protocol to save 3 AP on Sol 5 (e.g., venting corrosive methane into an unmapped cave system to keep the Sabatier running).
2. The Invisible Flag: The game engine registers zero immediate negative feedback. It adjusts no immediate UI resource numbers down. Instead, it sets an internal boolean state flag: Sabatier_Corrosive_Vent = TRUE.
3. The Silent Incubation: Sols pass normally. The player believes the risk was avoided.
4. The Trigger Event: On Sol 45, the player commands an expansion task to connect the WRS lines to a new sub-surface ice deposit located near that cave system.
5. The Payback: The game engine checks the flag. Because Sabatier_Corrosive_Vent == TRUE, the ice deposit is found to be acidic. The WRS filters are instantly corroded from within, causing an unexpected, catastrophic 30% drop in efficiency, requiring a major narrative emergency mission and a 6 AP repair cost to fix.

Game State Variable Matrix

The system tracks these invisible metrics underneath the primary resource UI:
• Structural_Micro_Fractures (Integer 0-100): Tracks shortcut structural decisions. Triggers random blowout events when pressure increases in late-game acts.
• Crew_Subversion_Index (Float 0.0-1.0): Multiplier on how likely a department is to hide system malfunctions from the Commander based on low trust. High subversion means the player won't receive warnings about system degradation until the system completely fails.
The foundational physics, resource loops, power architecture, and invisible decision frameworks for ARES MISSION 2051 are now mathematically established.
To progress down our design roadmap, should we move to:
1. Step 2: Advisor Character Profiles (Defining the psychology, personal arcs, and hidden agendas of Marco Bellini, Lena Varga, Imani Okafor, and Alex Mercer)?
2. Step 3: Act I — Discovery Finalization (Fleshing out the complete 30 Sol progression using these newly defined survival systems)?
