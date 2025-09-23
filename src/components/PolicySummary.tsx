"use client";

import { Rule } from "@/app/rules-builder/page";

interface PolicySummaryProps {
  rules: Rule[];
}

export function PolicySummary({ rules }: PolicySummaryProps) {
  const generateAISummary = (rules: Rule[]): string => {
    const conditions = rules.map(rule => {
      const { ruleType, conditionType, operator, conditionValue } = rule;
      return `${ruleType} ${conditionType} ${operator} ${conditionValue || '[Not Set]'}`;
    }).join('\n');

    return `Based on the configured rules, this policy will:

1. **Eligibility Criteria**: ${rules.filter(r => r.ruleType === 'If').length > 0 ? 'Multiple conditions must be met' : 'No specific conditions'}

2. **Leave Configuration**:
   - Base entitlement: ${rules.find(r => r.conditionType === 'Base entitlement')?.conditionValue || 'Not configured'}
   - Accrual frequency: ${rules.find(r => r.conditionType === 'Accrual Frequency')?.conditionValue || 'Not configured'}
   - Carry over allowed: ${rules.find(r => r.conditionType === 'Carry Over Allowed')?.conditionValue || 'Not configured'}

3. **Policy Rules**:
${conditions}

4. **Additional Features**:
   - Prorated: ${rules.find(r => r.conditionType === 'Prorated')?.conditionValue || 'Not configured'}
   - Minimum duration: ${rules.find(r => r.conditionType === 'Minimum Duration Allowed')?.conditionValue || 'Not configured'}
   - Paid leave: ${rules.find(r => r.conditionType === 'Paid')?.conditionValue || 'Not configured'}

This policy has been configured with ${rules.length} total rules and will be applied to employees matching the specified criteria.`;
  };

  const summary = generateAISummary(rules);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Policy Summary</h3>
        <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Rule Details</h4>
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div key={rule.id} className="text-sm text-gray-600">
              <span className="font-medium">{index + 1}.</span> {rule.ruleType} {rule.conditionType} {rule.operator} {rule.conditionValue || '[Not Set]'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
