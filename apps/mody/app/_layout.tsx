import { Stack } from 'expo-router'
import { QueryProvider } from '@/shared/api/query'

export default function Layout() {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  )
}
