import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, vi } from 'vitest';

vi.mock('nuxt/app', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBaseUrl: 'https://api-bank-saint-patrick.laravel.cloud',
    },
  }),
}));

beforeEach(() => {
    
  setActivePinia(createPinia());
});