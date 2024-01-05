import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const CATEGORIES = ["men", "women"];

export default function CategoryPage({ params }: Readonly<Props>) {
  const { id } = params;
  if (!CATEGORIES.includes(id)) {
    notFound();
  }
  return (
    <div>
      <h1>Category Page</h1>
    </div>
  );
}
