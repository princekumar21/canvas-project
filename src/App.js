import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import Rectangle from "./Rectangle";
import { initialRectangles } from "./initialRectangles";

function App() {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedShape, selectShape] = useState(null);

  const checkDeselect = (e) => {
    //this function invokes when we click on empty area
    let clickedOnEmpty = false;
    if (e.target === e.target.getStage()) {
      clickedOnEmpty = true;
    }

    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      x={40}
      y={65}
      width={window.innerWidth} 
      height={550}
      style={{
        border: "3px solid black",
        backgroundColor: "white",
        borderRadius: "15px",
        overflow: "clip",
      }}
      onMouseDown={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedShape}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
        <Line x={200} y={20} points={[30, -100, 30, 545, 500]} stroke="black" />
      </Layer>
    </Stage>
  );
}

export default App;
