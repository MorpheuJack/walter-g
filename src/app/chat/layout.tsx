import Header from '@/components/header';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <main className="pt-24">{children}</main>
    </div>
  );
}
