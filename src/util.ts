export function url(path: string): string {
  return new URL(path, import.meta.url).href;
}
