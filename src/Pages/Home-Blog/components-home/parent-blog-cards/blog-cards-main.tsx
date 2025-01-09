type Props={

  children?: React.ReactNode;
}

const MainBlogCards:React.FC<Props>=({children})=>{
 return(
        <div className=" flex flex-col gap-5">
         {children}
        </div>
  
 )
}


export default MainBlogCards