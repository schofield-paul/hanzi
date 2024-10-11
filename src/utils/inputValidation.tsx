export function isValidEnglishInput(input: string): boolean {
  return /^[a-zA-Z\s.,!?':;()\u2019-]+$/.test(input.trim());
}
