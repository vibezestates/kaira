import kairaLogo from '../assets/images/kaira-logo-light.webp';

export default function Logo() {
  return (
    <div className="flex justify-center items-center bg-[#104D39] p-2">
      <img
        src={kairaLogo}
        alt="Kaira Logo"
        className="h-25 sm:h-30 md:h-40 lg:h-50 w-auto object-contain"
      />
    </div>
  );
}
