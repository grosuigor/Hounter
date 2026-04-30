const LABELS = {
  "hot": {
    type: "hot",
    text: "Popular"
  },
  "new": {
    type: "new",
    text: "New house"
  },
  "best": {
    type: "best",
    text: "Best deals"
  }
}

export const DATA = {
  house: [
    {
      name: "Roselands House",
      price: "35.000.000",
      seller: "Dianne Russell",
      location: "Manchester, Kentucky",
      label: {...LABELS["hot"]}
    },
    {
      name: "Woodlandside",
      price: "20.000.000",
      seller: "Robert Fox",
      location: "Dr. San Jose, South Dakota",
      label: {...LABELS["new"]}
    },
    {
      name: "The Old Lighthouse",
      price: "44.000.000",
      seller: "Ronald Richards",
      location: "Santa Ana, Illinois",
      label: {...LABELS["best"]}
    },
    {
      name: "Cosmo's House",
      price: "22.000.000",
      seller: "Jenny Wilson",
      location: "Preston Rd. Inglewood, Maine 98380",
      label: {...LABELS["hot"]}
    },
  ],
  villa: [
    {
      name: "Azure Bay Villa",
      price: "55.000.000",
      seller: "Kristin Watson",
      location: "Malibu, California",
      label: {...LABELS["hot"]}
    },
    {
      name: "Palm Crest Retreat",
      price: "48.000.000",
      seller: "Devon Lane",
      location: "Naples, Florida",
      label: {...LABELS["new"]}
    },
    {
      name: "Golden Horizon Villa",
      price: "62.000.000",
      seller: "Cameron Williamson",
      location: "Scottsdale, Arizona",
      label: {...LABELS["best"]}
    },
    {
      name: "Serenity Peaks Villa",
      price: "50.000.000",
      seller: "Savannah Nguyen",
      location: "Aspen, Colorado",
      label: {...LABELS["hot"]}
    },
  ],
  appartement: [
    {
      name: "Skyline Heights",
      price: "12.000.000",
      seller: "Courtney Henry",
      location: "New York, New York",
      label: {...LABELS["hot"]}
    },
    {
      name: "Urban Vista Residences",
      price:" 9.000.000",
      seller: "Guy Hawkins",
      location: "Chicago, Illinois",
      label: {...LABELS["new"]}
    },
    {
      name: "Central Park Suites",
      price: "15.000.000",
      seller: "Albert Flores",
      location: "San Francisco, California",
      label: {...LABELS["best"]}
    },
    {
      name: "Riverside Apartments",
      price: "11.000.000",
      seller: "Leslie Alexander",
      location: "Seattle, Washington",
      label: {...LABELS["hot"]}
    },
  ],
};