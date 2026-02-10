import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-none">
      <SmoothScroll>
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
      </SmoothScroll>
    </div>
  );
}
