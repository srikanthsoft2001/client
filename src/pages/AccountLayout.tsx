import { useEffect, useState } from 'react';
import ProfileForm from '@/components/Account/ProfileForm';
import { AuthProvider } from '@/context/AuthContext';

const AccountLayout: React.FC = () => {
  const [userName, setUserName] = useState<string>('Guest');
  const [_id, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        // Extract name and ID if available
        if (parsed && typeof parsed === 'object') {
          if ('name' in parsed) setUserName(parsed.name);
          if ('_id' in parsed) setUserId(parsed._id);
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  return (
    <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex">
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-12xl">
            <div className="mb-6">
              {/* <div className="flex items-center text-sm text-muted-foreground mb-4">
                <span>Home</span>
                <span className="mx-2">/</span>
                <span>My Account</span>
              </div> */}

              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-foreground">
                  Manage My Account
                </h1>
                <div className="text-sm text-muted-foreground">
                  Welcome!{' '}
                  <span className="text-red-500 font-medium">{userName}</span>
                </div>
              </div>
            </div>

            <AuthProvider>
              <ProfileForm />
            </AuthProvider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
