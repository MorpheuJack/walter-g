export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="pt-0">{children}</main>
    </div>
  );
}
