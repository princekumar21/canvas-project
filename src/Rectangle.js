import React, { useRef } from "react";
import { Rect, Transformer } from "react-konva";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const transformRef = useRef();
  // console.log(shapeRef.current);
  React.useEffect(() => {
    if (isSelected) {
      // console.log("selected");
      // we need to attach transformer manually
      transformRef.current.nodes([shapeRef.current]);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        strokeWidth={3}
        stroke={"black"}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable="true"
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // console.log(e);
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          // console.log(node);
          const scaleX = node.scaleX();
          // console.log(scaleX);
          const scaleY = node.scaleY();
          // console.log(scaleX);

          // console.log("scaleX" + node.scaleX + "," + "scaleY" + node.scaleY);
          // console.log("width" + node.width()+ "," + "height" + node.height());
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
          // console.log("width"+shapeProps.width+","+"height" +shapeProps.height);
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            // console.log("oldBox"+oldBox);
            // console.log("newBox" + newBox);
            // console.log(newBox)
            // limit resize
            if (newBox.width < 10 || newBox.height < 10) {
              console.log("returnoldBox" + oldBox);
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Rectangle;
