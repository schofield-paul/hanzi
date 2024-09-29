import HanziWriter from "hanzi-writer";

interface TranslationObject {
  character: string;
  pinyin: string;
}

export const initializeHanziWriter = (
  container: HTMLDivElement | null,
  translation: TranslationObject[]
) => {
  if (container) {
    container.innerHTML = "";

    // Iterate over each character and pinyin pair in the translation array
    translation.forEach((item: TranslationObject, index: number) => {
      // Create a wrapper div to contain both pinyin and character
      const charWrapper = document.createElement("div");

      // Create pinyin element and add it above the character
      const pinyinElement = document.createElement("div");
      pinyinElement.innerText = item.pinyin;

      // Create container for the Hanzi character
      const charContainer = document.createElement("div");
      charContainer.id = `character-container-${index}`;

      // Append pinyin and character container to the wrapper
      charWrapper.appendChild(pinyinElement);
      charWrapper.appendChild(charContainer);
      container.appendChild(charWrapper);

      const writer = HanziWriter.create(charContainer.id, item.character, {
        width: 130,
        height: 130,
        padding: 5,
        showOutline: true,
      });

      writer.animateCharacter();
    });
  }
};
