import { cn } from '@/lib/utils'

type Props = {
  status: string
  message: string
}

const StatusError = ({ status, message }: Props) => {
  return (
    <div className={cn(status === 'error' ? 'bg-red-100' : 'bg-green-100')}>
      <p
        className={cn(
          status === 'error' ? 'text-red-800' : 'text-green-800',
          'px-4 text-center'
        )}
      >
        {message}
      </p>
    </div>
  )
}

export default StatusError
