import { api } from './client'

export function listCategories(activeOnly = false) {
  return api.get(`/categories?active_only=${activeOnly}`)
}
