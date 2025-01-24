

type Props = {
  children?: React.ReactNode;
};

const BlogHomeSection: React.FC<Props> = ({ children }) => {
return (
  <section
    className="
    
          BlogHomeSection 
        flex 
        flex-wrap 
        gap-6 
        sm:gap-10 
        lg:gap-14 
        justify-center
        w-full
        small:w-[180%]
        semismall:w-[140%]
        medium:w-[140%]
        xl:w-[100%]
        semimedium:w-[100%]
      "
  >
    {children}
  </section>
);
};

export default BlogHomeSection;