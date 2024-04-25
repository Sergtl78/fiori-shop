import { auth } from 'auth'

const ServerPage = async () => {
  const session = await auth()
  if (!session || !session.user)
    return (
      <div className='text-red-500 p-5'>Server Page. sYou Need To Sign In</div>
    )
  return (
    <div>
      This is a server Page and must be protected
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      <p>{session.user.image}</p>
      <p>{session.user.role}</p>
    </div>
  )
}

export default ServerPage
