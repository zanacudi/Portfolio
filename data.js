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
    title: "Stratified Soil Infiltration \u2014 Live SWCC Studio",
    description: "Water entering a layered column, with every layer carrying its own soil water characteristic curve and the SWCC itself editable by dragging six nodes. Build one to ten layers, set van Genuchten parameters or paste a measured suction\u2013conductivity table, choose ponded, specified-flux or no-flow at the surface and free drainage, fixed head or no-flow at the vented base, then watch suction, water content and saturation move together on the curve and down the column. Four scenarios are built in, and the one that makes the point best is the capillary barrier: fine soil over coarse holds water up rather than letting it through, because the gradient at the contact opposes gravity until the fine layer is nearly saturated. The solver is implicit, with modified-Picard iteration on the nonlinearity, and you choose the nodes per layer from 1 to 60 rather than being stuck with one cell per layer. A Verify button runs it against two cases whose answers are known exactly \u2014 hydrostatic equilibrium and the unit-gradient profile \u2014 and reports the error it actually made, alongside a mass audit and a refinement check.",
    date: "2026",
    link: "swcc-infiltration-studio.html"
  },
  {
    title: "Critical State Soil Mechanics — Interactive Mind Map",
    description: "The whole framework on one radiant map, drawn to Buzan’s conventions after Rama Rao &amp; Samatha Chowdary, <i>Geotechnical Engineering Through Mind Maps</i> (2019): a central idea, curved branches, one keyword each. A detail slider takes the same map from bare keywords to formulas to full explanations, so it works as a lecture overview and as revision notes. Fifty-eight nodes over three levels. <b>Every equation carries a table of its symbols</b>, each explained in words with its units, and twenty-five ideas carry a drawn sketch — grains climbing over each other to dilate, undrained stress paths turning back or collapsing, pore pressure ratcheting cycle by cycle. Six branches — state, strength, measuring, models, liquefaction, design — and five keywords open a live calculator: fit a state parameter against the critical state line, watch dilatancy lend and then take back peak friction, invert a cone reading for ψ, test a triggering factor of safety, and see what brittleness really measures. Every branch links through to the module that treats it properly.",
    date: "2026",
    link: "csm-mind-map.html"
  },
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

