'use client'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong! (CRM)</h2>
      <p>{error.message}</p>
      <p>{error.digest}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
