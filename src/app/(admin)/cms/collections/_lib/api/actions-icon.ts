'use server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { auth } from 'auth*'
import { revalidatePath } from 'next/cache'
import sharp from 'sharp'
import { updateIconCollection } from './collection'

const s3Client = new S3Client({
  region: `${process.env.YANDEX_CLOUD_REGION}`,
  credentials: {
    accessKeyId: `${process.env.YANDEX_CLOUD_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.YANDEX_CLOUD_ACCESS_SECRET}`
  },
  endpoint: `${process.env.YANDEX_CLOUD_ENDPOINT}`
})

async function uploadIconToS3(file: Buffer, fileName: string) {
  const fileBuffer = await sharp(file)
    .toFormat('webp')
    .webp({ quality: 100 })
    .resize(100, 100)
    .toBuffer()

  const params = {
    Bucket: process.env.YANDEX_CLOUD_BUCKET,
    Key: `icons/${fileName.split('.')[0]}.webp`,
    Body: fileBuffer,
    ContentType: 'image/webp'
  }

  const command = new PutObjectCommand(params)
  try {
    const response = await s3Client.send(command)
    console.log('File uploaded successfully:', response)
    return fileName
  } catch (error) {
    console.log('Error uploading file:', error)
  }
}
type StateForm = {
  message: string
  status: string
}
export async function uploadIcon(
  prevState: StateForm,
  formData: FormData,
  id?: string
) {
  const session = await auth()
  try {
    const files = formData.getAll('file') as File[]

    if (files.length === 0) {
      return { status: 'error', message: 'Please select a file.' }
    }

    const buffer = Buffer.from(await files[0].arrayBuffer())

    const fileName = await uploadIconToS3(buffer, files[0].name)

    if (fileName && id) {
      await updateIconCollection({
        id: id,
        icon: `https://${process.env.YANDEX_CLOUD_BUCKET}.storage.yandexcloud.net/icons/${fileName.split('.')[0]}.webp`
      })
    }

    revalidatePath('/', 'layout')
    return { status: 'success', message: 'File has been upload.' }
  } catch (error) {
    return { status: 'error', message: 'Failed to upload file.' }
  }
}
