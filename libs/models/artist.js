// Create
// getId(id) return specific artist by id
// getAll() return all artist data
import supabase from "../supabase"

const artistModel = {
    table: 'artists',
    getId: async (id) => {
        return await supabase
            .from('artists')
            .select()
            .eq('id', id)
            .limit(1)
            .single()
    },
    getAll: async function() {
        const result = await supabase
            .from('artists')
            .select()
        return result;
    },
    create: async (payload) => {
        return await supabase
            .from('artists')
            .insert(payload)
            .select()
            .single()
    }
}

export default artistModel