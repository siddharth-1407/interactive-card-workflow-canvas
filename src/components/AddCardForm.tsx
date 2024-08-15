'use client';
import React, { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import useCardStore from '@/Store/CardsStore';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { motion } from 'framer-motion';
import { AddCardFormSchema } from '@/Schema/AddCardForm.schema';

export default function AddCardForm() {
	const id = useId();
	const addCard = useCardStore((state) => state.addCard);
	const setOpen = useCardStore((state) => state.setOpen);

	const form = useForm<z.infer<typeof AddCardFormSchema>>({
		resolver: zodResolver(AddCardFormSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	const AddCardOnSubmit = (values: z.infer<typeof AddCardFormSchema>) => {
		addCard({ title: values.title || '', description: values.description || '', id });
		setOpen(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(AddCardOnSubmit)} className='flex flex-col gap-4'>
				<FormField
					name='title'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-lg font-medium text-black'>Title</FormLabel>
							<FormControl>
								<Input placeholder="What's the big idea?" className='text-lg text-black' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='description'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-lg font-medium text-black'>Description</FormLabel>
							<FormControl>
								<Textarea placeholder='Paint the picture here' rows={15} className='text-lg text-black' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.95 }}
					type='submit'
					className='bg-slate-900  py-3 border-2 border-black rounded-2xl text-white text-lg font-semibold '>
					Add Card
				</motion.button>
			</form>
		</Form>
	);
}
