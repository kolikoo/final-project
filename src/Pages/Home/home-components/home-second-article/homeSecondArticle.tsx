 import { useNavigate } from "react-router-dom";
import newClothImage from "../../../../images/new clothes images.png"
  import usedClothImage from "../../../../images/used clothes image.png";
 
 
 const HomeSecondArticle:React.FC=()=>{

  const navigate= useNavigate()
  const handleNavigate=(path:string)=>{
   navigate(path)
  }
  return (
    <section>
      <div className=" flex items-center  rounded-lg gap-40 justify-center w-[80%] m-auto h-[500px] bg-[#6BC785]">
        <div className="bg-green-900 h-[400px] rounded-lg p-3 shadow-lg items-center flex flex-col justify-center transition-transform duration-500 hover:scale-105">
          <div className="flex space-x-4">
            <img
              className="w-30 h-[300px] rounded-lg"
              src={newClothImage}
              alt="newClothImage"
            />
          </div>
          <button
            onClick={() => handleNavigate("NewBlog")}
            className="mt-6 hover:bg-green-700 text-white font-bold py-2 px-4 w-25 m-auto rounded border-2 border-green-700"
          >
            New
          </button>
        </div>

        <div className="bg-green-900 h-[400px] rounded-lg p-3 shadow-lg items-center flex flex-col justify-center transition-transform duration-500 hover:scale-105">
          <div className="flex space-x-4">
            <img
              className="w-30 h-[300px] rounded-lg"
              src={usedClothImage}
              alt="usedClothImage"
            />
          </div>
          <button
            onClick={() => handleNavigate("UsedBlog")}
            className="mt-6 hover:bg-green-700 text-white font-bold py-2 px-4 w-25 m-auto rounded border-2 border-green-700"
          >
            Used
          </button>
        </div>
      </div>
    </section>
  );
 }

 export default HomeSecondArticle;