import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY);

async function getData() {
    const { data, error } = await supabase.from('michi_goals').select()

    if (error) {
        console.error('Ocurrio un error al mandar a llamar datos:', error);
        return [];
    }
    return data;
}

export { getData }