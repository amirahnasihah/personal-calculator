'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCalculatorStore } from '@/store/calculatorStore';
import { Plus, Trash2, Edit3, Check, X, Minus } from 'lucide-react';
import { ExpenseItem } from '@/types/calculator';

const expenseCategories = [
  { value: 'groceries', label: 'Groceries' },
  { value: 'rental', label: 'Rent/Mortgage' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'transport', label: 'Transportation' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'custom', label: 'Custom' },
] as const;

export function ExpenseManager() {
  const { expenses, addExpense, updateExpense, deleteExpense, getTotalExpenses } = useCalculatorStore();
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0, category: 'groceries' as ExpenseItem['category'] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Partial<ExpenseItem>>({});

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount > 0) {
      addExpense(newExpense);
      setNewExpense({ name: '', amount: 0, category: 'groceries' });
    }
  };

  const handleEditExpense = (expense: ExpenseItem) => {
    setEditingId(expense.id);
    setEditingExpense(expense);
  };

  const handleSaveEdit = () => {
    if (editingId && editingExpense.name && editingExpense.amount) {
      updateExpense(editingId, editingExpense);
      setEditingId(null);
      setEditingExpense({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingExpense({});
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Minus className="h-5 w-5 text-red-600" />
          Expenses
          <span className="ml-auto text-red-600 font-bold">
            -${getTotalExpenses().toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Expense */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="expense-name" className="text-sm font-medium">
              Expense Name
            </Label>
            <Input
              id="expense-name"
              placeholder="e.g., Netflix"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expense-amount" className="text-sm font-medium">
              Amount
            </Label>
            <Input
              id="expense-amount"
              type="number"
              placeholder="0"
              value={newExpense.amount || ''}
              onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={newExpense.category}
              onValueChange={(value: ExpenseItem['category']) =>
                setNewExpense({ ...newExpense, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddExpense} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Expense List */}
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
              {editingId === expense.id ? (
                <>
                  <Input
                    value={editingExpense.name || ''}
                    onChange={(e) => setEditingExpense({ ...editingExpense, name: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={editingExpense.amount || ''}
                    onChange={(e) => setEditingExpense({ ...editingExpense, amount: Number(e.target.value) || 0 })}
                    className="w-24"
                  />
                  <Select
                    value={editingExpense.category}
                    onValueChange={(value: ExpenseItem['category']) =>
                      setEditingExpense({ ...editingExpense, category: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
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
                    <div className="font-medium">{expense.name}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {expenseCategories.find(cat => cat.value === expense.category)?.label}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-red-600">
                    ${expense.amount.toLocaleString()}
                  </div>
                  <Button size="sm" onClick={() => handleEditExpense(expense)} variant="outline">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => deleteExpense(expense.id)} variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
          {expenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No expenses added yet. Add your first expense above.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}