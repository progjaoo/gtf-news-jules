import { useStation } from '@/contexts/StationContext';

export function AdBanner({ text = "ANUNCIE AQUI" }) {
  const { currentStation } = useStation();

  return (
    <div
      className="
        ad-banner
        w-full max-w-[1250px] h-[177px] mx-auto my-6 
        flex items-center justify-center text-lg font-bold 
        rounded-md cursor-pointer hover:opacity-90 transition-opacity
      "
      style={{
        backgroundColor: currentStation.color,
        color: "#fff"
      }}
    >
      {text}
    </div>
  );
}
