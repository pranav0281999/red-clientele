import { IProfileResult } from "../../interfaces/i-profile-service";

interface NavBarProps {
  profile: IProfileResult
}

function Profile({profile}: NavBarProps) {

  return (
    <div className="w-full bg-blue-300 flex h-fit justify-between items-center">
      <div className="p-2 flex flex-row">
        <p className="text-lg p-2">Home</p>
        <p className="text-lg p-2">Popular</p>
      </div>
      <img className="rounded-full h-16 m-2 bg-black w-16 object-contain" src={profile.snoovatar_img} />
    </div>
  );
}

export default Profile;
