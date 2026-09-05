import { describe, expect, it } from 'vitest';
import { UX0_PROTOTYPE_MODE } from './ux0';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

describe('UX0 provider boundary', () => {
  it('keeps source-controlled prototype mode enabled and the Supabase client absent', () => {
    expect(UX0_PROTOTYPE_MODE).toBe(true);
    expect(isSupabaseConfigured).toBe(false);
    expect(supabase).toBeNull();
  });
});
