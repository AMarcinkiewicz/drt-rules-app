"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, GripVertical } from "lucide-react";
import { Rule } from "@/app/rules-builder/page";
import drtConfig from "@/data/drt-config.json";
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RuleRowProps {
  rule: Rule;
  onUpdate: (updatedRule: Partial<Rule>) => void;
  onDelete: () => void;
}

export function RuleRow({ rule, onUpdate, onDelete }: RuleRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rule.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const conditionTypes = Object.keys(drtConfig.conditions);
  const selectedCondition = drtConfig.conditions[rule.conditionType as keyof typeof drtConfig.conditions];
  
  // Parse operators from the condition config
  const operators = selectedCondition?.operators[0]?.split(',').map(op => op.trim()) || [];
  
  const handleConditionTypeChange = (value: string) => {
    const newCondition = drtConfig.conditions[value as keyof typeof drtConfig.conditions];
    const newOperators = newCondition?.operators[0]?.split(',').map(op => op.trim()) || [];
    
    onUpdate({
      conditionType: value,
      operator: newOperators[0] || "",
      conditionValue: "",
    });
  };

  const handleOperatorChange = (value: string) => {
    onUpdate({ operator: value });
  };

  const handleConditionValueChange = (value: string) => {
    onUpdate({ conditionValue: value });
  };

  const renderConditionValueInput = () => {
    if (!selectedCondition) return null;

    const { inputType, values } = selectedCondition;

    switch (inputType) {
      case "number":
        return (
          <Input
            type="number"
            value={rule.conditionValue}
            onChange={(e) => handleConditionValueChange(e.target.value)}
            placeholder="Enter number"
            className="w-full h-8"
          />
        );
      
      case "date":
        return (
          <Input
            type="date"
            value={rule.conditionValue}
            onChange={(e) => handleConditionValueChange(e.target.value)}
            className="w-full h-8"
          />
        );
      
      case "dropdown":
        return (
          <Select value={rule.conditionValue} onValueChange={handleConditionValueChange}>
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              {values.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return (
          <Input
            value={rule.conditionValue}
            onChange={(e) => handleConditionValueChange(e.target.value)}
            placeholder="Enter value"
            className="w-full h-8"
          />
        );
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className={isDragging ? "shadow-lg" : ""}>
      <CardContent className="p-3">
        <div className="flex items-end gap-3">
          {/* Drag Handle - Hugs left side */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 h-8 w-8"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Form Fields - Fill remaining space */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* Rule Type */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Rule Type</label>
              <Select value={rule.ruleType} onValueChange={(value) => onUpdate({ ruleType: value })}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {drtConfig.ruleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Type */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Condition Type</label>
              <Select value={rule.conditionType} onValueChange={handleConditionTypeChange}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Operator */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Operator</label>
              <Select value={rule.operator} onValueChange={handleOperatorChange}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((operator) => (
                    <SelectItem key={operator} value={operator}>
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Value */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Condition Value</label>
              {renderConditionValueInput()}
            </div>

            {/* Delete Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
