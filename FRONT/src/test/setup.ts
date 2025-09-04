// src/test/setup.ts
import '@testing-library/jest-dom';
import { beforeAll, afterEach, vi } from 'vitest';

// Stub le fetch AVANT que les modules de prod soient importés
beforeAll(() => {
  vi.stubGlobal('fetch', vi.fn());
});

// Entre chaque test on remet à zéro le mock (mais on le garde stubé)
afterEach(() => {
  (globalThis.fetch as any).mockReset();
});