const PUBLICATIONS = [
  {
    title: "Comparative accuracy of photogrammetry for volume measurements in shrinkage limit tests of soils with varying plasticity",
    meta: "Zana J. Taher \u00b7 International Journal of Geotechnical Engineering, 2026, 1\u201311 \u00b7 doi:10.1080/19386362.2026.2759724",
    description: "Tests whether close-range photogrammetry can replace the wax and mercury methods for measuring the volume of a shrinkage-limit specimen, across soils spanning a range of plasticity, and reports where the agreement holds and where it breaks down.",
    tags: ["Journal article", "Unsaturated soils", "Photogrammetry"],
    link: "https://www.tandfonline.com/doi/full/10.1080/19386362.2026.2759724"
  },
  {
    title: "One-dimensional inverse modelling of saturated\u2013unsaturated volume change behaviour of tailings",
    meta: "Zana J. Taher, Joseph Scalia, Christopher A. Bareither \u00b7 International Journal of Geotechnical Engineering, 2024, 18(7\u201310), 788\u2013801 \u00b7 doi:10.1080/19386362.2024.2435447",
    description: "Back-calculates hydraulic and volume-change parameters for tailings from column-test settlement data, so that a single one-dimensional model reproduces behaviour through both saturated and unsaturated states. An interactive companion to this paper is under Tutorials.",
    tags: ["Journal article", "Tailings", "Inverse modelling"],
    link: "https://www.tandfonline.com/doi/abs/10.1080/19386362.2024.2435447"
  },
  {
    title: "Comparative assessment of expansive soil stabilization by commercially available polymers",
    meta: "Zana J. Taher, Joseph Scalia IV, Christopher A. Bareither \u00b7 Transportation Geotechnics, 2020, 24, 100387 \u00b7 doi:10.1016/j.trgeo.2020.100387",
    description: "Measures lime, fly ash and three commercial polymers against the same expansive soil on swell, strength and hydraulic conductivity, and shows that no single treatment wins on all three \u2014 which one looks best depends on what you weight. An interactive companion to this paper is under Tutorials.",
    tags: ["Journal article", "Expansive soils", "Ground improvement"],
    link: "https://www.sciencedirect.com/science/article/abs/pii/S2214391220302750"
  },
  {
    title: "Effectiveness of Polymer for Mitigation of Expansive Soils",
    meta: "Zana Taher \u00b7 Thesis, Colorado State University, 2017",
    description: "The graduate research the Transportation Geotechnics paper grew out of: a laboratory programme on whether commercially available polymers can control swell in expansive soil, and under what conditions the improvement survives wetting and drying.",
    tags: ["Thesis", "Expansive soils"],
    link: "https://www.proquest.com/openview/4aa44a16ea342e78cfa21d1a484276ce/1?pq-origsite=gscholar&cbl=18750"
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
    description: "Continues Module 1 into the field: converting raw CPT channels (qt, fs, u2) into dimensionless resistance and the soil behaviour-type index Ic, inverting for ψ via the book's Qp = k·exp(−mψ) relationship calibrated against 17 real sands, and Chapter 5's real Nerlerk berm case data on how much a single 'characteristic' ψ can hide once you account for how variable state really is in the ground. The ψ profile and characteristic value computed here are what Modules 3 and 4 go on to use.",
    link: "jb-insitu-state-lab.html"
  },
  {
    title: "Jefferies & Been — Soil Liquefaction: A Critical State Approach (2015)",
    meta: "Module 3: Static Liquefaction & Post-Liquefaction Strength — Chapter 6 (+ Chapter 1 case histories)",
    description: "The chapter the whole book builds toward: real flow-failure case histories (Fort Peck 1938, Nerlerk 1983, Aberfan 1966, Merriespruit 1994), why brittleness rather than peak strength is the real hazard, and Bishop's own 1971 laboratory table showing peak strength ratios that look ordinary beside brittleness indices from 10% to 94%. Three sections then run NorSand's published equations live for undrained loading: liquefaction appears with no collapse surface anywhere in the model, an 'instability line' emerges as a by-product of drainage conditions rather than a soil property, and a slope is brought to failure by a rising water table alone — the Aberfan mechanism — with no change in load. Closes with the book's published design function for post-liquefaction residual strength checked against eleven real failures (Table 6.5), why the older steady-state method reads too high, and what 'dense enough' actually means.",
    link: "jb-static-liquefaction-lab.html"
  },
  {
    title: "Jefferies & Been — Soil Liquefaction: A Critical State Approach (2015)",
    meta: "Module 4: Cyclic Liquefaction, and From Theory to Design Practice — Chapters 7 & 9",
    description: "Completes the Jefferies & Been series. Chapter 7's classical Seed/Berkeley School framework — CRR drawn through case histories, scaled by magnitude through Fig. 7.32’s five points — then the book's state-parameter reinterpretation, which shows the Kσ stress correction is not merely approximate but algebraically redundant: work in ψ and the void ratio cancels, leaving Kσ = exp(−9·λ₁₀·log₁₀(p′/p′ref)) — a function of the critical state line and the stress ratio alone, not of density at all. Eq. 7.5's CRR–ψ boundary is checked against 20 real Class A records, and Kα gets a section on why the book declines to tabulate it. Closes with a working project tool: load your own triaxial tests and CPT and the page fits a critical state line, inverts for ψ at every depth, takes a characteristic ψk at your percentile, and returns CSR, CRR and a factor of safety with depth, then exports a four-sheet Excel workbook whose every derived column is a live formula, so a reviewer can audit it without this site. Files are read in your browser and never uploaded.",
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

const MISC = [
  {
    title: "How Food Affects the Brain",
    meta: "A seven-day eating plan, and what the evidence actually supports",
    description: "An illustrated week of meals built around the foods that keep appearing in cognitive-health research — oily fish, berries, leafy greens, nuts, legumes and fermented foods — with the reasoning behind each one, a per-day shopping list, and meat-free alternatives throughout. Deliberately careful about the evidence: the mechanisms that are well established are separated from the gut–brain research that is still developing, and nothing is presented as preventing or treating any condition.",
    tags: ["Nutrition", "Interactive"],
    link: "brain-healthy-diet.html"
  },
  {
    title: "Seismoplot",
    meta: "Acceleration time histories in, intensity measures and spectra out",
    description: "Load a recorded acceleration time history as Excel or CSV and work it up in the browser: baseline correction by mean removal or linear, quadratic and cubic detrending, an optional zero-phase high-pass filter, and integration to velocity and displacement. It returns the elastic response spectra at a damping ratio you choose, solved by Newmark-beta over a logarithmic period range; the Fourier amplitude spectrum and power spectral density; and the intensity measures a report usually asks for \u2014 PGA, PGV, PGD, Arias intensity, CAV and CAV5, significant durations D5\u201375 and D5\u201395, and bracketed duration above 0.05g. Everything exports to a four-sheet Excel workbook or to CSV. The page is deliberately blunt about the fact that baseline correction and filtering change PGV, PGD and the long-period end of the spectrum, and shows the raw trace against the corrected one so you can see what the processing did.",
    tags: ["Earthquake", "Signal processing", "Interactive"],
    link: "seismoplot.html"
  },
  // Access-code tools: names only, stacked in one card. What they do is shown inside each page, after the code.
  { group: [
    { title: "Tomar", link: "tomarkar.html" },
    { title: "Paywandi", link: "paywandi.html" }
  ] }
];

const CONTACT = [
  { label: "Email", href: "mailto:zanacudi@gmail.com" },
  { label: "Phone", href: "tel:+13035207197" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zanat/" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=_UwpVEkAAAAJ&hl=en&oi=ao" },
  { label: "YouTube", href: "https://www.youtube.com/@zanajtaher" }
];
