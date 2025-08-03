'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorStore } from '@/store/calculatorStore';
import { DollarSign } from 'lucide-react';

export function SalaryInput() {
  const { salary, setSalary } = useCalculatorStore();

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <DollarSign className="h-5 w-5 text-blue-600" />
          Monthly Salary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="salary" className="text-sm font-medium">
            Base Salary
          </Label>
          <Input
            id="salary"
            type="number"
            placeholder="Enter your monthly salary"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value) || 0)}
            className="text-lg font-semibold"
          />
        </div>
      </CardContent>
    </Card>
  );
}