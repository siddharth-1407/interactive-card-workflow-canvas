import { z } from 'zod';

export const AddCardFormSchema = z
	.object({
		title: z.string().min(1, {
			message: 'Title is required'
		}),
		description: z.string().min(5, {
			message: 'Description must be at least 5 character long'
		}),
	})
	
