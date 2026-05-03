'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tab } from '@headlessui/react';
import {
  BellRing,
  Camera,
  ChevronRight,
  KeyRound,
  MapPin,
  Settings2,
  ShieldCheck,
  Trash2,
  User2,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { useAuthStore } from '@/store/auth.store';
import { userService } from '@/services/auth.service';
import {
  updateProfileSchema,
  type UpdateProfileSchema,
} from '@/utils/validation.utils';
import { useAlert } from '@/hooks/useAlert';

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const { success, error: alertError } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user ? `${user.first_name} ${user.last_name}` : '',
      bio: '',
      gender: undefined,
      country: '',
      city: '',
      state: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: `${user.first_name} ${user.last_name}`,
        bio: '',
        gender: undefined,
        country: '',
        city: '',
        state: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateProfileSchema) => {
    try {
      setLoading(true);
      const res = await userService.updateProfile(data);

      if (res.success && res.data) {
        setUser(res.data.user);
        success('Profile updated successfully!');
      } else {
        alertError(res.message || 'Failed to update profile');
      }
    } catch (err: any) {
      alertError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      alertError('Password is required to delete your account');
      return;
    }

    try {
      setIsDeleting(true);
      const res = await userService.deleteAccount(deletePassword, deleteReason);

      if (res.success) {
        success('Account deleted successfully. Logging out...');
        setTimeout(() => {
          logout();
          router.push('/');
        }, 2000);
      } else {
        alertError(res.message || 'Failed to delete account');
      }
    } catch (err: any) {
      alertError(err.message || 'An error occurred');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const tabs = [
    {
      label: 'Profile',
      icon: User2,
      subtitle: 'Personal details and account info',
    },
    {
      label: 'Security',
      icon: ShieldCheck,
      subtitle: 'Password and account protection',
    },
    {
      label: 'Notifications',
      icon: BellRing,
      subtitle: 'Control how you get updates',
    },
    {
      label: 'Delete Account',
      icon: Trash2,
      subtitle: 'Permanently delete your account',
    },
  ];

  const profileImage =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="mx-auto max-w-7xl space-y-8"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>



      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* Sidebar Summary */}
        <aside className="space-y-6">
          <Card className="overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-white p-0 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="relative h-28 bg-[linear-gradient(135deg,#4a5ff7_0%,#0b1220_100%)]" />
            <div className="relative px-6 pb-6">
              <div className="-mt-12 flex items-end justify-between">
                <div className="relative">
                  <div
                    className="h-24 w-24 rounded-3xl border-4 border-white bg-cover bg-center shadow-lg"
                    style={{ backgroundImage: `url(${profileImage})` }}
                  />
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#4a5ff7] shadow-sm transition hover:bg-[#f8faff]"
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                  {user ? `${user.first_name} ${user.last_name}` : 'User Account'}
                </h2>
                <p className="mt-1 break-all text-sm text-[#6b7280]">
                  {user?.email || 'No email available'}
                </p>
                <p className="mt-1 text-sm text-[#6b7280]">
                  {user?.phone_number || 'No phone number available'}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3">
                  <span className="text-sm font-medium text-[#6b7280]">City</span>
                  <span className="text-sm font-semibold text-[#111827]">—</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3">
                  <span className="text-sm font-medium text-[#6b7280]">State</span>
                  <span className="text-sm font-semibold text-[#111827]">—</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3">
                  <span className="text-sm font-medium text-[#6b7280]">Country</span>
                  <span className="text-sm font-semibold text-[#111827]">—</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <h3 className="text-lg font-bold tracking-tight text-[#111827]">
              Account Highlights
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                <div className="rounded-2xl bg-[#eef2ff] p-3">
                  <ShieldCheck className="h-5 w-5 text-[#4a5ff7]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    Security posture
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#6b7280]">
                    Keep your account protected with strong credentials and
                    additional security steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                <div className="rounded-2xl bg-[#eef2ff] p-3">
                  <MapPin className="h-5 w-5 text-[#4a5ff7]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    Location details
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#6b7280]">
                    Complete your profile information to improve personalization
                    and account completeness.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <section>
          <Tab.Group>
            <Tab.List className="grid grid-cols-2 gap-3 rounded-[28px] border border-[#e5e7eb] bg-white p-3 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <Tab
                    key={tab.label}
                    className={({ selected }) =>
                      classNames(
                        'rounded-2xl px-4 py-4 text-left transition-all duration-200 focus:outline-none',
                        selected
                          ? 'bg-[#0b1220] text-white shadow-md'
                          : 'bg-[#fafafa] text-[#111827] hover:bg-[#f3f4f6]'
                      )
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-start gap-3">
                        <div
                          className={classNames(
                            'rounded-2xl p-3',
                            selected ? 'bg-white/10' : 'bg-[#eef2ff]'
                          )}
                        >
                          <Icon
                            size={18}
                            className={selected ? 'text-white' : 'text-[#4a5ff7]'}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold">{tab.label}</p>
                          <p
                            className={classNames(
                              'mt-1 text-xs leading-5',
                              selected ? 'text-[#cbd5e1]' : 'text-[#6b7280]'
                            )}
                          >
                            {tab.subtitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </Tab>
                );
              })}
            </Tab.List>

            <Tab.Panels className="mt-6">
              {/* Profile */}
              <Tab.Panel>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111827]">
                          Personal Information
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#6b7280]">
                          Update your public-facing account details and personal
                          information here.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Input
                        label="Full Name"
                        type="text"
                        error={errors.name?.message}
                        {...register('name')}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        value={user?.email || ''}
                        disabled
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        value={user?.phone_number || ''}
                        disabled
                      />

                      <Select
                        label="Gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                        ]}
                        {...register('gender')}
                      />

                      <Input
                        label="City"
                        type="text"
                        error={errors.city?.message}
                        {...register('city')}
                      />

                      <Input
                        label="State"
                        type="text"
                        error={errors.state?.message}
                        {...register('state')}
                      />

                      <div className="md:col-span-2">
                        <Input
                          label="Country"
                          type="text"
                          error={errors.country?.message}
                          {...register('country')}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="mb-2 block text-sm font-semibold text-[#374151]">
                        Bio
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us a little about yourself"
                        className="w-full rounded-2xl border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#4a5ff7] focus:ring-4 focus:ring-[#4a5ff7]/10"
                        {...register('bio')}
                      />
                      {errors.bio?.message ? (
                        <p className="mt-2 text-sm text-red-500">{errors.bio.message}</p>
                      ) : null}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="submit"
                        isLoading={loading}
                        className="h-11 rounded-xl bg-[#4a5ff7] px-6 text-white hover:bg-[#3b4fe0]"
                      >
                        Save Changes
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => reset()}
                        className="h-11 rounded-xl border-[#d1d5db] px-6"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card>
                </form>
              </Tab.Panel>

              {/* Security */}
              <Tab.Panel>
                <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                  <div className="mb-8">
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111827]">
                      Security Settings
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                      Review the key security controls available for your account.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: 'Change Password',
                        description: 'Update your password regularly for better account protection.',
                        action: 'Change',
                        icon: KeyRound,
                      },
                      {
                        title: 'Two-Factor Authentication',
                        description:
                          'Enable an extra layer of protection for sign-in and verification.',
                        action: 'Enable',
                        icon: ShieldCheck,
                      },
                      {
                        title: 'Login History',
                        description: 'Review recent account login activity and sign-in sessions.',
                        action: 'View',
                        icon: ChevronRight,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex flex-col gap-4 rounded-[24px] border border-[#edf2f7] bg-[#fcfcfd] p-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-start gap-4">
                            <div className="rounded-2xl bg-[#eef2ff] p-3">
                              <Icon className="h-5 w-5 text-[#4a5ff7]" />
                            </div>

                            <div>
                              <h3 className="text-base font-bold text-[#111827]">
                                {item.title}
                              </h3>
                              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6b7280]">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            className="h-11 rounded-xl border-[#d1d5db] px-5"
                          >
                            {item.action}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Tab.Panel>

              {/* Notifications */}
              <Tab.Panel>
                <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                  <div className="mb-8">
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111827]">
                      Notification Preferences
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                      Choose how you want to receive alerts, updates, and platform
                      communications.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: 'Email Notifications',
                        desc: 'Receive transaction updates, alerts, and important account communication by email.',
                      },
                      {
                        label: 'SMS Notifications',
                        desc: 'Receive important updates and service confirmations via SMS.',
                      },
                      {
                        label: 'App Notifications',
                        desc: 'Get real-time alerts directly inside the application.',
                      },
                      {
                        label: 'Marketing Emails',
                        desc: 'Receive promotional offers, product announcements, and platform updates.',
                      },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="flex flex-col gap-4 rounded-[24px] border border-[#edf2f7] bg-[#fcfcfd] p-5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="pr-0 sm:pr-8">
                          <h3 className="text-base font-bold text-[#111827]">
                            {item.label}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-[#6b7280]">
                            {item.desc}
                          </p>
                        </div>

                        <label className="inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            defaultChecked={index !== 3}
                          />
                          <span className="relative h-7 w-12 rounded-full bg-[#d1d5db] transition peer-checked:bg-[#4a5ff7] after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:left-6" />
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button className="h-11 rounded-xl bg-[#4a5ff7] px-6 text-white hover:bg-[#3b4fe0]">
                      Save Preferences
                    </Button>
                  </div>
                </Card>
              </Tab.Panel>

              {/* Delete Account */}
              <Tab.Panel>
                <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                  <div className="mb-8">
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111827]">
                      Delete Account
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                      Permanently delete your AFRIDataNG account and all associated data.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-[24px] border-2 border-red-200 bg-red-50 p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-red-100 p-3">
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-red-900">Danger Zone</h3>
                          <p className="mt-1 text-sm text-red-700">
                            This action cannot be undone. Deleting your account will:
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-red-700">
                            <li>• Permanently remove all your personal data</li>
                            <li>• Close all active sessions and tokens</li>
                            <li>• Delete your transaction history and records</li>
                            <li>• Remove your access to all AFRIDataNG services</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowDeleteModal(true)}
                      className="h-11 rounded-xl bg-red-600 px-6 text-white hover:bg-red-700"
                    >
                      Delete My Account
                    </Button>
                  </div>
                </Card>

                {/* Delete Account Modal */}
                {showDeleteModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-8 shadow-lg sm:w-96">
                      <h3 className="text-xl font-bold text-[#111827]">Confirm Account Deletion</h3>
                      <p className="mt-2 text-sm text-[#6b7280]">
                        This action is permanent. Please enter your password to confirm.
                      </p>

                      <div className="mt-6 space-y-4">
                        <Input
                          label="Password"
                          type="password"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          placeholder="Enter your password"
                        />

                        <div>
                          <label className="text-sm font-medium text-[#111827]">
                            Why are you deleting your account? (Optional)
                          </label>
                          <textarea
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            placeholder="Your feedback helps us improve..."
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] px-4 py-3 text-sm placeholder-[#9ca3af] focus:border-[#4a5ff7] focus:outline-none"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="mt-8 flex gap-3">
                        <Button
                          onClick={() => setShowDeleteModal(false)}
                          variant="outline"
                          className="flex-1 rounded-xl"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="flex-1 rounded-xl bg-red-600 text-white hover:bg-red-700"
                        >
                          {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </section>
      </div>
    </div>
  );
}