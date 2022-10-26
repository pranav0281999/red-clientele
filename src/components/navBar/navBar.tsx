import { IProfileResult } from "../../interfaces/i-profile-service";

interface NavBarProps {
  profile: IProfileResult
}

function Profile({profile}: NavBarProps) {

  return (
    <nav className="w-full text-white flex h-fit flex-row border-x border-y border-solid border-gray-600 justify-between">
      <div className="flex flex-row w-1/2 border-r border-gray-600 justify-center items-center gap-8">
        <p className="text-lg">Home</p>
        <p className="text-lg">Popular</p>
      </div>
      <img className="rounded-full h-16 m-2 bg-black w-16 object-contain" src={profile.snoovatar_img} />
    </nav>
  );
}

export default Profile;
