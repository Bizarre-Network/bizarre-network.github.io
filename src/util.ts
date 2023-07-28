export function url(path: string, moduleUrl: string): string {
  return new URL(path, moduleUrl).href;
}
