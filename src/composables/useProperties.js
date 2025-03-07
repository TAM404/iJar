import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export const useProperties = () => {
  const properties = ref([])
  const filteredProperties = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  let subscription = null

  // Real-time subscription
  const subscribeToUpdates = () => {
    subscription = supabase
      .channel('public:properties')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'properties'
      }, () => fetchProperties())
      .subscribe()
  }

  // Fetch all published properties
  const fetchProperties = async (filters = {}) => {
    try {
      isLoading.value = true
      let query = supabase
        .from('properties')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.priceRange) {
        query = query.gte('price', filters.priceRange[0])
          .lte('price', filters.priceRange[1])
      }

      if (filters.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms)
      }

      if (filters.propertyType?.length) {
        query = query.in('property_type', filters.propertyType)
      }

      const { data, error: sbError } = await query

      if (sbError) throw sbError
      properties.value = data
      filteredProperties.value = data
      subscribeToUpdates()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  // Filter properties locally
  const applyFilters = (filters) => {
    filteredProperties.value = properties.value.filter(property => {
      return (
        property.price >= filters.priceRange[0] &&
        property.price <= filters.priceRange[1] &&
        property.bedrooms >= filters.bedrooms &&
        (filters.propertyType.length === 0 || 
          filters.propertyType.includes(property.property_type))
      )
    })
  }

  // Cleanup
  const unsubscribe = () => {
    if (subscription) subscription.unsubscribe()
  }

  return {
    properties,
    filteredProperties,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchProperties,
    applyFilters,
    unsubscribe
  }
}