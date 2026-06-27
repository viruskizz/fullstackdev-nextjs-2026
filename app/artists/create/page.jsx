"use client"
import supabase from '@/libs/supabase'
import { redirect } from 'next/navigation'
import artistModel from '@/libs/models/artist'
import { useActionState } from 'react'
import { createArtist } from '../actions'
const className = {
	card: 'card rounded-2xl shadow-md bg-white max-w-md mx-auto mt-3 p-6',
	title: 'text-xl font-bold mb-4 text-black text-left',
	field: 'mb-4',
	label: 'block text-sm font-medium text-gray-700 mb-1',
	input: 'w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-600',
	error: 'text-sm text-red-600 mt-3',
	submit: 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg shadow',
}

export default function ArtistCreate() {
	const [state, formAction] = useActionState(createArtist, null)
	return (
		<div className={className.card}>
			<h2 className={className.title}>Create Artist</h2>
			<form action={formAction}>
				<div className={className.field}>
					<label htmlFor="name" className={className.label}>Name</label>
					<input type="text" name="name" id="name" className={className.input} required />
				</div>
				<div className={className.field}>
					<label htmlFor="genre" className={className.label}>Genre</label>
					<input type="text" name="genre" id="genre" className={className.input} />
				</div>
				<div className={className.field}>
					<label htmlFor="image" className={className.label}>Image URL</label>
					<input type="text" name="image" id="image" className={className.input} />
				</div>
				{/* {state?.error && <p className={className.error}>{state.error}</p>} */}
				<div className="flex justify-end mt-2">
					<button type="submit" className={className.submit}>
						{/* {pending ? 'Saving...' : 'Create Artist'} */}
						Create Artist
					</button>
				</div>
			</form>
		</div>
	)
}
