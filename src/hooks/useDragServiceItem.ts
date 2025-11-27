import { useDrag } from 'react-dnd';
import { useEffect, useRef } from 'react';

const DRAG_TYPE = 'SERVICE_ITEM';

export const useDragServiceItem = (
  serviceId: number,
  onDragToBook?: (id: number) => void
) => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: DRAG_TYPE,
    item: { id: serviceId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        onDragToBook?.(draggedItem.id);
      }
    },
  });

  // Gắn ref của react-dnd vào DOM node
  useEffect(() => {
    if (boxRef.current) {
      dragRef(boxRef.current);
    }
  }, [boxRef, dragRef]);

  return { boxRef, isDragging };
};
