export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="pt-20">{children}</main>
    </div>
  );
}
