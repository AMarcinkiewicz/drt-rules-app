import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Plus, Trash2, Settings, Database } from "lucide-react";

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
            A powerful, intuitive interface for building and managing dynamic business rules. 
            Create complex conditional logic with ease using our drag-and-drop rule builder.
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-16">
          <Link href="/rules-builder">
            <Button size="lg" className="text-lg px-8 py-6">
              <Settings className="mr-2 h-5 w-5" />
              Launch Rules Builder
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <CardTitle>Dynamic Rule Creation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add new rules with a single click. Each rule supports multiple condition types, 
                operators, and value inputs based on your configuration.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                <CardTitle>Data-Driven Configuration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All dropdowns, operators, and input types are dynamically generated from your 
                JSON configuration file, making it easy to customize without code changes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <CardTitle>Easy Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Remove unwanted rules with a single click. Each rule row is independent and 
                can be deleted without affecting other rules in your configuration.
              </CardDescription>
            </CardContent>
          </Card>
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
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Select Rule Type</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Choose from If, And, Then, or Or logic operators to define your rule structure.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Define Condition</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Select from 25+ condition types like Tenure, Age, Job Title, Department, and more.
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
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Set Operator & Value</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Choose appropriate operators (=, &lt;, &gt;, etc.) and input values using smart input types.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Build Complex Logic</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Add multiple rules to create sophisticated business logic with nested conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">
            Built with Next.js, TypeScript, and shadcn/ui components
          </p>
        </div>
      </div>
    </div>
  );
}
