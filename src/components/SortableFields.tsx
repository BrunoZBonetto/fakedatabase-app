import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  label: string;
  index: number;
  onRemove: (id: string) => void;
}

function SortableItem({ id, label, index, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="sortable-field-row">
      <span className="sortable-index">{index}</span>
      <button className="drag-handle" {...attributes} {...listeners}>⠿</button>
      <span className="sortable-field-label">{label}</span>
      <button className="btn-remove-field-sm" onClick={() => onRemove(id)} aria-label={`Remover ${label}`}>✕</button>
    </div>
  );
}

interface SortableFieldsProps {
  fields: string[];
  formatLabel: (field: string) => string;
  onReorder: (fields: string[]) => void;
  onRemove: (field: string) => void;
}

export default function SortableFields({ fields, formatLabel, onReorder, onRemove }: SortableFieldsProps) {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.indexOf(active.id as string);
    const newIndex = fields.indexOf(over.id as string);
    const reordered = [...fields];
    reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, active.id as string);
    onReorder(reordered);
  };

  if (fields.length === 0) return null;

  return (
    <div className="sortable-fields">
      <div className="sortable-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="arrow">{isOpen ? '−' : '+'}</span>
        <span>{t.fieldSelector.sortTitle}</span>
        <span className="selected-count-badge">{fields.length}</span>
      </div>
      {isOpen && (
        <div className="sortable-body">
          <p className="hint">{t.fieldSelector.sortOrder.replace('{count}', String(fields.length))}</p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
              {fields.map((f, i) => (
                <SortableItem key={f} id={f} label={formatLabel(f)} index={i + 1} onRemove={onRemove} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
