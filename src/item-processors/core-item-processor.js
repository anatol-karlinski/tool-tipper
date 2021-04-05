export default (rawDescription) => {
  if (!rawDescription) {
    throw new Error();
  }

  const descriptionLines = descriptionToLines(rawDescription);
  let rawSections = splitLinesIntoSections(descriptionLines);
  rawSections = cleanupRawSections(rawSections);

  let sections = rawSections.map((lines, index) => ({
    name: getSectionName(lines),
    lines,
    index,
  }));

  const itemName = getItemName(sections);
  const itemRarity = getItemRarity(sections);

  return {
    sections,
    name: itemName,
    rarity: itemRarity,
  };
};

const descriptionToLines = (rawDescription) =>
  rawDescription
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

export const removeUnknownSections = (sections) =>
  sections.filter((x) => x.name !== "Unknown");

const cleanupRawSections = (rawSections) =>
  rawSections.map((s) => s.map((l) => l.trim()).filter((l) => l.length > 0));

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

  return "Unknown";
};
