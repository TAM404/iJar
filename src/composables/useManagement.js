import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { validateProperty } from '@/utils/validators'

export const useManagement = () => {
  const isLoading = ref(false)
  const error = ref(null)

  // Create new property
  const createProperty = async (propertyData) => {
    try {
      isLoading.value = true
      const validationError = validateProperty(propertyData)
      if (validationError) throw new Error('Invalid property data')

      const { data, error: sbError } = await supabase
        .from('properties')
        .insert({
          ...propertyData,
          user_id: supabase.auth.user()?.id
        })
        .select()

      if (sbError) throw sbError
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update existing property
  const updateProperty = async (id, updates) => {
    try {
      isLoading.value = true
      const validationError = validateProperty(updates)
      if (validationError) throw new Error('Invalid property data')

      const { data, error: sbError } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()

      if (sbError) throw sbError
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete property
  const deleteProperty = async (id) => {
    try {
      isLoading.value = true
      const { error: sbError } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (sbError) throw sbError
      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Image upload handling
  const uploadImage = async (file) => {
    try {
      isLoading.value = true
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    createProperty,
    updateProperty,
    deleteProperty,
    uploadImage
  }
}