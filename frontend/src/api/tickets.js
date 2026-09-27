import { api } from './client'

export function listTickets(page = 1, pageSize = 50) {
  return api.get(`/tickets?page=${page}&page_size=${pageSize}`)
}

export function getTicket(id) {
  return api.get(`/tickets/${id}`)
}

export function createTicket(payload) {
  return api.post('/tickets', payload)
}

export function updateTicketStatus(id, status) {
  return api.patch(`/tickets/${id}/status`, { status })
}

export function listComments(ticketId) {
  return api.get(`/comments/tickets/${ticketId}`)
}

export function addComment(ticketId, content) {
  return api.post(`/comments/tickets/${ticketId}`, { content })
}
