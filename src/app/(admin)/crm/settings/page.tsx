import FormProductUpload from './_ui/form-product-upload'

function SettingPage() {
  return (
    <div className='flex flex-col py-10 px-6  gap-6'>
      <h3>Загрузить товары из файла</h3>

      <FormProductUpload userId={''} />
    </div>
  )
}

export default SettingPage
