import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface HeadersProps {
  children: React.ReactNode;
}

const Headers = ({ children }: HeadersProps ) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {children}
      </div>
    </header>
  );
};
export default Headers;
