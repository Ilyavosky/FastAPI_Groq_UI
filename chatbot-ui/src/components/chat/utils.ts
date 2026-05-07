export const uid = () => Math.random().toString(36).slice(2, 10);
export const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];