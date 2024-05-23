import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'

interface MagicLinkEmailProps {
  url: string
  host: string
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

export default function MagicLinkEmail({ url, host }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://devsergey.ru/logo.svg`}
            width='100'
            height='100'
            alt='Fiori'
            style={logo}
          />
          <Text
            style={{
              fontSize: '24px',
              lineHeight: '26px',
              textAlign: 'center'
            }}
          >
            👋 Добро пожаловать на сайт {host}
          </Text>
          <Text
            style={{
              fontSize: '18px',
              lineHeight: '22px',
              textAlign: 'center'
            }}
          >
            Компания Фиори предлагает вам лучшие цветы в Нижнем Новгороде.
          </Text>
          <Text style={paragraph}>
            Наши оптовые цены, Вас приятно удивят, а качество и красота цветов
            будут удивлять вас день за днем.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            👇 Для регистрации или входа, нажмите на кнопку ниже.👇
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={url}>
              Войти на сайт
            </Button>
          </Section>

          <Hr style={hr} />
          <Text>С уважением, команда Фиори</Text>
          <Text style={{ color: '#8898aa' }}>
            Наш адрес: Нижний Новгород ул.Кащенко 6г.
          </Text>
          <Link style={{ color: '#8898aa' }} href='mailto:Info@fioriopt.ru'>
            email: Info@fioriopt.ru
          </Link>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 20px 48px'
}

const logo = {
  margin: '0 auto'
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const
}

const btnContainer = {
  textAlign: 'center' as const
}

const button = {
  backgroundColor: '#17bf0f',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
  margin: '20px 0'
}

const hr = {
  borderColor: '#cccccc'
  //margin: '20px 0'
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  padding: '0'
}
