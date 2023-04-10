import { Handlers, PageProps } from '$fresh/server.ts'
import Document from '../../layouts/Document.tsx'
import Head from '../../layouts/Head.tsx'
import BaseOG from '../../components/BaseOG.tsx'
import Container from '../../layouts/Container.tsx'
import VideosGrid from '../../layouts/VideosGrid.tsx'
import { getChannelDetails, getLatestVideos } from '../../services/youtubev3.ts'
import { ChannelDetails, VideoDetails } from '../../types/videos.d.ts'

export const handler: Handlers = {
  async GET(req, ctx) {
    const videos = await getLatestVideos(15)
    const channel = await getChannelDetails()
    return ctx.render({ videos, channel })
  },
}

interface VideosPageProps {
  videos: VideoDetails[]
  channel: ChannelDetails
}

export default function VideosPage(
  { data: { videos, channel } }: PageProps<VideosPageProps>,
) {
  const {
    channelUrl,
    subscriberCount,
    title,
    videoCount,
    viewCount,
  } = channel
  return (
    <>
      <Head>
        <title>Juanse | Videos</title>
        <meta name='title' content='Juanse | Videos' />
        <meta
          name='description'
          content='Esta es una lista de mis videos de youtube. Desde Argentina 🇦🇷 ❤️'
        />
        <link rel='canonical' href='https://juanse.dev/videos' />
        <BaseOG
          ogURL='https://juanse.dev/sobre-mi'
          title='Sobre Juanse'
        />
      </Head>
      <Document pathname='/videos'>
        <Container>
          <div class='mt-12 grid place-content-center'>
            <div class='flex items-center gap-6 flex-wrap flex-col text-center sm:flex-row sm:text-left'>
              <a href={channelUrl} title={`Canal de youtube de ${title}`}>
                <img
                  src='/youtube-profile.webp'
                  alt={title}
                  class='rounded-full border-4 p-2 w-64 h-64'
                />
              </a>
              <div>
                <h2 class='text-3xl mb-2'>
                  {title} en <span className='text-red-600'>Youtube</span>
                </h2>
                <ul class='flex flex-col gap-2'>
                  <li>
                    <p class='text-xl'>
                      <span class='text-2xl text-yellow-300'>{viewCount}</span>
                      &nbsp;
                      <span>visualizaciones</span>
                    </p>
                  </li>
                  <li>
                    <p class='text-xl'>
                      <span class='text-2xl text-yellow-300'>
                        {subscriberCount}
                      </span>
                      &nbsp;
                      <span>suscripciones</span>
                    </p>
                  </li>
                  <li>
                    <p class='text-xl'>
                      <span class='text-2xl text-yellow-300'>{videoCount}</span>
                      &nbsp;
                      <span>videos</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='my-12'>
            <VideosGrid
              moreVideosPath={`${channelUrl}/videos`}
              videos={videos}
              displayNumber={10}
            />
          </div>
        </Container>
      </Document>
    </>
  )
}
