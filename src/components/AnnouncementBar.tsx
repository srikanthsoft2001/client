const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-secondary py-3 px-4 flex justify-center items-center">
      <div className="flex items-center justify-between w-full max-w-7xl">
        {/* Text that truncates on mobile */}
        <div className="flex-1 text-center">
          <span className="hidden md:inline">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
            <span className="font-semibold">ShopNow</span>
          </span>
          <span className="md:hidden max-w-[200px] truncate inline-block">
            Summer Sale - OFF 50%!{' '}
            <span className="font-semibold">ShopNow</span>
          </span>
        </div>

        {/* Language selector */}
        {/* <div className="flex items-center gap-1">
          <span className="sm:inline">English</span>
          <ChevronDown size={16} />
        </div> */}
      </div>
    </div>
  );
};

export default AnnouncementBar;
