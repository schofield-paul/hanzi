import HanziWriter from "hanzi-writer";
import style from "../pages/Input/Input.module.css";

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

    const writers: HanziWriter[] = [];

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
      charContainer.classList.add(style["hoverable-character"]);

      charWrapper.appendChild(pinyinElement);
      charWrapper.appendChild(charContainer);
      container.appendChild(charWrapper);

      const writer = HanziWriter.create(charContainer.id, item.character, {
        width: 130,
        height: 130,
        padding: 5,
        showOutline: true,
        strokeAnimationSpeed: 2,
      });

      writers.push(writer);

      charContainer.addEventListener("click", () => {
        writer.animateCharacter();
      });
    });

    const animateSequentially = (index: number) => {
      if (index < writers.length) {
        writers[index].animateCharacter({
          onComplete: () => {
            animateSequentially(index + 1);
          },
        });
      }
    };

    animateSequentially(0);
  }
};
