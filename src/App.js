// App.js 

import { useEffect, useRef, useState } from "react"; 
import Menu from "./components/Menu"; 
import "./App.css"; 
import {Line, Point} from "./common_lib/point.ts"

function App() { 
	const canvasRef = useRef(null); 
	const canvasRef2 = useRef(null); 
	const canvasRef3 = useRef(null); 
	const ctxRef = useRef(null); 
	const [isDrawing, setIsDrawing] = useState(false); 
	const [lineWidth, setLineWidth] = useState(5); 
	const [lineColor, setLineColor] = useState("black"); 
	const [lineOpacity, setLineOpacity] = useState(0.1); 
	const [renderQueue, addToQueue] = useState([]);
	// Initialization when the component 
	// mounts for the first time 
	useEffect(() => { 
		const canvas = canvasRef.current; 
		const ctx = canvas.getContext("2d"); 
		ctx.lineCap = "round"; 
		ctx.lineJoin = "round"; 
		ctx.globalAlpha = lineOpacity; 
		ctx.strokeStyle = lineColor; 
		ctx.lineWidth = lineWidth; 
		ctxRef.current = ctx; 
	}, [lineColor, lineOpacity, lineWidth]); 

	// Function for starting the drawing 
	const startDrawing = (e) => { 
		let line = new Line();
		let new_point = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
		line.addPoint(new_point)
		addToQueue([...renderQueue, line])
		ctxRef.current.beginPath(); 

		/*
		ctxRef.current.moveTo( 
			e.nativeEvent.offsetX, 
			e.nativeEvent.offsetY 
		); 
		*/

		setIsDrawing(true); 
	}; 

	// Function for ending the drawing 
	const endDrawing = () => { 
		ctxRef.current.closePath(); 

		const ctx = canvasRef.current.getContext('2d');
		const ctx2 = canvasRef2.current.getContext('2d');
  
		// Example drawing on the first canvas
		ctx.fillStyle = 'blue';
		ctx.fillRect(10, 10, 100, 100);
  
		// Copy the contents of the first canvas to the second
		ctx2.drawImage(canvasRef.current, 0, 0);

		setIsDrawing(false);

	}; 

	const draw = (e) => { 
		if (!isDrawing) { 
			return; 
		}

		

		let new_point = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
		renderQueue[renderQueue.length - 1].addPoint(new_point)
		ctxRef.current.lineTo(
			new_point.x,
			new_point.y
		);
		/*
		ctxRef.current.lineTo( 
			e.nativeEvent.offsetX, 
			e.nativeEvent.offsetY 
		); 
		*/

		ctxRef.current.stroke(); 
	}; 

	return ( 
		<div className="App"> 
			<h1>Paint App</h1> 
			<div className="draw-area"> 
				<Menu 
					setLineColor={setLineColor} 
					setLineWidth={setLineWidth} 
					setLineOpacity={setLineOpacity} 
				/> 				
				<canvas 
					onMouseDown={startDrawing} 
					onMouseUp={endDrawing} 
					onMouseMove={draw} 
					ref={canvasRef} 
					width={`1280px`} 
					height={`720px`} 
					id="Canvas1"
				/> 
					<label>Second Canvas </label> 
				<canvas 
					onMouseDown={startDrawing} 
					onMouseUp={endDrawing} 
					onMouseMove={draw} 
					ref={canvasRef2} 
					width={`1280px`} 
					height={`720px`} 
					id="Canvas2"
				/> 
				<canvas 
					onMouseDown={startDrawing} 
					onMouseUp={endDrawing} 
					onMouseMove={draw} 
					ref={canvasRef3} 
					width={`1280px`} 
					height={`720px`} 
					id="Canvas3"
				/> 
			</div> 
		</div> 
	); 
} 

export default App;
