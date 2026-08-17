// Edit these arrays to add/update content. No HTML knowledge needed —
// just add a new object to the relevant array and the page updates itself.

const EDUCATION = [
  {
    title: "PhD in Civil Engineering (Geotechnical)",
    meta: "Colorado State University · 08/2017 — Present · GPA 4.000/4.000",
    description: "Current research: fluid flow and volume change of filtered tailings using sensors. First journal paper published (conceptual); second in progress (experimental)."
  },
  {
    title: "MSc in Civil Engineering (Geotechnical)",
    meta: "Colorado State University · 08/2015 — 08/2017 · GPA 3.727/4.000",
    description: "Thesis research on the effectiveness of polymer in reducing swelling of expansive soils. Published a thesis and a journal paper."
  },
  {
    title: "BSc in Civil Engineering",
    meta: "University of Sulaimani, Kurdistan/Iraq · 11/2008 — 07/2012 · GPA 81.46%",
    description: "Coursework in geotechnical and foundation engineering. Developed and published software for concrete formwork design."
  }
];

const RESUME = [
  {
    title: "Geotechnical Engineer — AECOM",
    meta: "05/2020 – 10/2022 & 07/2024 – Present",
    description: "Fieldwork including CPT sounding, piezometer installation, drilling, and borehole logging. Numerical modeling (SLOPE/W, PLAXIS, FLAC, UTEXAS, QUAD4) for tailings and hydraulic dams, covering geometry development, material characterization, slope stability, site response, and deformation analysis. Professional plotting, calculation packages, and reports."
  },
  {
    title: "Research & Teaching Assistant — Colorado State University",
    meta: "01/2017 – Present",
    description: "Teaching assistant for undergraduate geotechnical course and lab, Civil Engineering Department. Research assistant on expansive soils mitigation and tailings."
  },
  {
    title: "Independent International Geotechnical Tutor",
    meta: "University of Sulaimani & Kuwait University · 03/2023 – 07/2024",
    description: "Tutoring in Engineering Mechanics (Statics & Dynamics) and Advanced Geotechnical Engineering."
  },
  {
    title: "University Lecturer — Tishk International University",
    meta: "03/2023 – 06/2023",
    description: "Lectured Advanced Calculus II."
  },
  {
    title: "Engineering Intern — City of Fort Collins, CO",
    meta: "06/2016 – 11/2016",
    description: "Engineering/Surveying Department: field and Civil 3D work."
  },
  {
    title: "Civil Engineer & Designer — Lava Company, Sulaymaniyah",
    meta: "08/2013 – 02/2014",
    description: "Designed water supply, sewerage, and road infrastructure with Civil 3D for 2.5+ hectares in Bakrajo Quarter. Construction engineer, manager, and contractor engineer."
  },
  {
    title: "Teaching Assistant — University of Sulaimani",
    meta: "10/2012 – 12/2014",
    description: "Engineering Highway/Practical and Surveying; Engineering Computer Software (Excel, Visual Basic, AutoCAD)."
  }
];

const PROJECTS = [
  {
    title: "Fluid Flow & Volume Change of Filtered Tailings",
    description: "Current PhD research using sensors to study fluid flow and volume change behavior of filtered tailings. Published: Taher, Scalia & Bareither (2024), \"One-dimensional inverse modelling of saturated-unsaturated volume change behaviour of tailings,\" Int. J. Geotechnical Engineering. Second (experimental) journal paper underway.",
    tags: ["PhD Research", "Tailings", "Sensors"],
    link: "inverse-modelling-tailings-lab.html"
  },
  {
    title: "Polymer Treatment of Expansive Soils",
    description: "MSc thesis investigating the effectiveness of polymer treatment in reducing swelling of expansive soils. Published: Taher, Scalia & Bareither (2020), \"Comparative assessment of expansive soil stabilization by commercially available polymers,\" Transportation Geotechnics.",
    tags: ["MSc Thesis", "Expansive Soils"],
    link: "polymer-stabilization-lab.html"
  },
  {
    title: "IoT-Based Soil Seepage & Deformation Experiment",
    description: "Designed an advanced IoT-based soil experiment to monitor seepage and deformation in soils.",
    tags: ["IoT", "Instrumentation"],
    link: ""
  },
  {
    title: "Concrete Formwork Design Software",
    description: "Developed an 8,000-line Visual Basic 6 application to automate concrete formwork design calculations (deck/joist/stringer/shore and stud/wale/tie spacing), published on academia.edu. This browser version reimplements the same design equations.",
    tags: ["Software", "Automation"],
    link: "formwork-design-calculator.html"
  }
];

