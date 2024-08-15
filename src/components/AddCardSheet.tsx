'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AddCardForm from './AddCardForm';
import useCardStore from '@/Store/CardsStore';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function AddCardSheet() {
	const open = useCardStore((state) => state.open);
	const setOpen = useCardStore((state) => state.setOpen);
	
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.95 }}
					className='fixed bottom-10 right-10 px-8 py-4 text-2xl font-bold rounded-full border-2 border-black shadow-xl bg-white'>
					Add Card
				</motion.button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className='flex flex-col gap-6'>
					<SheetTitle>New Card</SheetTitle>
					<SheetDescription>
						<AddCardForm />
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
