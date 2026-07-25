import { create } from "zustand";

export interface UserProject {
  projectName: string;
  description: string;
  techStack: string[];
  status: string;
}

export interface NavigationSuggestion {
  text: string;
  targetId: string;
}

interface ChatState {
  visitorName: string;
  stage: "entry" | "garden";
  
  // Feedback stats
  resonateRating: number;
  favoriteSapling: string;
  gardenRating: number;
  favoriteFlower: string;
  
  // Dynamic planted projects
  plantedProjects: UserProject[];

  // Navigation Suggestion
  currentSuggestion: NavigationSuggestion;
  shuffleSuggestion: () => void;

  setVisitorName: (name: string) => void;
  initializeJourney: (name: string) => void;
  clearChat: () => void;
  setStage: (stage: ChatState["stage"]) => void;
  
  // Feedback Setters
  submitResonateRating: (rating: number) => void;
  submitSaplingVote: (sapling: string) => void;
  submitGardenRating: (rating: number) => void;
  submitFlowerVote: (flower: string) => void;
  
  // Project Planting
  plantProject: (project: UserProject) => void;
  
  // Sound
  ringBell: () => void;
}

const suggestionsList: NavigationSuggestion[] = [
  { text: "my academic timeline & background (Roots)", targetId: "about" },
  { text: "the coding projects I've cultivated (Saplings)", targetId: "projects" },
  { text: "my technical skills & resource monitors (Branches)", targetId: "skills" },
  { text: "my verified certifications & blossoms (Blossoms)", targetId: "certifications" },
  { text: "my social nodes & orbital wheel (Garden Gate)", targetId: "socials" },
  { text: "resonating feedback of your garden walk (Resonance)", targetId: "feedback" },
];

