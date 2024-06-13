import useAuth from "../../../../Hooks/useAuth";

const User_Profile = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto my-12 ">
      <div className="flex items-center justify-center text-center h-32">
        <h2 className="font-lora font-medium text-2xl md:text-4xl">
          Welcome back <span className="font-bold">{user?.displayName}</span>
        </h2>
      </div>
      <div className="font-roboto flex-col gap-6 flex items-center justify-center">
        <div>
          <h2 className=" text-xl md:text-3xl font-bold">My Profile</h2>
        </div>
        <div className="space-y-7">
          <div>
            <img
              className="size-30 mx-auto rounded-full p-2 border-4 border-slate-500"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mx-4">
            <h2 className="font-bold md:text-xl">Name :</h2>
            <h2 className="font-bold md:text-xl">{user?.displayName}</h2>
            <h2 className="font-bold md:text-xl">Email :</h2>
            <h2 className="font-bold md:text-xl overflow-auto">{user?.email}</h2>
            <h2 className="font-bold md:text-xl">Number :</h2>
            <h2 className="font-bold md:text-xl">01761624031</h2>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Profile;
