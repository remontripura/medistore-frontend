import Footer from "@/modules/customer/rootpage/navbarAndfooter/Footer";
import RootNavbar from "@/modules/customer/rootpage/navbarAndfooter/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <RootNavbar />
      <div className="md:pt-20 pt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}
