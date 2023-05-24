import Head from 'next/head'
import { Accordion, Title, Anchor, Text } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell'


export default function FAQPage () {
  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{padding: '25px'}}>
          <Title order={1} style={{ marginBottom: '15px' }}>Часто задаваемые вопросы</Title>
          <Accordion defaultValue="what">

            <Accordion.Item value="what">
              <Accordion.Control>Чем мы занимаемся?</Accordion.Control>
              <Accordion.Panel><Text>Продажей доступа к STL файлам из нашего каталога, если вы хотите печатать самостоятельно (unsupported и presupported версии), а также печатью миниатюр из нашего каталога и библиотеки KS на фотополимерных принтерах 4К и 6К </Text></Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="stl">
              <Accordion.Control>Что такое STL файлы?</Accordion.Control>
              <Accordion.Panel><Text>STL - это формат файлов, предназначенных для 3d печати. Это электронный товар, который вам нужен для самостоятельной печати.</Text></Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="how">
              <Accordion.Control>Как доставляются STL файлы?</Accordion.Control>
              <Accordion.Panel><Text>Как только заказ поступит к нам, мы начнем формировать архив, который пришлем вам файлом в любом мессенджере, либо выгрузим его в облако, а вам пришлём ссылку. В таком случае у вас будет 7 дней для того чтобы скачать ваши файлы, после чего ссылка автоматически удалится.</Text></Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="how-physical">
              <Accordion.Control>Как будут доставлены купленные миниатюры?</Accordion.Control>
              <Accordion.Panel><Text>После оформления заказа с вами свяжется менеджер, который будет держать вас в курсе статуса вашего заказа, и (при договоренности) присылать фотографии рабочего процесса. Как только ваш заказ будет готов, мы свяжемся с вами по поводу доставки.</Text></Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="scale">
              <Accordion.Control>В каком скейле миниатюрки?</Accordion.Control>
              <Accordion.Panel><Text>Большинство миниатюр выполнено в скейле 32мм, но стоит понимать, что 32мм одной студии может отличаться от 32мм другой. Поэтому непосредственно перед печатью я настоятельно рекомендую в любом случае проверять размер миниатюрки и, при необходимости, менять его. Для удобства ты можешь воспользоваться <Anchor href='https://www.thingiverse.com/thing:4842385'>Линейкой Скалирования.</Anchor></Text></Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="bases">
              <Accordion.Control>В файлах моей миньки не было базы! Что делать?</Accordion.Control>
              <Accordion.Panel>Это значит только одно - миниатюрка предоставляется без специальной базы. Уверяю, что все файлы досконально проверяются перед тем, как будут отправлены приобретателю. Ты можешь либо скачать бесплатную базу (<Anchor href='https://www.thingiverse.com/thing:3438699'>28мм</Anchor>, <Anchor href='https://www.thingiverse.com/thing:2589358'>32мм</Anchor>), либо выбрать базу из нашей <Anchor href='/bases'>библиотеки</Anchor>.</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="return-policy">
              <Accordion.Control>Какие условия возврата и обмена?</Accordion.Control>
              <Accordion.Panel>Товары обмену и возврату не подлежат. </Accordion.Panel>
            </Accordion.Item>

          </Accordion>
        </main >
      </CustomAppShell >
    </>
  )
}