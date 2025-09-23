"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Modal } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import { RuleRow } from "@/components/RuleRow";
import { PolicySummary } from "@/components/PolicySummary";
import { SavedPolicyCard, SavedPolicy } from "@/components/SavedPolicyCard";
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
  const [activeTab, setActiveTab] = useState<"create" | "saved">("create");
  const [savedPolicies, setSavedPolicies] = useState<SavedPolicy[]>([]);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingPolicy, setViewingPolicy] = useState<SavedPolicy | null>(null);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [policyName, setPolicyName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load saved policies from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('drt-saved-policies');
    if (saved) {
      setSavedPolicies(JSON.parse(saved));
    }
  }, []);

  // Save policies to localStorage whenever savedPolicies changes
  useEffect(() => {
    localStorage.setItem('drt-saved-policies', JSON.stringify(savedPolicies));
  }, [savedPolicies]);

  // Validation function to check if all required values are entered
  const isPolicyValid = () => {
    return rules.every(rule => 
      rule.conditionValue && 
      rule.conditionValue.trim() !== "" &&
      rule.operator &&
      rule.operator.trim() !== ""
    );
  };

  // Save policy function
  const savePolicy = () => {
    if (!isPolicyValid()) return;
    
    const policyData = {
      id: editingPolicyId || Date.now().toString(),
      name: policyName || `Policy ${savedPolicies.length + 1}`,
      createdAt: editingPolicyId ? 
        savedPolicies.find(p => p.id === editingPolicyId)?.createdAt || new Date().toISOString() : 
        new Date().toISOString(),
      rules: rules.map(rule => ({
        ruleType: rule.ruleType,
        conditionType: rule.conditionType,
        operator: rule.operator,
        conditionValue: rule.conditionValue
      }))
    };
    
    if (editingPolicyId) {
      // Update existing policy
      setSavedPolicies(prev => prev.map(policy => 
        policy.id === editingPolicyId ? policyData : policy
      ));
    } else {
      // Create new policy
      setSavedPolicies(prev => [...prev, policyData]);
    }
    
    setIsSummaryModalOpen(true);
  };

  // Reset policy function
  const resetPolicy = () => {
    setRules(createDefaultRules());
    setPolicyName("");
    setEditingPolicyId(null);
    setIsSummaryModalOpen(false);
  };

  // Delete saved policy function
  const deleteSavedPolicy = (policyId: string) => {
    setSavedPolicies(prev => prev.filter(policy => policy.id !== policyId));
  };

  // View saved policy function
  const viewSavedPolicy = (policy: SavedPolicy) => {
    setViewingPolicy(policy);
    setIsViewModalOpen(true);
  };

  // Edit saved policy function
  const editSavedPolicy = (policy: SavedPolicy) => {
    // Convert saved policy back to rules format
    const policyRules: Rule[] = policy.rules.map((rule, index) => ({
      id: `policy-${policy.id}-${index}`,
      ruleType: rule.ruleType,
      conditionType: rule.conditionType,
      operator: rule.operator,
      conditionValue: rule.conditionValue,
      isDefault: false
    }));
    
    setRules(policyRules);
    setPolicyName(policy.name);
    setEditingPolicyId(policy.id);
    setActiveTab("create");
    setIsViewModalOpen(false);
    setViewingPolicy(null);
  };

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
      {/* Segmented Controller */}
      <div className="mb-6">
        <SegmentedControl
          options={[
            { value: "create", label: "Create Policy" },
            { value: "saved", label: "Saved Policies" }
          ]}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "create" | "saved")}
        />
      </div>

      {activeTab === "create" ? (
        <Card>
          <CardHeader className="pt-6 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Create New Policy</CardTitle>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Policy name (optional)"
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  onClick={savePolicy}
                  disabled={!isPolicyValid()}
                  className={`flex items-center gap-2 ${!isPolicyValid() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {editingPolicyId ? 'Update Policy' : 'Save Policy'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-0 pb-6">
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
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pt-6 pb-0">
              <CardTitle>Saved Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 pb-6">
              {savedPolicies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No saved policies yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Create your first policy to see it here.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {savedPolicies.map((policy) => (
                    <SavedPolicyCard
                      key={policy.id}
                      policy={policy}
                      onView={viewSavedPolicy}
                      onDelete={deleteSavedPolicy}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Policy Summary Modal */}
      <Modal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        title="Policy Summary"
      >
        <PolicySummary rules={rules} />
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsSummaryModalOpen(false)} className="cursor-pointer">
            Cancel
          </Button>
          <Button onClick={resetPolicy} className="cursor-pointer">
            OK - Reset Builder
          </Button>
        </div>
      </Modal>

      {/* View Saved Policy Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingPolicy(null);
        }}
        title={`View Policy: ${viewingPolicy?.name || ''}`}
      >
        {viewingPolicy && (
          <div className="space-y-4">
            <PolicySummary rules={viewingPolicy.rules.map((rule, index) => ({
              id: `view-${index}`,
              ruleType: rule.ruleType,
              conditionType: rule.conditionType,
              operator: rule.operator,
              conditionValue: rule.conditionValue,
              isDefault: false
            }))} />
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Policy Information</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div><span className="font-medium">Name:</span> {viewingPolicy.name}</div>
                <div><span className="font-medium">Created:</span> {new Date(viewingPolicy.createdAt).toLocaleString()}</div>
                <div><span className="font-medium">Rules:</span> {viewingPolicy.rules.length}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsViewModalOpen(false);
              setViewingPolicy(null);
            }}
            className="cursor-pointer"
          >
            Close
          </Button>
          {viewingPolicy && (
            <Button 
              onClick={() => editSavedPolicy(viewingPolicy)}
              className="cursor-pointer"
            >
              Edit Policy
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
