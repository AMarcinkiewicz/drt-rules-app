"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";

export interface SavedPolicy {
  id: string;
  name: string;
  createdAt: string;
  rules: Array<{
    ruleType: string;
    conditionType: string;
    operator: string;
    conditionValue: string;
  }>;
}

interface SavedPolicyCardProps {
  policy: SavedPolicy;
  onView: (policy: SavedPolicy) => void;
  onDelete: (policyId: string) => void;
}

export function SavedPolicyCard({ policy, onView, onDelete }: SavedPolicyCardProps) {
  const ruleCount = policy.rules.length;
  const hasBaseEntitlement = policy.rules.some(rule => rule.conditionType === 'Base entitlement');
  const baseEntitlementValue = policy.rules.find(rule => rule.conditionType === 'Base entitlement')?.conditionValue;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pt-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {policy.name}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Created {new Date(policy.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(policy)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Eye className="h-3 w-3" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(policy.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Rules:</span>
            <span className="font-medium">{ruleCount}</span>
          </div>
          {hasBaseEntitlement && baseEntitlementValue && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Base Entitlement:</span>
              <span className="font-medium">{baseEntitlementValue}</span>
            </div>
          )}
          <div className="text-xs text-gray-500">
            ID: {policy.id.slice(0, 8)}...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
