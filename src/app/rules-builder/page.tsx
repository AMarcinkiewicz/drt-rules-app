"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
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
  isDefault?: boolean;
}

// Function to create default rules
const createDefaultRules = (): Rule[] => {
  const defaultRules: Rule[] = [
    {
      id: "default-country",
      ruleType: "If",
      conditionType: "Country",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-office",
      ruleType: "And",
      conditionType: "Office",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-leave-type",
      ruleType: "And",
      conditionType: "Leave Type",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-base-entitlement",
      ruleType: "And",
      conditionType: "Base entitlement",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-assign-date",
      ruleType: "And",
      conditionType: "Assign Date",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-accrual-freq",
      ruleType: "And",
      conditionType: "Accrual Frequency",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-prorated",
      ruleType: "And",
      conditionType: "Prorated",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-carry-over",
      ruleType: "And",
      conditionType: "Carry Over Allowed",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-min-duration",
      ruleType: "And",
      conditionType: "Minimum Duration Allowed",
      operator: "=",
      conditionValue: "",
      isDefault: true
    },
    {
      id: "default-paid",
      ruleType: "And",
      conditionType: "Paid",
      operator: "=",
      conditionValue: "",
      isDefault: true
    }
  ];
  
  return defaultRules;
};

export default function RulesBuilderPage() {
  const [rules, setRules] = useState<Rule[]>(createDefaultRules());

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
    setRules(currentRules => {
      const updatedRules = currentRules.map(rule => 
        rule.id === id ? { ...rule, ...updatedRule } : rule
      );

      // Check if "Carry over allowed" rule was updated to "ON"
      if (id === "default-carry-over" && updatedRule.conditionValue === "ON") {
        // Check if "Maximum carry over" rule already exists
        const maxCarryOverExists = updatedRules.some(rule => rule.conditionType === "Maximimum Carry Over");
        
        if (!maxCarryOverExists) {
          // Add "Maximum carry over" rule
          const maxCarryOverRule: Rule = {
            id: "default-max-carry-over",
            ruleType: "And",
            conditionType: "Maximimum Carry Over",
            operator: "=",
            conditionValue: "",
            isDefault: true
          };
          
          // Insert after the "Carry over allowed" rule
          const carryOverIndex = updatedRules.findIndex(rule => rule.id === "default-carry-over");
          updatedRules.splice(carryOverIndex + 1, 0, maxCarryOverRule);
        }
      }
      
      // Check if "Carry over allowed" rule was updated to "OFF"
      if (id === "default-carry-over" && updatedRule.conditionValue === "OFF") {
        // Remove "Maximum carry over" rule if it exists
        return updatedRules.filter(rule => rule.conditionType !== "Maximimum Carry Over");
      }

      return updatedRules;
    });
  };

  const deleteRule = (id: string) => {
    // Prevent deletion of default rules
    const ruleToDelete = rules.find(rule => rule.id === id);
    if (ruleToDelete?.isDefault) {
      return;
    }
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
        <CardHeader className="py-6">
          <CardTitle>Create New Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
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
                      allRules={rules}
                      isDeletable={!rule.isDefault}
                      isConditionTypeEditable={!rule.isDefault}
                    />
                  ))}
              </div>
            </SortableContext>
            <div className="flex justify-center pt-4">
              <Button onClick={addNewRule} variant="outline" className="flex items-center gap-2 cursor-pointer">
                <Plus className="h-4 w-4" />
                Add New Rule
              </Button>
            </div>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}
