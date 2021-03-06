import Head from 'next/head'

export const Meta = ({ title }) => {
  const defaultTitle = 'Vero - the Ethereum Credit App'
  title = title ? `${title} - ${defaultTitle}` : defaultTitle

  const url = `https://vero-app.netlify.com`
  const description = '.'
  const keywords = 'deltacamp delta camp ethereum'
  const twitterHandle = '@Vero_'

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no' />
        <meta charSet='utf-8' />

        <link rel="stylesheet" href="https://use.typekit.net/ezg2vko.css" />

        <link rel='icon' type='image/png' href='/static/favicon@2x.png' />
        
        <link rel='stylesheet' href='/static/animate.css' />

        <meta name='theme-color' content='#53B2FF' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content='Vero - the Ethereum Credit App' />
        <meta name='copyright' content='&copy; 2019' />
      </Head>
    </>
  )
}