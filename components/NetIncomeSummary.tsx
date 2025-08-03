'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculatorStore } from '@/store/calculatorStore';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';

export function NetIncomeSummary() {
  const { salary, getTotalExpenses, getTotalAdditionalIncome, getNetIncome } = useCalculatorStore();
  const netIncome = getNetIncome();
  const totalExpenses = getTotalExpenses();
  const totalAdditionalIncome = getTotalAdditionalIncome();

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-5 w-5 text-blue-600" />
          Financial Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Income */}
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Total Income</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              MYR{(salary + totalAdditionalIncome).toLocaleString()}
            </div>
            <div className="text-sm text-green-700 mt-1">
              Salary: MYR{salary.toLocaleString()}
              {totalAdditionalIncome > 0 && (
                <> + Additional: MYR{totalAdditionalIncome.toLocaleString()}</>
              )}
            </div>
          </div>

          {/* Total Expenses */}
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Total Expenses</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              MYR{totalExpenses.toLocaleString()}
            </div>
            <div className="text-sm text-red-700 mt-1">
              Monthly spending
            </div>
          </div>

          {/* Net Income */}
          <div className={`text-center p-4 rounded-lg border ${
            netIncome >= 0 
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calculator className={`h-5 w-5 ${
                netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`} />
              <h3 className={`font-semibold ${
                netIncome >= 0 ? 'text-blue-800' : 'text-orange-800'
              }`}>
                Net Income
              </h3>
            </div>
            <div className={`text-2xl font-bold ${
              netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'
            }`}>
              MYR{netIncome.toLocaleString()}
            </div>
            <div className={`text-sm mt-1 ${
              netIncome >= 0 ? 'text-blue-700' : 'text-orange-700'
            }`}>
              {netIncome >= 0 ? 'Available for savings' : 'Budget deficit'}
            </div>
          </div>
        </div>

        {/* Percentage Breakdown */}
        {salary > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3 text-gray-800">Spending Analysis</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expenses as % of total income:</span>
                <span className="font-semibold">
                  {((totalExpenses / (salary + totalAdditionalIncome)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Savings rate:</span>
                <span className={`font-semibold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {((netIncome / (salary + totalAdditionalIncome)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}