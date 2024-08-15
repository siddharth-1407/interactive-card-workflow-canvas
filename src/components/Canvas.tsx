'use client';
import 'reactflow/dist/style.css';
import AddCardSheet from './AddCardSheet';
import ResizableCard from './ResizableCard';
import useCardStore from '@/Store/CardsStore';
import React, { useCallback, useEffect } from 'react';
import { initialEdges, initialNodes } from '@/constants/Workflow.constants';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, Connection } from 'reactflow';

const NodeTypes = {
	resizableCard: ResizableCard,
};

export default function Canvas() {
	const cards = useCardStore((state) => state.cards);
	const onConnect = useCallback((connection: Connection) => {
		const edge = { ...connection, animated: true, id: `${connection.source}-${connection.target}` };
		setEdges((prev) => addEdge(edge, prev));
	}, []);

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	useEffect(() => {
		setNodes(cards);
		console.log(cards);
	}, [cards]);

	return (
		<div className='overflow-hidden w-screen h-screen border bg-blue-400'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={NodeTypes}
				fitView>
				<Background color='white' />
				<Controls />
			</ReactFlow>
			<AddCardSheet />
		</div>
	);
}
