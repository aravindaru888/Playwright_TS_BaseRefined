import { readFileSync } from 'fs';
import { resolveFromRoot } from './path-utils';

export function loadJsonFile<T>(relativePath: string): T {
  const fullPath = resolveFromRoot(relativePath);
  const rawData = readFileSync(fullPath, 'utf-8');
  return JSON.parse(rawData) as T;
}
