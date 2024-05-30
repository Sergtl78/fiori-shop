'use server'
import { updateUserAvatar } from '@/app/(website)/_lib/api/user'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { auth } from 'auth*'
import { revalidatePath } from 'next/cache'
import sharp from 'sharp'

const s3Client = new S3Client({
  region: `${process.env.YANDEX_CLOUD_REGION}`,
  credentials: {
    accessKeyId: `${process.env.YANDEX_CLOUD_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.YANDEX_CLOUD_ACCESS_SECRET}`
  },
  endpoint: `${process.env.YANDEX_CLOUD_ENDPOINT}`
})

async function uploadAvatarToS3(file: Buffer, fileName: string) {
  const fileBuffer = await sharp(file)
    .toFormat('webp')
    .webp({ quality: 100 })
    .resize(100, 100)
    .toBuffer()

  const params = {
    Bucket: process.env.YANDEX_CLOUD_BUCKET,
    Key: `avatar/${fileName.split('.')[0]}.webp`,
    Body: fileBuffer,
    ContentType: 'image/webp'
  }

  const command = new PutObjectCommand(params)
  try {
    const response = await s3Client.send(command)
    return fileName
  } catch (error) {
    console.log('Error uploading file:', error)
  }
}
type StateForm = {
  message: string
  status: string
}
export async function uploadAvatar(prevState: StateForm, formData: FormData) {
  const session = await auth()
  try {
    const files = formData.getAll('file') as File[]
    console.log('file', files[0])

    if (files.length === 0) {
      return { status: 'error', message: 'Пожалуйся выберите файл.' }
    }

    const buffer = Buffer.from(await files[0].arrayBuffer())

    const fileName = await uploadAvatarToS3(buffer, files[0].name)
    console.log('fileName', fileName)

    if (fileName && session?.user.id) {
      await updateUserAvatar({
        userId: session?.user.id,
        urlAvatar: `https://${process.env.YANDEX_CLOUD_BUCKET}.storage.yandexcloud.net/avatar/${fileName.split('.')[0]}.webp`
      })
    }

    revalidatePath('/', 'layout')
    return { status: 'success', message: 'файл успешно загружен.' }
  } catch (error) {
    return { status: 'error', message: 'файл не загружен.' }
  }
}
