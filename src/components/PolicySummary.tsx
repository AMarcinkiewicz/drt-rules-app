"use client";

import { Rule } from "@/app/rules-builder/page";

interface PolicySummaryProps {
  rules: Rule[];
}

export function PolicySummary({ rules }: PolicySummaryProps) {
  const generatePolicyExplanation = (rules: Rule[]): string => {
    const baseEntitlement = rules.find(r => r.conditionType === 'Base entitlement')?.conditionValue;
    const accrualFreq = rules.find(r => r.conditionType === 'Accrual Frequency')?.conditionValue;
    const carryOver = rules.find(r => r.conditionType === 'Carry Over Allowed')?.conditionValue;
    const prorated = rules.find(r => r.conditionType === 'Prorated')?.conditionValue;
    const country = rules.find(r => r.conditionType === 'Country')?.conditionValue;
    const office = rules.find(r => r.conditionType === 'Office')?.conditionValue;
    const leaveType = rules.find(r => r.conditionType === 'Leave Type')?.conditionValue;
    const paid = rules.find(r => r.conditionType === 'Paid')?.conditionValue;
    const minDuration = rules.find(r => r.conditionType === 'Minimum Duration Allowed')?.conditionValue;
    
    let explanation = "This leave policy is designed to provide structured time-off benefits for employees. ";
    
    // Eligibility explanation
    if (country || office) {
      explanation += `The policy applies to employees in ${country ? country : 'all countries'}${office ? ` working in ${office}` : ''}. `;
    }
    
    // Leave type explanation
    if (leaveType) {
      explanation += `It specifically covers ${leaveType.toLowerCase()} requests. `;
    }
    
    // Entitlement explanation
    if (baseEntitlement) {
      explanation += `Employees are entitled to ${baseEntitlement} of leave time. `;
    }
    
    // Accrual explanation
    if (accrualFreq) {
      explanation += `Leave time accrues on a ${accrualFreq.toLowerCase()} basis. `;
    }
    
    // Proration explanation
    if (prorated === 'ON') {
      explanation += `Leave entitlements are prorated based on the employee's start date and working schedule. `;
    } else if (prorated === 'OFF') {
      explanation += `Leave entitlements are not prorated and are provided in full regardless of start date. `;
    }
    
    // Carry over explanation
    if (carryOver === 'ON') {
      const maxCarryOver = rules.find(r => r.conditionType === 'Maximimum Carry Over')?.conditionValue;
      explanation += `Unused leave can be carried over to the next period${maxCarryOver ? `, with a maximum of ${maxCarryOver}` : ''}. `;
    } else if (carryOver === 'OFF') {
      explanation += `Unused leave cannot be carried over and will be forfeited at the end of the period. `;
    }
    
    // Minimum duration explanation
    if (minDuration) {
      explanation += `The minimum leave duration allowed is ${minDuration.toLowerCase()}. `;
    }
    
    // Paid status explanation
    if (paid === 'ON') {
      explanation += `This leave is paid, meaning employees will receive their regular salary during time off. `;
    } else if (paid === 'OFF') {
      explanation += `This leave is unpaid, meaning employees will not receive salary during time off. `;
    }
    
    explanation += `The policy ensures fair and consistent leave management across the organization while maintaining operational efficiency.`;
    
    return explanation;
  };

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

  const explanation = generatePolicyExplanation(rules);
  const summary = generateAISummary(rules);

  return (
    <div className="space-y-4">
      {/* Policy Explanation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-900 mb-3">How This Policy Works</h3>
        <p className="text-green-800 text-sm leading-relaxed">
          {explanation}
        </p>
      </div>
      
      {/* Technical Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Technical Summary</h3>
        <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </div>
      
      {/* Rule Details */}
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
