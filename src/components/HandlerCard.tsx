'use client';
import { Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useModalStore from '@/Store/ModalStore';

type Props = {
	title: string | undefined;
	description: string | undefined;
	containerDimension: {
		width: number;
		height: number;
	};
};

export default function HandlerCard({ title, description, containerDimension }: Props) {
	const setModalData = useModalStore((state) => state.setModalData);
	const setOpen = useModalStore((state) => state.setOpen);
	const [cardTitle, setCardTitle] = useState(title);
	const [cardDescription, setCardDescription] = useState(description);
	const [editable, setEditable] = useState<boolean>(true);
	const [isOverflowing, setIsOverflowing] = useState<boolean>(true);
	const titleRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!titleRef?.current || !descriptionRef?.current) return;
		const height = (titleRef.current.clientHeight + 32 || 0) + (descriptionRef.current.clientHeight + 16 || 0);
		setIsOverflowing(height > containerDimension.height - 8);
	}, [containerDimension]);

	return (
		<Card className='absolute w-full h-full flex flex-col overflow-hidden pb-4 border-2 border-black'>
			<CardHeader className='p-4'>
				<CardTitle ref={titleRef}>
					<button className='w-full'>Card header</button>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 flex flex-col p-2'>
				<CardDescription ref={descriptionRef} className=''>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae laboriosam omnis aliquam magni provident praesentium similique!
					Unde eos dicta ullam hic repellat amet similique eum accusantium dignissimos quas quam, expedita cumque in neque sapiente
					explicabo! Consectetur dolores ullam beatae nisi quos non magni, reiciendis voluptatibus hic unde impedit ipsam est, qui suscipit.
				</CardDescription>
			</CardContent>
			<CardFooter className='bg-white absolute w-full h-6 left-0 bottom-0 p-2 rounded-b-lg'>
				{isOverflowing && (
					<button
						onClick={() => {
							setModalData({
								title: cardTitle,
								description:
									'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae laboriosam omnis aliquam magni provident praesentium similique! Unde eos dicta ullam hic repellat amet similique eum accusantium dignissimos quas quam, expedita cumque in neque sapiente explicabo! Consectetur dolores ullam beatae nisi quos non magni, reiciendis voluptatibus hic unde impedit ipsam est, qui suscipit.',
							});
							setOpen(true);
						}}
						className='w-full font-semibold hover:text-black/80 active:text-black/70'>
						Show more
					</button>
				)}
				<Maximize2 className='ml-auto w-4 h-4 rotate-90' />
			</CardFooter>
		</Card>
	);
}
