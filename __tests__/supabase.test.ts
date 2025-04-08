import { supabase } from '../src/lib/supabase';

describe('Supabase Client', () => {
  

  it('should fetch data from the specified table', async () => {
    const { data, error, count } = await supabase
      .from('unavailable_times')
      .select('*', { count: 'exact' });

    console.log('Fetched data:', data);
    console.log('Count:', count);
    console.log('Error:', error);

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(typeof count).toBe('number');
    expect(count!).toBeGreaterThan(0);
  });
});
