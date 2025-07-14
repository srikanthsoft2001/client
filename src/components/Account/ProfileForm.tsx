import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getUserById, updateUserById } from '@/api/auth';
import AccountSidebar from './AccountSidebar';
import { useAuth } from '@/context/useAuth';

interface User {
  name?: string;
  email?: string;
  address?: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type APIError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const ProfileForm: React.FC = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<UserFormData | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const user: User = await getUserById(userId);
        const name = user.name || '';
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');

        const userFormData: UserFormData = {
          firstName,
          lastName,
          email: user.email || '',
          address: user.address || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        };

        setFormData(userFormData);
        setInitialData(userFormData);
      } catch (error) {
        console.error('Failed to load user data', error);
        alert('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
      alert('All changes have been reverted.');
    }
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('First name, last name, and email are required.');
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    if (!userId) {
      alert('User ID not available.');
      return;
    }

    try {
      const name = `${formData.firstName} ${formData.lastName}`;
      const payload: {
        name: string;
        email: string;
        address: string;
        currentPassword?: string;
        newPassword?: string;
      } = {
        name,
        email: formData.email,
        address: formData.address,
      };

      if (
        formData.currentPassword &&
        formData.newPassword &&
        formData.newPassword === formData.confirmPassword
      ) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const updatedUser = await updateUserById(userId, payload);
      alert('Profile updated successfully!');
      console.log('User updated:', updatedUser);

      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as APIError).response?.data?.message === 'string'
      ) {
        alert((error as APIError).response?.data?.message);
      } else {
        alert('Failed to update profile.');
      }
      console.error('Failed to update user:', error);
    }
  };

  if (loading || !userId) return <p>Loading profile...</p>;

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <h2 className="text-xl font-semibold text-red-500 mb-6">Edit Your Profile</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />

        <div className="flex-1 space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="bg-secondary"
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="bg-secondary"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-secondary col-span-2"
              />
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-secondary col-span-2"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
            <Input
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className="bg-secondary"
            />
            <Input
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="bg-secondary"
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="bg-secondary"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-6 space-x-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="bg-red-500 text-white" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
