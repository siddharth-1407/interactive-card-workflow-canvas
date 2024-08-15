import { Edge, Node } from 'reactflow';

export const initialEdges: Edge[] = [{ id: '1-2', source: '1', target: '2', animated: true, deletable: true, pathOptions: {} }];

export const initialNodes: Node[] = [
	{
		id: '1',
		position: { x: 0, y: 0 },
		data: {
			title: 'Task 1',
			description: `1. Hold the title to drag around the card.
2. Hold the footer to resize the card.
3. Click on the "show more" button in the footer to open a modal that shows the content of the card.`,
		},
		type: 'resizableCard',
	},
	{
		id: '2',
		position: { x: 500, y: 200 },
		data: {
			title: 'Task 2',
			description: `1. Create Flow Diagram for Drag-and-Drop Feature.
2. Your Thought Process for Designing a Drag-and-Drop Feature.
`,
		},
		type: 'resizableCard',
	},
	{
		id: '3',
		position: { x: 0, y: 300 },
		data: { title: 'Task 3', description: 'Sleep' },
		type: 'resizableCard',
	},
];
