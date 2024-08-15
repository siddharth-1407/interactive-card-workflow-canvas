import { create } from 'zustand';
import {  initialNodes } from '@/constants/Workflow.constants';

export type CardType = {
	title: string;
	description: string;
	id: string;
};
type cardsStore = {
	open: boolean;
	cards: CardType[];
};

const cardsStore = (set: any) => ({
	open: false,
	cards: initialNodes,
	toggleOpen: () => set((state: cardsStore) => ({ open: !state.open })),
	setOpen: (data: boolean) => set({ open: data }),
	addCard: (newData: CardType) => {
		set((state: cardsStore) => ({
			cards: [
				...state.cards,
				{
					id: newData.id,
					position: { x: 200, y: 200 },
					data: { title: newData.title, description: newData.description },
					type: 'resizableCard',
				},
			],
		}));
	},
});

const useCardStore = create(cardsStore);

export default useCardStore;
