
import "animate.css";
const HomeLoadingPage = () => {
  return (
    <>
      <div className="bg-[#F7F5EB] flex justify-center flex-col items-center h-[100vh] w-[100%] align-middle">
        <div className="flex flex-col align-middle justify-center items-center leading-[120px] animate__animated animate__fadeInDown mb-10">
          <p className="text-[120px] font-bold">Welcome</p>
          <p className="text-[120px] font-bold">To</p>
          <p className="text-[140px] text-[#450920]  font font-[900]">
            THRIFTSHOP
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeLoadingPage;
