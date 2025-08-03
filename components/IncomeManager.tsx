'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCalculatorStore } from '@/store/calculatorStore';
import { Plus, Trash2, Edit3, Check, X, PlusCircle } from 'lucide-react';
import { IncomeItem } from '@/types/calculator';

const incomeCategories = [
  { value: 'side-income', label: 'Side Income' },
  { value: 'investment', label: 'Investment Returns' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'bonus', label: 'Bonus/Commission' },
  { value: 'custom', label: 'Custom' },
] as const;

export function IncomeManager() {
  const { additionalIncome, addIncome, updateIncome, deleteIncome, getTotalAdditionalIncome } = useCalculatorStore();
  const [newIncome, setNewIncome] = useState({ name: '', amount: 0, category: 'side-income' as IncomeItem['category'] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingIncome, setEditingIncome] = useState<Partial<IncomeItem>>({});

  const handleAddIncome = () => {
    if (newIncome.name && newIncome.amount > 0) {
      addIncome(newIncome);
      setNewIncome({ name: '', amount: 0, category: 'side-income' });
    }
  };

  const handleEditIncome = (income: IncomeItem) => {
    setEditingId(income.id);
    setEditingIncome(income);
  };

  const handleSaveEdit = () => {
    if (editingId && editingIncome.name && editingIncome.amount) {
      updateIncome(editingId, editingIncome);
      setEditingId(null);
      setEditingIncome({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingIncome({});
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <PlusCircle className="h-5 w-5 text-green-600" />
          Additional Income
          <span className="ml-auto text-green-600 font-bold">
            +${getTotalAdditionalIncome().toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Income */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="income-name" className="text-sm font-medium">
              Income Source
            </Label>
            <Input
              id="income-name"
              placeholder="e.g., Uber driving"
              value={newIncome.name}
              onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="income-amount" className="text-sm font-medium">
              Amount
            </Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="0"
              value={newIncome.amount || ''}
              onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={newIncome.category}
              onValueChange={(value: IncomeItem['category']) =>
                setNewIncome({ ...newIncome, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {incomeCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddIncome} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Income List */}
        <div className="space-y-3">
          {additionalIncome.map((income) => (
            <div key={income.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
              {editingId === income.id ? (
                <>
                  <Input
                    value={editingIncome.name || ''}
                    onChange={(e) => setEditingIncome({ ...editingIncome, name: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={editingIncome.amount || ''}
                    onChange={(e) => setEditingIncome({ ...editingIncome, amount: Number(e.target.value) || 0 })}
                    className="w-24"
                  />
                  <Select
                    value={editingIncome.category}
                    onValueChange={(value: IncomeItem['category']) =>
                      setEditingIncome({ ...editingIncome, category: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={handleSaveEdit} variant="outline">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleCancelEdit} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="font-medium">{income.name}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {incomeCategories.find(cat => cat.value === income.category)?.label}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    +${income.amount.toLocaleString()}
                  </div>
                  <Button size="sm" onClick={() => handleEditIncome(income)} variant="outline">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => deleteIncome(income.id)} variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
          {additionalIncome.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No additional income sources added yet. Add your first income source above.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}