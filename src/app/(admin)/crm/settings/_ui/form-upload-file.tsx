'use client'
import { ExcelFileIcon } from '@/app/(admin)/_ui/icons/ExelesFileIcon'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChangeEvent, useState } from 'react'
import { useFormState } from 'react-dom'
import { actionProductsCreate } from '../_lib/api/action-products-create'
import StatusError from './status-error'
import { SubmitButton } from './submit-button'

type Props = {}

const FormUploadFile = (props: Props) => {
  const [status, formAction] = useFormState(actionProductsCreate, null)
  const [excelFile, setExcelFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null)
  const [typeError, setTypeError] = useState<string | null>(null)

  // submit state
  const [excelData, setExcelData] = useState(null)

  // onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    let fileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]
    let selectedFile = e.target?.files?.[0] ? e.target.files[0] : null
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null)
        let reader = new FileReader()
        reader.readAsArrayBuffer(selectedFile)
        reader.onload = e => {
          setExcelFile(e.target?.result)
        }
      } else {
        setTypeError('Please select only excel file types')
        setExcelFile(null)
      }
    } else {
      console.log('Please select your file')
    }
  }
  return (
    <div>
      <form action={formAction} className='flex flex-row gap-2'>
        <Label htmlFor='file' className='flex flex-row items-center'>
          <ExcelFileIcon className='w-10 h-10' />
          <Input
            type='file'
            id='file'
            name='file'
            onChange={e => handleFile(e)}
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          />
        </Label>

        <SubmitButton />
      </form>
      {status?.message && (
        <StatusError status={status.status} message={status.message} />
      )}
    </div>
  )
}

export default FormUploadFile
