import AccountSidebar from '@/components/Account/AccountSidebar';
import ProfileForm from '@/components/Account/ProfileForm';

const AccountLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      <div className="flex">
        <AccountSidebar />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl">
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <span>Home</span>
                <span className="mx-2">/</span>
                <span>My Account</span>
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-foreground">
                  Manage My Account
                </h1>
                <div className="text-sm text-muted-foreground">
                  Welcome!{' '}
                  <span className="text-red-500 font-medium">Md Rimel</span>
                </div>
              </div>
            </div>

            <ProfileForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
