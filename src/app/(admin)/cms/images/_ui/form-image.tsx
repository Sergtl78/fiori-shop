'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Cross2Icon, DownloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { uploadFileMulti } from '../_lib/api/actions-multi'

type FormImageProps = {
  className?: string
  arrNames?: string[]
}
type SaveFile = File & {
  preview: string
}
const FormImage = ({ className, arrNames }: FormImageProps) => {
  const [files, setFiles] = useState<SaveFile[]>([])
  const [rejected, setRejected] = useState<FileRejection[]>([])

  function nameValidator(file: File) {
    if (arrNames?.includes(file.name)) {
      return {
        code: 'name using',
        message: `Имя ${file.name} уже используется`
      }
    }

    return null
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        ])
      }

      if (rejectedFiles?.length) {
        setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
      }
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000 * 5,
    validator: nameValidator,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name: string) => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = (name: string) => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }
  const initialState = { message: '', status: '' }
  /* 
  const [state, formAction] = useFormState(uploadFileMulti, initialState) */
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
    const response = await uploadFileMulti(initialState, formData)
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
    <form /* action={formAction}  */ onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4 p-4 max-w-sm rounded-lg  border-2 border-dashed border-muted-foreground'>
          <DownloadIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Загрузить файлы здесь ...</p>
          ) : (
            <p>Перетащите файлы сюда или кликните, чтобы выбрать файлы.</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Предпросмотр</h2>
          <Button onClick={removeAll}>Удалить все файлы</Button>
          <Button disabled={uploading} type='submit'>
            {uploading ? 'Загрузка...' : 'Загрузить все файлы'}
          </Button>
        </div>

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold mt-10 border-b pb-3'>
          Принятые файлы
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li
              key={file.name}
              className='relative w-32 aspect-square rounded-md shadow-lg'
            >
              <Image
                src={file.preview}
                alt={file.name}
                priority={false}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw'
                className='object-cover aspect-square rounded-md'
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
              />

              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={() => removeFile(file.name)}
                className='absolute top-0 right-0  hover:bg-destructive transition-colors'
              >
                <Cross2Icon className='w-5 h-5 ' />
              </Button>
              <p className='mt-2  text-[12px] font-medium'>{file.name}</p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h3 className='title text-lg font-semibold  mt-24 border-b pb-3'>
          Отклоненные файлы
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-center gap-2 '>
              <Button
                className='text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors'
                size={'icon'}
                variant={'ghost'}
                onClick={() => removeRejected(file.name)}
              >
                <Cross2Icon className='w-5 h-5 ' />
              </Button>
              <div>
                <p className='mt-2 text-sm font-medium'>{file.name}</p>
                <ul className='text-[12px] text-destructive'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </form>
  )
}

export default FormImage
