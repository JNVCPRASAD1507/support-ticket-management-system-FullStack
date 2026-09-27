# API endpoint inventory

FastAPI route decorators in `backend/app/api/v1/`. Check router schemas and dependencies for request/response formats and role restrictions.

| Method | Path (router-relative) | Router file |
|---|---|---|
| POST | `/register` | `app/api/v1/auth.py` |
| POST | `/login` | `app/api/v1/auth.py` |
| POST | `/refresh` | `app/api/v1/auth.py` |
| POST | `/logout` | `app/api/v1/auth.py` |
| GET | `/me` | `app/api/v1/auth.py` |
| POST | `/change-password` | `app/api/v1/auth.py` |

| POST | `` | `app/api/v1/tickets.py` |
| GET | `` | `app/api/v1/tickets.py` |
| GET | `/sla/breached` | `app/api/v1/tickets.py` |
| GET | `/{ticket_id}` | `app/api/v1/tickets.py` |
| PUT | `/{ticket_id}` | `app/api/v1/tickets.py` |
| PATCH | `/{ticket_id}/assign` | `app/api/v1/tickets.py` |
| PATCH | `/{ticket_id}/status` | `app/api/v1/tickets.py` |
| DELETE | `/{ticket_id}` | `app/api/v1/tickets.py` |

| POST | `/tickets/{ticket_id}` | `app/api/v1/comments.py` |
| GET | `/tickets/{ticket_id}` | `app/api/v1/comments.py` |
| PUT | `/{comment_id}` | `app/api/v1/comments.py` |
| DELETE | `/{comment_id}` | `app/api/v1/comments.py` |

| POST | `` | `app/api/v1/users.py` |
| GET | `` | `app/api/v1/users.py` |
| GET | `/{user_id}` | `app/api/v1/users.py` |
| PUT | `/{user_id}` | `app/api/v1/users.py` |
| PATCH | `/{user_id}/activate` | `app/api/v1/users.py` |
| PATCH | `/{user_id}/deactivate` | `app/api/v1/users.py` |
| PATCH | `/{user_id}/role` | `app/api/v1/users.py` |

| POST | `/tickets/{ticket_id}` | `app/api/v1/attachments.py` |
| GET | `/tickets/{ticket_id}` | `app/api/v1/attachments.py` |
| DELETE | `/{attachment_id}` | `app/api/v1/attachments.py` |

| POST | `` | `app/api/v1/categories.py` |
| GET | `` | `app/api/v1/categories.py` |
| GET | `/{category_id}` | `app/api/v1/categories.py` |
| PUT | `/{category_id}` | `app/api/v1/categories.py` |
| PATCH | `/{category_id}/activate` | `app/api/v1/categories.py` |
| PATCH | `/{category_id}/deactivate` | `app/api/v1/categories.py` |

| GET | `/` | `app/api/v1/audit_logs.py` |

| GET | `` | `app/api/v1/notifications.py` |
| GET | `/unread-count` | `app/api/v1/notifications.py` |
| PATCH | `/read-all` | `app/api/v1/notifications.py` |
| PATCH | `/{notification_id}/read` | `app/api/v1/notifications.py` |
| DELETE | `/{notification_id}` | `app/api/v1/notifications.py` |
