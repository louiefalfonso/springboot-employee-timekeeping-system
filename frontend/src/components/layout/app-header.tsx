import { SidebarTrigger } from "../ui/sidebar";

interface HeadersProps {
  Title: string;
}

const Headers = ({ Title }: HeadersProps ) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <h1>{Title}</h1>
      </div>
    </header>
  );
};
export default Headers;
