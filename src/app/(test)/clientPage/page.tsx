'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ClientPage = () => {
  const router=useRouter()
  const { data: session } = useSession()
  if (!session || !session.user) router.push('/login')
  return <div>This is a client page and must be protected</div>
}

export default ClientPage
