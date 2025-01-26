type Props = {
  children?: React.ReactNode;
};
const MainBlogCards: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="
        grid 
        grid-cols-1
        small:grid-cols-2
        semismall:grid-cols-2 
        sm:grid-cols-3
        lg:grid-cols-4 
        gap-4 
        w-full
        
      "
    >
      {children}
    </div>
  );
};

export default MainBlogCards;
