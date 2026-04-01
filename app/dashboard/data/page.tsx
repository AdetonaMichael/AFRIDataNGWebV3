'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Modal } from '@/components/shared/Modal';
import { Spinner } from '@/components/shared/Spinner';
import { useAlert } from '@/hooks/useAlert';
import { useApi } from '@/hooks/useApi';
import { providerService } from '@/services/provider.service';
import { transactionService } from '@/services/transaction.service';
import { purchaseDataSchema, type PurchaseDataSchema } from '@/utils/validation.utils';
import { formatCurrency } from '@/utils/format.utils';
import { Wifi } from 'lucide-react';

export default function DataPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const { success, error: alertError } = useAlert();
  const { execute } = useApi();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseDataSchema>({
    resolver: zodResolver(purchaseDataSchema),
  });

  const provider = watch('provider');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const res = await providerService.listProviders('data');
        if (res.data) {
          setProviders(res.data.providers);
        }
      } catch (err) {
        alertError('Failed to load providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [alertError]);

  useEffect(() => {
    if (provider) {
      const fetchPlans = async () => {
        try {
          const res = await providerService.getProviderPlans(provider, 'data');
          if (res.data) {
            setPlans(res.data.plans);
          }
        } catch (err) {
          alertError('Failed to load plans');
        }
      };

      fetchPlans();
    }
  }, [provider, alertError]);

  const onSubmit = async (data: PurchaseDataSchema) => {
    setPurchaseData(data);
    setConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!purchaseData) return;

    const result = await execute(transactionService.purchaseData(purchaseData));

    if (result && result.success) {
      success('Data purchase initiated!');
      setConfirmModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Buy Data</h1>
        <p className="text-gray-600 mt-2">Get instant data bundles at the best rates</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Provider
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {providers.map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => {}}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    provider === prov.code
                      ? 'border-[#a9b7ff] bg-[#f7f8ff]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{prov.name.charAt(0)}</div>
                    <p className="text-sm font-medium text-gray-900">{prov.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <Input
            label="Recipient Phone Number"
            type="tel"
            placeholder="+234XXXXXXXXXX"
            helperText="Format: +234XXXXXXXXXX"
            icon={<Wifi size={18} />}
            error={errors.phone_number?.message}
            {...register('phone_number')}
          />

          {/* Data Plans */}
          {plans.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Plan
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {}}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      watch('plan_id') === plan.id
                        ? 'border-[#a9b7ff] bg-[#f7f8ff]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{plan.name}</div>
                    <div className="text-sm text-gray-600">{plan.description}</div>
                    <div className="font-bold text-[#a9b7ff] mt-2">
                      {formatCurrency(plan.amount)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

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
        title="Confirm Purchase"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Provider:</span>
              <span className="font-medium capitalize">{purchaseData?.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{purchaseData?.phone_number}</span>
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
