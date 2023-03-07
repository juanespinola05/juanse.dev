import { FunctionalComponent } from 'preact'
import { VideoDetails } from '../types/videos.d.ts'
import Video from '../components/Video.tsx'

interface VideosGridProps {
  videos: VideoDetails[]
  displayNumber: number
  moreVideosPath?: string
}

const VideosGrid: FunctionalComponent<VideosGridProps> = (
  { displayNumber, videos, moreVideosPath = '/videos' },
) => {
  return (
    <>
      <div className='grid grid-cols(1 lg:2) gap-5 justify-items-center'>
        {videos.filter((_, i) => i < displayNumber).map((video) => (
          <Video {...video} />
        ))}
      </div>
      <div className='flex justify-end mt-5'>
        <a href={moreVideosPath} class='text-right text-blue-500'>Ver más</a>
      </div>
    </>
  )
}

export default VideosGrid
