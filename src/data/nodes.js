export const CATEGORIES = [
    { key: "music", label: "sound" },
    { key: "words", label: "text" },
    { key: "images", label: "image" },
    { key: "code", label: "code" },
    { key: "spaces", label: "space" },
    { key: "systems", label: "systems" }];

export const NODES = [
    {
    id: "mashrou-leila-collective",
    title: "Mashrou' Leila",
    subtitle: "The Counter-Public · 2008–2022",
    categories: ["music","systems"],
    tier: 1, year: "2008", temporal: "historical",
    image: "/images/mashrou_leila_baalbeck_image-1024x682.jpg",
    connections: ["ibn-el-leil-album","raasuk-album","roman-music-video","localization-gap-audit","mashrou-leila-lyrics","cost-of-being-queer-arab","menara-infrastructure","mekena-nyc-initiative","stage-design","rolling-stone"],
    description: "A counter-public in the shape of a band. Fourteen years of music as shared political infrastructure. The audience was always the architecture. 500M+ streams."},
    {
    id: "space-time-tuning-machine",
    title: "Space Time Tuning Machine",
    subtitle: "Ongoing Installation",
    categories: ["music","code","systems"],
    tier: 1, year: "2023", temporal: "ongoing",
    image: "/images/66a173aa-7fb2-4c00-8a74-09b2e01b9e18_1_105_c.jpeg",
    connections: ["tebr-project","1000-strings-at-rest","sttm-visual-system","localization-gap-audit","harmonic-field-project"],
    description: "A techno-mythological instrument built from scrap electronics that tunes noise into the frequency of a home that no longer exists."},
    {
    id: "localization-gap-audit",
    title: "The Localization Gap Audit",
    subtitle: "Forensic Research · 2024",
    categories: ["music","code","systems"],
    tier: 1, year: "2024", temporal: "historical",
    image: "/images/screenshot-2026-01-26-at-1.10.21-pm.png",
    connections: ["space-time-tuning-machine","mashrou-leila-collective","maqam-tuning-rules","hah-was-app","derive-engine","the-meaning-stack","ai-music-archive"],
    description: "A forensic audit of 427 AI-generated tracks. What's missing: the microtonal Maqam structures that Western training data treated as noise."},
    {
    id: "ibn-el-leil-album",
    title: "Ibn El Leil",
    subtitle: "Album · 2015",
    categories: ["music"],
    tier: 1, year: "2015", temporal: "historical",
    image: "/images/ibnelleil-cover.jpg",
    connections: ["mashrou-leila-collective","roman-music-video","rolling-stone","stage-design"],
    description: "A sonic architecture of the night, mapping the spaces of mourning and celebration in a city under surveillance."},
    {
        id: "harmonic-field-project",
        title: "The Harmonic Field Project",
        subtitle: "Ongoing System",
        categories: ["music", "code", "systems"],
        tier: 1, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/harmonic-field-project/400/300",
        connections: ["derive-engine", "the-meaning-stack", "harmonic-field-theory", "space-time-tuning-machine"],
        description: "Music modeled as a complex system. Seven dimensions of energy. An AI architecture for predicting — and designing — emotional resonance."},
    {
    id: "tebr-project",
    title: "TEBR (The Toolmaker)",
    subtitle: "Speculative Duo",
    categories: ["music","code"],
    tier: 2, year: "2025", temporal: "speculative",
    image: "/images/1f6b7397-797e-4326-b401-441dec53ee63_1_105_c.jpeg",
    connections: ["space-time-tuning-machine","localization-gap-audit","ai-music-archive"],
    description: "An AI-human sonic duo treating the glitch not as error but as new cultural heritage — Future Folklore for the diaspora."},
    {
        id: "1000-strings-at-rest",
        title: "1000 Strings at Rest",
        subtitle: "Installation",
        categories: ["music", "images", "spaces"],
        tier: 2, year: "2021", temporal: "historical",
        image: "/images/0c24407c-d3bc-4c3a-95d4-4d78e8e04bbe.jpeg",
        connections: ["space-time-tuning-machine", "songs-lost-to-time", "1000-strings-visual", "dictionary-of-silences"],
        description: "An installation exploring the silence of instruments in exile, treating the unplayed string as a measure of distance from home."},
    {
    id: "songs-lost-to-time",
    title: "Rehearsal for a Song Lost to Time",
    subtitle: "Speculative Soundscape",
    categories: ["music","code"],
    tier: 2, year: "2025", temporal: "speculative",
    image: "/images/screenshot-2026-02-20-at-3.53.35-am.png",
    connections: ["1000-strings-at-rest","cartography-of-absence"],
    description: "A generative soundscape woven from fragments of songs that displaced individuals can no longer fully remember."},
    {
    id: "sunburn-installation",
    title: "SUNBURN (Weather Rehearsal)",
    subtitle: "Living Score",
    categories: ["music","code","systems"],
    tier: 3, year: "2026", temporal: "speculative",
    image: "/images/img_8781.webp",
    connections: ["harmonic-field-project","space-time-tuning-machine"],
    description: "A living score where an AI conductor modulates a violin composition based on real-time climate data and heat indices."},
    {
    id: "raasuk-album",
    title: "Raasük",
    subtitle: "Album · 2013",
    categories: ["music","images"],
    tier: 2, year: "2013", temporal: "historical",
    image: "/images/raasuk-itunes-cover.jpg",
    connections: ["mashrou-leila-collective","roman-music-video","ibn-el-leil-album"],
    description: "An album functioning as a political dance, choreographing the tension between individual agency and collective movement."},
    {
        id: "maqam-tuning-rules",
        title: "Maqam Tuning Rules",
        subtitle: "Algorithmic Constraints",
        categories: ["music", "code"],
        tier: 3, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/maqam-tuning-rules/400/300",
        connections: ["localization-gap-audit", "derive-engine"],
        description: "Algorithmic constraints enforcing microtonal integrity in generative systems. Cultural sovereignty as code."},
    {
    id: "people-like-us-score",
    title: "People Like Us Score",
    subtitle: "Cultural Scoring",
    categories: ["music","systems"],
    tier: 3, year: "2025", temporal: "ongoing",
    image: "/images/96025cb7-9f85-4f06-9f4b-a0ac32825446_1_105_c.jpeg",
    connections: ["mashrou-leila-collective","localization-gap-audit"],
    description: "A film score that refuses the oud-over-strings exoticism of diaspora documentary. The actual sound of the subjects: apartment ambience, phone audio, the specific hum of a specific city."},
    {
    id: "heroes-transitional-time",
    title: "Heroes of a Transitional Time",
    subtitle: "Visual Series",
    categories: ["images"],
    tier: 1, year: "2018", temporal: "historical",
    image: "/images/img_8523_original.jpeg",
    connections: ["architecture-in-low-res","roman-music-video","ghost-city-data-sculpture"],
    description: "Deconstructing the flawed logic of the male hero through the aesthetic of endless, futile auditioning for a battle that has passed."},
    {
        id: "architecture-in-low-res",
        title: "Architecture in Low Res",
        subtitle: "Thesis · 2012",
        categories: ["images", "spaces", "systems"],
        tier: 1, year: "2012", temporal: "historical",
        image: "https://picsum.photos/seed/architecture-in-low-res/400/300",
        connections: ["derive-engine", "ghost-city-data-sculpture", "glitch-renderer", "glitch-as-revelation", "sttm-visual-system", "architecture-in-low-res-space"],
        description: "Glitches are not errors but forensic reveals of the system's underlying truth and the decay of diasporic memory."},
    {
    id: "sttm-visual-system",
    title: "STTM Visual System",
    subtitle: "Generative Visuals",
    categories: ["images","code"],
    tier: 1, year: "2023", temporal: "ongoing",
    image: "/images/screenshot-2026-01-26-at-1.19.33-pm.png",
    connections: ["space-time-tuning-machine","architecture-in-low-res","glitch-renderer"],
    description: "A machine that visualizes the friction between exile and the longing for return via generative AI and scrap electronics."},
    {
    id: "roman-music-video",
    title: "Roman (Music Video)",
    subtitle: "Visual Manifesto · 2019",
    categories: ["images","music"],
    tier: 1, year: "2019", temporal: "historical",
    image: "/images/img_0042.jpeg",
    connections: ["mashrou-leila-collective","ibn-el-leil-album","heroes-transitional-time","cost-of-being-queer-arab"],
    description: "An anthem of inverted power, treating the music video as a visual manifesto for feminist and queer liberation in the Middle East."},
    {
    id: "storylines-knowledge-graph",
    title: "STORYLINES Knowledge Graph",
    subtitle: "10,000 Literary Nodes",
    categories: ["images","code","systems"],
    tier: 1, year: "2025", temporal: "ongoing",
    image: "/images/screenshot-2026-02-20-at-4.05.17-am.png",
    connections: ["storylines-ai","derive-engine","cartography-of-absence"],
    description: "10,000 literary nodes that exert gravity, mapping the collective unconscious as a physical space."},
    {
    id: "1000-strings-visual",
    title: "1000 Strings at Rest (Visual)",
    subtitle: "Multimedia Installation",
    categories: ["images","spaces"],
    tier: 2, year: "2019", temporal: "historical",
    image: "https://picsum.photos/seed/1000-strings-visual/400/300",
    connections: ["1000-strings-at-rest","architecture-in-low-res"],
    description: "The visual layer of the installation: time-lapse of 1000 suspended strings, ambient resonance recordings, and a projected text listing songs by the jurisdiction that bans them."},
    {
        id: "drone-bird-schematics",
        title: "The Drone-Bird Schematics",
        subtitle: "Design Fiction",
        categories: ["images", "code"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/drone-bird-schematics/400/300",
        connections: ["sparrow-os", "galaxy-birds", "ghost-city-data-sculpture"],
        description: "Technical blueprints for a chimera of the Anthropocene — a surveillance machine disguised as a migrating crane."},
    {
        id: "sophies-world",
        title: "Sophie's World",
        subtitle: "Video Essay · 2014",
        categories: ["images", "code"],
        tier: 2, year: "2014", temporal: "historical",
        image: "https://picsum.photos/seed/sophies-world/400/300",
        connections: ["nebucat", "derive-engine"],
        description: "An AI assistant searches for a perfect home in a post-human world, revealing the profound loneliness of the digital archive."},
    {
        id: "ghost-city-data-sculpture",
        title: "Ghost City Data Sculpture",
        subtitle: "Data Art",
        categories: ["images", "code", "spaces"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/ghost-city-data-sculpture/400/300",
        connections: ["architecture-in-low-res", "heroes-transitional-time"],
        description: "Beirut visualized entirely by negative space — what was demolished, censored, and erased becomes the true map of the city."},
    {
        id: "the-autopsy-interface",
        title: "The Autopsy Interface",
        subtitle: "Memory Forensics Game",
        categories: ["images", "code"],
        tier: 2, year: "2026", temporal: "speculative",
        image: "https://picsum.photos/seed/the-autopsy-interface/400/300",
        connections: ["glitch-renderer", "derive-engine", "the-meaning-stack"],
        description: "A visual neural network game where the player classifies memory fragments as Identity or Corruption."},
    {
        id: "crying-superhero",
        title: "The Crying Superhero",
        subtitle: "Speculative Figure",
        categories: ["images"],
        tier: 3, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/crying-superhero/400/300",
        connections: ["roman-music-video", "nebucat"],
        description: "The mask transitions from a signifier of biological vulnerability to a tool of mythic power and public grief."},
    {
        id: "galaxy-birds",
        title: "Galaxy Birds",
        subtitle: "Spirit Animals for Displacement",
        categories: ["images"],
        tier: 3, year: "2024", temporal: "speculative",
        image: "https://picsum.photos/seed/galaxy-birds/400/300",
        connections: ["sparrow-os", "drone-bird-schematics"],
        description: "Geometric avian forms serving as spirit animals for displacement, traversing the Beirut–London–New York axis."},
    {
        id: "glitch-renderer",
        title: "The Glitch Renderer",
        subtitle: "Technical Mode",
        categories: ["images", "code"],
        tier: 3, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/glitch-renderer/400/300",
        connections: ["architecture-in-low-res", "sttm-visual-system", "glitch-as-revelation"],
        description: "A technical mode that visually shatters text to simulate cognitive instability and the decaying of memory."},
    {
    id: "nebucat",
    title: "Nebucat",
    subtitle: "Digital Witness",
    categories: ["images","systems"],
    tier: 3, year: "2025", temporal: "speculative",
    image: "/images/img_7916.png",
    connections: ["sophies-world","crying-superhero","beau-griffin"],
    description: "A cynical cat avatar navigating speculative worldbuilding, extending the Beau the Cat motif into a digital witness-persona."},
    {
        id: "cartography-of-absence",
        title: "The Cartography of Absence",
        subtitle: "108-Entry Dream Cycle",
        categories: ["words", "systems"],
        tier: 1, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/cartography-of-absence/400/300",
        connections: ["nowhere-elsewhere", "moebius-engine", "storylines-knowledge-graph", "mashrou-leila-lyrics"],
        description: "A 108-entry dream cycle structured as a bureaucratic archive, organizing the trauma of displacement into nine Houses."},
    {
    id: "souad-novella",
    title: "Souad",
    subtitle: "Novella",
    categories: ["words"],
    tier: 1, year: "2017", temporal: "historical",
    image: "https://picsum.photos/seed/souad-novella/400/300",
    connections: ["cost-of-being-queer-arab","the-forgery"],
    description: "A baroque novella set in civil-war Beirut exploring the substitution economy, gender performance, and architectural decay."},
    {
    id: "mashrou-leila-lyrics",
    title: "Mashrou' Leila Lyrics",
    subtitle: "Collective Authorship",
    categories: ["words","music"],
    tier: 1, year: "2008", temporal: "historical",
    image: "/images/img_7120.jpeg",
    connections: ["mashrou-leila-collective","cartography-of-absence","cost-of-being-queer-arab"],
    description: "Semantically open verses designed as a porous system where the audience co-authors the meaning of resistance."},
    {
        id: "cost-of-being-queer-arab",
        title: "The Cost of Being Queer and Arab",
        subtitle: "NYT Op-Ed",
        categories: ["words", "systems"],
        tier: 1, year: "2019", temporal: "historical",
        image: "https://picsum.photos/seed/cost-of-being-queer-arab/400/300",
        connections: ["mashrou-leila-collective", "roman-music-video", "souad-novella", "mashrou-leila-lyrics"],
        description: "A published NYT op-ed that weaponizes testimony as political architecture, making the personal structurally legible."},
    {
        id: "nowhere-elsewhere",
        title: "Nowhere / Elsewhere",
        subtitle: "Dream Mapping",
        categories: ["words"],
        tier: 1, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/nowhere-elsewhere/400/300",
        connections: ["cartography-of-absence", "passport-inventory"],
        description: "A dream cycle mapping the nine Houses of a displaced person's interior landscape — from Language to Grief to Bureaucracy."},
    {
        id: "why-were-like-this",
        title: "Why We're Like This",
        subtitle: "Documentary Scripts",
        categories: ["words", "systems"],
        tier: 2, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/why-were-like-this/400/300",
        connections: ["manifesto-architecting-liminal", "bureaucratic-surrealism", "impossible-futures-method"],
        description: "Documentary scripts exploring the mutation of the human spirit and social illusions in the age of algorithms."},
    {
        id: "manifesto-architecting-liminal",
        title: "Manifesto: Architecting the Liminal",
        subtitle: "Foundational Text",
        categories: ["words", "systems"],
        tier: 2, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/manifesto-architecting-liminal/400/300",
        connections: ["systems-choreography", "the-haig-method", "walaw-studio", "impossible-futures-method"],
        description: "A foundational text declaring that stories are infrastructure and constraints are catalysts for impossible futures."},
    {
        id: "sparrow-os-protocol",
        title: "SparrowOS (Transparency Protocol)",
        subtitle: "Surveillance Fiction",
        categories: ["words", "code", "systems"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/sparrow-os-protocol/400/300",
        connections: ["sparrow-os", "bureaucratic-surrealism", "passport-inventory", "galaxy-birds"],
        description: "A bureaucratic surveillance architecture monitored by avian agents, enforcing transparency levels on displaced bodies."},
    {
        id: "revised-fee-schedule",
        title: "Revised Fee Schedule for Speech",
        subtitle: "Bureaucratic Poetry",
        categories: ["words"],
        tier: 3, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/revised-fee-schedule/400/300",
        connections: ["bureaucratic-surrealism", "passport-inventory", "dictionary-of-silences"],
        description: "An official document listing the economic debt accrued by using forbidden vowels or declaring home in a hostile state."},
    {
        id: "dictionary-of-silences",
        title: "Dictionary of Silences",
        subtitle: "Taxonomy",
        categories: ["words"],
        tier: 3, year: "2023", temporal: "historical",
        image: "https://picsum.photos/seed/dictionary-of-silences/400/300",
        connections: ["1000-strings-at-rest", "revised-fee-schedule"],
        description: "A taxonomy categorizing silence not as emptiness but as a weighted structural element — Type 3: Grief Silence."},
    {
        id: "passport-inventory",
        title: "Passport Inventory (Contradictory)",
        subtitle: "Identity Document",
        categories: ["words", "systems"],
        tier: 3, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/passport-inventory/400/300",
        connections: ["bureaucratic-surrealism", "nowhere-elsewhere", "revised-fee-schedule", "sparrow-os-protocol"],
        description: "A comparative analysis of three passports (Original, Refugee, Dream) exposing the legal fiction of selfhood."},
    {
        id: "the-meaning-stack",
        title: "The Meaning Stack",
        subtitle: "Federated Architecture",
        categories: ["code", "systems"],
        tier: 1, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/the-meaning-stack/400/300",
        connections: ["derive-engine", "harmonic-field-project", "localization-gap-audit", "photon-plus", "the-meaning-stack-system"],
        description: "A federated technical architecture (Sensorium → Veracity) designed to process culture rather than raw data."},
    {
    id: "derive-engine",
    title: "DERIVE",
    subtitle: "Negentropic Machine",
    categories: ["code","systems"],
    tier: 1, year: "2025", temporal: "ongoing",
    image: "/images/portfolio-derive.jpeg",
    connections: ["the-meaning-stack","architecture-in-low-res","maqam-tuning-rules","photon-plus","storylines-ai"],
    description: "A Negentropic Machine using vector embeddings to navigate memory using cultural resonance rather than keyword search."},
    {
    id: "hah-was-app",
    title: "HAH-WAS (Hallucination Hunter)",
    subtitle: "Mobile App",
    categories: ["code","systems"],
    tier: 1, year: "2025", temporal: "ongoing",
    image: "/images/portfolio-engine.jpeg",
    connections: ["localization-gap-audit","the-meaning-stack","derive-engine"],
    description: "A mobile app flipping the Turing Test — the machine tests the human's ability to discern cultural truth from AI fabrication."},
    {
    id: "storylines-ai",
    title: "STORYLINES",
    subtitle: "Literary Knowledge Graph",
    categories: ["code","systems"],
    tier: 1, year: "2025", temporal: "ongoing",
    image: "/images/portfolio-storylines.jpeg",
    connections: ["storylines-knowledge-graph","derive-engine","the-meaning-stack"],
    description: "A literary knowledge graph using zero-shot LLM inference to generate semantic gravity between 10,000 literary nodes."},
    {
    id: "moebius-engine",
    title: "The Möbius Engine",
    subtitle: "Narrative Router",
    categories: ["code","systems"],
    tier: 2, year: "2025", temporal: "ongoing",
    image: "/images/portfolio-mobius.jpeg",
    connections: ["cartography-of-absence","mobius-engine-system","nowhere-elsewhere"],
    description: "A narrative router that flips reality between Face A (Observed) and Face B (Shadow) based on user behavior."},
    {
    id: "photon-plus",
    title: "PHOTON+",
    subtitle: "Optical Sequencer",
    categories: ["code","spaces"],
    tier: 2, year: "2026", temporal: "speculative",
    image: "/images/portfolio-photon.jpeg",
    connections: ["derive-engine","the-meaning-stack","harmonic-field-project"],
    description: "An optical sequencer treating music as a consequence of light architecture, where collision replaces linear composition."},
    {
    id: "3d-beat-synth",
    title: "3D-Beat-Synth",
    subtitle: "Somatic Engine",
    categories: ["code","music"],
    tier: 2, year: "2025", temporal: "ongoing",
    image: "/images/portfolio-3dbeats.jpeg",
    connections: ["harmonic-field-project","space-time-tuning-machine","photon-plus"],
    description: "A Somatic Engine turning the human body into a tuning fork for digital sound via webcam. Body as interface."},
    {
    id: "sparrow-os",
    title: "SparrowOS",
    subtitle: "Surveillance Architecture",
    categories: ["code","systems"],
    tier: 2, year: "2025", temporal: "speculative",
    image: "/images/portfolio-sparrow.jpeg",
    connections: ["bureaucratic-surrealism","sparrow-os-protocol","sparrow-os-system","drone-bird-schematics"],
    description: "A bureaucratic surveillance architecture monitored by avian agents, enforcing the Transparency Protocol on displaced bodies."},
    {
        id: "boids-simulation",
        title: "Boids",
        subtitle: "Emergent Behavior Simulation",
        categories: ["code"],
        tier: 3, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/boids-simulation/400/300",
        connections: ["the-meaning-stack", "storylines-ai"],
        description: "An emergent behavior simulation mapping the Geometry of Connection through flocking algorithms."},
    {
        id: "project-agora",
        title: "Project Agorá",
        subtitle: "Fintech Strategy",
        categories: ["code", "systems"],
        tier: 3, year: "2024", temporal: "speculative",
        image: "https://picsum.photos/seed/project-agora/400/300",
        connections: ["walaw-studio", "impossible-futures-method"],
        description: "A high-level fintech framework analyzing tokenization and cross-border payments as cultural infrastructure for the Global South."},
    {
    id: "projectarium-ai",
    title: "Projectarium AI",
    subtitle: "AI A&R Agent",
    categories: ["code","music","systems"],
    tier: 3, year: "2025", temporal: "ongoing",
    image: "/images/portfolio-projectarium.jpeg",
    connections: ["localization-gap-audit","harmonic-field-project","derive-engine"],
    description: "A Gemini Muse agent acting as an AI A&R executive providing culturally specific critique on unreleased tracks."},
    {
        id: "mekena-nyc-initiative",
        title: "MEKENA NYC",
        subtitle: "Artist Residency, Queens",
        categories: ["spaces", "systems"],
        tier: 1, year: "2023", temporal: "ongoing",
        image: "https://picsum.photos/seed/mekena-nyc-initiative/400/300",
        connections: ["architectures-of-belonging", "mashrou-leila-collective", "impossible-futures-method", "walaw-studio"],
        description: "A system of care masquerading as a building, transforming a Queens home into a sanctuary for the permanently transient."},
    {
        id: "architecture-in-low-res-space",
        title: "Architecture in Low Res",
        subtitle: "Thesis · UCL Bartlett",
        categories: ["spaces", "images"],
        tier: 1, year: "2012", temporal: "historical",
        image: "https://picsum.photos/seed/architecture-in-low-res-space/400/300",
        connections: ["ucl-bartlett", "architecture-in-low-res", "glitch-as-revelation"],
        description: "A Bartlett MArch thesis arguing that the low-resolution, transmission-degraded image is the most politically honest document. A forensics of how distance corrupts signal."},
    {
        id: "architectures-of-belonging",
        title: "Architectures of Belonging",
        subtitle: "Pop-Up Homelands",
        categories: ["spaces", "systems"],
        tier: 1, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/architectures-of-belonging/400/300",
        connections: ["mekena-nyc-initiative", "architectures-of-belonging-system"],
        description: "Pop-up homelands built from interchangeable blocks of art, code, and policy for those living in permanent transience."},
    {
    id: "bernard-khoury",
    title: "Bernard Khoury / DW5",
    subtitle: "Architecture Practice · Beirut",
    categories: ["spaces"],
    tier: 2, year: "2011", temporal: "historical",
    image: "/images/img_8719.jpeg",
    connections: ["ucl-bartlett","aub-architecture"],
    description: "Three years building contested structures in post-war Beirut — where architecture is never neutral but always political."},
    {
        id: "marra-tein-residency",
        title: "Marra.tein Residency",
        subtitle: "Adaptive Reuse · Beirut",
        categories: ["spaces"],
        tier: 2, year: "2013", temporal: "historical",
        image: "https://picsum.photos/seed/marra-tein-residency/400/300",
        connections: ["architectures-of-belonging", "bernard-khoury"],
        description: "An adaptive reuse project in Hamra: renovation that kept damage visible, treating the scars of the building as structural material, not problems to solve."},
    {
        id: "louvre-abu-dhabi",
        title: "Louvre Abu Dhabi",
        subtitle: "Cultural Diplomacy",
        categories: ["spaces"],
        tier: 2, year: "2010", temporal: "historical",
        image: "https://picsum.photos/seed/louvre-abu-dhabi/400/300",
        connections: ["aub-architecture", "architectures-of-belonging"],
        description: "Contributing to a mega-structure of cultural diplomacy, balancing heritage with radical modernism under a dome of light."},
    {
    id: "chromatoverse",
    title: "Chromatoverse",
    subtitle: "Volumetric Interface",
    categories: ["spaces","code"],
    tier: 2, year: "2026", temporal: "speculative",
    image: "/images/screenshot-2026-02-20-at-3.41.56-am.png",
    connections: ["the-meaning-stack","photon-plus","3d-beat-synth"],
    description: "A Post-Flat interface treating code as deep, volumetric layers of colored acetate to be inhabited rather than read."},
    {
        id: "the-archive-conceptual",
        title: "The Archive",
        subtitle: "Sensory Repository",
        categories: ["spaces", "systems"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/the-archive-conceptual/400/300",
        connections: ["derive-engine", "cartography-of-absence", "dictionary-of-silences"],
        description: "A climate-controlled repository for partial joys and lost words, organized by scent rather than chronology."},
    {
        id: "the-annex-stage",
        title: "THE ANNEX",
        subtitle: "Liminal Stage Space",
        categories: ["spaces", "systems"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/the-annex-stage/400/300",
        connections: ["architectures-of-belonging", "glitch-as-revelation", "cartography-of-absence"],
        description: "A stage design that shows its own mechanism: three configurations (void, house, machine), visible crew, machinery never hidden. The transformation is the performance."},
    {
        id: "house-ii-skin",
        title: "House II: Skin",
        subtitle: "Somatic Architecture",
        categories: ["spaces"],
        tier: 3, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/house-ii-skin/400/300",
        connections: [ "architectures-of-belonging", "the-annex-stage"],
        description: "The body viewed as a contested territory and archive, where scars are mapped as evidence of border crossings."},
    {
        id: "the-waiting-room",
        title: "The Waiting Room",
        subtitle: "Hostile Architecture",
        categories: ["spaces", "systems"],
        tier: 3, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/the-waiting-room/400/300",
        connections: ["bureaucratic-surrealism", "passport-inventory", "sparrow-os"],
        description: "A room where time does not pass normally — the architectural manifestation of the asylum application process."},
    {
        id: "systems-choreography",
        title: "Systems Choreography",
        subtitle: "Core Methodology",
        categories: ["systems"],
        tier: 1, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/systems-choreography/400/300",
        connections: ["the-haig-method", "walaw-studio", "impossible-futures-method", "manifesto-architecting-liminal", "architectures-of-belonging-system"],
        description: "The core method: triangulate architecture (space), music (time), and code (logic) to design systems that generate emergence. You set the rules; you don't build the thing."},
    {
        id: "the-haig-method",
        title: "The Haig Method",
        subtitle: "Reality Design Framework",
        categories: ["systems"],
        tier: 1, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/the-haig-method/400/300",
        connections: ["systems-choreography", "walaw-studio", "strategic-mythography", "the-meaning-stack-system"],
        description: "A Reality Design framework treating myths as editable operating systems to engineer cultural change and human agency."},
    {
        id: "walaw-studio",
        title: "Walaw Studio",
        subtitle: "Para-Institution",
        categories: ["systems", "spaces"],
        tier: 1, year: "2022", temporal: "ongoing",
        image: "https://picsum.photos/seed/walaw-studio/400/300",
        connections: ["systems-choreography", "mekena-nyc-initiative", "echo-institute", "impossible-futures-method", "grammy-ventures"],
        description: "A Para-Institution and speculative design lab that builds worlds, not works, using productive discomfort as a catalyst."},
    {
        id: "echo-institute",
        title: "ECHO Institute",
        subtitle: "Narrative Hypervisor",
        categories: ["systems"],
        tier: 1, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/echo-institute/400/300",
        connections: ["walaw-studio", "systems-choreography", "strategic-mythography"],
        description: "The Narrative Hypervisor governing the studio — legitimizing speculative research by flattening time between history and future."},
    {
        id: "the-meaning-stack-system",
        title: "The Meaning Stack (System)",
        subtitle: "Cultural Architecture",
        categories: ["systems", "code"],
        tier: 1, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/the-meaning-stack-system/400/300",
        connections: ["the-haig-method", "derive-engine", "harmonic-field-theory", "the-meaning-stack"],
        description: "A technical architecture treating cultural data as physical dimensions (gravity, light, time debt) to enable Systemic Revelation."},
    {
        id: "architectures-of-belonging-system",
        title: "Architectures of Belonging",
        subtitle: "Displacement Protocol",
        categories: ["systems", "spaces"],
        tier: 1, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/architectures-of-belonging-system/400/300",
        connections: ["mekena-nyc-initiative", "architectures-of-belonging", "systems-choreography"],
        description: "A protocol using art, code, and policy as interchangeable blocks to build pop-up homelands for the displaced body."},
    {
        id: "localization-gap-audit-system",
        title: "Localization Gap Audit (System)",
        subtitle: "Epistemic Defense",
        categories: ["systems", "music", "code"],
        tier: 1, year: "2024", temporal: "historical",
        image: "https://picsum.photos/seed/localization-gap-audit-system/400/300",
        connections: ["localization-gap-audit", "hah-was-app", "maqam-tuning-rules"],
        description: "A forensic protocol exposing the Phonological Erasure of non-Western structures by generative AI models."},
    {
        id: "bureaucratic-surrealism",
        title: "Bureaucratic Surrealism",
        subtitle: "Design Methodology",
        categories: ["systems", "words"],
        tier: 1, year: "2019", temporal: "ongoing",
        image: "https://picsum.photos/seed/bureaucratic-surrealism/400/300",
        connections: ["sparrow-os", "revised-fee-schedule", "passport-inventory", "the-waiting-room", "dictionary-of-silences", "the-forgery"],
        description: "A design methodology weaponizing the language of forms and audits to document the emotional realities bureaucracy tries to erase."},
    {
        id: "menara-infrastructure",
        title: "MENARA",
        subtitle: "Music Sovereignty Infrastructure",
        categories: ["systems"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/menara-infrastructure/400/300",
        connections: ["mashrou-leila-collective", "grammy-ventures", "walaw-studio"],
        description: "A strategic backbone for regional music sovereignty functioning as a Digital Recording Academy for the Middle East."},
    {
        id: "harmonic-field-theory",
        title: "The Harmonic Field",
        subtitle: "System Model",
        categories: ["systems", "music"],
        tier: 1, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/harmonic-field-theory/400/300",
        connections: ["harmonic-field-project", "the-meaning-stack-system", "derive-engine"],
        description: "A multi-agent system modeling music as a dynamic energy transfer (Field Theory) rather than a static commodity."},
    {
        id: "sparrow-os-system",
        title: "SparrowOS (System)",
        subtitle: "Avian Bureaucracy",
        categories: ["systems", "code"],
        tier: 2, year: "2025", temporal: "speculative",
        image: "https://picsum.photos/seed/sparrow-os-system/400/300",
        connections: ["sparrow-os", "bureaucratic-surrealism", "sparrow-os-protocol"],
        description: "An avian bureaucracy enforcing the Transparency Protocol, monitoring the fading opacity of displaced bodies."},
    {
        id: "mobius-engine-system",
        title: "The Möbius Engine (System)",
        subtitle: "Memory Architecture",
        categories: ["systems", "code"],
        tier: 2, year: "2025", temporal: "ongoing",
        image: "https://picsum.photos/seed/mobius-engine-system/400/300",
        connections: ["moebius-engine", "cartography-of-absence"],
        description: "A narrative router that flips between Observed and Shadow realities based on the user's accumulated Temporal Debt."},
    {
        id: "impossible-futures-method",
        title: "Impossible Futures Methodology",
        subtitle: "Strategic Foresight",
        categories: ["systems"],
        tier: 2, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/impossible-futures-method/400/300",
        connections: ["systems-choreography", "walaw-studio", "speculative-narrative-design", "why-were-like-this"],
        description: "A backcasting framework that designs for preposterous scenarios to build strategic resilience against black swan events."},
    {
        id: "glitch-as-revelation",
        title: "The Glitch as Revelation",
        subtitle: "Philosophy",
        categories: ["systems", "images"],
        tier: 2, year: "2012", temporal: "ongoing",
        image: "https://picsum.photos/seed/glitch-as-revelation/400/300",
        connections: ["architecture-in-low-res", "glitch-renderer", "sttm-visual-system"],
        description: "A philosophy framing technical error not as a bug but as a forensic reveal of a system's underlying oppressive structure."},
    {
        id: "strategic-mythography",
        title: "Strategic Mythography",
        subtitle: "Myth Engineering",
        categories: ["systems"],
        tier: 2, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/strategic-mythography/400/300",
        connections: ["the-haig-method", "echo-institute", "impossible-futures-method"],
        description: "The engineering of narrative operating systems to align organizational myths with new environmental complexities."},
    {
        id: "speculative-narrative-design",
        title: "Speculative Narrative Design",
        subtitle: "Fiction as Engineering",
        categories: ["systems"],
        tier: 2, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/speculative-narrative-design/400/300",
        connections: ["impossible-futures-method", "systems-choreography", "manifesto-architecting-liminal"],
        description: "An engineering methodology using fiction as a blueprint to reverse-engineer the technology required for survivable futures."},
    {
        id: "ucl-bartlett",
        title: "The Bartlett (UCL)",
        subtitle: "Architecture MArch",
        categories: ["spaces"],
        tier: 2, year: "2012", temporal: "historical",
        image: "https://picsum.photos/seed/ucl-bartlett/400/300",
        connections: ["aub-architecture", "architecture-in-low-res", "bernard-khoury"],
        description: "A master's in architecture that established the systems-thinking and forensic spatial analysis at the core of the practice."},
    {
        id: "aub-architecture",
        title: "AUB Architecture",
        subtitle: "BArch · Beirut",
        categories: ["spaces"],
        tier: 2, year: "2008", temporal: "historical",
        image: "https://picsum.photos/seed/aub-architecture/400/300",
        connections: ["ucl-bartlett", "mashrou-leila-collective", "louvre-abu-dhabi"],
        description: "Undergraduate architecture at the American University of Beirut — where Mashrou' Leila also began."},
    {
        id: "stage-design",
        title: "Stage Architecture",
        subtitle: "ML Tour Design",
        categories: ["spaces", "music"],
        tier: 2, year: "2015", temporal: "historical",
        image: "https://picsum.photos/seed/stage-design/400/300",
        connections: ["mashrou-leila-collective", "ibn-el-leil-album", "architectures-of-belonging"],
        description: "Designing the spatial logic of a live performance as a political act — the stage as a temporary architecture of belonging."},
    {
    id: "rolling-stone",
    title: "Rolling Stone Cover",
    subtitle: "First MENA Artist · 2019",
    categories: ["music","systems"],
    tier: 1, year: "2019", temporal: "historical",
    image: "/images/rolling-stone-mashrou-leila.jpeg",
    connections: ["mashrou-leila-collective","ibn-el-leil-album","cost-of-being-queer-arab"],
    description: "The first Middle Eastern artist featured on the cover of Rolling Stone — a systemic crack in the hegemony of Western music media."},
    {
        id: "grammy-ventures",
        title: "Grammy Global Ventures",
        subtitle: "MENA Strategy",
        categories: ["systems"],
        tier: 1, year: "2023", temporal: "historical",
        image: "https://picsum.photos/seed/grammy-ventures/400/300",
        connections: ["mashrou-leila-collective", "walaw-studio", "menara-infrastructure"],
        description: "Consulting on MENA market strategy for Grammy Global Ventures — translating cultural specificity into institutional infrastructure."},
    {
        id: "beau-griffin",
        title: "Beau & Griffin",
        subtitle: "Animal Collaborators",
        categories: ["systems"],
        tier: 3, year: "2020", temporal: "ongoing",
        image: "https://picsum.photos/seed/beau-griffin/400/300",
        connections: ["nebucat", "space-time-tuning-machine"],
        description: "The cat and the dog as recurring presences — witnesses to the work, appearing in writing, visual systems, and the Nebucat persona."},
    {
    id: "ai-music-archive",
    title: "427 AI Tracks Archive",
    subtitle: "Research Corpus",
    categories: ["music","code"],
    tier: 1, year: "2024", temporal: "historical",
    image: "/images/portfolio-tracks.jpeg",
    connections: ["localization-gap-audit","tebr-project","projectarium-ai"],
    description: "A 427-track research corpus generated across Suno, Udio, and custom pipelines — the empirical foundation of the Localization Gap Audit."},
    {
        id: "the-forgery",
        title: "The Forgery",
        subtitle: "Therapeutic Memory Service",
        categories: ["systems", "words"],
        tier: 3, year: "2026", temporal: "speculative",
        image: "https://picsum.photos/seed/the-forgery/400/300",
        connections: ["souad-novella", "bureaucratic-surrealism", "the-archive-conceptual"],
        description: "A speculative service that fabricates false memories of home — certified, notarized, and delivered by post."},
    {
        id: "sometimes-i-wake-up-elsewhere",
        title: "Sometimes I Wake Up Elsewhere",
        subtitle: "Performance / Sound · 2022",
        categories: ["music", "spaces", "words"],
        tier: 1, year: "2022", temporal: "historical",
        image: "https://picsum.photos/seed/sometimes-i-wake-up-elsewhere/400/300",
        connections: ["space-time-tuning-machine", "1000-strings-at-rest", "cartography-of-absence", "nowhere-elsewhere"],
        description: "A live performance built from misremembered coordinates — violin, voice, and the specific sound of waking up in a city that is not yours."},
    {
        id: "the-annex-libretto",
        title: "The Annex (Libretto)",
        subtitle: "Music Theatre Text · 2024",
        categories: ["words", "music", "spaces"],
        tier: 1, year: "2024", temporal: "ongoing",
        image: "https://picsum.photos/seed/the-annex-libretto/400/300",
        connections: ["the-annex-stage", "cartography-of-absence", "mashrou-leila-lyrics", "bureaucratic-surrealism"],
        description: "A libretto for a music theatre piece set in a liminal space between eviction and arrival. The stage machinery becomes a bureaucratic body."},
    {
        id: "map-of-the-wound",
        title: "Map of the Wound",
        subtitle: "Participatory Performance · 2019",
        categories: ["spaces", "music", "systems"],
        tier: 1, year: "2019", temporal: "historical",
        image: "https://picsum.photos/seed/map-of-the-wound/400/300",
        connections: ["mashrou-leila-collective", "architectures-of-belonging", "1000-strings-at-rest", "stage-design"],
        description: "A participatory performance mapping collective grief cartographically — audiences marked locations of loss on a shared diagram that became the score."},
    {
        id: "the-composite-tongue",
        title: "The Composite Tongue",
        subtitle: "Language System · 2023",
        categories: ["words", "systems", "code"],
        tier: 1, year: "2023", temporal: "ongoing",
        image: "https://picsum.photos/seed/the-composite-tongue/400/300",
        connections: ["mashrou-leila-lyrics", "localization-gap-audit", "maqam-tuning-rules", "cartography-of-absence", "dictionary-of-silences"],
        description: "A constructed language built from the syntactic residue of five languages spoken in a single household — Arabic, French, English, Armenian, Silence."}];

export const LONG_DESCRIPTIONS = {
        "mashrou-leila-collective": {
            banner: "https://images.unsplash.com/photo-1514525253361-bee243870eb2?auto=format&fit=crop&q=80&w=1000",
            longDescription: "Mashrou' Leila was not just a band; it was a high-stakes social system designed to create a counter-public. Over 14 years, it became a sonic architecture for the Arab Spring and its aftermath, where the audience co-authored the meaning of resistance. By weaponizing pop culture, the project tested the limits of free speech and gender performativity in the Middle East, amassing over 500 million streams while being banned in multiple countries.",
            details: [
            {"label":"Role","value":"Co-founder / Violinist"},
            {"label":"Years","value":"2008–2022"},
            {"label":"Reach","value":"500M+ Streams"},
            {"label":"Status","value":"Historical Archive"}],
            sections: [
            {"title":"The Sonic Architecture","body":"The music functioned as a spatial intervention, transforming concert halls into temporary autonomous zones where the laws of the state were suspended in favor of a collective emotional truth."},
            {"title":"Systemic Erasure","body":"Following the banning of the band in Egypt and Jordan, the project became a case study in how authoritarian regimes dismantle cultural infrastructure, leading to a pivot towards archival preservation."}]},
    "localization-gap-audit": {
        longDescription: "A forensic audit of 427 AI-generated tracks proving the structural erasure of microtonal Maqam systems by Western-trained generative models. This research exposes the 'Localization Gap'—the dissonance between the promise of universal AI and the reality of its training data, which enforces a Western 12-tone hegemony.",
        details: [
            { label: "Type", value: "Forensic Research" },
            { label: "Corpus", value: "427 Generated Tracks" },
            { label: "Tools", value: "Suno, Udio, Python" },
            { label: "Year", value: "2024" }],
        sections: [
            { title: "Methodology", body: "Using a custom pipeline to generate culturally specific musical forms, the audit measures the 'drift'—the distance between the requested Maqam structure and the Western scale the model collapses it into." },
            { title: "Cultural Sovereignty", body: "The project argues for 'Algorithm Sovereignty'—the right of a culture to be represented accurately in the latent space of the machines that will narrate the future." }]},
    "harmonic-field-project": {
        longDescription: "The Harmonic Field Project is a multi-agent AI framework that models music not as a sequence of notes, but as a complex system of energy transfer. By treating harmony as a gravitational field, it allows for the simulation of emotional resonance and the prediction of how a melody will propagate through a cultural space.",
        details: [
            { label: "System", value: "Multi-Agent Simulation" },
            { label: "Dimensions", value: "7 Energy Vectors" },
            { label: "Status", value: "Prototype v2.0" }],
        sections: [
            { title: "Field Theory", body: "Drawing from physics, the system assigns 'mass' to specific intervals and 'velocity' to rhythmic structures, allowing the composition to emerge from the interaction of these forces." }]},
    "space-time-tuning-machine": {
        longDescription: "A techno-mythological instrument built from scrap electronics, repurposed sensors, and custom code. The machine 'tunes' noise into the frequency of a home that no longer exists, serving as a physical interface for the longing of the diaspora.",
        details: [
            { label: "Medium", value: "Hardware / Code / Sound" },
            { label: "Components", value: "Scrap Electronics, Lidar" },
            { label: "Exhibited", value: "London, Berlin, NYC" }],
        sections: [
            { title: "The Tuning Ritual", body: "The performance involves the live calibration of the machine, where the performer attempts to stabilize the signal against the entropy of the system—a metaphor for the maintenance of memory in exile." }]},
    "cartography-of-absence": {
        longDescription: "A 108-entry dream cycle structured as a bureaucratic archive. This literary work maps the internal landscape of displacement, organizing the trauma of losing a homeland into nine 'Houses' (e.g., The House of Language, The House of Grief, The House of Bureaucracy).",
        details: [
            { label: "Format", value: "Literary Archive" },
            { label: "Entries", value: "108 Dreams" },
            { label: "Structure", value: "9 Houses" }],
        sections: [
            { title: "Bureaucratic Surrealism", body: "The text adopts the cold, clinical tone of an audit report to describe highly emotional and surreal dream states, highlighting the absurdity of processing human suffering through legal forms." }]},
    "architecture-in-low-res": {
        longDescription: "A master's thesis and visual research project arguing that the 'glitch' is not an error, but a forensic revelation. In a resolution-obsessed world, the low-res image or the corrupted file reveals the underlying structure of the transmission medium and the political forces that control it.",
        details: [
            { label: "Institution", value: "UCL Bartlett" },
            { label: "Year", value: "2012" },
            { label: "Format", value: "Visual Thesis" }],
        sections: [
            { title: "The Aesthetics of Decay", body: "Focusing on the transmission of images from conflict zones, the project analyzes how compression artifacts become a secondary layer of information, encoding the violence of the distance." }]},
        "systems-choreography": {
            longDescription: "The core methodology of the practice. Systems Choreography triangulates Architecture (space), Music (time), and Code (logic) to rehearse impossible futures. It posits that by designing the rules of interaction rather than the final object, we can engineer emergence.",
            details: [
            {"label":"Discipline","value":"Methodology"},
            {"label":"Components","value":"Space, Time, Logic"},
            {"label":"Application","value":"Design & Strategy"}],
            sections: [
            {"title":"Rehearsing the Future","body":"The method treats every project as a simulation—a safe space to test the parameters of a future reality before it arrives, allowing for strategic adaptation and resilience."}]},
    "the-haig-method": {
        longDescription: "A Reality Design framework that treats myths, stories, and organizational narratives as 'operating systems' that can be patched, upgraded, or rewritten. It is used to engineer cultural change and restore human agency in complex technical systems.",
        details: [
            { label: "Type", value: "Strategic Framework" },
            { label: "Client Base", value: "Institutions / Brands" },
            { label: "Focus", value: "Narrative Engineering" }],
        sections: [
            { title: "Myth As OS", body: "Just as software governs hardware, myths govern societies. By identifying the 'deprecated code' in a cultural narrative, we can write new protocols for behavior and belief." }]},
    "walaw-studio": {
        longDescription: "A Para-Institution and speculative design lab. Walaw Studio builds worlds, not just works. It operates at the intersection of art, technology, and policy, using 'productive discomfort' as a catalyst for innovation and new forms of belonging.",
        details: [
            { label: "Founded", value: "2022" },
            { label: "Location", value: "Beirut / NYC / Cloud" },
            { label: "Output", value: "Worlds & Systems" }],
        sections: [
            { title: "Para-Institutionalism", body: "Operating alongside but distinct from traditional institutions, the studio creates temporary infrastructures that model the support systems missing from the real world." }]},
    "mekena-nyc-initiative": {
        longDescription: "A system of care masquerading as a building. The Mekena initiative transforms a residential property in Queens into a sanctuary for the permanently transient—artists and thinkers living in the gaps between visas and citizenships.",
        details: [
            { label: "Location", value: "Queens, NYC" },
            { label: "Type", value: "Residency / Sanctuary" },
            { label: "Status", value: "Active" }],
        sections: [
            { title: "Radical Hospitality", body: "The space operates on a logic of 'unconditional welcome,' challenging the hostility of the surrounding immigration apparatus and providing a physical anchor for the displaced." }]},
    "bureaucratic-surrealism": {
        longDescription: "A design methodology that weaponizes the language of forms, audits, and legal documents. By documenting the emotional and surreal realities of displacement using the strict, grid-like logic of bureaucracy, it exposes the system's inability to contain human experience.",
        details: [
            { label: "Medium", value: "Text / Design" },
            { label: "Style", value: "Clinical / Absurdist" },
            { label: "Origin", value: "2019" }],
        sections: [
            { title: "The Form as Canvas", body: "Reclaiming the aesthetic of the visa application and the rejection letter, turning instruments of control into sites of poetic resistance." }]},
    "derive-engine": {
        longDescription: "A Negentropic Machine and navigation engine. DERIVE uses vector embeddings to map memory and culture based on 'resonance' rather than keyword similarity. It allows users to drift through a digital archive as one would drift through a city.",
        details: [
            { label: "Tech Stack", value: "Vector DB / AI" },
            { label: "Function", value: "Cultural Navigation" },
            { label: "Goal", value: "Serendipity" }],
        sections: [
            { title: "Against Search", body: "SEARCH assumes you know what you are looking for. DERIVE assumes you don't. It optimizes for the 'fortunate accident' that reveals new connections between disparate ideas." }]},
    "the-meaning-stack": {
        longDescription: "A federated technical architecture designed to process 'culture' rather than raw data. The Meaning Stack moves from the 'Sensorium' (input) to 'Veracity' (truth), proposing a new layer for the internet protocol that accounts for context and provenance.",
        details: [
            { label: "Layers", value: "Sensorium → Veracity" },
            { label: "Application", value: "Web3 / AI Governance" },
            { label: "Concept", value: "2025" }],
        sections: [
            { title: "Encoding Context", body: "Current data structures strip context. The Meaning Stack re-attaches the social and historical metadata required to understand information, preventing the 'context collapse' typical of social media." }]},
    "impossible-futures-method": {
        longDescription: "A strategic foresight framework that uses 'backcasting from the impossible.' It identifies a desirable but seemingly impossible future, and then works backward to identify the technological or social leaps required to make it inevitable.",
        details: [
            { label: "Strategy", value: "Backcasting" },
            { label: "Horizon", value: "10-50 Years" },
            { label: "Outcome", value: "Strategic Resilience" }],
        sections: [
            { title: "Preposterous Designs", body: "By explicitly designing for 'preposterous' scenarios, we stretch our strategic imagination and build resilience against 'Black Swan' events that linear forecasting misses." }]},
    // ── MUSIC ──────────────────────────────────────────────────────────────
    "ibn-el-leil-album": {
        longDescription: "Ibn El Leil — Son of the Night — is a concept album tracing a single night through the city. Released in 2015, it maps Beirut's queer underground: the bars, the checkpoints, the apartments lit at 3am. Every track is a room. Every room is a risk. Critically lauded as one of the defining records of Arabic alternative music.",
        details: [
            { label: "Released", value: "2015" },
            { label: "Label", value: "Wrasse Records (UK)" },
            { label: "Role", value: "Violinist / Composer" },
            { label: "Streams", value: "50M+" }],
        sections: [
            { title: "Sonic Architecture", body: "The album builds each song as a spatial event — an alley, a kitchen, a dancefloor. Strings are treated as structural walls, oud as windows. The music doesn't describe the city; it builds it." },
            { title: "Critical Reception", body: "Named among the best albums of the decade by NPR World Music and The Guardian. The track Tayf became the anthem of Lebanon's 2019 protests, sung a cappella in Martyrs' Square." }]},
    "raasuk-album": {
        longDescription: "Raasük ('They Danced You') — Mashrou' Leila's second album — arrived at the height of the Arab Spring. More politically urgent and sonically raw than their debut, it treated the dancefloor as a political arena. The title is a conjugation that makes the body both subject and object of revolutionary movement.",
        details: [
            { label: "Released", value: "2009" },
            { label: "Role", value: "Violinist / Co-composer" },
            { label: "Context", value: "Arab Spring era" }],
        sections: [
            { title: "The Choreography of Protest", body: "Each track is structured around a collective body in motion — the crowd, the march, the vigil. The album reads as a score for mass gatherings, with silences that map the pauses between confrontations." }]},
    "tebr-project": {
        longDescription: "TEBR is a speculative AI-human duo built around a single proposition: what if the glitch were the music, and not the mistake? Haig performs live violin against an AI partner trained on Maqam structures, diaspora field recordings, and intentional degradation algorithms. The result is Future Folklore — music for a culture that has already half-forgotten itself.",
        details: [
            { label: "Format", value: "Live Duo / Album" },
            { label: "AI Partner", value: "Custom Gemini Pipeline" },
            { label: "Status", value: "In Development" }],
        sections: [
            { title: "Glitch as Heritage", body: "The AI is not trying to correct its errors. The corruption of the transmission is the transmission. Every skipped frequency is a trace of a song that was never allowed to complete." }]},
    "1000-strings-at-rest": {
        longDescription: "An installation of 1000 strings — violin, oud, qanun, cello — suspended in a climate-controlled room, never played. The instruments are tuned to the tonic of specific Maqam modes. Visitors are invited to listen to the resonance of the room itself as the strings vibrate from ambient sound and breath.",
        details: [
            { label: "Medium", value: "Installation / Sound" },
            { label: "Instruments", value: "1000 suspended strings" },
            { label: "Duration", value: "3-month run" }],
        sections: [
            { title: "The Silence of Exile", body: "The unplayed instrument is not silent — it carries the pressure of all the music it was prevented from making. The installation makes this weight physical and audible." }]},
    "songs-lost-to-time": {
        longDescription: "A generative soundscape that reconstructs songs from fragments — incomplete melodies, misremembered lyrics, partial harmonies — contributed by displaced Levantine musicians. The system weaves these fragments into new compositions that are recognizable but not quite real, like a song heard through a wall.",
        details: [
            { label: "Format", value: "Generative Audio / Installation" },
            { label: "Source Material", value: "Diaspora field recordings" },
            { label: "Status", value: "Prototype" }],
        sections: [
            { title: "Algorithmic Memory", body: "The system doesn't fill the gaps — it makes them audible. The silences and hesitations in the source recordings are preserved and amplified, turning incompleteness into compositional structure." }]},
    "sunburn-installation": {
        longDescription: "A living score for violin and AI conductor driven by real-time climate data. As heat indices climb, the composition becomes more fragmented, more dissonant. When temperature exceeds historical norms for a given location, the system enters a state called Thermal Grief — a mode of sustained silence punctuated by single bowed tones.",
        details: [
            { label: "Format", value: "Live Performance / Installation" },
            { label: "Data Source", value: "NASA GISS Climate API" },
            { label: "Status", value: "Speculative / 2026" }],
        sections: [
            { title: "Music as Climate Record", body: "Each performance is unique and unrepeatable because the climate data that drives it is unrepeatable. The archive of the work is, by design, a climate record disguised as a score." }]},
    "maqam-tuning-rules": {
        longDescription: "A library of algorithmic constraints — written in Python — that enforce microtonal fidelity when generating music in Maqam modes. Where Western generative models collapse quarter-tones into the nearest semitone, these rules preserve the precise intonation that carries the emotional identity of each Maqam.",
        details: [
            { label: "Format", value: "Open Source Library" },
            { label: "Language", value: "Python" },
            { label: "Modes Covered", value: "14 core Maqamat" }],
        sections: [
            { title: "Cultural Sovereignty as Code", body: "Music theory is not neutral. The 12-tone equal temperament standard is a colonial imposition. These rules are a technical act of cultural sovereignty — encoding what the dominant systems erase." }]},
    "rolling-stone": {
        longDescription: "In 2019, Mashrou' Leila became the first Arab act featured on the cover of Rolling Stone Middle East. The image — shot in the ruins of a Beirut villa — used the language of rock mythology to make a queer Arab band legible to a global media apparatus that had never prioritized this story.",
        details: [
            { label: "Publication", value: "Rolling Stone ME" },
            { label: "Year", value: "2019" },
            { label: "Significance", value: "First MENA cover artist" }],
        sections: [
            { title: "A Structural Crack", body: "The cover was not a celebration. It was an argument — evidence that the category of 'world music' was a containment strategy, and that Arab artists belonged on the same pages as everyone else." }]},
    "grammy-ventures": {
        longDescription: "Consulting engagement with Grammy Global Ventures to develop the strategy for their MENA market entry. The work involved mapping the infrastructure gaps — royalty collection, artist development, live performance economies — and designing the cultural framework required to build institutional legitimacy in the region.",
        details: [
            { label: "Client", value: "Grammy Global Ventures" },
            { label: "Year", value: "2023" },
            { label: "Focus", value: "MENA Strategy" }],
        sections: [
            { title: "Infrastructure as Culture", body: "Music awards are not just prizes. They are governance mechanisms that determine whose music counts. The engagement was about redesigning the criteria of legitimacy from the inside." }]},
    "stage-design": {
        longDescription: "The stage design for Mashrou' Leila tours (2013–2019) treated performance space as an argument. Every element — the raked platform, the strip-light grid, the position of the violin — was a political decision about visibility, hierarchy, and the architecture of the shared moment.",
        details: [
            { label: "Role", value: "Creative Director / Designer" },
            { label: "Tours", value: "3 international tours" },
            { label: "Venues", value: "Festival stages, Europe & MENA" }],
        sections: [
            { title: "Temporary Architecture", body: "A concert stage lasts hours. But the geometry of attention it creates — who is elevated, who is in shadow, where the audience is directed to look — has the same political stakes as any permanent building." }]},
    "ai-music-archive": {
        longDescription: "A corpus of 427 AI-generated tracks produced across Suno, Udio, and custom Gemini pipelines. Each track was generated with a specific Maqam mode, rhythm pattern, and regional style prompt. The archive forms the empirical foundation of the Localization Gap Audit, serving as the evidence base for claims about phonological erasure.",
        details: [
            { label: "Tracks", value: "427" },
            { label: "Platforms", value: "Suno, Udio, Gemini API" },
            { label: "Purpose", value: "Forensic Research Corpus" }],
        sections: [
            { title: "Documentation Protocol", body: "Each track in the archive is tagged with: the prompt used, the target Maqam, the detected Maqam (via custom analysis), and the drift score — the measured distance between cultural intent and AI output." }]},
    "people-like-us-score": {
        longDescription: "A soundtrack commission for a documentary about contemporary Arabs living in diaspora. The score strips the orientalist tropes — no oud-over-strings exoticism, no quarter-tone clichés used as cultural shorthand — and replaces them with the actual sound of the subjects: ambient apartment recordings, phone audio, the hum of a specific city.",
        details: [
            { label: "Format", value: "Film Score" },
            { label: "Approach", value: "Anti-exoticist" },
            { label: "Tools", value: "Field Recording + Violin" }],
        sections: [
            { title: "Against the Score", body: "Music in documentary is usually used to tell the audience how to feel. This score refuses that contract. It creates space for the subjects to exist without being explained." }]},
    // ── IMAGES ────────────────────────────────────────────────────────────
    "heroes-transitional-time": {
        longDescription: "A visual series examining the mythology of male heroism through endless, failed auditions. The subjects — all men in various states of readiness — are photographed in the waiting state: suited for a battle that has already happened, auditioning for a role that no longer exists. The series questions who gets to be legible as a hero in post-war Arab cultural space.",
        details: [
            { label: "Medium", value: "Photography / Video" },
            { label: "Year", value: "2018" },
            { label: "Site", value: "Beirut" }],
        sections: [
            { title: "The Costume of Heroism", body: "Every subject was dressed in their version of the heroic uniform — gathered from pop culture, family photos, national mythology. The series catalogs this as a shared, aging wardrobe." }]},
    "sttm-visual-system": {
        longDescription: "The visual language developed for the Space Time Tuning Machine — a generative system that renders the audio output of the instrument as real-time visual fields. Glitch aesthetics, Maqam-derived color mappings, and topographic noise create a visual score that maps exile as an unstable landscape.",
        details: [
            { label: "Tech", value: "TouchDesigner / p5.js / AI" },
            { label: "Format", value: "Live Visuals / Installation" },
            { label: "Status", value: "Active" }],
        sections: [
            { title: "Synesthetic Translation", body: "Each Maqam mode is assigned a color temperature and a visual texture. As the machine shifts between frequencies, the visual field shifts between climates — from the cool blue of Rast to the burnt amber of Hijaz." }]},
    "roman-music-video": {
        longDescription: "The music video for Roman (Mashrou' Leila, 2019) is a visual manifesto in six minutes. Set in a mythologized Beirut villa, it stages a feminist and queer coup — women and queer bodies occupying the architecture of patriarchal power. Directed as a collaboration, every frame is a political image about who is allowed to own space.",
        details: [
            { label: "Year", value: "2019" },
            { label: "Views", value: "8M+" },
            { label: "Awards", value: "Arab Music Video Award" }],
        sections: [
            { title: "The Director's Frame", body: "The video was shot entirely in locations traditionally coded as masculine — the villa, the salon, the war room — and reoccupied by figures the architecture was never designed to house. The political gesture is spatial, not thematic." }]},
    "storylines-knowledge-graph": {
        longDescription: "A knowledge graph of 10,000 literary works — novels, stories, poems, essays — structured by semantic gravity rather than genre or chronology. Books exert pull on each other based on shared emotional registers, structural patterns, and cultural resonance. The graph maps the collective unconscious as a navigable spatial field.",
        details: [
            { label: "Nodes", value: "10,000 works" },
            { label: "Method", value: "Zero-shot LLM semantic embedding" },
            { label: "Visual", value: "Force-directed 3D graph" }],
        sections: [
            { title: "Against the Canon", body: "The graph does not privilege canonical works. A Levantine folk tale and a Modernist novel occupy the same space if their emotional resonance is equivalent. The topology of the graph is its argument about literary value." }]},
    "1000-strings-visual": {
        longDescription: "The visual dimension of the 1000 Strings installation: time-lapse photography of the strings over the course of a day, ambient sound recordings of the room's resonant frequencies, and a projected text work mapping which songs are legally unplayable in which countries. The visual layer makes the political geography of musical prohibition physical.",
        details: [
            { label: "Medium", value: "Photography / Projection / Text" },
            { label: "Duration", value: "Installation" },
            { label: "Year", value: "2019" }],
        sections: [
            { title: "The Map of Prohibition", body: "The projected text lists songs — not by name, but by the jurisdiction in which they are banned. The room becomes a legal atlas, mapping the borders that music cannot cross." }]},
    "drone-bird-schematics": {
        longDescription: "Technical blueprints drawn in the style of ornithological field guides for a chimera of the Anthropocene: a surveillance drone disguised as a migrating crane. The schematics appear scientific but describe an impossibility — a machine that is also an animal, a weapon that is also a migration pattern.",
        details: [
            { label: "Format", value: "Design Fiction / Drawing" },
            { label: "Style", value: "Ornithological Field Guide" },
            { label: "Status", value: "Speculative" }],
        sections: [
            { title: "The Military Pastoral", body: "The work occupies the gap between the beauty of bird migration and the violence of drone warfare — two systems that use the same sky for opposite purposes. The schematics refuse to distinguish between them." }]},
    "sophies-world": {
        longDescription: "A short video essay following an AI assistant named Sophie as she searches for a perfect home in a post-human landscape. Made in 2014, before large language models were publicly available, the work used early text-generation tools to simulate an AI's longing — and found it indistinguishable from human homesickness.",
        details: [
            { label: "Format", value: "Video Essay" },
            { label: "Duration", value: "12 minutes" },
            { label: "Year", value: "2014" }],
        sections: [
            { title: "Prophetic Loneliness", body: "Revisiting the work in 2024, the AI's stated desires — for continuity, for a body, for a location that doesn't change — now read as a blueprint for the anxieties of contemporary AI systems." }]},
    "ghost-city-data-sculpture": {
        longDescription: "A data sculpture of Beirut composed entirely of negative space — the footprints of demolished buildings, the outlines of censored murals, the coordinates of addresses erased from maps. The physical sculpture is empty where the city once stood, and occupied only where it was destroyed.",
        details: [
            { label: "Medium", value: "Data Sculpture / 3D Print" },
            { label: "Data Source", value: "Urban archive + demolition records" },
            { label: "Status", value: "Prototype" }],
        sections: [
            { title: "The True Map", body: "Urban maps typically show what exists. This map shows only what was removed. The thesis: the truest map of any city is a record of its losses, not its assets." }]},
    "the-autopsy-interface": {
        longDescription: "A web-based game structured as a neural network diagnostic tool. The player is a technician processing memory fragments — images, audio clips, text — and must classify each as Identity (authentic) or Corruption (AI confabulation). The game reveals, over time, that the distinction is impossible to make reliably.",
        details: [
            { label: "Format", value: "Browser Game / Interactive" },
            { label: "Status", value: "Speculative / 2026" },
            { label: "Engine", value: "React + Gemini API" }],
        sections: [
            { title: "The Unreliable Technician", body: "After 50 rounds, the game reveals the player's own accuracy score alongside a question: if you cannot distinguish real memory from fabricated memory, what does that make you?" }]},
    "crying-superhero": {
        longDescription: "A recurring speculative figure — a masked superhero whose single distinguishing power is the capacity to cry publicly. The figure appears across writing, visual work, and performance. The mask, coded as protection, here functions as amplification: it makes the grief more visible, more mythic, more structurally legible.",
        details: [
            { label: "Medium", value: "Illustration / Performance / Writing" },
            { label: "Status", value: "Ongoing" }],
        sections: [
            { title: "Masculinity and the Mask", body: "The superhero is coded male but performs the grief culturally assigned to femininity. The mask is what makes this grief permissible — public, theatrical, and therefore safe to witness." }]},
    "galaxy-birds": {
        longDescription: "A series of geometric avian forms — part architectural drawing, part spirit animal — designed as totems for the diaspora. Each bird corresponds to a city on the Beirut–London–New York axis, rendered in the visual language of astronomical charts: precise, geometric, and oriented to a north that doesn't exist on any map.",
        details: [
            { label: "Medium", value: "Digital Illustration / Print" },
            { label: "Series", value: "12 birds, 12 cities" },
            { label: "Status", value: "Ongoing" }],
        sections: [
            { title: "Wayfinding Without a Map", body: "The birds are navigation instruments for a people whose landmarks have been destroyed. They orient toward memory, not geography — toward where something was, not where it is." }]},
    "glitch-renderer": {
        longDescription: "A technical mode built for the STORYLINES and DERIVE interfaces — a rendering layer that visually corrupts text to simulate cognitive instability, the deterioration of memory under pressure, and the experience of reading in a language you are losing. The glitch is not decorative; it is forensic.",
        details: [
            { label: "Format", value: "Software Library" },
            { label: "Language", value: "JavaScript / Canvas API" },
            { label: "Used In", value: "DERIVE, STORYLINES, STTM" }],
        sections: [
            { title: "Rendering Forgetting", body: "The intensity of the corruption is calibrated to the emotional weight of the content — the more politically fraught the text, the more aggressively the renderer decays it." }]},
    "nebucat": {
        longDescription: "Nebucat is a cynical digital witness — a cat avatar existing at the intersection of speculative worldbuilding and online persona. Part extension of the real cat Beau, part autonomous digital entity, Nebucat narrates the absurdities of the Anthropocene from a permanently detached, wryly amused remove.",
        details: [
            { label: "Medium", value: "Digital / Social / Installation" },
            { label: "Origin", value: "Beau (the actual cat)" },
            { label: "Platform", value: "Multi-platform" }],
        sections: [
            { title: "The Witness Function", body: "The cat's detachment is the point. In a world of constant performative urgency, the figure who simply watches and occasionally offers a verdict provides a different kind of political commentary." }]},
    // ── WORDS ─────────────────────────────────────────────────────────────
    "souad-novella": {
        longDescription: "A baroque novella set in Beirut during the civil war. Souad — the protagonist — runs a substitution economy: forging papers, swapping identities, renting out the performance of femininity. The architecture of the story mirrors the architecture of the city: rooms that connect to other rooms by passages that used to be walls.",
        details: [
            { label: "Format", value: "Novella" },
            { label: "Year", value: "2017" },
            { label: "Pages", value: "~140" }],
        sections: [
            { title: "The Economy of Performance", body: "Souad doesn't have an identity — she has a catalog. Every chapter introduces a new self that she inhabits until it stops being useful. The novel argues that in war, survival is an act of constant costume change." },
            { title: "Architectural Structure", body: "Each chapter is named after a room in an apartment. The plot moves through the city the way water moves through a building in disrepair: finding new routes as old ones collapse." }]},
    "mashrou-leila-lyrics": {
        longDescription: "The lyrics of Mashrou' Leila were written as semantically open systems — porous enough that a queer listener in Beirut and a nationalist listener in Jordan could both claim ownership. This was not ambiguity; it was architectural precision. The texts were designed to create maximum resonance across incompatible reading positions.",
        details: [
            { label: "Language", value: "Levantine Arabic" },
            { label: "Output", value: "6 albums, 70+ songs" },
            { label: "Method", value: "Collective authorship" }],
        sections: [
            { title: "Porous Verse", body: "The technique: avoid pronouns where possible, keep referent ambiguous, overload the word with historical weight. The listener does the final assembly. The meaning is completed in the body of the audience." }]},
    "cost-of-being-queer-arab": {
        longDescription: "An op-ed published in The New York Times in 2019 following the cancellation of Mashrou' Leila's concert in Egypt. Rather than an emotional account, the piece deployed the language of economic analysis — presenting queerness in the Arab world as a resource with a measurable cost structure, a risk premium, and a market.",
        details: [
            { label: "Publication", value: "The New York Times" },
            { label: "Year", value: "2019" },
            { label: "Context", value: "Post-Egypt concert ban" }],
        sections: [
            { title: "Testimony as Architecture", body: "The deliberate choice to use economic language — cost, premium, market — rather than emotional language was a political decision. It makes the personal structurally legible to the institutions that respond to nothing else." }]},
    "nowhere-elsewhere": {
        longDescription: "A dream cycle that maps the nine interior Houses of a displaced person: Language, Grief, Bureaucracy, Weather, Food, Sex, Sleep, Debt, and Return. Each House is described in precise architectural terms — dimensions, materials, exits — as if filing a report on an address that exists only inside.",
        details: [
            { label: "Format", value: "Literary Cycle / Performance" },
            { label: "Structure", value: "9 Houses × 12 dreams" },
            { label: "Status", value: "Ongoing" }],
        sections: [
            { title: "Interior Architecture", body: "The work treats psychological states as physical spaces with measurable properties. The House of Bureaucracy has no windows; the only exit requires a form that is perpetually out of stock." }]},
    "why-were-like-this": {
        longDescription: "A series of documentary scripts examining the systems — algorithmic, social, economic — that have shaped the contemporary human spirit. Each script follows a different 'specimen': an influencer, a content moderator, an AI trainer, a grief counselor. The thesis: we are not broken, we are behaving exactly as the systems require.",
        details: [
            { label: "Format", value: "Documentary Scripts" },
            { label: "Episodes", value: "6 written, 2 in development" },
            { label: "Status", value: "Seeking co-production" }],
        sections: [
            { title: "The Specimen Model", body: "Each episode profiles a human whose behaviour is, on the surface, unusual or pathological — and then reveals the precise system that makes this behaviour the only rational response." }]},
    "manifesto-architecting-liminal": {
        longDescription: "A foundational text written as a working document for the practice. It declares that stories are infrastructure — that the correct unit of analysis for any cultural problem is not the individual work but the system of production, distribution, and canon formation that makes certain stories possible and others invisible.",
        details: [
            { label: "Format", value: "Manifesto / Working Document" },
            { label: "Year", value: "2024" },
            { label: "Length", value: "~4,000 words" }],
        sections: [
            { title: "Constraints as Catalysts", body: "The manifesto argues that the most productive creative constraints are not technical but political — that working under conditions of impossibility generates forms of thought unavailable to those for whom all options are open." }]},
    "sparrow-os-protocol": {
        longDescription: "A piece of bureaucratic surveillance fiction: the operating manual for a system that monitors displaced persons through an avian agent network. The Transparency Protocol assigns each body a daily opacity score — the lower the score, the less visible you are to the state, and the more rights you forfeit.",
        details: [
            { label: "Format", value: "Speculative Document / Text" },
            { label: "Genre", value: "Bureaucratic Surrealism" },
            { label: "Year", value: "2025" }],
        sections: [
            { title: "The Logic of Visibility", body: "The system documents the precise inverse of democratic rights: transparency is mandatory for those without papers, and opacity is the exclusive privilege of power. The document makes this inversion legible by making it administrative." }]},
    "revised-fee-schedule": {
        longDescription: "An official-looking document listing the fines, levies, and taxes accrued by speaking forbidden words in hostile jurisdictions. The fee schedule covers: the use of pre-war place names ($45 per utterance), the declaration of a home address that no longer exists ($220), and the singing of a banned song in a private vehicle ($85 + processing fee).",
        details: [
            { label: "Format", value: "Bureaucratic Poetry / Document" },
            { label: "Year", value: "2024" }],
        sections: [
            { title: "The Price of Speech", body: "The document is deadpan throughout. The absurdity of the fees is only legible if you know what is being taxed — which is the point. It is written for two audiences simultaneously: those who know, and those who do not yet." }]},
    "dictionary-of-silences": {
        longDescription: "A taxonomy of silence — not as the absence of sound but as a weighted structural element with measurable properties. The dictionary catalogs 37 types, including: Type 3 (Grief Silence, duration 4–11 seconds), Type 12 (The Silence After Crossing a Border), and Type 23 (The Silence of a Song You Cannot Remember Completely).",
        details: [
            { label: "Format", value: "Text / Design Art Object" },
            { label: "Entries", value: "37 types" },
            { label: "Year", value: "2023" }],
        sections: [
            { title: "Silence as Architecture", body: "The dictionary positions silence not as the negative of speech but as its own positive category — a material with structural properties that can be measured, composed with, and deployed intentionally." }]},
    "passport-inventory": {
        longDescription: "A comparative formal analysis of three passports held simultaneously: the Original (Lebanese, restricted), the Refugee (UNHCR, temporary), and the Dream (the imagined travel document of a person for whom no state claims responsibility). The analysis applies standard legal document analysis to expose the fictional nature of all three.",
        details: [
            { label: "Format", value: "Legal Analysis / Art Document" },
            { label: "Year", value: "2024" }],
        sections: [
            { title: "The Legal Fiction of Self", body: "All three documents describe the same person using mutually incompatible legal frameworks. The analysis reveals that 'identity' is not a property of the person but of the institution that issues the document." }]},
    // ── CODE ──────────────────────────────────────────────────────────────
    "hah-was-app": {
        longDescription: "A mobile app that inverts the standard AI evaluation framework. Rather than testing whether a machine can pass as human (Turing), HAH-WAS tests whether a human can correctly identify when AI output is culturally fabricated. The app presents musical fragments, texts, and images and asks: is this real, or is this a hallucination?",
        details: [
            { label: "Platform", value: "iOS / Android" },
            { label: "Tech", value: "React Native + Gemini API" },
            { label: "Status", value: "Beta" }],
        sections: [
            { title: "The Inverted Turing Test", body: "The standard Turing Test asks if a machine can fool a human. HAH-WAS asks if a human can still recognize the cultural truth that the machine has erased. The results, so far, are concerning." }]},
    "storylines-ai": {
        longDescription: "A literary knowledge graph engine that uses zero-shot LLM inference to assign semantic gravity between 10,000 works. Unlike keyword search or genre classification, STORYLINES evaluates works along dimensions of: emotional register, structural architecture, cultural provenance, and temporal urgency. The result is a map of literature as a landscape.",
        details: [
            { label: "Works Indexed", value: "10,000+" },
            { label: "Tech", value: "Neo4j / Gemini / Python" },
            { label: "Status", value: "Active Development" }],
        sections: [
            { title: "Literature as Landscape", body: "The engine does not rank books. It positions them. A reader navigating STORYLINES moves through the graph like a walker in a city — following resonance rather than hierarchy, discovering proximity where none was obvious." }]},
    "moebius-engine": {
        longDescription: "A narrative router that serves two versions of any story simultaneously — the Observed face (the surface reading) and the Shadow face (the suppressed political reading). Which face a user encounters is determined by their accumulated Temporal Debt: the weight of the histories they have not yet reckoned with.",
        details: [
            { label: "Format", value: "Software Architecture" },
            { label: "Tech", value: "Graph DB + LLM + State Machine" },
            { label: "Status", value: "Prototype" }],
        sections: [
            { title: "Two-Sided Reading", body: "The engine draws from the Möbius strip: a surface that has only one side, but which a traveler experiences as two depending on where they begin. The political reading is not hidden — it is simply the other face of the same text." }]},
    "photon-plus": {
        longDescription: "A speculative optical sequencer that treats music composition as a consequence of light physics. Sound events are generated when beams of light collide within a 3D environment — pitch determined by the angle of collision, duration by the path length. The composer does not write notes; they design trajectories.",
        details: [
            { label: "Format", value: "Speculative Instrument / Software" },
            { label: "Status", value: "Concept Stage / 2026" }],
        sections: [
            { title: "Composition as Architecture", body: "The sequencer shifts the act of composition from time-based to space-based. A piece of music is not a sequence of events but a spatial arrangement of light paths whose intersections generate the score." }]},
    "3d-beat-synth": {
        longDescription: "An interactive sound engine that reads body position via webcam and converts skeletal geometry into frequency and rhythm parameters. The human body becomes a tuning fork: lean forward and the timbre hardens; raise your arms and the pitch rises. The instrument is calibrated for Maqam intervals, so the body produces Arabic music by nature.",
        details: [
            { label: "Tech", value: "MediaPipe + Web Audio API" },
            { label: "Platform", value: "Browser-based" },
            { label: "Status", value: "Live Demo Available" }],
        sections: [
            { title: "The Body as Interface", body: "Most digital instruments abstract the body away from the sound. This instrument insists on somatic connection — the sound is not produced by the hand but by the entire weight of the person in space." }]},
    "sparrow-os": {
        longDescription: "A speculative surveillance architecture governed by avian bureaucrats — flocks of sparrows, individually unremarkable, collectively forming a comprehensive monitoring network. The system tracks displaced bodies and assigns them a fading opacity score: the longer you remain outside your registered territory, the less visible you become to the rights-granting apparatus.",
        details: [
            { label: "Format", value: "Software / Installation / Fiction" },
            { label: "Status", value: "Speculative" }],
        sections: [
            { title: "Bureaucracy as Nature", body: "The avian metaphor is precise: surveillance systems are most effective when they appear to be natural, ambient, and non-threatening. The sparrow is everywhere. You don't notice it until it files a report." }]},
    "boids-simulation": {
        longDescription: "An emergent behavior simulation based on Craig Reynolds' boids algorithm, repurposed to model the geometry of cultural connection. Each agent represents a cultural artifact or practice; the flocking behavior maps how ideas travel, cluster, and split when the rules of proximity, alignment, and separation are adjusted.",
        details: [
            { label: "Tech", value: "p5.js / Canvas API" },
            { label: "Format", value: "Interactive Simulation" },
            { label: "Status", value: "Active" }],
        sections: [
            { title: "Emergence as Method", body: "No boid knows the shape of the flock. The pattern only exists at the level of the whole. The simulation is a model for how cultural movements cohere — not through plan but through local rule-following at scale." }]},
    "project-agora": {
        longDescription: "A strategic framework document for a fintech platform designed to enable cross-border micro-payments for creative workers in the Global South. The framework treats tokenization not as a financial instrument but as a cultural infrastructure problem: how do you build the economic plumbing for communities that existing banking systems have systematically excluded?",
        details: [
            { label: "Format", value: "Strategic Framework" },
            { label: "Year", value: "2024" },
            { label: "Focus", value: "Global South creative economy" }],
        sections: [
            { title: "Infrastructure as Justice", body: "The inability to receive payment for creative work across borders is not a technical problem; it is a political one. The framework maps the specific regulatory and infrastructural barriers and proposes a protocol stack to route around them." }]},
    "projectarium-ai": {
        longDescription: "An AI A&R agent built on the Gemini API and trained on a corpus of 10,000+ culturally annotated music reviews. The agent provides specific, culturally literate critique of unreleased tracks — not general quality assessment, but an evaluation of the work's relationship to its stated cultural context.",
        details: [
            { label: "Model", value: "Gemini 2.0 Custom Agent" },
            { label: "Training Corpus", value: "10,000+ annotated reviews" },
            { label: "Status", value: "Prototype" }],
        sections: [
            { title: "The Muse as A&R", body: "The standard A&R meeting asks: will this sell? Projectarium asks: is this culturally honest? Does the work's formal choices align with what it claims about itself? These are different questions with different answers." }]},
    // ── SPACES ────────────────────────────────────────────────────────────
    "architecture-in-low-res-space": {
        longDescription: "The spatial thesis that launched everything: submitted to the Bartlett in 2012, it argued that the compressed, degraded image — the low-resolution photograph transmitted through a bad connection — is not a failed document but a forensically rich one. The thesis proposed an architecture derived from degraded transmission: walls of varying legibility, rooms that become more defined as you approach them.",
        details: [
            { label: "Institution", value: "The Bartlett, UCL" },
            { label: "Year", value: "2012" },
            { label: "Award", value: "MArch Distinction" }],
        sections: [
            { title: "Resolution as Politics", body: "The thesis argued that access to high-resolution images is itself a form of privilege. To see things in low resolution is to see them from the periphery — from the distance of the diaspora, the border, the refugee camp." }]},
        "architectures-of-belonging": {
            banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
            longDescription: "A series of temporary spatial interventions that build what immigration systems refuse to provide: a sense of home for people who cannot legally claim one. Each installation uses art, code, and policy documents as interchangeable building materials, assembling a pop-up homeland for a specific community in a specific place.",
            details: [
            {"label":"Format","value":"Spatial Installation Series"},
            {"label":"Locations","value":"NYC, Beirut, London"},
            {"label":"Status","value":"Ongoing"}],
            sections: [
            {"title":"The Temporary Permanent","body":"The installations are designed to be assembled and disassembled in less than 48 hours — matching the temporality of the communities they serve. A home that can be packed is still a home."},
            {"title":"Test Section Title","body":"Test Section Body text description."}]},
    "bernard-khoury": {
        longDescription: "Three years working in the studio of Bernard Khoury / DW5 in Beirut — one of the Arab world's most politically charged architectural practices. Khoury built on the ruins of the civil war, literally: his projects occupy bomb sites and former checkpoints, treating contested ground as the only honest site for architecture.",
        details: [
            { label: "Firm", value: "Bernard Khoury / DW5" },
            { label: "Years", value: "2008–2011" },
            { label: "Location", value: "Beirut" }],
        sections: [
            { title: "Architecture as Political Act", body: "Working in Khoury's studio established a core conviction: that every architectural decision is a political decision, and that the pretense of neutrality is itself a form of alignment with power." }]},
    "marra-tein-residency": {
        longDescription: "An adaptive reuse project in Hamra, Beirut: transforming a mid-century apartment building into a residency space for artists and researchers. The design philosophy refused to erase the building's history — the renovation kept the damage visible, treating the marks of time and conflict as structural and aesthetic elements.",
        details: [
            { label: "Location", value: "Hamra, Beirut" },
            { label: "Building Type", value: "Residential → Residency" },
            { label: "Year", value: "2013" }],
        sections: [
            { title: "Adaptive Preservation", body: "The project challenged the standard renovation logic — that damage must be repaired before a building can function. Marra.tein argued the opposite: that the damage is the building's most honest material." }]},
    "louvre-abu-dhabi": {
        longDescription: "Contribution to a research and design team working on the interior experience design for the Louvre Abu Dhabi — a museum built to bridge 'universal' heritage and regional identity. The project raised questions that have never been fully resolved: whose universalism? Which objects? Under whose curatorial authority does the 'world' speak?",
        details: [
            { label: "Project", value: "Louvre Abu Dhabi" },
            { label: "Year", value: "2010" },
            { label: "Role", value: "Junior Designer" }],
        sections: [
            { title: "Cultural Diplomacy's Architecture", body: "The museum's famous dome — designed to filter desert light into a constellation pattern — is the building's most honest moment: it has no single viewpoint, no hierarchy, just light diffusing equally in all directions. The political program of the rest of the building is less resolved." }]},
    "chromatoverse": {
        longDescription: "A speculative post-flat interface system that treats code and data as volumetric material to be inhabited rather than read. Where current software presents information on a flat screen surface, Chromatoverse proposes a deep space of layered colored acetate — semi-transparent, navigable in three dimensions — where meaning is generated by how layers interact.",
        details: [
            { label: "Format", value: "Interface Concept / Prototype" },
            { label: "Status", value: "Speculative / 2026" }],
        sections: [
            { title: "Against the Flat Screen", body: "The flat screen is a political form: it implies a single depth of information, a single correct reading position, a single authority. Chromatoverse argues for a volumetric interface where meaning is generated by the reader's position, not the designer's intent." }]},
    "the-archive-conceptual": {
        longDescription: "A speculative climate-controlled repository for partial joys and lost words. The Archive stores not documents but experiences — organized by scent rather than chronology, by weight rather than subject. Each visitor receives a small container of their own deposited memory on exit.",
        details: [
            { label: "Format", value: "Speculative Space / Installation" },
            { label: "Organization", value: "Olfactory taxonomy" },
            { label: "Status", value: "2025 proposal" }],
        sections: [
            { title: "Against Chronology", body: "Standard archives organize by date, by subject, by author. This archive organizes by what it felt like. The system is unnavigable by outsiders and completely legible to the person who deposited the contents." }]},
    "the-annex-stage": {
        longDescription: "A stage design proposal for a liminal performance space that transforms between three configurations within a single performance: void (no surfaces, only light), house (a recognizable domestic interior), and machine (exposed structural systems, industrial). The transitions are visible; the mechanism is part of the work.",
        details: [
            { label: "Format", value: "Stage Design / Spatial Concept" },
            { label: "Status", value: "Speculative / Seeking commission" }],
        sections: [
            { title: "The Visible Mechanism", body: "Most stage design hides its transitions. THE ANNEX insists on showing the machinery of change — the stage transforms visibly, the crew is visible, the artifice is never concealed. The performance is not the content but the transformation between configurations." }]},
    "house-ii-skin": {
        longDescription: "The second installment in the Houses series: the body as contested territory. The project maps scars, stretch marks, tattoos, and medical procedure marks as evidence of border crossings — between states, between selves, between what the body was permitted to be and what it became anyway.",
        details: [
            { label: "Series", value: "Houses (Part II)" },
            { label: "Medium", value: "Photography / Text / Performance" },
            { label: "Status", value: "In Development" }],
        sections: [
            { title: "The Body as Archive", body: "The skin holds a record that no passport does — the history of what a body has survived, chosen, been subjected to. House II reads this archive as architectural evidence." }]},
    "the-waiting-room": {
        longDescription: "A spatial installation simulating the architecture of the asylum application process. The room has several doors, all locked. Chairs arranged as in a waiting room. A ticker read off by a voice: number 47,231. The voice has been reading numbers since 2015 and has not yet reached your number.",
        details: [
            { label: "Format", value: "Durational Installation" },
            { label: "Duration", value: "Open-ended" },
            { label: "Status", value: "Speculative" }],
        sections: [
            { title: "Architecture of Suspension", body: "The waiting room is bureaucracy's spatial form: a room designed to contain people who are not yet permitted to exist in the jurisdiction that built the room. The installation makes this absurdity physical and durational." }]},
    "ucl-bartlett": {
        longDescription: "The MArch at The Bartlett, UCL (2010–2012) formed the theoretical backbone of the practice. The school's Unit 12, known for politically engaged and formally experimental work, produced the environment in which Architecture in Low Res was developed. The Bartlett taught: that form is always argument, and that drawing is a kind of thinking.",
        details: [
            { label: "Institution", value: "University College London" },
            { label: "Degree", value: "MArch Architecture" },
            { label: "Year", value: "2010–2012" }],
        sections: [
            { title: "Form as Argument", body: "The most important thing learned at the Bartlett: that every formal decision is a political position. That neutral architecture does not exist. That the question is not 'what does it look like' but 'what does it claim.'" }]},
    "aub-architecture": {
        longDescription: "Undergraduate architecture at the American University of Beirut (2004–2008). The studio was where Mashrou' Leila was formed — violin lessons happening in one studio while architectural models were being built in the next. The two practices have never been separate; they share the same logic: designing systems of cohabitation.",
        details: [
            { label: "Institution", value: "American University of Beirut" },
            { label: "Degree", value: "BArch" },
            { label: "Years", value: "2004–2008" }],
        sections: [
            { title: "Where Everything Started", body: "The band and the buildings began in the same place, at the same time, with the same people. This simultaneity is not coincidence — it is the founding condition of the practice." }]},
    // ── SYSTEMS ───────────────────────────────────────────────────────────
    "echo-institute": {
        longDescription: "The Narrative Hypervisor governing the practice — a speculative institutional framework that legitimizes the work by flattening time. The ECHO Institute treats 2012 and 2035 as equally present, allowing research into futures that haven't happened yet to be cited with the same authority as historical scholarship.",
        details: [
            { label: "Format", value: "Speculative Institution" },
            { label: "Founded (Speculatively)", value: "2025" },
            { label: "Function", value: "Temporal legitimization" }],
        sections: [
            { title: "The Hypervisor Model", body: "Just as an operating system hypervisor allows multiple systems to run simultaneously without conflict, the ECHO Institute allows the practice to operate in multiple temporal registers without requiring hierarchy between past, present, and future work." }]},
    "the-meaning-stack-system": {
        longDescription: "A technical architecture that extends the standard internet protocol with a semantic layer. The Meaning Stack proposes five additional layers above TCP/IP: Sensorium (raw cultural input), Context Engine, Provenance (source verification), Resonance (cultural weight estimation), and Veracity (truth confidence score). Each layer adds context that current data architectures discard.",
        details: [
            { label: "Type", value: "Protocol Architecture" },
            { label: "Layers", value: "5 semantic layers" },
            { label: "Status", value: "Whitepaper + Prototype" }],
        sections: [
            { title: "Against Context Collapse", body: "Social media destroys context by flattening all information to a single presentable surface. The Meaning Stack re-attaches context at the protocol level — making it structurally impossible to strip." }]},
    "architectures-of-belonging-system": {
        longDescription: "The systemic framework underlying the spatial installation series: a protocol that treats art, code, and policy as interchangeable building blocks for constructing temporary homelands. The protocol specifies how to assemble and disassemble a belonging-space within 48 hours using only locally available materials.",
        details: [
            { label: "Type", value: "System / Protocol" },
            { label: "Components", value: "Art, Code, Policy" },
            { label: "Status", value: "Active" }],
        sections: [
            { title: "Modular Belonging", body: "The most important design constraint: the system must be deployable by six people with no specialist skills and no permanent infrastructure. The protocols are designed to travel in a hand luggage-sized case." }]},
    "localization-gap-audit-system": {
        longDescription: "The forensic research protocol underlying the Localization Gap Audit — a repeatable methodology for measuring phonological erasure in AI music systems. The protocol specifies how to generate culturally annotated test prompts, how to analyze the output for microtonal drift, and how to calculate a Gap Score for any given generative model.",
        details: [
            { label: "Type", value: "Research Protocol" },
            { label: "Outputs", value: "Gap Score + Drift Map" },
            { label: "Status", value: "Published Methodology" }],
        sections: [
            { title: "Repeatable Forensics", body: "The protocol is designed to be applied to any generative music system by any researcher, without requiring specialized audio engineering training. The argument is that AI bias is not a specialist problem — it is a civic one." }]},
    "menara-infrastructure": {
        longDescription: "A strategic proposal for a Digital Recording Academy for the MENA region — a sovereignty infrastructure for regional music analogous to what the Grammy organization provides for Western popular music. MENARA would set standards for documentation, archiving, royalty distribution, and cultural certification in the region.",
        details: [
            { label: "Type", value: "Institutional Proposal" },
            { label: "Status", value: "Seeking Backers" },
            { label: "Model", value: "Digital Recording Academy" }],
        sections: [
            { title: "Sovereignty through Standards", body: "Whoever sets the standards controls the canon. MENARA argues that Arab music sovereignty requires not just better streaming deals but the capacity to define, certify, and archive what counts as Arab music." }]},
    "harmonic-field-theory": {
        longDescription: "The theoretical system underlying the Harmonic Field Project: a model of music as dynamic energy transfer rather than static object. The theory draws from field physics — assigning mass to intervals, velocity to rhythmic structures, charge to timbral qualities — and uses these parameters to predict emotional resonance as a calculable field property.",
        details: [
            { label: "Type", value: "Music Theory + Physics Model" },
            { label: "Dimensions", value: "7 energy vectors" },
            { label: "Status", value: "Whitepaper + Simulations" }],
        sections: [
            { title: "Music as Physics", body: "The theory is not a metaphor — it proposes that emotional resonance obeys rules analogous to physical field equations, and that these rules can be used to compose music the way an architect designs a load-bearing wall." }]},
    "sparrow-os-system": {
        longDescription: "The system architecture underlying SparrowOS: a distributed surveillance network in which individual avian agents collect opacity readings from displaced bodies and transmit them to a central ledger. The system is self-reinforcing — as bodies grow more transparent (lose rights), they also lose the ability to contest their opacity scores.",
        details: [
            { label: "Type", value: "Speculative System Architecture" },
            { label: "Agents", value: "Distributed avian network" },
            { label: "Status", value: "Conceptual" }],
        sections: [
            { title: "Self-Reinforcing Erasure", body: "The system's darkest feature: loss of visibility makes contestation impossible within the system. The only way to challenge your opacity score is through a form that requires you to be visible enough to file it — a perfect administrative trap." }]},
    "mobius-engine-system": {
        longDescription: "The technical architecture of the Möbius Engine: a state machine that tracks a user's accumulated Temporal Debt (the historical events they have not engaged with) and uses this score to determine which face of a two-sided narrative they are shown. The system stores no personal data — only behavioral signatures.",
        details: [
            { label: "Tech", value: "Graph DB + State Machine + LLM" },
            { label: "Privacy", value: "No personal data stored" },
            { label: "Status", value: "Prototype v1" }],
        sections: [
            { title: "Behavioral Routing", body: "The engine does not know who you are. It knows only how you have moved through the narrative — which threads you followed, which you avoided. From this movement pattern, it infers your Temporal Debt and routes accordingly." }]},
    "glitch-as-revelation": {
        longDescription: "The foundational philosophical position of the practice: that the glitch — the error, the failure, the corruption — is not a malfunction but a forensic event. When a system fails, it reveals its underlying architecture. The politics of a transmission are most visible in its breakdowns. This philosophy informs work across architecture, music, and code.",
        details: [
            { label: "Type", value: "Philosophy / Methodology" },
            { label: "Origin", value: "Architecture thesis, 2012" },
            { label: "Applications", value: "All domains" }],
        sections: [
            { title: "Error as Evidence", body: "A JPEG artifact is not the absence of the image; it is evidence of the infrastructure that transmitted it — the bandwidth, the political distance, the urgency that caused overcompression. To read the glitch is to read the system." }]},
    "strategic-mythography": {
        longDescription: "A consulting methodology that identifies the operative myths of an organization — the stories a company or institution tells about itself and the world — and re-engineers them to align with new environmental realities. Every institution runs on myth; Strategic Mythography makes this explicit and actionable.",
        details: [
            { label: "Type", value: "Consulting Methodology" },
            { label: "Clients", value: "Institutions / Cultural orgs" },
            { label: "Output", value: "Narrative Operating System" }],
        sections: [
            { title: "The Myth Audit", body: "The first step is always the Myth Audit: a structured analysis of the stories an organization is currently using, whether they are accurate descriptions of the world the organization actually operates in, and what they are preventing the organization from seeing." }]},
    "speculative-narrative-design": {
        longDescription: "An engineering methodology that uses fiction as a blueprint. By writing the detailed narrative of a desirable but impossible future, the method reverse-engineers the specific technical, social, and political inventions required to make that future possible — and then identifies which of those inventions can be started now.",
        details: [
            { label: "Type", value: "Design Methodology" },
            { label: "Horizon", value: "10–50 years" },
            { label: "Output", value: "Invention roadmap" }],
        sections: [
            { title: "Fiction as Engineering Spec", body: "The speculative narrative is not decoration — it is the primary design document. The precision of the story determines the precision of the engineering. Vague futures produce vague strategies; specific fictional worlds produce actionable R&D roadmaps." }]},
    "beau-griffin": {
        longDescription: "Beau (the cat) and Griffin (the dog) are the constant companions and recurring figures of the practice. They appear in the writing, the visual work, and the STTM performances — witnesses who offer no interpretation, provide no framework, and are indifferent to the political weight of the work around them. This is their function.",
        details: [
            { label: "Beau", value: "Cat, black, decisive" },
            { label: "Griffin", value: "Dog, white, enthusiastic" },
            { label: "Role", value: "Witnesses / Grounding agents" }],
        sections: [
            { title: "The Witness Who Doesn't Care", body: "The animals appear in the work precisely because they don't understand it. Their presence is a reminder that the most demanding political work is still just work done in a room, by a person, next to a cat who is asleep." }]},
    "the-forgery": {
        longDescription: "A speculative service that produces certified false memories of home — fabricated photographs of a childhood apartment that never existed, notarized testimonials from neighbors who were invented, reconstructed scents of a kitchen that burned down in 1983. The forgery is perfect. The point is that you already knew.",
        details: [
            { label: "Format", value: "Speculative Service / Art Object" },
            { label: "Status", value: "Accepting Commissions (2026)" },
            { label: "Delivery", value: "By registered post" }],
        sections: [
            { title: "The Ethics of the False", body: "The forgery is offered without apology and without disclaimer. The service's argument: that for many people, the authentic memory and the fabricated memory are functionally equivalent — both are reconstructions from fragments, both are consolations, and both are lies the mind needs to tell itself in order to continue." }]},
    "sometimes-i-wake-up-elsewhere": {
        longDescription: "A live performance work built from misremembered coordinates — the specific acoustic signature of waking up in a city that was never home. Violin improvisation is layered with field recordings from hotel rooms, temporary apartments, and transit spaces across Beirut, London, and New York. The music does not describe displacement; it performs the cognitive state of it.",
        details: [
            { label: "Format", value: "Live Performance / Sound" },
            { label: "Duration", value: "55 minutes" },
            { label: "Year", value: "2022" }],
        sections: [
            { title: "The Topology of Waking", body: "The work begins from a specific phenomenological question: in the first two seconds of waking in an unfamiliar room, before your eyes open, your body runs a location check — a spatial inventory. For the displaced person, that inventory consistently returns the wrong answer. The performance makes this misfire audible." },
            { title: "Instrumentation", body: "Violin, laptop, and a custom processing chain that introduces a 200ms delay — just enough to make every phrase feel like a memory of itself rather than a live event." }]},
    "the-annex-libretto": {
        longDescription: "A libretto for a music theatre piece set in THE ANNEX — a stage space that transforms between void, house, and machine over the course of a single night. The text is structured as a bureaucratic log: timestamps, form numbers, procedural instructions. The singers do not deliver emotion; they execute procedures. The emotion arrives anyway.",
        details: [
            { label: "Format", value: "Libretto / Music Theatre" },
            { label: "Duration", value: "70 minutes (proposed)" },
            { label: "Status", value: "Complete text, seeking commission" }],
        sections: [
            { title: "Bureaucracy as Opera", body: "The libretto borrows its dramatic structure from the asylum application: a sequence of forms, each requiring information that contradicts the previous form, each processed by a different department that cannot speak to the others. The music articulates what the forms cannot accommodate." },
            { title: "The Machine as Character", body: "In Act II, the stage machinery becomes a character — the transformation mechanism itself begins to assert agency, refusing to complete certain transitions, jamming at specific moments. The breakdown is written into the score." }]},
    "map-of-the-wound": {
        longDescription: "A participatory performance in which audience members are asked to mark locations of personal loss on a shared cartographic surface — a large-format map of a composite, unnamed city. Over the course of the evening, the accumulation of marks becomes a score, performed live by violin and voice at the end of the night. The audience hears its own grief played back as music.",
        details: [
            { label: "Format", value: "Participatory Performance" },
            { label: "Duration", value: "3 hours" },
            { label: "Year", value: "2019" }],
        sections: [
            { title: "Grief as Cartography", body: "The work emerged from a specific observation: that grief, in the diaspora, is almost always attached to a physical location that the griever cannot access. The map externalizes this attachment — makes it legible to others, makes it collective, makes it composable." },
            { title: "The Score", body: "The final musical performance reads the map as notation: density of marks determines tempo, geographic clustering determines harmony, isolated marks in empty territory become held tones. The music is determined entirely by what the audience brought." }]},
    "the-composite-tongue": {
        longDescription: "A constructed language assembled from the syntactic residue of five languages in simultaneous use within a single household: Levantine Arabic, French, English, Armenian, and Silence. The Composite Tongue does not combine vocabularies — it inherits grammatical structures, borrowing each language's handling of tense, negation, and address while inventing new phonemes for concepts that none of the five source languages have words for.",
        details: [
            { label: "Format", value: "Language System / Text" },
            { label: "Source Languages", value: "Arabic, French, English, Armenian, Silence" },
            { label: "Status", value: "Living document, ongoing" }],
        sections: [
            { title: "The Grammar of the In-Between", body: "Most constructed languages are built for efficiency or universality. The Composite Tongue is built for specificity — for the precise experience of living between languages, where no single one is fully adequate and all five are partially activated simultaneously." },
            { title: "Silence as a Fifth Language", body: "The fifth language — Silence — contributes an entire grammatical category: the Withheld, a tense that marks things which could be said but are not, for reasons the language encodes but does not explain. It is used frequently." }]}};



// ── NODE TAGS ─────────────────────────────────────────────────────────────
// Each node gets a `tags` field for semantic search.
// Tags cover: aliases, themes, concepts, common misspellings, related names.
// Search matches against tags + title. Tags are never shown to the user.

export const NODE_TAGS = {

    // ── SOUND ───────────────────────────────────────────────────────────────────

    "mashrou-leila-collective": [
        "mashrou leila", "mashrou", "ml", "the band", "mashrou3 leila",
        "lebanese band", "arabic music", "arabic rock", "arab indie",
        "middle eastern music", "alternative arab", "electro pop arabic",
        "violin", "hamed sinno", "rolling stone", "rolling stone cover",
        "500 million", "500m streams", "lgbtq", "queer", "banned", "censorship",
        "counter-public", "resistance", "beirut band", "aub band",
        "glastonbury", "roundhouse", "met museum", "olympia paris",
        "yo yo ma", "mika", "hot chip", "hercules love affair",
        "socio political music", "protest music", "arab spring"
    ],

    "space-time-tuning-machine": [
        "sttm", "space time tuning machine", "installation", "sound installation",
        "tuning machine", "exile", "displacement", "home", "scrap electronics",
        "public theater", "joes pub", "sxsw", "the broad", "los angeles",
        "sundance", "sundance grant", "immersive", "multimedia", "violin",
        "techno mythological", "noise", "ambient", "frequency", "bricolage",
        "radio", "found objects", "memory machine"
    ],

    "localization-gap-audit": [
        "localization gap", "audit", "ai music", "artificial intelligence music",
        "maqam", "microtonal", "microtonality", "arabic scales", "armenian music theory",
        "computational colonialism", "suno", "udio", "generative music", "generative ai",
        "western bias", "ai bias", "cultural erasure", "427 tracks", "427",
        "research", "forensic", "music research", "ai research",
        "middle eastern music ai", "non western music", "tuning systems",
        "equal temperament", "bias in ai"
    ],

    "ibn-el-leil-album": [
        "ibn el leil", "son of the night", "album 2015", "2015 album",
        "mashrou leila album", "arabic album", "night", "beirut nightlife",
        "surveillance", "mourning", "celebration", "sonic architecture"
    ],

    "harmonic-field-project": [
        "harmonic field", "harmony", "music theory", "ai composition",
        "multi agent", "emotional resonance", "field theory", "music system",
        "tonal gravity", "rhythmic pressure", "melodic velocity", "timbral density",
        "spatial depth", "temporal debt", "music as physics", "composition ai",
        "sound system", "generative harmony"
    ],

    "tebr-project": [
        "tebr", "the toolmaker", "ai duo", "human ai collaboration",
        "glitch music", "glitch folklore", "future folklore", "diaspora music",
        "experimental music", "hyperpop", "electronic", "speculative music",
        "bricolage sound", "ai collaboration music"
    ],

    "1000-strings-at-rest": [
        "1000 strings", "strings at rest", "installation", "sound installation",
        "silence", "exile", "forbidden music", "displacement", "instruments",
        "memory", "unplayed", "strings", "distance from home", "multimedia installation"
    ],

    "songs-lost-to-time": [
        "songs lost to time", "lost songs", "generative soundscape",
        "memory", "forgotten music", "displaced music", "speculative sound",
        "soundscape", "ambient", "nostalgia", "cultural memory"
    ],

    "sunburn-installation": [
        "sunburn", "weather rehearsal", "living score", "climate",
        "climate data", "violin composition", "ai conductor", "heat",
        "environmental music", "data music", "speculative installation"
    ],

    "raasuk-album": [
        "raasuk", "rasuk", "album 2009", "2009 album", "dance",
        "political dance", "mashrou leila album", "collective movement",
        "debut", "early work"
    ],

    "maqam-tuning-rules": [
        "maqam", "maqam tuning", "microtonal", "arabic music theory",
        "tuning rules", "algorithmic constraints", "cultural sovereignty",
        "code as culture", "music ai constraints", "non western tuning",
        "armenian music theory", "equal temperament alternative"
    ],

    "people-like-us-score": [
        "people like us", "cultural scoring", "middle eastern soundtrack",
        "orientalism", "anti orientalist", "scoring", "music composition",
        "mena music", "narrative music"
    ],

    "ai-music-archive": [
        "ai music archive", "427 tracks", "427", "research corpus",
        "suno tracks", "udio tracks", "generative music research",
        "ai generated music", "music corpus", "experimental archive",
        "ai music database"
    ],

    // ── IMAGE ───────────────────────────────────────────────────────────────────

    "heroes-transitional-time": [
        "heroes of a transitional time", "heroes transitional", "masculinity",
        "male hero", "hero myth", "armenian diaspora", "visual series",
        "photography", "performance", "audition", "war hero",
        "masculinity critique", "visual art"
    ],

    "architecture-in-low-res": [
        "architecture in low res", "low resolution", "low res", "glitch",
        "glitch art", "thesis", "bartlett thesis", "ucl thesis",
        "bourj hammoud", "armenian beirut", "refugee camp", "compression",
        "pixelation", "visual degradation", "forensic architecture",
        "resolution loss", "vhs", "digital decay", "image theory"
    ],

    "sttm-visual-system": [
        "sttm visual", "generative visuals", "visual system", "glitch visuals",
        "ai visuals", "exile visuals", "generative art", "visual identity",
        "space time tuning machine visuals", "machine aesthetics"
    ],

    "roman-music-video": [
        "roman", "roman music video", "music video", "feminist",
        "queer liberation", "middle east feminism", "visual manifesto",
        "lgbtq music video", "arabic music video", "power inversion",
        "mashrou leila video", "2019 video"
    ],

    "storylines-knowledge-graph": [
        "storylines", "knowledge graph", "literary map", "10000 nodes",
        "10k nodes", "literary knowledge", "book map", "narrative map",
        "collective unconscious", "literature visualization", "reading map",
        "books as gravity"
    ],

    "1000-strings-visual": [
        "1000 strings visual", "multimedia installation", "strings installation",
        "forbidden music visual", "displacement art", "silent instruments",
        "heavy silence"
    ],

    "drone-bird-schematics": [
        "drone bird", "schematics", "design fiction", "surveillance drone",
        "crane drone", "anthropocene", "chimera", "blueprint fiction",
        "bird drone", "migration surveillance"
    ],

    "sophies-world": [
        "sophies world", "sophie", "video essay", "ai assistant",
        "post human", "digital archive", "loneliness", "home seeking",
        "video art", "2014"
    ],

    "ghost-city-data-sculpture": [
        "ghost city", "data sculpture", "beirut demolished", "negative space",
        "erasure map", "censored beirut", "demolished buildings", "data art",
        "beirut map", "urban erasure", "city as data"
    ],

    "the-autopsy-interface": [
        "autopsy interface", "memory forensics", "neural network game",
        "memory game", "identity corruption", "visual game", "brain scan",
        "memory classification", "speculative interface"
    ],

    "crying-superhero": [
        "crying superhero", "superhero", "mask", "vulnerability", "grief",
        "public grief", "biological vulnerability", "speculative figure",
        "superhero critique", "mourning"
    ],

    "galaxy-birds": [
        "galaxy birds", "birds", "spirit animals", "displacement spirit",
        "geometric birds", "avian", "beirut london new york",
        "migration metaphor", "speculative creatures"
    ],

    "glitch-renderer": [
        "glitch renderer", "glitch", "text shattering", "cognitive instability",
        "memory decay", "visual glitch", "distortion", "rendering",
        "technical mode", "glitch aesthetic"
    ],

    "nebucat": [
        "nebucat", "cat", "beau", "digital cat", "avatar",
        "witness persona", "cynical", "worldbuilding", "speculative cat",
        "digital witness", "animal avatar"
    ],

    // ── TEXT ────────────────────────────────────────────────────────────────────

    "cartography-of-absence": [
        "cartography of absence", "cartography", "absence", "dream cycle",
        "108 entries", "nine houses", "house of language", "house of grief",
        "house of bureaucracy", "displacement writing", "dream writing",
        "bureaucratic archive", "trauma writing", "diaspora literature",
        "beirut literature", "arabic literature", "literary fiction"
    ],

    "souad-novella": [
        "souad", "novella", "beirut novella", "civil war fiction",
        "civil war beirut", "gender performance", "substitution economy",
        "architectural decay", "baroque fiction", "lebanese fiction",
        "arabic fiction", "queer fiction"
    ],

    "mashrou-leila-lyrics": [
        "mashrou leila lyrics", "lyrics", "arabic lyrics", "song lyrics",
        "political lyrics", "resistance lyrics", "collective authorship",
        "open verse", "porous text", "co-authored meaning"
    ],

    "cost-of-being-queer-arab": [
        "cost of being queer", "queer arab", "nyt", "new york times",
        "op-ed", "opinion", "queer middle east", "lgbtq arab",
        "testimony", "political architecture", "queer writing",
        "arab queer", "sexuality middle east", "censorship writing",
        "published writing", "journalism"
    ],

    "nowhere-elsewhere": [
        "nowhere elsewhere", "nowhere", "elsewhere", "dream mapping",
        "nine houses", "interior landscape", "displacement interior",
        "dream cycle", "language house", "grief house", "return house",
        "displaced psychology", "exile interior"
    ],

    "why-were-like-this": [
        "why were like this", "documentary scripts", "documentary",
        "algorithms", "social illusions", "human spirit", "mutation",
        "scripts", "documentary writing"
    ],

    "manifesto-architecting-liminal": [
        "manifesto", "liminal", "architecting the liminal", "foundational text",
        "stories as infrastructure", "constraints as catalysts",
        "creative manifesto", "systems manifesto"
    ],

    "sparrow-os-protocol": [
        "sparrowos protocol", "transparency protocol", "surveillance fiction",
        "avian surveillance", "displacement fiction", "bureaucratic fiction",
        "speculative writing", "displaced bodies"
    ],

    "revised-fee-schedule": [
        "revised fee schedule", "fee schedule for speech", "speech fees",
        "bureaucratic poetry", "official document poetry", "forbidden vowels",
        "hostile state", "poetry as document", "conceptual writing"
    ],

    "dictionary-of-silences": [
        "dictionary of silences", "silences", "taxonomy", "silence taxonomy",
        "grief silence", "structural silence", "displacement silence",
        "lexicon of absence", "conceptual writing"
    ],

    "passport-inventory": [
        "passport inventory", "passport", "contradictory passport",
        "three passports", "original refugee dream", "legal fiction",
        "identity document", "selfhood fiction", "displaced identity",
        "bureaucratic writing", "conceptual document"
    ],

    // ── CODE ────────────────────────────────────────────────────────────────────

    "the-meaning-stack": [
        "meaning stack", "federated architecture", "cultural ai",
        "seven layers", "sensorium", "resonance", "veracity", "conscience",
        "cultural processing", "ai architecture", "culture tech",
        "ai infrastructure", "non western ai", "meaning machine"
    ],

    "derive-engine": [
        "derive", "derive engine", "negentropic", "negentropy",
        "vector embeddings", "cultural resonance", "memory navigation",
        "semantic search", "cultural search", "emotional search",
        "ai memory", "drift", "psychogeography ai"
    ],

    "hah-was-app": [
        "hah was", "hallucination hunter", "ai hallucination", "turing test",
        "reverse turing test", "cultural truth", "ai detection",
        "mobile app", "ai fact check", "cultural hallucination"
    ],

    "storylines-ai": [
        "storylines", "literary knowledge graph", "zero shot", "llm inference",
        "semantic gravity", "10000 nodes", "literary ai", "book ai",
        "narrative ai", "knowledge graph literature"
    ],

    "moebius-engine": [
        "mobius engine", "moebius", "narrative router", "möbius",
        "face a face b", "observed shadow", "narrative machine",
        "state machine", "story engine", "reality flip"
    ],

    "photon-plus": [
        "photon plus", "photon", "optical sequencer", "light music",
        "music as light", "light architecture", "collision composition",
        "speculative instrument", "optical instrument"
    ],

    "3d-beat-synth": [
        "3d beat synth", "beat synth", "somatic engine", "body as interface",
        "webcam instrument", "body instrument", "motion music",
        "somatic music", "physical interface", "gesture music"
    ],

    "sparrow-os": [
        "sparrowos", "sparrow os", "surveillance architecture",
        "avian agents", "transparency protocol", "displaced bodies",
        "surveillance system", "bureaucratic code", "speculative os",
        "operating system fiction"
    ],

    "boids-simulation": [
        "boids", "flocking", "emergent behavior", "swarm",
        "collective intelligence", "geometry of connection",
        "simulation", "agent based", "flocking algorithm"
    ],

    "project-agora": [
        "agora", "project agora", "fintech", "tokenization",
        "cross border payments", "global south", "cultural infrastructure",
        "financial systems", "mena fintech"
    ],

    "projectarium-ai": [
        "projectarium", "ai ar", "ar agent", "music critic ai",
        "gemini", "cultural critique", "music feedback ai",
        "a and r", "record label ai", "track feedback"
    ],

    // ── SPACE ───────────────────────────────────────────────────────────────────

    "mekena-nyc-initiative": [
        "mekena", "mekena nyc", "artist residency", "queens residency",
        "queens new york", "marginalized artists", "housing artists",
        "system of care", "permanent transience", "displaced artists",
        "artist housing", "cultural residency", "new york residency",
        "sanctuary", "belonging space"
    ],

    "architecture-in-low-res-space": [
        "architecture low res", "bartlett", "ucl bartlett", "thesis space",
        "glitch architecture", "revelation architecture", "forensic space"
    ],

    "architectures-of-belonging": [
        "architectures of belonging", "belonging", "pop up homeland",
        "interchangeable blocks", "permanent transience", "displaced architecture",
        "homeland architecture", "displacement design", "belonging design"
    ],

    "bernard-khoury": [
        "bernard khoury", "dw5", "beirut architecture", "contested structures",
        "post war beirut", "political architecture", "lebanese architecture"
    ],

    "marra-tein-residency": [
        "marra tein", "marratein", "beirut residency", "adaptive reuse",
        "cultural space beirut", "artist space beirut", "research residency"
    ],

    "louvre-abu-dhabi": [
        "louvre abu dhabi", "louvre", "abu dhabi", "cultural diplomacy",
        "museum architecture", "jean nouvel", "dome of light",
        "heritage modernism", "uae architecture"
    ],

    "chromatoverse": [
        "chromatoverse", "volumetric interface", "post flat", "colored acetate",
        "code as space", "3d code", "inhabitable code", "color interface",
        "speculative interface design"
    ],

    "the-archive-conceptual": [
        "the archive", "sensory repository", "scent archive", "partial joys",
        "lost words", "climate controlled memory", "olfactory archive",
        "conceptual space", "memory space"
    ],

    "the-annex-stage": [
        "the annex", "liminal stage", "stage space", "void house machine",
        "fragmented memory space", "displacement stage", "performance space",
        "speculative stage design"
    ],

    "house-ii-skin": [
        "house ii skin", "somatic architecture", "body as territory",
        "scars as border crossings", "body map", "skin architecture",
        "contested body", "displacement body"
    ],

    "the-waiting-room": [
        "waiting room", "hostile architecture", "asylum architecture",
        "time architecture", "bureaucratic space", "immigration space",
        "waiting space", "time distortion space"
    ],

    "ucl-bartlett": [
        "ucl", "bartlett", "bartlett school of architecture", "london",
        "masters architecture", "march", "architecture education",
        "ucl architecture", "london architecture school"
    ],

    "aub-architecture": [
        "aub", "american university of beirut", "architecture school beirut",
        "bach architecture", "undergraduate architecture", "beirut education",
        "cedar revolution", "mashrou leila origin"
    ],

    "stage-design": [
        "stage design", "stage architecture", "mashrou leila stage",
        "concert design", "live design", "performance architecture",
        "tour design", "spatial concert"
    ],

    // ── SYSTEMS ─────────────────────────────────────────────────────────────────

    "systems-choreography": [
        "systems choreography", "choreography of systems", "core methodology",
        "architecture music code", "impossible futures practice",
        "rehearsal for futures", "methodology", "triangulation",
        "multidisciplinary method"
    ],

    "the-haig-method": [
        "haig method", "reality design", "myth as operating system",
        "cultural change", "organizational myth", "narrative operating system",
        "reality engineering", "cultural fragility", "myth audit"
    ],

    "walaw-studio": [
        "walaw", "walaw studio", "para institution", "cultural strategy",
        "speculative design", "systems architecture", "creative consulting",
        "grammy", "grammy global ventures", "mena strategy",
        "impossible futures studio", "cultural foresight",
        "walaw arabic", "despite everything", "even so"
    ],

    "echo-institute": [
        "echo institute", "narrative hypervisor", "legitimacy machine",
        "speculative research", "time flattening", "history future bridge",
        "studio narrative", "institutional fiction"
    ],

    "the-meaning-stack-system": [
        "meaning stack system", "cultural architecture", "systemic revelation",
        "gravity light time debt", "cultural dimensions",
        "alternative ai infrastructure", "non western ai system"
    ],

    "architectures-of-belonging-system": [
        "architectures belonging system", "displacement protocol",
        "art code policy blocks", "pop up homeland system",
        "displaced body protocol", "belonging infrastructure"
    ],

    "localization-gap-audit-system": [
        "localization gap system", "epistemic defense", "phonological erasure",
        "non western ai defense", "cultural protection system",
        "maqam defense", "ai cultural bias system"
    ],

    "bureaucratic-surrealism": [
        "bureaucratic surrealism", "bureaucracy art", "forms as poetry",
        "official document art", "surrealist bureaucracy",
        "document subversion", "authority aesthetics", "form weaponized",
        "bureaucratic poetry", "office as medium"
    ],

    "menara-infrastructure": [
        "menara", "mena music", "music sovereignty", "digital recording academy",
        "middle east music infrastructure", "regional music", "arab music industry",
        "music policy", "mena strategy", "cultural sovereignty music"
    ],

    "harmonic-field-theory": [
        "harmonic field theory", "field theory music", "music as energy",
        "music as physics", "dynamic energy transfer", "multi agent music",
        "music system model"
    ],

    "sparrow-os-system": [
        "sparrowos system", "avian bureaucracy", "transparency enforcement",
        "displaced body monitoring", "opacity fading", "surveillance system fiction"
    ],

    "mobius-engine-system": [
        "mobius engine system", "moebius system", "memory architecture system",
        "temporal debt system", "narrative flip system", "shadow reality system"
    ],

    "impossible-futures-method": [
        "impossible futures", "futures methodology", "backcasting",
        "black swan", "preposterous scenarios", "strategic resilience",
        "foresight", "futures consulting", "speculative strategy",
        "scenario planning", "cultural futures", "futures design"
    ],

    "glitch-as-revelation": [
        "glitch as revelation", "glitch philosophy", "error as truth",
        "systemic reveal", "glitch theory", "oppressive system reveal",
        "glitch as forensics", "technical error philosophy"
    ],

    "strategic-mythography": [
        "strategic mythography", "myth engineering", "narrative operating system",
        "organizational myth", "myth audit", "cultural myth strategy",
        "myth alignment", "story as strategy"
    ],

    "speculative-narrative-design": [
        "speculative narrative", "fiction as engineering", "story as blueprint",
        "survivable futures", "narrative design", "speculative fiction design",
        "future fiction method", "design fiction narrative"
    ],

    "rolling-stone": [
        "rolling stone", "rolling stone cover", "rolling stone mena",
        "first mena artist", "arab rolling stone", "middle east rolling stone",
        "magazine cover", "music press", "cultural milestone"
    ],

    "grammy-ventures": [
        "grammy", "grammy global ventures", "grammy mena",
        "grammy consulting", "music industry", "mena music strategy",
        "recording academy", "global music"
    ],

    "beau-griffin": [
        "beau", "griffin", "cat", "dog", "animal collaborators",
        "cat and dog", "beau the cat", "griffin the dog",
        "animal companions", "pets in art"
    ],

    "the-forgery": [
        "the forgery", "false memories", "fabricated memories",
        "memory service", "home fabrication", "therapeutic fiction",
        "notarized memory", "delivered by post", "speculative service",
        "memory commerce"
    ],

    "sometimes-i-wake-up-elsewhere": [
        "sometimes i wake up elsewhere", "siwue", "waking", "misremembered",
        "hotel rooms", "transit spaces", "violin improvisation", "field recording",
        "displacement performance", "live performance", "sound art",
        "topological waking", "location check", "elsewhere"
    ],

    "the-annex-libretto": [
        "the annex libretto", "annex", "libretto", "music theatre",
        "opera text", "bureaucratic opera", "eviction", "arrival",
        "stage machinery", "asylum application opera", "contemporary opera",
        "music theatre text", "withheld"
    ],

    "map-of-the-wound": [
        "map of the wound", "participatory performance", "grief cartography",
        "collective grief", "shared diagram", "score from audience",
        "wound map", "location of loss", "participatory", "grief as data",
        "composition from audience", "2019 performance"
    ],

    "the-composite-tongue": [
        "the composite tongue", "composite tongue", "constructed language",
        "conlang", "five languages", "arabic french english armenian silence",
        "diasporic language", "multilingual household", "language system",
        "syntax residue", "the withheld", "in-between language", "tense",
        "code switching", "linguistic displacement"
    ]};

// ── SUGGESTED TAGS (shown as clickable pills when search opens) ──────────────
// First 10 always shown. Rest appear as user types or on scroll.

export const SUGGESTED_TAGS = [
    "mashrou leila",
    "architecture",
    "AI music",
    "beirut",
    "displacement",
    "violin",
    "systems",
    "queer",
    "exile",
    "writing",
    "maqam",
    "generative",
    "installation",
    "glitch",
    "mekena",
    "walaw",
    "censorship",
    "diaspora",
    "impossible futures",
    "computational colonialism",
    "cartography",
    "memory",
    "belonging",
    "bureaucracy",
    "cultural strategy"];
