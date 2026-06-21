import songModel from '@/libs/models/song'
import { notFound } from 'next/navigation'

export default async function Song({params}) {
    const { id } = await params;
    const {data, error} = await songModel.getId(id);
    // validate data if not existing redirect to page not found
    if (error) {
        notFound();
    }
    const song = data;
    const videoId = song.youtube_url.split('=')[1]
    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    return (
        <div>
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                title={song.title}
                frameborder="0"
                allowfullscreen/>
            <h3 className="text-2xl text-bold">{song.title}</h3>
        </div>
    )
}