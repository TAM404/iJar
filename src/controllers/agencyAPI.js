import { supabase } from './supabase.js'

export const agencyService = {
  async getAgencyProfile(id) {
    const { data, error } = await supabase
      .from('agencies')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async updateAgencyProfile(id, updates) {
    const { data, error } = await supabase
      .from('agencies')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  },

  async updateLogo(id, logoFile) {
    const fileName = `${id}-${Date.now()}`
    const { data, error } = await supabase.storage
      .from('agency-logos')
      .upload(fileName, logoFile)

    if (error) throw error
    return data
  },

  async getTestimonials(agencyId) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('agency_id', agencyId)

    if (error) throw error
    return data
  }
}