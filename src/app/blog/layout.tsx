import Header from '@/components/header';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      <main>{children}</main>
    </div>
  );
}