const TUTORIALS = [
  {
    title: "Expansive Soil Stabilization — Interactive Companion",
    description: "Interactive companion to Taher, Scalia & Bareither (2020, Transportation Geotechnics). Explore real Table 1/2 data comparing lime, fly ash, and polymer treatment of expansive soil, then build your own priority weighting across swell mitigation, strength, and permeability to see why there's no single \"best\" treatment.",
    date: "2026",
    link: "polymer-stabilization-lab.html"
  },
  {
    title: "Inverse Modelling of Tailings Volume Change — Interactive Companion",
    description: "Interactive companion to Taher, Scalia & Bareither (2024, Int. J. Geotechnical Engineering). Drag sliders for hydraulic conductivity parameters C and D to fit a predicted settlement curve to synthetic column-test data, then compare against the paper's actual back-calculated values — reproducing the paper's inverse-modelling exercise in the browser.",
    date: "2026",
    link: "inverse-modelling-tailings-lab.html"
  },
  {
    title: "Large-Strain Consolidation Data Assimilation Lab",
    description: "Interactive browser-based lab exploring Ensemble Kalman Filter (EnKF) data assimilation on a synthetic large-strain consolidation column — step through initializing, loading, measuring, assimilating, and forecasting settlement, pore pressure, and constitutive parameters.",
    date: "2026",
    link: "consolidation-enkf-lab.html"
  },
  {
    title: "Engineering Mechanics: Statics & Dynamics",
    description: "Independent tutoring for engineering students at University of Sulaimani and Kuwait University.",
    date: "2023 – 2024",
    link: ""
  },
  {
    title: "Advanced Geotechnical Engineering",
    description: "International tutoring on advanced geotechnical engineering topics.",
    date: "2023 – 2024",
    link: ""
  },
  {
    title: "Advanced Calculus II",
    description: "Lectured at Tishk International University.",
    date: "2023",
    link: ""
  },
  {
    title: "Geotechnical Engineering — Facebook Page",
    description: "Admin of a public geotechnical engineering education page with 12,000+ followers.",
    date: "Ongoing",
    link: ""
  }
];

