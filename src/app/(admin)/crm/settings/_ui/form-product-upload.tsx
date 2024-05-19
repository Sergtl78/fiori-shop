'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Cross2Icon, DownloadIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { productsCreate } from '../_lib/api/products-create'

type FormImageProps = {
  className?: string
  userId: string
}
type SaveFile = File & {
  preview: string
}
const FormProductUpload = ({ className, userId }: FormImageProps) => {
  const [files, setFiles] = useState<SaveFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.csv',
        '.xls',
        '.xlsx'
      ]
    },
    maxSize: 1024 * 1000 * 10,
    onDrop
  })
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])
  const removeFile = (name: string) => {
    setFiles([])
  }

  const initialState = { message: '', status: '' }

  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!files) {
      alert('Please select a file to upload.')
      return
    }
    const formData = new FormData()
    for (let file of files) {
      formData.append('file', file)
    }

    setUploading(true)
    const response = await productsCreate({ initialState, formData: formData })
    console.log('response', response)
    setFiles([])
    if (response?.status === 'success') {
      setUploading(false)
      return toast({
        title: response?.message,
        variant: 'success'
      })
    } else {
      setUploading(false)
      return toast({
        title: response?.message,
        variant: 'destructive'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />

        {files.length > 0 ? (
          <div
            key={files[0]?.name}
            className='flex w-full h-32  shadow-lg items-center justify-center gap-4'
          >
            <p>{files[0]?.name}</p>

            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={() => removeFile(files[0].name)}
              className=' hover:bg-destructive transition-colors'
            >
              <Cross2Icon className='w-5 h-5 ' />
            </Button>
          </div>
        ) : (
          <div className='relative flex  items-center justify-center w-full h-32  border-2 border-dashed border-muted-foreground'>
            <DownloadIcon className=' w-5 h-5 fill-current' />
          </div>
        )}
        <p className='my-2  text-[12px] font-medium'>{files[0]?.name}</p>
      </div>

      {/* Preview */}
      <section className=''>
        <Button disabled={uploading} type='submit'>
          {uploading ? 'Загрузка...' : 'Загрузить товары'}
        </Button>
      </section>
    </form>
  )
}

export default FormProductUpload
