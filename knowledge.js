/**
 * knowledge.js — Structured knowledge base for client-side RAG
 * Each chunk has: id, category, keywords[], content, metadata{}
 * Updated with detailed paper abstracts from uploaded PDFs
 */

const KNOWLEDGE_BASE = [
  // ===== IDENTITY & CONTACT =====
  {
    id: "bio-1",
    category: "bio",
    keywords: ["who", "about", "abhishek", "sose", "name", "introduce", "background", "summary"],
    content: "Abhishek Tejrao Sose is a Postdoctoral Researcher at the University of Maryland, College Park. He is a computational–experimental materials scientist specializing in AI-enabled, autonomous materials discovery, spanning molecular simulations to robot-assisted synthesis. He has expertise in MD, DFT/AIMD, machine learning, and machine-learned interatomic potentials (MLIPs), with a strong focus on Bayesian uncertainty quantification and closed-loop optimization.",
    metadata: { priority: 10 }
  },
  {
    id: "contact-1",
    category: "contact",
    keywords: ["contact", "email", "reach", "phone", "address", "collaborate", "collaboration", "hire", "hiring"],
    content: "You can reach Abhishek at atsose@umd.edu. He is based in Washington, DC (450 Massachusetts Ave NW). His LinkedIn is linkedin.com/in/abhisheksose, Google Scholar profile is available at scholar.google.ca (user: PnaArzMAAAAJ), GitHub: github.com/abhishek-t-sose, and ORCID: 0000-0002-0001-6999. Phone: +1-540-449-8235.",
    metadata: { priority: 9 }
  },
  {
    id: "location-1",
    category: "contact",
    keywords: ["where", "live", "location", "based", "city", "state", "country", "washington", "dc", "maryland"],
    content: "Abhishek currently lives in Washington, DC (450 Massachusetts Ave NW, Apt 1008, Washington, DC 20001). He works at the University of Maryland, College Park, MD.",
    metadata: { priority: 9 }
  },

  // ===== EDUCATION =====
  {
    id: "edu-1",
    category: "education",
    keywords: ["education", "degree", "phd", "doctoral", "study", "university", "school", "virginia", "tech"],
    content: "Abhishek earned his Ph.D. in Chemical Engineering from Virginia Tech (2018-2023) under the supervision of Dr. Sanket A. Deshmukh, in the Computational Design of Hybrid Materials Group. His thesis was titled 'Advancing Computational Material Design & Model Development Using Data-Driven Approaches.'",
    metadata: { priority: 8 }
  },
  {
    id: "edu-2",
    category: "education",
    keywords: ["undergraduate", "bachelors", "btech", "iit", "bombay", "india", "electrical"],
    content: "Abhishek completed his B.Tech. in Chemical Engineering with a Minor in Electrical Engineering from the Indian Institute of Technology (IIT) Bombay, Mumbai, India (2013-2017).",
    metadata: { priority: 8 }
  },

  // ===== CURRENT RESEARCH =====
  {
    id: "research-current-1",
    category: "research",
    keywords: ["current", "work", "now", "research", "postdoc", "umd", "maryland", "aerogel", "po-yen", "chen", "biomaterial", "sustainable"],
    content: "At the University of Maryland (2025-present), Abhishek works with Prof. Po-Yen Chen on accelerated development of bio-materials with multi-property tuning via ML/AI and modeling. He is developing AI-guided, self-driving laboratory workflows for the predictive design and synthesis of composite aerogels. This includes optimizing aerogel composition (Montmorillonite, Carbon nanofibers, SiO2 nanofibers, Carboxymethylcellulose) using Support Vector Regressor, Generative AI (U-Net), and Finite Element Methods for thermal, acoustic, and mechanical property prediction.",
    metadata: { priority: 10 }
  },
  {
    id: "research-current-2",
    category: "research",
    keywords: ["self-driving", "lab", "robot", "autonomous", "automation", "plastic", "substitutes", "natural"],
    content: "Abhishek is co-developing a robotics and machine learning integrated workflow for discovering all-natural plastic substitutes. This work integrates AI-ML driven robotic experiments with computational screening to close the loop between virtual discovery and physical synthesis. This paper is under review at Nature Protocols (2026).",
    metadata: { priority: 9 }
  },

  // ===== GEORGIA TECH =====
  {
    id: "research-gt-1",
    category: "research",
    keywords: ["georgia", "tech", "ramprasad", "polymer", "lithium", "ion", "conductivity", "active", "learning"],
    content: "At Georgia Tech (2024-2025), Abhishek worked with Prof. Rampi Ramprasad on leveraging AI and simulations for accelerated polymer discovery. Key projects included: (1) Designing polymers for Li-ion conductivity using MD, MLFFs, and ML-DFT with 6,042 MD-simulated and 170 experimental polymers; (2) Developing Machine Learning Force Fields (MLIPs) benchmarking DeepMD-kit against Allegro and SO3LR achieving ~250x improved stability; (3) LLM-based data extraction from ~2.4 million articles using LLaMA and GPT-4.0; (4) NEMD simulations for gas and solvent diffusion in 14 polymeric materials.",
    metadata: { priority: 8 }
  },
  {
    id: "research-gt-2",
    category: "research",
    keywords: ["llm", "large", "language", "model", "gpt", "llama", "extraction", "nlp", "text", "mining", "polymer", "genome"],
    content: "At Georgia Tech, Abhishek utilized LLaMA and GPT-4.0 to extract polymer mechanical properties (Tensile strength, Young's Modulus, Elongation at break) from ~2.4 million full-text articles. He applied Polymer Genome (PG) fingerprinting to develop ML predictive models and developed In-context Learned (ICL) and Finetuned models of GPT-3.5 and LLaMA for green solvent prediction.",
    metadata: { priority: 8 }
  },

  // ===== RESEARCH INTERESTS =====
  {
    id: "interest-1",
    category: "interests",
    keywords: ["interest", "generative", "ai", "llm", "rag", "agent", "retrieval", "augmented"],
    content: "Abhishek's research interests include Generative AI for Science — fine-tuning Large Language Models (LLMs), building AI agents, and Retrieval Augmented Generation (RAG) for accelerated scientific discovery.",
    metadata: { priority: 7 }
  },
  {
    id: "interest-2",
    category: "interests",
    keywords: ["interest", "force", "field", "forcefield", "coarse", "grained", "protein", "structure", "prediction", "mlip", "machine", "learning", "potential"],
    content: "Abhishek works on development of Machine Learning Force Fields (MLIPs) and Coarse-Grained MD Force Fields. He has developed BUQ-driven MLIPs that incorporate uncertainty awareness, and benchmarked various neural network architectures for polymer simulations.",
    metadata: { priority: 7 }
  },
  {
    id: "interest-3",
    category: "interests",
    keywords: ["interest", "bayesian", "uncertainty", "quantification", "buq", "gcmc", "monte", "carlo", "sampling"],
    content: "Abhishek has deep expertise in Bayesian Uncertainty Quantification (BUQ) for molecular dynamics force fields. He developed a BUQ framework to enhance MD model accuracy and evaluated different sampling algorithms (published in JCTC 2024). He also works with Grand Canonical Monte Carlo (GCMC) methods for materials discovery.",
    metadata: { priority: 7 }
  },
  {
    id: "interest-4",
    category: "interests",
    keywords: ["interest", "dft", "density", "functional", "theory", "aimd", "ab", "initio", "multi", "scale", "quantum"],
    content: "Abhishek's multi-scale modeling expertise spans Density Functional Theory (DFT) and Ab-Initio Molecular Dynamics (AIMD) for materials design. He has trained MLIPs using AIMD simulations across 100K-2,500K temperature ranges.",
    metadata: { priority: 7 }
  },

  // ===== ENRICHED PUBLICATIONS =====
  {
    id: "pub-0",
    category: "publications",
    keywords: ["thermal", "shock", "catalyst", "nature", "review", "materials", "hu", "liangbing"],
    content: "Publication (Submitted 2026): 'Thermal-shock catalysts: principles, materials design, and catalytic performance' — T Li, F Bu, AT Sose, Z Cakir, K Zeng, AH Brozena, H Yang, C Wang, J Greeley, PY Chen, L Hu — Nature Review Materials (Submitted).",
    metadata: { priority: 6, year: 2026, journal: "Nature Review Materials" }
  },
  {
    id: "pub-1",
    category: "publications",
    keywords: ["robot", "plastic", "substitutes", "natural", "nature", "protocol", "li", "chen"],
    content: "Publication (Under Review 2026): 'A robotics and machine learning integrated workflow for discovering all-natural plastic substitutes' — Y Li*, AT Sose* (co-first author), T Chen, PY Chen — Nature Protocols.",
    metadata: { priority: 6, year: 2026, journal: "Nature Protocols" }
  },
  {
    id: "pub-2",
    category: "publications",
    keywords: ["bayesian", "coarse", "grained", "eam", "metal", "buq", "jctc", "2025", "palladium", "gold", "silver", "copper", "platinum"],
    content: "Publication (2025): 'Development & Bayesian Uncertainty Quantification of Coarse-Grained Models of Metals Based on EAM Potentials' — AT Sose et al. — JCTC. DOI: 10.1021/acs.jctc.5c01322. Developed coarse-grained embedded atom method (CG EAM) potentials for FCC metals including Pd, Au, Ag, Cu, and Pt. Combined physical interpretability of traditional EAM with computational efficiency of coarse-graining. Used Particle Swarm Optimization to explore a 14-dimensional parameter space, followed by Bayesian Uncertainty Quantification for reliable uncertainty estimates.",
    metadata: { priority: 6, year: 2025, journal: "JCTC", doi: "10.1021/acs.jctc.5c01322" }
  },
  {
    id: "pub-3",
    category: "publications",
    keywords: ["green", "solvent", "machine", "learning", "advanced", "science", "ramprasad", "gsk", "sustainability", "gpr", "gpt", "database"],
    content: "Publication (2025): 'Machine Learning for Green Solvents: Assessment, Selection and Substitution' — R Datta, J Nistane, AT Sose, H Sahu, R Ramprasad — Advanced Science. DOI: 10.1002/advs.202516851. Created GreenSolventDB, the largest public database of green solvent sustainability metrics for 10,189 solvents. Trained GPR, fine-tuned GPT-3.5, and in-context learning models on the GSK Solvent Sustainability Guide. GPR slightly outperformed LLMs. Identified greener alternatives for 29 hazardous solvents using Hansen Solubility Parameters. Validated through case studies on benzene and diethyl ether. Abhishek trained some of the language models.",
    metadata: { priority: 6, year: 2025, journal: "Advanced Science", doi: "10.1002/advs.202516851" }
  },
  {
    id: "pub-4",
    category: "publications",
    keywords: ["mof", "drug", "release", "photoactivated", "jacs", "cornell", "metal", "organic", "framework", "cancer", "light"],
    content: "Publication (2025): 'Photoactivated Multivariate Metal-Organic Frameworks for On-Demand Drug Release' — HD Cornell*, AT Sose* (co-first author) et al. — JACS. DOI: 10.1021/jacs.4c15222. Developed visible-light-responsive MOFs (UiO-AZB) for targeted anti-cancer drug delivery. Investigated host-guest interactions in photoactivated drug release through combined computational and experimental studies.",
    metadata: { priority: 6, year: 2025, journal: "JACS", doi: "10.1021/jacs.4c15222" }
  },
  {
    id: "pub-5",
    category: "publications",
    keywords: ["mpea", "alloy", "inverse", "design", "explainable", "ai", "npj", "fenicrcocu", "shap"],
    content: "Publication (2025): 'Experimentally Validated Inverse Design of FeNiCrCoCu MPEAs' — F Wang, A Iwanicki, AT Sose et al. — npj Computational Materials. DOI: 10.1038/s41524-025-01600-x. Developed a stacked ensemble ML model and CNN with evolutionary algorithms for multi-principal element alloy design. Synthesized compositions showed single-phase FCC structures. SHAP analysis revealed elemental concentration-USFE relationships and local clustering-mechanical property correlations. 4,596 accesses and 8 citations.",
    metadata: { priority: 6, year: 2025, journal: "npj Computational Materials", doi: "10.1038/s41524-025-01600-x" }
  },
  {
    id: "pub-6",
    category: "publications",
    keywords: ["fluorine", "free", "polymer", "anion", "exchange", "membrane", "aem"],
    content: "Publication (2025): 'AI-Driven Design of Fluorine-Free Polymers for Sustainable and High-Performance Anion Exchange Membranes' — W Schertzer, S Shukla, AT Sose et al. — Journal of Materials Informatics.",
    metadata: { priority: 6, year: 2025, journal: "Journal of Materials Informatics" }
  },
  {
    id: "pub-7",
    category: "publications",
    keywords: ["sampling", "algorithm", "bayesian", "uncertainty", "force", "field", "jctc", "2024", "ess", "aies", "metropolis", "gold", "peuqse"],
    content: "Publication (2024): 'Evaluation of Sampling Algorithms Used for Bayesian Uncertainty Quantification of Molecular Dynamics Force Fields' — AT Sose, T Gustke, F Wang et al. — JCTC. DOI: 10.1021/acs.jctc.4c00130. Evaluated Bayesian sampling algorithms for EAM force field parameters of gold. Ensemble Slice Sampling (ESS) and Affine-Invariant Ensemble Sampling (AIES) demonstrated superior performance over Metropolis-Hastings, Gradient Search, and Uniform Random Sampler, achieving more accurate parameter estimates with tighter uncertainty bounds. Code available on GitHub. Open Access (CC-BY 4.0).",
    metadata: { priority: 6, year: 2024, journal: "JCTC", doi: "10.1021/acs.jctc.4c00130" }
  },
  {
    id: "pub-8",
    category: "publications",
    keywords: ["mof", "hydrogen", "h2", "adsorption", "data", "driven", "discovery", "storage", "energy", "pso", "genetic", "algorithm", "gcmc", "irmof", "cnn"],
    content: "Publication (2023): 'Data Driven Discovery of MOFs for Hydrogen Gas Adsorption' — S Singh*, AT Sose* (co-first), F Wang, KK Bejagam, SA Deshmukh — JCTC. Developed a hybrid PSO-Genetic Algorithm integrated with GCMC simulations and in-house MOF structure generation code. Explored only 13,824 out of ~10^37 possible functionalized IRMOF-10 structures. Found a design with ~6x higher H2 adsorption than bare IRMOF-10 at 1 bar and 77 K. Trained ML models: RF, LGBM, MLP, stacked ensemble, and 3D-CNN (best: R2=0.91). Identified design rules: unsaturated carbon functional groups like phenylacetylene and penta-1,3-diene enhance adsorption; optimal void fraction 0.67-0.71.",
    metadata: { priority: 6, year: 2023, journal: "JCTC" }
  },
  {
    id: "pub-9",
    category: "publications",
    keywords: ["tribology", "review", "machine", "learning", "pccp", "friction", "wear", "lubricant", "neural", "network", "composite"],
    content: "Publication (2023): 'A Review of Recent Advances and Applications of Machine Learning in Tribology' — AT Sose, SY Joshi, LK Kunche, F Wang, SA Deshmukh — PCCP. Comprehensive 36-page review covering ML in experimental and computational tribology. Reviews ANN, RNN, PCA, decision trees, random forests, SVM, ANFIS for predicting friction, wear, and designing lubricants/composites. Covers MD (classical, reactive, NEMD) in tribology. Discusses emerging materials: glycomaterials and MXenes. First comprehensive review combining ML with both experimental and molecular simulation tribology studies.",
    metadata: { priority: 6, year: 2023, journal: "PCCP" }
  },
  {
    id: "pub-10",
    category: "publications",
    keywords: ["water", "confined", "graphene", "boron", "nitride", "mos2", "2d", "hybrid", "layered", "interfacial"],
    content: "Publication (2022): 'Investigation of structure & dynamics of water confined between hybrid layered materials of graphene, BN, & MoS2' — AT Sose et al. — J. Mater. Sci. Used all-atom MD simulations to study water confined between novel layered hybrid 2D materials at slit widths of 8.5-15.5 Angstroms. Flexible sheets expelled all confined water due to stronger inter-sheet interactions. Rigid hydrophilic BN-MoS2 interfaces favored stable, ordered water layers. Analysis used RDF, z-density profiles, orientational tetrahedral order, Voronoi asphericity, O-H bond orientation, MSD, and residence time.",
    metadata: { priority: 6, year: 2022, journal: "Journal of Materials Science" }
  },
  {
    id: "pub-11",
    category: "publications",
    keywords: ["mos2", "water", "interaction", "parameters", "interfacial", "pso", "wetting", "contact", "angle"],
    content: "Publication (2022): 'Determination of accurate interaction parameters between MoS2 and water to investigate their interfacial properties' — AT Sose et al. — J. Phys. Chem. C. Developed high-accuracy cross-interaction models for MoS2-water systems using Particle Swarm Optimization (PSO) to reproduce experimental water contact angles on MoS2 surfaces.",
    metadata: { priority: 6, year: 2022, journal: "J. Phys. Chem. C" }
  },
  {
    id: "pub-12",
    category: "publications",
    keywords: ["nemd", "mof", "membrane", "h2", "ch4", "separation", "gas", "dual", "force"],
    content: "Publication (2022): 'Dual-Force Zone NEMD Simulations on Nanoporous MOF Membranes for Separation of H2/CH4 Mixtures' — F Wang, AT Sose, S Singh, SA Deshmukh — ACS Applied Nanomaterials. Used dual-force zone non-equilibrium molecular dynamics (DFZ-NEMD) to investigate gas separation through nanoporous MOF membranes.",
    metadata: { priority: 6, year: 2022, journal: "ACS Applied Nanomaterials" }
  },
  {
    id: "pub-13",
    category: "publications",
    keywords: ["drug", "adsorption", "mof", "solvent", "rsc", "ethanol", "5fu", "ibuprofen", "hydroxyurea", "gcmc"],
    content: "Publication (2021): 'Modelling drug adsorption in metal-organic frameworks: the role of solvent' — AT Sose*, HD Cornell* (co-first) et al. — RSC Advances. Won Outstanding Student Paper Award. Combined computational (GCMC) and experimental study of drug adsorption in biocompatible MOFs (UiO-AZB, HKUST-1, NH2-MIL-53) with three drugs (5-fluorouracil, ibuprofen, hydroxyurea). Key finding: without solvent, drug adsorption is significantly overestimated. With ethanol, drugs adsorb at the MOF-solvent interface. Drug uptake follows HU > 5-FU > IBU (proportional to size). At low pressures (<10^4 Pa), electrostatic drug-MOF interactions dominate regardless of solvent.",
    metadata: { priority: 6, year: 2021, journal: "RSC Advances" }
  },
  {
    id: "pub-14",
    category: "publications",
    keywords: ["stamp", "microcontact", "printing", "lithography", "scientific", "reports", "iit"],
    content: "Publication (2019): 'Low Cost and Lithography-Free Stamp Fabrication for Microcontact Printing' — A Khadpekar, M Khan, AT Sose, A Majumder — Nature Scientific Reports.",
    metadata: { priority: 5, year: 2019, journal: "Nature Scientific Reports" }
  },

  // ===== SKILLS =====
  {
    id: "skills-1",
    category: "skills",
    keywords: ["skills", "software", "tools", "programming", "python", "code", "language", "lammps", "vasp", "gromacs"],
    content: "Abhishek's technical skills include: Simulation Software — LAMMPS, NAMD, VASP, Gaussian, CHARMM-GUI, GROMACS, RASPA 2.0; ML Frameworks — PyTorch, TensorFlow, JAX, Keras, Bayesian Inference (PEUQSE, ZEUS); Programming — Python, C++, Bash, Fortran, TCL, SQL; Modeling — Non-equilibrium MD, Free Energy Calculations, AIMD, Monte Carlo Methods.",
    metadata: { priority: 7 }
  },

  // ===== AWARDS =====
  {
    id: "awards-1",
    category: "awards",
    keywords: ["award", "honor", "prize", "recognition", "best", "outstanding", "achievement"],
    content: "Abhishek's awards include: (1) Outstanding Student Paper Award for Computational & Theoretical Chemistry, RSC Advances (2022); (2) 2nd place best talk, Carbon Nanomaterials, AIChE (2022); (3) 3rd place best talk, AIChE Inorganic Materials (2022); (4) Best Poster, MII Technical Conference (2022); (5) GPSS Graduate Travel Award for AIChE 2022.",
    metadata: { priority: 7 }
  },

  // ===== MENTORING =====
  {
    id: "mentoring-1",
    category: "mentoring",
    keywords: ["mentor", "teach", "student", "advise", "supervise", "undergraduate", "graduate", "instructor"],
    content: "Abhishek has mentored 2 Ph.D. students and multiple undergraduates in Bayesian UQ and force field development at Virginia Tech. At Georgia Tech, he mentored an undergraduate in building a multi-task ML model. He served as Instructor for PEUQSE software at ACS Fall 2022. At IIT Bombay, he mentored 30 students in biodiesel production.",
    metadata: { priority: 6 }
  },

  // ===== CONFERENCES =====
  {
    id: "conf-1",
    category: "conferences",
    keywords: ["conference", "talk", "presentation", "oral", "poster", "aiche", "acs", "mrs"],
    content: "Abhishek has presented at major conferences: AIChE Annual Meeting (2020, 2022 — multiple oral presentations), ACS Fall Meeting (2022 — talks and workshop instruction), MRS Fall Meeting (2020, 2021), ChEGSA Symposium (2022). Topics: MOFs, coarse-grained modeling, BUQ, water confinement, CNNs, polymer-MOF compatibility.",
    metadata: { priority: 6 }
  },

  // ===== HPC =====
  {
    id: "hpc-1",
    category: "computing",
    keywords: ["hpc", "computing", "supercomputer", "nersc", "cluster", "core", "hours", "high", "performance"],
    content: "Abhishek has secured ~3 million computing core hours on NERSC and utilized 12+ million core hours across NERSC, Virginia Tech, Georgia Tech, and San Diego Supercomputing Center.",
    metadata: { priority: 5 }
  },

  // ===== CITATIONS =====
  {
    id: "impact-1",
    category: "impact",
    keywords: ["citation", "impact", "h-index", "publication", "count", "paper", "how", "many"],
    content: "Abhishek has published 17 peer-reviewed articles (including 2 under review/submitted in 2026), with 8 as first author and 4 co-first author publications. Current total: 311 citations. He contributed to securing an NSF CAREER award for his Ph.D. advisor.",
    metadata: { priority: 7 }
  },

  // ===== UNDERGRADUATE =====
  {
    id: "ug-1",
    category: "research",
    keywords: ["3d", "print", "scaffold", "tissue", "loughborough", "undergraduate", "autocad", "biodiesel", "aspen"],
    content: "During undergrad at IIT Bombay, Abhishek worked on 3D Printed Scaffolds for Tissue Growth at Loughborough University UK (2016), analyzing 7,500 structures in AutoCAD. He led Project Biosynth for biodiesel production using a 250L pilot plant, and designed coal gasification in ASPEN Plus.",
    metadata: { priority: 4 }
  },

  // ===== CAREER =====
  {
    id: "future-1",
    category: "career",
    keywords: ["faculty", "professor", "job", "market", "hire", "position", "group", "lab", "future", "plan", "goal"],
    content: "Abhishek is on the academic job market for faculty positions. He plans to establish a research group focusing on AI-driven materials discovery, autonomous laboratories, and multi-scale computational materials design — from DFT through MD and FEA to robotic experimental verification.",
    metadata: { priority: 8 }
  },

  // ===== CROSS-CUTTING THEMES =====
  {
    id: "theme-mof",
    category: "research",
    keywords: ["mof", "metal", "organic", "framework", "porous", "adsorption", "drug", "delivery", "gas", "storage", "carbon", "capture"],
    content: "Abhishek has extensive MOF expertise: (1) Drug delivery — light-responsive MOFs for on-demand anti-cancer drug release (JACS 2025), solvent effects on drug adsorption (RSC Advances 2021, Outstanding Paper Award); (2) Hydrogen storage — functionalized IRMOF-10 with 6x enhanced H2 via PSO-GA optimization (JCTC 2023); (3) Gas separation — MOF membranes for H2/CH4 via NEMD (ACS Appl. Nano 2022); (4) CO2 capture — identified 19 amine groups enhancing CO2 adsorption.",
    metadata: { priority: 8 }
  },
  {
    id: "theme-buq",
    category: "research",
    keywords: ["bayesian", "uncertainty", "quantification", "buq", "force", "field", "parameter", "estimation", "pso", "optimization", "peuqse"],
    content: "Bayesian Uncertainty Quantification is central to Abhishek's research. Two major papers: (1) JCTC 2024 — evaluated ESS, AIES, MH, GS, URS for BUQ of gold EAM force fields, showing ESS and AIES are superior; (2) JCTC 2025 — CG EAM potentials for Pd, Au, Ag, Cu, Pt with BUQ. Both integrate PSO for initial parameters then Bayesian inference via PEUQSE. He also teaches PEUQSE workshops at ACS.",
    metadata: { priority: 8 }
  },
  {
    id: "theme-2d",
    category: "research",
    keywords: ["graphene", "boron", "nitride", "mos2", "2d", "material", "hybrid", "nanosheet", "water", "interface"],
    content: "Abhishek's 2D materials work: (1) Novel hybrid layered materials of graphene/BN/MoS2 with water confinement studies (J. Mater. Sci. 2022); (2) MoS2-water interaction parameters via PSO (J. Phys. Chem. C 2022). Key finding: hydrophilic BN-MoS2 interfaces promote ordered water layers while hydrophobic graphene expels confined water.",
    metadata: { priority: 7 }
  },
  {
    id: "theme-ml-materials",
    category: "research",
    keywords: ["machine", "learning", "materials", "discovery", "accelerated", "design", "data", "driven", "informatics"],
    content: "ML for materials discovery spans Abhishek's work: green solvents (GPR + LLMs for 10,189 solvents, Adv. Sci. 2025), alloy design (stacked ensemble + SHAP for MPEAs, npj Comp Mat 2025), MOFs (RF/LGBM/3D-CNN for H2, JCTC 2023), tribology (comprehensive ML review, PCCP 2023), polymers (Li-ion conductivity for 6,042 polymers). Techniques: GPR, RF, SVM, CNN, MLP, LLMs (GPT-3.5, LLaMA).",
    metadata: { priority: 8 }
  }
];
