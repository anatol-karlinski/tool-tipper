import processItemDescription, {
  removeUnknownSections,
} from "./core-item-processor";

export default (rawDescription) => {
  if (!rawDescription) {
    throw new Error();
  }

  const itemData = processItemDescription(rawDescription);
  const itemType = getItemType(itemData.sections);
  itemData.sections = fillUnknownSections(itemData.sections, itemType);
  itemData.sections = removeUnknownSections(itemData.sections);
  const itemInfluences = getItemInfluences(itemData.sections);

  return { ...itemData, type: itemType, influences: itemInfluences };
};

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

const getItemInfluences = (sections) => {
  const influencesSection = sections.find((x) => x.name === "Influences");
  if (!influencesSection) {
    return [];
  }

  return influencesSection.lines.map((x) => x.match(/([A-Z][a-z]*) Item$/)[1]);
};

const fillUnknownSections = (sections, itemType) => {
  const unknownSections = sections.filter(
    (section) => section.name === "Unknown"
  );

  if (!unknownSections || unknownSections.length <= 0) {
    return sections;
  }

  unknownSections.forEach((section) => {
    if (section.lines.some((x) => x.includes("Sockets:"))) {
      section.name = "Sockets";
      return;
    }

    if (section.lines.some((x) => x.match(/([A-Z][a-z]*) Item$/))) {
      section.name = "Influences";
      return;
    }

    if (section.lines.some((x) => x.match(/^Corrupted$/))) {
      section.name = "Corruption status";
      return;
    }

    if (section.lines.some((x) => x.match(/^Mirrored$/))) {
      section.name = "Mirrored status";
      return;
    }
    return;
  });

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
