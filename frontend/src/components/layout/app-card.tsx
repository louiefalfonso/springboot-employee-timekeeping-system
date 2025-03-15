import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface CardComponentProps {
  Title: string;
  Description: string;
  children: React.ReactNode;
}

const CardComponent = ({ Title, Description, children }: CardComponentProps ) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Title}</CardTitle>
        <CardDescription>{Description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardComponent