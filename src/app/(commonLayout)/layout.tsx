import RootNavbar from "@/modules/customer/rootpage/navbarAndfooter/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <RootNavbar />
      {children}
    </div>
  );
}
