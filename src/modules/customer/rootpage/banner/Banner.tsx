import MainContainer from "@/components/shared/mainContainer/MainContainer";

export default function Banner() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/banner.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <MainContainer>
        <div className="relative z-10 flex items-center justify-center h-50">
          <div className="max-w-xl text-white flex flex-col justify-center items-center h-full ">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Medistore</h1>
            <p className="text-base md:text-lg text-gray-200 text-center">
              Your trusted online medicine store. Get authentic medicines,
              healthcare products, and fast delivery right at your doorstep.
            </p>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
