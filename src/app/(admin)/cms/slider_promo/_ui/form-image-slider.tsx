'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Cross2Icon, DownloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadSliderPromo } from '../_lib/api/actions-slides'

type FormImageProps = {
  className?: string
  slideId?: string
  slideImage?: string | null
}
type SaveFile = File & {
  preview: string
}
const FormImageSlider = ({
  className,
  slideId,
  slideImage
}: FormImageProps) => {
  const [files, setFiles] = useState<SaveFile[]>([])
  const router = useRouter()
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000 * 5,
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
    const response = await uploadSliderPromo(initialState, formData, slideId)
    console.log('response', response)

    setFiles([])
    if (response?.status === 'success') {
      setUploading(false)
      router.refresh()
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
            className='relative w-96 h-96   shadow-lg items-center justify-center'
          >
            <Image
              src={files[0].preview}
              alt={'avatar'}
              priority={false}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw'
              className='object-cover '
              onLoad={() => {
                URL.revokeObjectURL(files[0].preview)
              }}
            />

            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={() => removeFile(files[0].name)}
              className='absolute top-0 -right-8  hover:bg-destructive transition-colors'
            >
              <Cross2Icon className='w-5 h-5 ' />
            </Button>
          </div>
        ) : (
          <div className='relative flex  items-center justify-center w-96 h-96   border-2 border-dashed border-muted-foreground'>
            {slideImage && (
              <Image
                src={slideImage}
                alt={'avatar'}
                priority={false}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw'
                className='object-cover '
              />
            )}
            <DownloadIcon className='absolute -top-6 left-1/2 -translate-x-1/2  w-5 h-5 fill-current' />
          </div>
        )}
        <p className='my-2  text-[12px] font-medium'>{files[0]?.name}</p>
      </div>

      {/* Preview */}
      <section className=''>
        <Button disabled={uploading} type='submit'>
          {uploading ? 'Загрузка...' : 'Загрузить картинку слайда'}
        </Button>
      </section>
    </form>
  )
}

export default FormImageSlider
