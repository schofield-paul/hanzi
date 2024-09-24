import HanziWriter from "hanzi-writer";

export const initializeHanziWriter = (
  container: HTMLDivElement | null,
  translation: string
) => {
  if (container) {
    container.innerHTML = "";

    translation.split("").forEach((character: string, index: number) => {
      const charContainer = document.createElement("div");
      charContainer.id = `character-container-${index}`;
      charContainer.classList.add("character-container");
      container.appendChild(charContainer);

      const writer = HanziWriter.create(charContainer.id, character, {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
      });
      writer.animateCharacter();
    });
  }
};