const LITREVIEW = [
  {
    title: "Jefferies & Been — Soil Liquefaction: A Critical State Approach (2015)",
    meta: "Module 1: The Critical State Framework — Chapters 1–3",
    description: "Interactive companion to the standard graduate/professional reference on critical-state liquefaction assessment. Module 1 covers the critical state line and state parameter ψ using real properties for 17 sands and tailings (Table 2.1), the stress–dilatancy strength framework (Dmin = χψ), and a full drained-triaxial NorSand constitutive model simulator built directly from the book's governing equations (Table 3.1).",
    link: "jb-critical-state-lab.html"
  },
  {
    title: "Jefferies & Been — Soil Liquefaction: A Critical State Approach (2015)",
    meta: "Module 2: In-Situ State from the CPT, and How Variable It Really Is — Chapters 4–5",
    description: "Continues Module 1 into the field: converting raw CPT channels (qt, fs, u2) into dimensionless resistance and the soil behaviour-type index Ic, inverting for ψ via the book's Qp = k·exp(−mψ) relationship calibrated against 17 real sands, and Chapter 5's real Nerlerk berm case data on how much a single 'characteristic' ψ can hide once you account for how variable state really is in the ground. More modules (static & cyclic liquefaction triggering, practical design workflow) planned.",
    link: "jb-insitu-state-lab.html"
  },
  {
    title: "Jefferies & Been — Soil Liquefaction: A Critical State Approach (2015)",
    meta: "Module 3: Static Liquefaction & Post-Liquefaction Strength — Chapter 6 (+ Chapter 1 case histories)",
    description: "The chapter the whole book builds toward: real flow-failure case histories (Fort Peck 1938, Nerlerk 1983, Aberfan 1966, Merriespruit 1994), why brittleness rather than peak strength is the real hazard, why the traditional 'collapse surface' picture doesn't match the evidence, and an interactive rebuild of the book's own published design function for post-liquefaction residual strength — checked directly against real published case-history data (Table 6.5) including Nerlerk and Fort Peck.",
    link: "jb-static-liquefaction-lab.html"
  },
  {
    title: "Jefferies & Been — Soil Liquefaction: A Critical State Approach (2015)",
    meta: "Module 4: Cyclic Liquefaction, and From Theory to Design Practice — Chapters 7 & 9",
    description: "Completes the Jefferies & Been series: the classical Seed/Berkeley School CRR-magnitude-scaling framework, the book's own state-parameter reinterpretation that shows why the widely-used Kσ stress correction is redundant once you work in ψ directly (checked against 20 real Class A case-history records), and a project-design tool combining the book's CRR–ψ trend-fitting approach with earthquake magnitude scaling.",
    link: "jb-cyclic-liquefaction-lab.html"
  },
  {
    title: "Robertson & Cabal — Guide to Cone Penetration Testing, 7th Edition (2022)",
    meta: "Soil behaviour type, state parameter, friction angle, OCR, relative density & undrained strength from CPT",
    description: "The industry-standard CPT field reference (Gregg Drilling), as a companion to the Jefferies & Been CPT module: the Ic soil behaviour-type index and SBTn zone classification, Robertson's own direct ψ–Qtn,cs and friction-angle correlations (cross-checked algebraically against the Jefferies & Been ψ–friction-angle link — they turn out to be exactly equivalent), and everyday design correlations for overconsolidation ratio, relative density, and undrained shear strength, all computed live from the same raw qt/fs CPT readings.",
    link: "cpt-guide-lab.html"
  },
  {
    title: "Boulanger & Ziotopoulou — PM4Sand (Version 3.1), UCD/CGM-17-01 (2017, rev. 2018)",
    meta: "Sand plasticity model for FLAC/PLAXIS liquefaction-deformation analysis",
    description: "The standard bounding-surface constitutive model for liquefaction-deformation analysis, as a calibration companion: the relative state parameter index ξR and its Bolton-based critical state line, how the bounding and dilatancy surfaces (Mb, Md) set peak and phase-transformation friction angles, the SPT/CPT/Vs correlations used to estimate the model's three primary parameters (DR, Go, hpo) in practice, and live calculators for the five secondary parameters whose defaults are themselves functions of DR.",
    link: "pm4sand-lab.html"
  },
  {
    title: "Boulanger & Ziotopoulou — PM4Silt (Version 1), UCD/CGM-18-01 (2018)",
    meta: "Silt/clay plasticity model — companion to PM4Sand, using the classic state parameter ψ",
    description: "The low-plasticity-silt sibling of PM4Sand: positions the critical state line directly from an input undrained shear strength (su,cs,eq) rather than relative density, and uses the same Been & Jefferies state parameter ψ found throughout the Jefferies & Been modules. Covers the su,cs,eq → post-shaking strength relationship, the model's steeper G(p′) stress-dependence, the ψ-based bounding/dilatancy surfaces, and the report's own explicit rule of thumb for estimating a target cyclic resistance ratio from strength ratio.",
    link: "pm4silt-lab.html"
  }
];

const CONTACT = [
  { label: "Email", href: "mailto:zanacudi@gmail.com" },
  { label: "Phone", href: "tel:+13035207197" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zanat/" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=_UwpVEkAAAAJ&hl=en&oi=ao" },
  { label: "YouTube", href: "https://www.youtube.com/@zanajtaher" }
];
