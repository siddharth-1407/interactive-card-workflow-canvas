'use client';
import React from 'react';
import { Handle, NodeProps, Position, ResizeDragEvent, ResizeParams } from 'reactflow';
import { ResizableBox } from 'react-resizable';
import { Grip, Maximize2 } from 'lucide-react';
import useModalStore from '@/Store/ModalStore';
import { motion, useDragControls } from 'framer-motion';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NodeResizeControl } from 'reactflow';

export default function ResizableCard({ data: { title, description } }: NodeProps<{ title: string; description: string }>) {
	const cardRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const setOpen = useModalStore((state) => state.setOpen);
	const setModalData = useModalStore((state) => state.setModalData);

	const ShowDetails = () => {
		setModalData({
			title,
			description,
		});
		setOpen(true);
	};

	const handleResize = (event: ResizeDragEvent, data: ResizeParams) => {
		if (!contentRef.current) return;
		const contentHeight: number = contentRef.current.clientHeight || 0;
		const contentWidth: number = contentRef.current.clientWidth || 0;
		setIsOverflowing(data.width < contentWidth || data.height - 10 < contentHeight);
	};

	return (
		// <Card className='flex flex-col overflow-hidden pb-4 border-2 border-black'>
		// 	<CardHeader className='p-3 pb-2 hover:cursor-grab active:cursor-grabbing'>
		// 		<Handle type='target' position={Position.Left} style={{ background: 'black', stroke: 'black' }} />
		// 		<Handle type='source' position={Position.Right} style={{ background: 'black', stroke: 'black' }} />
		// 		<motion.div>
		// 			<CardTitle className='text-xl flex justify-center items-center gap-1'>
		// 				<span className='flex gap-1 items-center'>
		// 					<span className='w-2 h-2 bg-red-500 rounded-full'></span>
		// 					<span className='w-2 h-2 bg-blue-400 rounded-full'></span>
		// 					<span className='w-2 h-2 bg-green-500 rounded-full'></span>
		// 				</span>
		// 				<button className='min-w-5 w-full  overflow-hidden line-clamp-1 hover:cursor-grab active:cursor-grabbing'>
		// 					<h2 className='select-none'>{title}</h2>
		// 				</button>
		// 				<Grip className='ml-auto mb-auto w-6 h-6 text-gray-500' />
		// 			</CardTitle>
		// 		</motion.div>
		// 	</CardHeader>
		// 	<CardContent className='flex-1 flex flex-col p-2 px-4 bg-white rounded-t-xl'>
		// 		<CardDescription className='text-base whitespace-break-spaces'>
		// 			{description.substring(0, Math.floor(description.length / 2))}
		// 			<button className='relative px-1' onClick={ShowDetails}>
		// 				<span className='absolute w-full h-full top-0 left-0 z-0 bg-violet-500 -skew-x-12'></span>
		// 				<span className='relative bg-transparent text-white'>Show more</span>
		// 			</button>
		// 		</CardDescription>
		// 	</CardContent>
		// </Card>

		<motion.div
			ref={cardRef}
			className='min-w-36 min-h-36 max-w-[350px] max-h-[350px] w-full h-full flex'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.5 } }}>
			<Card className='flex-1 flex flex-col overflow-hidden pb-4 border-2 border-black'>
				<Handle type='target' position={Position.Left} style={{ background: 'black', width: '0.5rem', height: '0.5rem' }} />
				<Handle type='source' position={Position.Right} style={{ background: 'black', width: '0.5rem', height: '0.5rem' }} />
				<div ref={contentRef}>
					<CardHeader className='p-3 pb-2 hover:cursor-grab active:cursor-grabbing'>
						<motion.div>
							<CardTitle className='text-xl flex justify-center items-center gap-1'>
								<span className='flex gap-1 items-center'>
									<span className='w-2 h-2 bg-red-500 rounded-full'></span>
									<span className='w-2 h-2 bg-blue-400 rounded-full'></span>
									<span className='w-2 h-2 bg-green-500 rounded-full'></span>
								</span>
								<button className='min-w-5 w-full  overflow-hidden line-clamp-1 hover:cursor-grab active:cursor-grabbing'>
									<h2 className='select-none'>{title}</h2>
								</button>
								<Grip className='ml-auto mb-auto w-6 h-6 text-gray-500' />
							</CardTitle>
						</motion.div>
					</CardHeader>
					<CardContent className='flex-1 h-full flex flex-col p-2 px-4 bg-white rounded-t-xl'>
						<CardDescription className='text-base whitespace-break-spaces'>
							{description.substring(0, Math.floor(description.length / 2))}
							<button className='relative px-1' onClick={ShowDetails}>
								<span className='absolute w-full h-full top-0 left-0 z-0 bg-violet-500 -skew-x-12'></span>
								<span className='relative bg-transparent text-white'>Show more</span>
							</button>
						</CardDescription>
					</CardContent>
				</div>

				<CardFooter className='absolute bg-white w-full h-6 left-0 bottom-0 p-2 rounded-b-lg border-2 border-t-1 border-black'>
					{isOverflowing && (
						<button onClick={ShowDetails} className='w-full font-semibold hover:text-black/80 active:text-black/70'>
							Show more
						</button>
					)}
					<NodeResizeControl
						onResize={handleResize}
						position='bottom-right'
						className='invisible'
						minHeight={148}
						minWidth={148}
						maxHeight={350}
						maxWidth={350}>
						<Maximize2 className='ml-auto w-4 h-4 rotate-90 visible -translate-x-5 -translate-y-4' />
					</NodeResizeControl>
				</CardFooter>
			</Card>
			{/* </ResizableBox> */}
		</motion.div>
	);
}
