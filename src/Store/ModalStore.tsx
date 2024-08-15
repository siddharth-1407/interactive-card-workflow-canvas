import { create } from 'zustand';

const modalStore = (set: any) => ({
	open: false,
	data: { title: '', description: '' },
	setModalData: (newData: { title: string | undefined; description: string | undefined }) => {
		set({
			data: { title: newData.title, description: newData.description },
		});
	},
	setOpen: (data: boolean) => set({ open: data }),
});

const useModalStore = create(modalStore);

export default useModalStore;
