"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { RuleRow } from "@/components/RuleRow";
import drtConfig from "@/data/drt-config.json";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export interface Rule {
  id: string;
  ruleType: string;
  conditionType: string;
  operator: string;
  conditionValue: string;
}

export default function RulesBuilderPage() {
  const [rules, setRules] = useState<Rule[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      ruleType: drtConfig.ruleTypes[0],
      conditionType: Object.keys(drtConfig.conditions)[0],
      operator: "",
      conditionValue: "",
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id: string, updatedRule: Partial<Rule>) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, ...updatedRule } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Rules Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rules.length === 0 ? (
            <div className="flex justify-center py-12">
              <Button onClick={addNewRule} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Rule
              </Button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={rules.map(rule => rule.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <RuleRow
                      key={rule.id}
                      rule={rule}
                      onUpdate={(updatedRule) => updateRule(rule.id, updatedRule)}
                      onDelete={() => deleteRule(rule.id)}
                    />
                  ))}
                </div>
              </SortableContext>
              <div className="flex justify-center pt-4">
                <Button onClick={addNewRule} variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Rule
                </Button>
              </div>
            </DndContext>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
