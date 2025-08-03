"use client";

import react from "react";
import { useEffect } from "react";
import { SalaryInput } from "@/components/SalaryInput";
import { ExpenseManager } from "@/components/ExpenseManager";
import { IncomeManager } from "@/components/IncomeManager";
import { NetIncomeSummary } from "@/components/NetIncomeSummary";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function Home() {
  const store = useCalculatorStore();

  useEffect(() => {
    useCalculatorStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Personal Finance Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Track your salary, expenses, and additional income to understand
              your financial health
            </p>
          </div>

          <div className="space-y-8">
            {/* Net Income Summary */}
            <NetIncomeSummary />

            {/* Salary Input */}
            <SalaryInput />

            {/* Expenses and Income in Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ExpenseManager />
              <IncomeManager />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              All data is stored locally in your browser. Your financial
              information is private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
