import { ExamPageClient } from "./ExamPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamPageRoute({ params }: PageProps) {
  const { id } = await params;
  return <ExamPageClient id={id} />;
}

export async function generateStaticParams() {
  // For static export, we'll generate paths for a few example exam IDs
  return [
    { id: 'exam_1' },
    { id: 'exam_2' },
    { id: 'exam_3' }
  ];
}