const MOTIVATIONS = [
  "Academic Prestige",
  "Athletic Facilities",
  "Brand Exposure",
  "Campus Lifestyle",
  "Championship Contender",
  "Coach Prestige",
  "Coach Stability",
  "Conference Prestige",
  "Playing Style",
  "Playing Time",
  "Pro Potential",
  "Program Tradition",
  "Proximity to Home",
  "Stadium Atmosphere"
];

const PITCHES = [
  {
    name: "College Experience",
    motivations: ["Academic Prestige", "Campus Lifestyle", "Stadium Atmosphere"]
  },
  {
    name: "Team Player",
    motivations: ["Coach Prestige", "Proximity to Home", "Playing Style"]
  },
  {
    name: "Campus Personality",
    motivations: ["Campus Lifestyle", "Playing Style", "Playing Time"]
  },
  {
    name: "Gamer",
    motivations: ["Conference Prestige", "Playing Style", "Pro Potential"]
  },
  {
    name: "Standard Bearer",
    motivations: ["Coach Prestige", "Conference Prestige", "Playing Style"]
  },
  {
    name: "Student of the Game",
    motivations: ["Academic Prestige", "Coach Prestige", "Proximity to Home"]
  },
  {
    name: "Hometown Hero",
    motivations: ["Proximity to Home", "Program Tradition", "Championship Contender"]
  },
  {
    name: "Status Seeker",
    motivations: ["Coach Prestige", "Conference Prestige", "Brand Exposure"]
  },
  {
    name: "The Clutch",
    motivations: ["Playing Time", "Playing Style", "Coach Stability"]
  },
  {
    name: "Primetime Player",
    motivations: ["Brand Exposure", "Championship Contender", "Playing Time"]
  },
  {
    name: "Coach Connection",
    motivations: ["Proximity to Home", "Coach Prestige", "Athletic Facilities"]
  },
  {
    name: "Aspirational Goals",
    motivations: ["Championship Contender", "Coach Prestige", "Conference Prestige"]
  },
  {
    name: "House Call",
    motivations: ["Brand Exposure", "Championship Contender", "Coach Prestige"]
  },
  {
    name: "Football Influencer",
    motivations: ["Brand Exposure", "Playing Time", "Pro Potential"]
  },
  {
    name: "Clocked In",
    motivations: ["Playing Style", "Playing Time", "Pro Potential"]
  },
  {
    name: "Star Search",
    motivations: ["Brand Exposure", "Playing Time", "Proximity to Home"]
  },
  {
    name: "Grassroots Traditionalist",
    motivations: ["Program Tradition", "Proximity to Home", "Stadium Atmosphere"]
  },
  {
    name: "Conference Legend",
    motivations: ["Championship Contender", "Conference Prestige", "Proximity to Home"]
  },
  {
    name: "Sunday Player",
    motivations: ["Championship Contender", "Conference Prestige", "Pro Potential"]
  },
  {
    name: "Gym Rat",
    motivations: ["Athletic Facilities", "Brand Exposure", "Pro Potential"]
  }
];

function getPossiblePitches(motivationStates) {
  const knownYesMotivations = Object.entries(motivationStates)
    .filter(([, state]) => state === "yes")
    .map(([motivation]) => motivation);

  const knownNoMotivations = Object.entries(motivationStates)
    .filter(([, state]) => state === "no")
    .map(([motivation]) => motivation);

  return PITCHES
    .filter((pitch) => {
      const includesEveryKnownYes = knownYesMotivations.every((motivation) =>
        pitch.motivations.includes(motivation)
      );

      const includesNoKnownNo = knownNoMotivations.every((motivation) =>
        !pitch.motivations.includes(motivation)
      );

      return includesEveryKnownYes && includesNoKnownNo;
    })
    .map((pitch) => {
      const confirmedMatches = pitch.motivations.filter((motivation) =>
        knownYesMotivations.includes(motivation)
      );

      return {
        ...pitch,
        confirmedMatchCount: confirmedMatches.length
      };
    })
    .sort((a, b) => {
      return b.confirmedMatchCount - a.confirmedMatchCount || a.name.localeCompare(b.name);
    });
}
