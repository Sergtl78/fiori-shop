import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getMainCategories } from '../../_lib/api/main_category'

type Props = {}

const SideBar = async (props: Props) => {
  const main_categories = await getMainCategories()

  return (
    <aside className='flex flex-col   p-4 w-full max-w-xs '>
      <nav>
        <Link href={`/catalog`} className='w-full'>
          <Button variant='ghost' className='w-full flex justify-start'>
            Каталог
          </Button>
        </Link>
        <Accordion type='multiple'>
          {main_categories.map(
            main_category =>
              main_category.products?.length !== 0 && (
                <AccordionItem
                  key={main_category.id}
                  value={`item-${main_category.id}`}
                >
                  <div className='flex flex-row gap-2 items-center justify-between'>
                    <Link
                      href={`/catalog/${main_category.slug}`}
                      className='w-full'
                    >
                      <Button
                        variant='ghost'
                        className='w-full flex justify-start'
                      >
                        {main_category.name}
                      </Button>
                    </Link>
                    <AccordionTrigger className='w-9 h-9 px-4 py-2 rounded-md flex items-center justify-center hover:bg-muted' />
                  </div>
                  <AccordionContent>
                    <Accordion type='multiple' className='ml-4'>
                      {main_category.categories.map(
                        category =>
                          category.products?.length !== 0 && (
                            <AccordionItem
                              key={category.id}
                              value={`item-${category.id}`}
                            >
                              <div className='flex flex-row gap-2 items-center'>
                                <Link
                                  href={`/catalog/${main_category.slug}/${category.slug}`}
                                  className='w-full'
                                >
                                  <Button
                                    variant='ghost'
                                    className='w-full justify-start'
                                  >
                                    {category.name}
                                  </Button>
                                </Link>
                                {category.sub_categories.length !== 0 && (
                                  <AccordionTrigger className='w-9 h-9 px-4 py-2 rounded-md flex items-center justify-center hover:bg-muted' />
                                )}
                              </div>
                              {category.sub_categories.length !== 0 && (
                                <AccordionContent>
                                  <Accordion type='multiple' className='ml-4'>
                                    {category.sub_categories.map(
                                      sub_category =>
                                        sub_category.products?.length !== 0 && (
                                          <AccordionItem
                                            key={sub_category.id}
                                            value={`item-${sub_category.id}`}
                                          >
                                            <div className='flex flex-row gap-2 items-center'>
                                              <Link
                                                href={`/catalog/${main_category.slug}/${category.slug}/${sub_category.slug}`}
                                                className='w-full'
                                              >
                                                <Button
                                                  variant='ghost'
                                                  className='w-full justify-start'
                                                >
                                                  {sub_category.name}
                                                </Button>
                                              </Link>
                                            </div>
                                          </AccordionItem>
                                        )
                                    )}
                                  </Accordion>
                                </AccordionContent>
                              )}
                            </AccordionItem>
                          )
                      )}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              )
          )}
        </Accordion>
      </nav>
    </aside>
  )
}

export default SideBar
