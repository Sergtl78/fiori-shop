/* eslint-disable */
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

export function MagicLinkEmail({ url, host }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body
        style={{
          backgroundColor: '#ffffff',
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
        }}
      >
        <Container
          style={{
            margin: '0 auto',
            padding: '20px 20px 48px'
          }}
        >
          <Img
            src={`https://storage.yandexcloud.net/test-for-flower/fiori2.png`}
            width='100'
            height='100'
            alt='Fiori'
            style={{
              margin: '0 auto'
            }}
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
          <Text
            style={{
              fontSize: '16px',
              lineHeight: '26px',
              textAlign: 'center'
            }}
          >
            Наши оптовые цены, Вас приятно удивят, а качество и красота цветов
            будут удивлять вас день за днем.
          </Text>
          <Hr
            style={{
              borderColor: '#cccccc'
            }}
          />
          <Text
            style={{
              fontSize: '16px',
              lineHeight: '26px',
              textAlign: 'center'
            }}
          >
            👇 Для регистрации или входа, нажмите на кнопку ниже.👇
          </Text>
          <Section
            style={{
              textAlign: 'center'
            }}
          >
            <Button
              style={{
                backgroundColor: '#17bf0f',
                borderRadius: '3px',
                color: '#fff',
                fontSize: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
                padding: '12px',
                margin: '20px 0'
              }}
              href={url}
            >
              Войти на сайт
            </Button>
          </Section>

          <Hr
            style={{
              borderColor: '#cccccc'
            }}
          />
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
