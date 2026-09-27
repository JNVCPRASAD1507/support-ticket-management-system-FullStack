import { api } from './client'

export function listUsers(page = 1, pageSize = 100) {
  return api.get(`/users?page=${page}&page_size=${pageSize}`)
}
