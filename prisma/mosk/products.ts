import { Prisma } from '@prisma/client'

export const mockProducts: Prisma.ProductCreateInput[] = [
  {
    name: 'Yellow Gem',
    slug: 'yellow-gem',
    sort_order: 'a',
    description:
      'Относится к ИТО-гибридам (травянистый+древовидный), очень яркий и нарядный сорт японской селекции. Диаметр полумахрового цветка 15 см, цвет насыщенно-желтый, с красными мазками. Цветение раннее, длительное (до 4 недель), очень обильное. Куст невысокий, до 50 см, компактный с красивой резной листвой.',
    price: 112,
    growth: 75,
    quantity: 50,
    min_quantity: 15,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'pions' } },
    Vendor: { connect: { slug: 'Ecuador' } },
    Color: { connect: { slug: 'yellow' } },
    images: { connect: [{ name: 'Yellow Gem.webp' }] }
  },
  {
    name: 'Vera',
    slug: 'vera',
    sort_order: 'b',
    description:
      'Гербера относится к роду астровых и похожа на астру, небольшой подсолнух или большую радужную ромашку. Насчитывается несколько десятков сортов',
    price: 67,
    growth: 50,
    quantity: 100,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'gerbers' } },
    Vendor: { connect: { slug: 'Ecuador' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: [{ name: 'Vera.webp' }] }
  },
  {
    name: 'Athena',
    slug: 'athena',
    sort_order: 'c',
    description:
      'Цвет: кремовый, с розовыми краями. Аромат интенсивный, но свежий. Верхние ноты цитрусовых присутствует даже тогда, когда бутон только открывается. Когда цветок полностью открыт прекрасные ноты свежего личи и белого персика преобладают над ароматами груши и сливы, которые также присутствуют. Базовые ноты пачули и  свежего мирта слабы, но завершают композицию аромата.  Рост: прямо, вертикально Этот сорт является частью новой коллекции Eleganza, выбран из молодых, здоровых чайно-гибридных роз с привлекательными цветами и превосходным сопротивлением болезням. Эти цветоносные чайно-гибридные розы в собственном классе принесут беззаботный стиль каждому саду. Розы из питомника Kordes считаются одними из лучших в мире. И это высокое звание они заслужили не зря, поскольку для этих сортовых роз характерна не только бесподобная красота, но и длительное и пышное цветение, отличная устойчивость к холодам и различным заболеваниям. Розы Kordes имеют многочисленные награды, полученные на международных выставках. Еще одна безусловная заслуга питомника – знак ADR, который присвоен некоторым сортам питомника за их высокую декоративность и устойчивость к неблагоприятным условиям. Основателем питомника Kordes стал Вильгельм Кордес. Именно ему принадлежит идея создания на плодородных землях Эльмшорна питомника для различных растений. Постепенно в питомнике роль главной культуры была отдана розе, а дело по селекции и разведению роз было подхвачено сыновьями Кордеса – Германом и Вильгельмом. На протяжении всего периода существования питомника Kordes, при селекционных работах здесь в первую очередь уделялось внимание морозостойкости и устойчивости к болезням. И старания владельцев питомника были вознаграждены появлением великолепных сортов с чудесными ароматами, продолжительным цветением и совершенной формой бутонов в обрамлении декоративных листьев. А особая неприхотливость и морозостойкость прекрасно подходит для российского климата.',
    price: 39,
    growth: 50,
    quantity: 100,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Ecuador' } },
    Color: { connect: { slug: 'white' } },
    images: { connect: { name: 'Athena.webp' } }
  },
  {
    name: 'Antonov',
    slug: 'antonov',
    sort_order: 'd',
    description:
      'Хризантемы – это яркие, выразительные и простые в уходе цветы. Букет из хризантем подойдет для любого мероприятия или подарка своим близким.',
    price: 119,
    growth: 70,
    quantity: 25,
    min_quantity: 25,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'chrysanthemum' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Ecuador' } },
    Color: { connect: { slug: 'white' } },
    images: { connect: { name: 'Antonov.webp' } }
  },
  {
    name: 'Biscue',
    slug: 'biscue',
    sort_order: 'e',
    description:
      'Царица цветов, королева сада, символ любви — какими только эпитетами не награждали розу за период ее существования. Она получила заслуженное внимание еще во времена Древней Греции и не снижает позиций по сегодняшний день. Нежные лепестки, острые шипы, чарующий аромат и невероятная палитра оттенков делают розу одним из самых популярных растений для украшения садов всего мира! Наша страна не стала исключением.',
    price: 45,
    growth: 50,
    quantity: 40,
    min_quantity: 15,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'bush' } },
    Vendor: { connect: { slug: 'Ecuador' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: { name: 'Biscue.webp' } }
  },
  {
    name: 'Kalinka',
    slug: 'kalinka',
    sort_order: 'f',
    description:
      'Гербера является многолетним травянистым растением из семейства Сложноцветных или Астровых. Растет только там, где тепло и влажно. В дикой природе насчитывают около 80 видов этого растения. Корневая система развитая, крепкая, мочковатая. Стебель прямостоячий, укороченный, часто опушенный. Высота растения достигает 60-70 см, но сорта, выведенные для выращивания в комнатных условиях, бывают ниже, до 30 см.',
    price: 78,
    growth: 50,
    quantity: 100,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'gerbers' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Ecuador' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: { name: 'Kalinka.webp' } }
  },
  {
    name: 'Heliantus vincent choice',
    slug: 'heliantus-vincent-choice',
    sort_order: 'g',
    description:
      'Подсолнечник серии Vincent’s отличается  большой гибкостью в программировании культуры',
    price: 109,
    growth: 85,
    quantity: 100,
    min_quantity: 25,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'sunflower' } },
    Vendor: { connect: { slug: 'Russia' } },
    Color: { connect: { slug: 'yellow' } },
    images: { connect: { name: 'Heliantus vincent choice.webp' } }
  },
  {
    name: 'Statice blue',
    slug: 'statice-blue',
    sort_order: 'h',
    description:
      'Название этого цветка происходит от греческого слова «leimon», что можно перевести как «поляна» или «лужайка». Видимо, это имя досталось растению за место произрастания его отдельных видов, которых всего насчитывается до 300 штук. Еще одно название лимониума – кермек. Дикорастущий лимониум можно встретить по всему миру, но большинство видов любят засушливые регионы. Родиной же этого цветка считаются Канарские острова. Род лимониум относится к семейству Свинчатковых (Plumbaginaceae).',
    price: 89,
    growth: 75,
    quantity: 100,
    min_quantity: 25,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'limoniums' } },
    Vendor: { connect: { slug: 'Russia' } },
    Color: { connect: { slug: 'blue' } },
    images: { connect: { name: 'Statice blue.webp' } }
  },
  {
    name: 'Statice pink',
    slug: 'statice-pink',
    sort_order: 'i',
    description:
      'Название этого цветка происходит от греческого слова «leimon», что можно перевести как «поляна» или «лужайка». Видимо, это имя досталось растению за место произрастания его отдельных видов, которых всего насчитывается до 300 штук. Еще одно название лимониума – кермек. Дикорастущий лимониум можно встретить по всему миру, но большинство видов любят засушливые регионы. Родиной же этого цветка считаются Канарские острова. Род лимониум относится к семейству Свинчатковых (Plumbaginaceae).',
    price: 89,
    growth: 75,
    quantity: 100,
    min_quantity: 25,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'limoniums' } },
    Vendor: { connect: { slug: 'Russia' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: { name: 'Statice pink.webp' } }
  },
  {
    name: 'Tu royal virgin',
    slug: 'tu-royal-virgin',
    sort_order: 'j',
    description:
      'Тюльпан «Ройал Вирджин» - популярный среди любителей белоснежных цветов сорт луковичных многолетников. Растение одаривает поистине восхитительными, крупными бокалами с чистой белой окраской. Лепестки цветов тесно прижаты друг к другу, поэтому бутоны очень аккуратны.',
    price: 55,
    growth: 50,
    quantity: 120,
    min_quantity: 20,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'tulip' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'white' } },
    images: { connect: { name: 'Tu royal virgin.webp' } }
  },
  {
    name: 'Monarch',
    slug: 'monarch',
    sort_order: 'k',
    description:
      'Оранжевая гербера Монарх имеет простую ромашковидную форму и классические для гербер размеры. Высота безлиственного мощного стебля, в некоторых случаях, может достигать 45 сантиметров, а диаметр цветка варьируется в диапазоне 10-12 сантиметров. Отличительной особенностью этого сорта герберы является редкий цвет спелого апельсина, который хорошо вписывается в различные цветочные композиции',
    price: 69,
    growth: 50,
    quantity: 100,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'gerbers' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'orange' } },
    images: { connect: { name: 'Monarch.webp' } }
  },
  {
    name: 'Freedom',
    slug: 'freedom',
    sort_order: 'l',
    description:
      'Эквадорские розы сорта Freedom (Фридом) - бесспорные лидеры цветочного мира. Они пользуются огромной популярностью благодаря крупным высоким бутонам-бокалам, крепким стеблям и нежному аромату. Цветовая палитра бутонов варьируется от насыщенного до светлого красного оттенка с равномерным окрасом по всему лепестку. Розы Freedom великолепно смотрятся по одной и в букете, их можно преподносить в составе авторской композиции или в дополнении с различными декоративными элементами. Цветы именно этого сорта долго простоят в вазе при условии, что были куплены свежими и вовремя получали воду. Подарить красную розу Freedom можно на день рождения или годовщину, 14 февраля или 8 марта: такому роскошному подарку обрадуется любая девушка.',
    price: 78,
    growth: 50,
    quantity: 45,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'red' } },
    images: {
      connect: [
        { name: 'Freedom.webp' },
        { name: 'Freedom2.webp' },
        { name: 'Freedom3.webp' }
      ]
    }
  },
  {
    name: 'Explorer',
    slug: 'explorer',
    sort_order: 'm',
    description:
      'Необычная махровая роза красного цвета. Бутон очень крупный и плотный, цветок отличается великолепной стойкостью.',
    price: 99,
    growth: 75,
    quantity: 400,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'bush' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'dark-red' } },
    images: {
      connect: [{ name: 'Explorer.webp' }, { name: 'Explorer2.webp' }]
    }
  },
  {
    name: 'Juliet',
    slug: 'juliet',
    sort_order: 'n',
    description:
      'Пионовидная роза Juliet – жемчужина цветочной коллекции селекционера Девида Остина. Сорт характеризует идеально круглая форма бутона, обилие кружевных лепестков персикового цвета с внешней стороны и насыщенного абрикосового ближе к центру, а также легкий приятный аромат, в котором преобладают нотки зеленого чая. До появления пионовидной Juliet мир еще никогда не видел роз с таким сложным и многогранным оттенком. Благодаря ему этот сорт пользуется такой невероятной популярностью во всем мире, украшает свадебные букеты самых знаменитых невест и торжественные залы в роскошных особняках. Роза Juliet хорошо сочетается с цветами как нежных, так и насыщенных тонов, прекрасно смотрится в авторских букетах и просто ослепительна в монокомпозиции из 11 и более штук. Преподнести такую пионовидную розу в подарок, пожалуй, самый изысканный способ выразить свои чувства.',
    price: 78,
    growth: 75,
    quantity: 100,
    min_quantity: 25,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'peony' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: [{ name: 'Juliet.webp' }, { name: 'Juliet2.webp' }] }
  },
  {
    name: 'Patience',
    slug: 'patience',
    sort_order: 'o',
    description:
      'Роза в романтическом стиле. Цветы - плоские розетки идеальной формы с взъерошенными лепестками, напоминающими тонкое кружево. Сильный аромат старинных роз с элементами фруктов, сирени и мирры.',
    price: 63,
    growth: 75,
    quantity: 50,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: [{ name: 'Patience.webp' }, { name: 'Patience2.webp' }] }
  },
  {
    name: 'Princess Anne',
    slug: 'princess-anne',
    sort_order: 'p',
    description:
      'Красивый новый сорт, представляющий собой новое направление в селекции английских роз. Внешний вид заметно отличается от других сортов, обладая своим, особенным шармом, но при этом сохраняя классические густомахровые цветки английской розы. Только что распустившиеся цветки густо-розовые, почти малиновые, по мере роспуска выгорают до ярко-розовых. Изнанка лепестков - с интересным желтым подтоном. Лепестки довольно узкие, необычно плотные. Куст прямостоячий, листва довольно плотная, кожистая, очень блестящая.',
    price: 105,
    growth: 50,
    quantity: 200,
    min_quantity: 50,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Kenya' } },
    Color: { connect: { slug: 'yellow' } },
    images: {
      connect: [{ name: 'Princess Anne.webp' }, { name: 'Princess Anne2.webp' }]
    }
  },
  {
    name: 'English Miss',
    slug: 'english-miss',
    sort_order: 'q',
    description:
      'English Miss серебристо-розовые, более темные по краям, среднего размера, очень душистые цветки. Махровые, в одном цветке находится примерно 35 лепестков. Бутоны раскрываются в цветки с сильным сладким запахом, напоминающие цветки камелии. Куст густо одет блестящими кожистыми листьями с лиловым оттенком.',
    price: 80,
    growth: 75,
    quantity: 100,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'pink' } },
    images: { connect: [{ name: 'English Miss.webp' }] }
  },
  {
    name: 'Miss America',
    slug: 'miss-america',
    sort_order: 'r',
    description:
      'Сорт отличается изумительно легкими и воздушными полумахровыми цветами диаметром 25 см. В стадии бутона белые лепестки имеют нежно-розовый румянец, но при распускании, становятся белоснежными. Белизна оттеняется ярко-желтыми тычинками. Красота чашевидных цветков дополняется приятным ароматом. Растение достигает 80-90 см высоты, но крепкие стебли не требуют подвязывания. Период цветения — с мая по июнь.',
    price: 119,
    growth: 75,
    quantity: 100,
    min_quantity: 10,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Holland' } },
    Color: { connect: { slug: 'beige' } },
    images: {
      connect: [
        { name: 'Miss America.webp' },
        { name: 'Miss America2.webp' },
        { name: 'Miss America3.webp' }
      ]
    }
  },
  {
    name: 'Coral Sunset',
    slug: 'coral-sunset',
    sort_order: 's',
    description:
      'Корал Сансет – самый популярный пион из коралловой серии. И не без причины. Из всех коралловых пионов этот имеет самые толстые стебли, наибольший объем листьев и самые крупные бутоны. Пионы серии Корал часто используются именно из-за своего оранжевого оттенка, а Корал Сансет – самый оранжевый из всех. ',
    price: 110,
    growth: 75,
    quantity: 200,
    min_quantity: 15,
    Main_category: { connect: { slug: 'flowers' } },
    Category: { connect: { slug: 'roses' } },
    Sub_category: { connect: { slug: 'one-head' } },
    Vendor: { connect: { slug: 'Kenya' } },
    Color: { connect: { slug: 'pink' } },
    images: {
      connect: [{ name: 'Coral Sunset.webp' }, { name: 'Coral Sunset2.webp' }]
    }
  },

  {
    name: 'Solidago',
    slug: 'solidago',
    sort_order: 't',
    description:
      'Название солидаго происходит от латинского слова «solidago», что означает «придавать сил, исцелять или делать цельным». Имя этого растения отражает его целебные свойства.',
    price: 55,
    growth: 55,
    quantity: 50,
    min_quantity: 10,
    Main_category: { connect: { slug: 'greens' } },
    Category: { connect: { slug: 'solidago' } },
    Vendor: { connect: { slug: 'Kenya' } },
    Color: { connect: { slug: 'yellow' } },
    images: { connect: [{ name: 'Solidago golden glory.webp' }] }
  }
]
