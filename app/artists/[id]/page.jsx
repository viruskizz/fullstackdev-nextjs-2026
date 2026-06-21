import artistModel from '@/libs/models/artist';
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation';

export default async function Artist({ params }) {
    const { id } = await params;
    const { data: artist, error } = await artistModel.getId(id);
    if (!artist || error) {
        console.error(error);
        console.log(artist);
        notFound()
        // redirect('/')
    }
    return (
        <div>
            <img
                className="w-48"
                src={artist.image}
                alt={artist.name}
            />
            <h2>{artist.name}</h2>
        </div>
    )
}