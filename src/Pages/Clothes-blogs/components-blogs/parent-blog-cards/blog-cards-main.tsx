import { useNavigate } from "react-router-dom";

type Props={

  children?: React.ReactNode;
}

const MainBlogCards:React.FC<Props>=({children})=>{

 return (
   <div
  
     className="flex-col  grid grid-cols-4 gap-[30px]"
   >
     {children}
   </div>
 );
}


export default MainBlogCards