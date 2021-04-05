export default (description) => {
  if (!description) {
    throw new Error();
  }

  const descriptionLines = descriptionToLines(description);
  let rawSections = splitLinesIntoSections(descriptionLines);
  rawSections = cleanupRawSections(rawSections);

  let sections = rawSections.map((lines, index) => ({
    name: getSectionName(lines),
    lines,
    index,
  }));

  const itemName = getItemName(sections);
  const itemType = getItemType(sections);
  const itemRarity = getItemRarity(sections);
  const itemInfluences = getItemInfluences(sections);

  sections = fillUnknownSections(sections, itemRarity);
  sections = removeUnknownSections(sections);

  return {
    sections,
    name: itemName,
    type: itemType,
    rarity: itemRarity,
    influences: itemInfluences,
  };
};

const descriptionToLines = (description) =>
  description
    .split("\n")
    .map((line) => line.replace("\r", ""))
    .filter((x) => x.length > 0);

const splitLinesIntoSections = (descLines) => {
  const sections = [];
  let section = [];

  descLines.forEach((line, index) => {
    if (line.includes("----")) {
      sections.push(section);
      section = [];
    } else if (index + 1 === descLines.length) {
      section.push(line);
      sections.push(section);
      section = [];
    } else {
      section.push(line);
    }
  });

  return sections;
};

const cleanupRawSections = (rawSections) =>
  rawSections.map((s) => s.map((l) => l.trim()).filter((l) => l.length > 0));

const getItemType = (sections) => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return "";
  }

  const typeLine = headerSection.lines[headerSection.lines.length - 1];

  if (typeLine.includes("Jewel")) return "Jewel";
  if (typeLine.includes("Flask")) return "Flask";

  const rarityLine = headerSection.lines[0];
  if (rarityLine.includes("Gem")) return "Gem";

  return "Equipment";
};

const getItemRarity = (sections) => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return "";
  }
  const rarityLine = headerSection.lines[0];

  return rarityLine.match(/Rarity: (.*)/)[1];
};

const getItemName = (sections) => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return "";
  }

  return headerSection.lines[1];
};

const getItemInfluences = (sections) => {
  const influencesSection = sections.find((x) => x.name === "Influences");
  if (!influencesSection) {
    return [];
  }

  return influencesSection.lines.map((x) => x.match(/([A-Z][a-z]*) Item$/)[1]);
};

const fillUnknownSections = (sections, itemType) => {
  const headerIndex = sections.find((x) => x.name === "Header").index;
  if (sections[headerIndex + 1].name === "Unknown") {
    sections[headerIndex + 1].name = "Properties";
  }

  if (itemType !== "Normal" && itemType !== "Gem") {
    const modifiersIndex = sections.find((x) => x.name === "Unknown").index;
    sections[modifiersIndex].name = "Modifiers";
  }

  if (itemType === "Gem") {
    const gemDescriptionIndex = sections.find((x) => x.name === "Unknown")
      .index;
    sections[gemDescriptionIndex].name = "Gem description";

    if (sections[gemDescriptionIndex + 1].name === "Unknown") {
      sections[gemDescriptionIndex + 1].name = "Modifiers";
    }
  }

  return sections;
};

const removeUnknownSections = (sections) =>
  sections.filter((x) => x.name !== "Unknown");

const getSectionName = (section) => {
  if (section.some((x) => x.includes("Rarity:"))) {
    return "Header";
  }

  if (section.some((x) => x.includes("Requirements"))) {
    return "Requirements";
  }

  if (section.some((x) => x.includes("Item Level:"))) {
    return "Item level";
  }

  if (section.some((x) => x.includes("(enchant)"))) {
    return "Enchants";
  }

  if (section.some((x) => x.includes("(implicit)"))) {
    return "Implicits";
  }

  if (section.some((x) => x.includes("Quality"))) {
    return "Properties";
  }

  if (section.some((x) => x.includes("Sockets:"))) {
    return "Sockets";
  }

  if (section.some((x) => x.match(/([A-Z][a-z]*) Item$/))) {
    return "Influences";
  }

  if (section.some((x) => x.match(/^Corrupted$/))) {
    return "Corruption status";
  }

  if (section.some((x) => x.match(/^Mirrored$/))) {
    return "Mirrored status";
  }

  return "Unknown";
};
