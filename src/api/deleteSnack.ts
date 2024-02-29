import { api } from '@/lib/axios'

interface DeleteSnackParams {
  snackId: string
}

export async function deleteSnack({ snackId }: DeleteSnackParams) {
  await api.delete(`/snacks/${snackId}`)
}
