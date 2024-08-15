'use client';
import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useModalStore from '@/Store/ModalStore';

export default function CardContentModel() {
	const data = useModalStore((state) => state.data);
	const open = useModalStore((state) => state.open);
	const setOpen = useModalStore((state) => state.setOpen);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!modalRef.current) return;
		const closeModalOnClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		window.addEventListener('click', closeModalOnClickOutside);
		return () => {
			window.removeEventListener('click', closeModalOnClickOutside);
		};
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent ref={modalRef} className='overflow-hidden'>
				<div className='max-h-[70vh] h-full overflow-auto'>
					{data.title && (
						<DialogHeader>
							<DialogTitle className='text-xl'>{data.title}</DialogTitle>
						</DialogHeader>
					)}
					{data.description && (
						<DialogDescription className='text-lg text-black/95 font-medium whitespace-break-spaces'>
							{data.description}
						</DialogDescription>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
