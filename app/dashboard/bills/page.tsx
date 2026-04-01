'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { useAlert } from '@/hooks/useAlert';
import { useApi } from '@/hooks/useApi';
import { transactionService } from '@/services/transaction.service';
import { payBillsSchema, type PayBillsSchema } from '@/utils/validation.utils';
import { formatCurrency } from '@/utils/format.utils';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';

export default function BillsPage() {
  const [confirmModal, setConfirmModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const { success, error: alertError } = useAlert();
  const { execute } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PayBillsSchema>({
    resolver: zodResolver(payBillsSchema),
  });

  const onSubmit = async (data: PayBillsSchema) => {
    setPurchaseData(data);
    setConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!purchaseData) return;

    const result = await execute(transactionService.payBills(purchaseData));

    if (result && result.success) {
      success('Bill payment initiated!');
      setConfirmModal(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pay Bills</h1>
        <p className="text-gray-600 mt-2">Pay electricity, water, internet and insurance bills</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Bill Type */}
          <Select
            label="Bill Type"
            options={[
              { value: 'electricity', label: 'Electricity' },
              { value: 'water', label: 'Water' },
              { value: 'internet', label: 'Internet' },
              { value: 'insurance', label: 'Insurance' },
            ]}
            error={errors.bill_type?.message}
            {...register('bill_type')}
          />

          {/* Provider */}
          <Select
            label="Service Provider"
            options={[
              { value: 'ekedc', label: 'EKEDC' },
              { value: 'ikedc', label: 'IKEDC' },
              { value: 'bedc', label: 'BEDC' },
              { value: 'waec', label: 'WAEC' },
            ]}
            error={errors.provider?.message}
            {...register('provider')}
          />

          {/* Account Number */}
          <Input
            label="Account/Meter Number"
            type="text"
            placeholder="Enter your account number"
            icon={<FileText size={18} />}
            error={errors.account_number?.message}
            {...register('account_number')}
          />

          {/* Amount */}
          <Input
            label="Amount to Pay"
            type="number"
            placeholder="Enter amount"
            error={errors.amount?.message}
            {...register('amount', { valueAsNumber: true })}
          />

          {/* Payment Method */}
          <Select
            label="Payment Method"
            options={[
              { value: 'wallet', label: 'Wallet' },
              { value: 'card', label: 'Debit Card' },
              { value: 'mobile_money', label: 'Mobile Money' },
            ]}
            error={errors.payment_method?.message}
            {...register('payment_method')}
          />

          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Continue to Payment
          </Button>
        </form>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Confirm Bill Payment"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Bill Type:</span>
              <span className="font-medium capitalize">{purchaseData?.bill_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider:</span>
              <span className="font-medium capitalize">{purchaseData?.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account:</span>
              <span className="font-medium">{purchaseData?.account_number}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Amount:</span>
              <span className="font-bold">{formatCurrency(purchaseData?.amount || 0)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleConfirmPurchase}
              isLoading={isSubmitting}
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
