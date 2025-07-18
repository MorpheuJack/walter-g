import Header from '@/components/header';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="pt-20">{children}</main>
    </div>
  );
}