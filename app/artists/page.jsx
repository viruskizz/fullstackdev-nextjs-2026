import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'
import artistModel from '@/libs/models/artist'

export default async function Artists() {
	let artists = []
	const { data,error } = await artistModel.getAll(); 
	artists = [...data];
	return (
		<div>
			<h1 className="text-3xl font-bold my-4 text-center">Artists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{
					artists.map(artist => (
						<Card
							key={artist.id}
							imgUrl={artist.image}
							title={artist.name}
						>
							<div className="card-button flex justify-end">
								<Link href={'artists/' + artist.id.toString()}>
									<Button title="View Profile" />
								</Link>
							</div>
						</Card>
					))
				}
			</div>
		</div>
	)
}