import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Plus, Trash2, Settings, Database, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            DRT Rules Builder
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Build sophisticated leave policies with our intelligent rule engine. 
            Configure complex HR policies using drag-and-drop interface with 25+ condition types and smart validation.
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-16">
          <Link href="/rules-builder">
            <Button size="lg" className="text-lg px-8 py-6 cursor-pointer rounded-full">
              Build Leave Policy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>


        {/* How It Works */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Configure Default Rules</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Start with pre-configured leave policy rules including Country, Office, Leave Type, and Base Entitlement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Customize Conditions</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Select from 25+ condition types like Tenure, Age, Job Title, Department, and configure values with smart input types.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Drag & Drop Rules</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Reorder rules with drag-and-drop interface. Add new rules and configure complex leave policy logic.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Save & Manage Policies</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Save policies with custom names, view policy summaries, and manage multiple leave policies for different scenarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Smart Validation</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Real-time validation ensures all required fields are completed before saving policies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">25+ Condition Types</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Comprehensive condition library including Country, Office, Tenure, Age, Job Title, Department, and more.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Plus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Policy Management</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Save, load, edit, and manage multiple leave policies with intelligent policy summaries.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">
            DRT Rules Builder - Built with Next.js, TypeScript, and shadcn/ui components
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
            Intelligent leave policy configuration with drag-and-drop rule building
          </p>
        </div>
      </div>
    </div>
  );
}
