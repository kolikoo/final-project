 import { useNavigate } from "react-router-dom";
import newClothImage from "../../../../images/new clothes images.png"
  import usedClothImage from "../../../../images/used clothes image.png";
 
 
 const HomeSecondArticle:React.FC=()=>{

  const navigate= useNavigate()
  const handleNavigate=(path:string)=>{
   navigate(path)
  }
  return (
    <section className="dark:bg-zinc-900 bg-[#F7F5EB] pb-20 pt-20">
      <div className=" flex items-center  rounded-lg gap-40 justify-center w-[80%] m-auto h-[500px] bg-[#F7F5EB]">
        <div className="dark:bg-[#C3DFE0] bg-[#7E866F] h-[400px] rounded-lg p-3 shadow-lg items-center flex flex-col justify-center transition-transform duration-500 hover:scale-105">
          <div className="flex space-x-4">
            <img
              className="w-30 h-[300px] rounded-lg"
              src={newClothImage}
              alt="newClothImage"
            />
          </div>
          <button
            onClick={() => handleNavigate("NewBlog")}
            className="mt-6 hover:bg-white hover:text-[#7E866F] text-white font-bold py-2 px-4 w-25 m-auto rounded border-2 "
          >
            New
          </button>
        </div>

        <div className="bg-[#7E866F] h-[400px] rounded-lg p-3 shadow-lg items-center flex flex-col justify-center transition-transform duration-500 hover:scale-105">
          <div className="flex space-x-4">
            <img
              className="w-30 h-[300px] rounded-lg"
              src={usedClothImage}
              alt="usedClothImage"
            />
          </div>
          <button
            onClick={() => handleNavigate("UsedBlog")}
            className="mt-6 hover:bg-white hover:text-[#7E866F] text-white font-bold py-2 px-4 w-25 m-auto rounded border-2 "
          >
            Used
          </button>
        </div>
      </div>
    </section>
  );
 }

 export default HomeSecondArticle;