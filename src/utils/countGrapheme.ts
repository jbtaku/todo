export const countGrapheme = (text: string) => {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    return [...segmenter.segment(text)].length;
  };
  