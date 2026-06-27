'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import artistModel from '@/libs/models/artist'

export async function createArtist(prevState, formData) {
	const name = formData.get('name')?.toString().trim()
	const genre = formData.get('genre')?.toString().trim()
	const image = formData.get('image')?.toString().trim()

	if (!name) {
		return { error: 'Name is required' }
	}

	const { error } = await artistModel.create({ name, genre, image })

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/artists')
	redirect('/artists')
}

export async function updateArtist(params) {
	
}