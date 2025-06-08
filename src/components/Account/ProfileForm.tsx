// import React, { useState } from 'react';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';

// const ProfileForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstName: 'Md',
//     lastName: 'Rimel',
//     email: 'rimel1111@gmail.com',
//     address: 'Kingston, 5236, United State',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSave = () => {
//     console.log('Saving profile changes:', formData);
//     alert(
//       'Profile Updated\nYour profile changes have been saved successfully.'
//     );
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: 'Md',
//       lastName: 'Rimel',
//       email: 'rimel1111@gmail.com',
//       address: 'Kingston, 5236, United State',
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     alert('Changes Cancelled\nAll changes have been reverted.');
//   };

//   return (
//     <div className="bg-card rounded-lg border border-border p-8">
//       <h2 className="text-xl font-semibold text-red-500 mb-6">
//         Edit Your Profile
//       </h2>

//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <Input
//               id="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={(e) => handleInputChange('firstName', e.target.value)}
//               className="bg-secondary"
//               aria-label="First Name"
//             />
//           </div>

//           <div className="space-y-2">
//             <Input
//               id="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={(e) => handleInputChange('lastName', e.target.value)}
//               className="bg-secondary"
//               aria-label="Last Name"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <Input
//               id="email"
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) => handleInputChange('email', e.target.value)}
//               className="bg-secondary"
//               aria-label="Email"
//             />
//           </div>

//           <div className="space-y-2">
//             <Input
//               id="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={(e) => handleInputChange('address', e.target.value)}
//               className="bg-secondary"
//               aria-label="Address"
//             />
//           </div>
//         </div>

//         <div className="space-y-4">
//           <h3 className="font-medium text-foreground">Password Changes</h3>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Input
//                 type="password"
//                 placeholder="Current Password"
//                 value={formData.currentPassword}
//                 onChange={(e) =>
//                   handleInputChange('currentPassword', e.target.value)
//                 }
//                 className="bg-secondary"
//                 aria-label="Current Password"
//               />
//             </div>

//             <div className="space-y-2">
//               <Input
//                 type="password"
//                 placeholder="New Password"
//                 value={formData.newPassword}
//                 onChange={(e) =>
//                   handleInputChange('newPassword', e.target.value)
//                 }
//                 className="bg-secondary"
//                 aria-label="New Password"
//               />
//             </div>

//             <div className="space-y-2">
//               <Input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   handleInputChange('confirmPassword', e.target.value)
//                 }
//                 className="bg-secondary"
//                 aria-label="Confirm New Password"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-end space-x-4 pt-6">
//           <Button variant="outline" onClick={handleCancel} className="px-8">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             className="bg-red-500 hover:bg-red-600 text-white px-8"
//           >
//             Save Changes
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileForm;
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getUserById, updateUserById } from '@/api/auth';
import { useAuth } from '@/context/AuthContext'; // Import the hook

const ProfileForm: React.FC = () => {
  const { userId } = useAuth(); // get userId from context
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
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
        const user = await getUserById(userId);
        const name = user.name || '';
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');

        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: user.email || '',
          address: user.address || '',
        }));
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    console.log('Cancelled changes.');
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('First name, last name, and email are required.');
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert('New password and confirmation do not match.');
      return;
    }

    if (!userId) {
      alert('User ID not available.');
      return;
    }

    try {
      const name = `${formData.firstName} ${formData.lastName}`;
      const payload: any = {
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
    } catch (error: any) {
      console.error('Failed to update user:', error);
      alert(error?.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading || !userId) return <p>Loading profile...</p>;

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <h2 className="text-xl font-semibold text-red-500 mb-6">
        Edit Your Profile
      </h2>

      <div className="space-y-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-secondary"
          />
          <Input
            placeholder="Address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="bg-secondary"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Password Changes</h3>

          <Input
            type="password"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={(e) =>
              handleInputChange('currentPassword', e.target.value)
            }
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
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            className="bg-secondary"
          />
        </div>

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
  );
};

export default ProfileForm;
