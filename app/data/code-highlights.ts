export type CodeHighlight = {
  projectSlug: string;
  title: string;
  language: string;
  description: string;
  sourcePath: string;
  sourceUrl: string;
  code: string;
};

export const codeHighlights: CodeHighlight[] = [
  {
    projectSlug: "insert",
    title: "Paginated Firestore cleanup",
    language: "javascript",
    description:
      "Deletes large collections in bounded batches instead of exceeding Firestore's write limit.",
    sourcePath: "functions/index.js",
    sourceUrl:
      "https://github.com/josephmusngi21/Insert/blob/main/functions/index.js",
    code: `const PAGE_SIZE = 300;

async function deleteCollection(collectionRef) {
  while (true) {
    const snapshot = await collectionRef.limit(PAGE_SIZE).get();
    if (snapshot.empty) return;

    const batch = db.batch();
    snapshot.docs.forEach((document) => batch.delete(document.ref));
    await batch.commit();
  }
}`,
  },
  {
    projectSlug: "insert",
    title: "Pause writes during account deletion",
    language: "firestore rules",
    description:
      "A server-side deletion marker blocks account writes while cleanup is in progress.",
    sourcePath: "firestore.rules",
    sourceUrl:
      "https://github.com/josephmusngi21/Insert/blob/main/firestore.rules",
    code: `function canWriteForCurrentUser() {
  return request.auth != null
    && !exists(/databases/$(database)/documents/accountDeletionRequests/$(request.auth.uid));
}`,
  },
  {
    projectSlug: "sproutie",
    title: "Duplicate-safe plant collection",
    language: "javascript",
    description:
      "Turns a Trefle result into a saved MongoDB plant, checking the user's collection first and returning a conflict for duplicates.",
    sourcePath: "server/routes/plants.js",
    sourceUrl:
      "https://github.com/josephmusngi21/Sproutie/blob/main/server/routes/plants.js",
    code: `router.post('/save', async (req, res) => {
  try {
    const { userId, plantData } = req.body;
    if (!userId || !plantData) {
      return res.status(400).json({ error: 'userId and plantData required' });
    }

    const exists = await UserPlant.findOne({
      firebaseUid: userId,
      trefleId: plantData.id
    });
    if (exists) {
      return res.status(409).json({ error: 'Plant already saved', plant: exists });
    }

    const plant = await UserPlant.create({
      firebaseUid: userId,
      trefleId: plantData.id,
      commonName: plantData.common_name,
      scientificName: plantData.scientific_name,
      family: plantData.family,
      genus: plantData.genus,
      imageUrl: plantData.image_url,
      synonyms: plantData.synonyms || []
    });

    res.status(201).json({ message: 'Plant saved', plant });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save plant' });
  }
});`,
  },
  {
    projectSlug: "sproutie",
    title: "Server-side Trefle API access",
    language: "javascript",
    description:
      "Keeps the Trefle token in the server environment and safely encodes user-entered plant search terms.",
    sourcePath: "server/services/trefleAPI.js",
    sourceUrl:
      "https://github.com/josephmusngi21/Sproutie/blob/main/server/services/trefleAPI.js",
    code: `class TrefleAPI {
  constructor() {
    this.baseURL = 'https://trefle.io/api/v1';
    this.apiToken = process.env.TREFLE_API_TOKEN;

    if (!this.apiToken) {
      throw new Error('TREFLE_API_TOKEN environment variable is required');
    }
  }

  async _fetch(endpoint) {
    const url = \`\${this.baseURL}\${endpoint}\${endpoint.includes('?') ? '&' : '?'}token=\${this.apiToken}\`;
    const response = await fetch(url);
    return response.json();
  }

  async searchPlants(query) {
    return this._fetch(\`/plants/search?q=\${encodeURIComponent(query)}\`);
  }
}`,
  },
  {
    projectSlug: "esp32-tamagotchi-clone",
    title: "Rate-limited pet behavior learning",
    language: "cpp",
    description:
      "Uses passive observations to learn care patterns without letting frequent updates dominate behavior.",
    sourcePath: "src/pet_brain.cpp",
    sourceUrl:
      "https://github.com/josephmusngi21/ESP32-Tamagotchi-Clone/blob/main/src/pet_brain.cpp",
    code: `void brainObserve(PetBrain &brain, const PetSnapshot &snapshot, unsigned long nowMs) {
  decayTraitsTowardNeutral(brain, nowMs);

  if (!snapshot.alive || (nowMs - brain.lastTrendMs) < LEARN_INTERVAL_MS) {
    return;
  }

  brain.lastTrendMs = nowMs;

  if (snapshot.timeSinceCareMs > brainIgnoreGraceMs(brain)) {
    brainLearnFromEvent(brain, PET_EVENT_IGNORE_TICK, snapshot, nowMs);
    return;
  }

  learnFromPattern(brain, snapshot);

  if (snapshot.anger <= 3 && snapshot.happiness >= 6) {
    brainLearnFromEvent(brain, PET_EVENT_CALM_TICK, snapshot, nowMs);
  }
}`,
  },
];
