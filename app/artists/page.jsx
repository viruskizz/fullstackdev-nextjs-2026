import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'
import artistModel from '@/libs/models/artist'
import ArtistForm from '@/app/_components/ArtistForm'

const className = {
	card: 'card rounded-2xl shadow-md bg-white max-w-md mx-auto mt-3 p-6',
	title: 'text-xl font-bold mb-4 text-black text-left',
	field: 'mb-4',
	label: 'block text-sm font-medium text-gray-700 mb-1',
	input: 'w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-600',
	error: 'text-sm text-red-600 mt-3',
	submit: 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg shadow',
}

export default async function Artists() {
	let artists = []
	const { data } = await artistModel.getAll();
	artists = data ?? [];
	return (
		<div>
			<h1 className="text-3xl font-bold my-4 text-center">Artists</h1>
			{/* <ArtistForm/> */}
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