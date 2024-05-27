'use server'
import {
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { revalidatePath } from 'next/cache'
import sharp from 'sharp'
import { createImage } from './image'

const s3Client = new S3Client({
  region: `${process.env.YANDEX_CLOUD_REGION}`,
  credentials: {
    accessKeyId: `${process.env.YANDEX_CLOUD_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.YANDEX_CLOUD_ACCESS_SECRET}`
  },
  endpoint: `${process.env.YANDEX_CLOUD_ENDPOINT}`
})

async function uploadFileToS3multi(file: Buffer, fileName: string) {
  const fileBuffer = /* file */ await sharp(file)
    .toFormat('webp')
    .webp({ quality: 80 })
    .resize(800, 800)
    .toBuffer()

  const params = {
    Bucket: process.env.YANDEX_CLOUD_BUCKET,
    Key: `flowers/${fileName.split('.')[0]}.webp`,
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
export async function uploadFileMulti(
  prevState: StateForm,
  formData: FormData
) {
  try {
    const files = formData.getAll('file') as File[]
    console.log('file', files)

    if (files.length === 0) {
      return { status: 'error', message: 'Please select a file.' }
    }
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = await uploadFileToS3multi(buffer, file.name)
      if (fileName) {
        await createImage({
          name: `${fileName.split('.')[0]}.webp`,
          url: `https://${process.env.YANDEX_CLOUD_BUCKET}.storage.yandexcloud.net/flowers/${fileName.split('.')[0]}.webp`
        })
      }
    }
    revalidatePath('/', 'layout')
    return { status: 'success', message: 'Файлы успешно загружены.' }
  } catch (error) {
    return {
      status: 'error',
      message: 'Что то пошло не так. Файлы не загружены.'
    }
  }
}
type DeleteImagesArgs = {
  Key: string
}[]
export async function deleteImagesInBucket(arrKeys: DeleteImagesArgs) {
  const input = {
    // DeleteObjectsRequest
    Bucket: process.env.YANDEX_CLOUD_BUCKET, // required
    Delete: {
      // Delete
      Objects: arrKeys,
      Quiet: true || false
    }
  }
  const command = new DeleteObjectsCommand(input)
  const response = await s3Client.send(command)
  return response
}