export const useChatStore = create<ChatState>((set, get) => {
  
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return {
        visitorName: "",
        stage: "entry" as const,
        resonateRating: 0,
        favoriteSapling: "",
        gardenRating: 5,
        favoriteFlower: "",
        plantedProjects: [],
        currentSuggestion: suggestionsList[0],
      };
    }

    try {
      const savedName = localStorage.getItem("siva_zen_name") || "";
      const savedStage = (localStorage.getItem("siva_zen_stage") as ChatState["stage"]) || "entry";
      const savedPlanted = JSON.parse(localStorage.getItem("siva_zen_planted") || "[]");
      
      const resonate = Number(localStorage.getItem("siva_zen_resonate") || "0");
      const sapling = localStorage.getItem("siva_zen_sapling") || "";
      const garden = Number(localStorage.getItem("siva_zen_garden") || "5");
      const flower = localStorage.getItem("siva_zen_flower") || "";

      return {
        visitorName: "",
        stage: "entry" as const,
        resonateRating: resonate,
        favoriteSapling: sapling,
        gardenRating: garden,
        favoriteFlower: flower,
        plantedProjects: savedPlanted,
        currentSuggestion: suggestionsList[0],
      };
    } catch (e) {
      return {
        visitorName: "",
        stage: "entry" as const,
        resonateRating: 0,
        favoriteSapling: "",
        gardenRating: 5,
        favoriteFlower: "",
        plantedProjects: [],
        currentSuggestion: suggestionsList[0],
      };
    }
  };

  const ringTibetanBell = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const fundamental = 160; 
      const harmonics = [1, 1.88, 2.72, 3.56, 4.41];
      const gains = [0.06, 0.04, 0.03, 0.02, 0.01];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);
      masterGain.connect(ctx.destination);

      harmonics.forEach((hMultiplier, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(fundamental * hMultiplier, ctx.currentTime);
        
        const bOsc = ctx.createOscillator();
        const bGain = ctx.createGain();
        bOsc.frequency.value = 3 + idx;
        bGain.gain.value = 1.2;
        bOsc.connect(bGain);
        bGain.connect(osc.frequency);
        bOsc.start();
        bOsc.stop(ctx.currentTime + 4.5);

        gainNode.gain.setValueAtTime(gains[idx], ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8 + idx * 0.1);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 4.5);
      });
    } catch (e) {}
  };

  const persist = (updatedState: Partial<ChatState>) => {
    if (typeof window === "undefined") return;
    if (updatedState.visitorName !== undefined) localStorage.setItem("siva_zen_name", updatedState.visitorName);
    if (updatedState.stage !== undefined) localStorage.setItem("siva_zen_stage", updatedState.stage);
    if (updatedState.plantedProjects !== undefined) localStorage.setItem("siva_zen_planted", JSON.stringify(updatedState.plantedProjects));
    
    if (updatedState.resonateRating !== undefined) localStorage.setItem("siva_zen_resonate", String(updatedState.resonateRating));
    if (updatedState.favoriteSapling !== undefined) localStorage.setItem("siva_zen_sapling", updatedState.favoriteSapling);
    if (updatedState.gardenRating !== undefined) localStorage.setItem("siva_zen_garden", String(updatedState.gardenRating));
    if (updatedState.favoriteFlower !== undefined) localStorage.setItem("siva_zen_flower", updatedState.favoriteFlower);
  };

  return {
    ...getInitialState(),

    ringBell: ringTibetanBell,

    setVisitorName: (name) => {
      set({ visitorName: name });
      persist({ visitorName: name });
    },

    initializeJourney: (name) => {
      const nameCleaned = name.trim() || "Seeker";
      set({ 
        visitorName: nameCleaned, 
        stage: "garden", 
        resonateRating: 0,
        favoriteSapling: "",
        gardenRating: 5,
        favoriteFlower: "",
      });
      persist({ 
        visitorName: nameCleaned, 
        stage: "garden", 
        resonateRating: 0,
        favoriteSapling: "",
        gardenRating: 5,
        favoriteFlower: "",
      });

      ringTibetanBell();
    },

    clearChat: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("siva_zen_name");
        localStorage.removeItem("siva_zen_stage");
        localStorage.removeItem("siva_zen_planted");
        localStorage.removeItem("siva_zen_resonate");
        localStorage.removeItem("siva_zen_sapling");
        localStorage.removeItem("siva_zen_garden");
        localStorage.removeItem("siva_zen_flower");
      }
      set({ 
        visitorName: "", 
        stage: "entry", 
        resonateRating: 0,
        favoriteSapling: "",
        gardenRating: 5,
        favoriteFlower: "",
        plantedProjects: [],
        currentSuggestion: suggestionsList[0],
      });
    },

    setStage: (stage) => {
      set({ stage });
      persist({ stage });
    },

    submitResonateRating: (rating) => {
      set({ resonateRating: rating });
      persist({ resonateRating: rating });
      ringTibetanBell();
      get().shuffleSuggestion();
    },

    submitSaplingVote: (sapling) => {
      set({ favoriteSapling: sapling });
      persist({ favoriteSapling: sapling });
      ringTibetanBell();
      get().shuffleSuggestion();
    },

    submitGardenRating: (rating) => {
      set({ gardenRating: rating });
      persist({ gardenRating: rating });
      ringTibetanBell();
      get().shuffleSuggestion();
    },

    submitFlowerVote: (flower) => {
      set({ favoriteFlower: flower });
      persist({ favoriteFlower: flower });
      ringTibetanBell();
      get().shuffleSuggestion();
    },

    plantProject: (proj) => {
      const updated = [...get().plantedProjects, proj];
      set({ plantedProjects: updated });
      persist({ plantedProjects: updated });
      ringTibetanBell();
      get().shuffleSuggestion();
    },

    shuffleSuggestion: () => {
      const current = get().currentSuggestion;
      const filtered = suggestionsList.filter((s) => s.targetId !== current.targetId);
      const randomSg = filtered[Math.floor(Math.random() * filtered.length)];
      set({ currentSuggestion: randomSg });
    },
  };
});
