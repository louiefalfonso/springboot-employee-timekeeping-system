import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";


interface HeadersProps {
  Title: string;
}

const Headers = ({ Title }: HeadersProps ) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <h1>{Title}</h1>

        <Button className="mr-3 bg-sky-500 hover:bg-sky-600">Log Out</Button>
      </div>
    </header>
  );
};
export default Headers;
