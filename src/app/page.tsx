import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Plus, Trash2, Settings, Database, ArrowRight, Sparkles, Users, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Intelligent HR Policy Builder
          </div>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            DRT Rules Builder
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Build sophisticated leave policies with our intelligent rule engine. 
            Configure complex HR policies using drag-and-drop interface with 25+ condition types and smart validation.
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-20">
          <Link href="/rules-builder">
            <Button size="lg" className="text-lg px-10 py-6 cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Build Leave Policies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Start building in seconds • No setup required
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Condition Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Smart Validation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">∞</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Policy Combinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Setup Time</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Create sophisticated leave policies in four simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Configure Default Rules</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Start with pre-configured leave policy rules including Country, Office, Leave Type, and Base Entitlement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Customize Conditions</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Select from 25+ condition types like Tenure, Age, Job Title, Department, and configure values with smart input types.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Drag & Drop Rules</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Reorder rules with drag-and-drop interface. Add new rules and configure complex leave policy logic.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Save & Manage Policies</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Save policies with custom names, view policy summaries, and manage multiple leave policies for different scenarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Final CTA Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-12 text-center border border-blue-200 dark:border-blue-800">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Ready to Build Your First Policy?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of HR professionals who trust DRT Rules Builder for their leave policy management.
            </p>
            <Link href="/rules-builder">
              <Button size="lg" className="text-lg px-10 py-6 cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400 font-medium">DRT Rules Builder</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            Built with Next.js, TypeScript, and shadcn/ui components
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            Intelligent leave policy configuration with drag-and-drop rule building
          </p>
        </div>
      </div>
    </div>
  );
}
