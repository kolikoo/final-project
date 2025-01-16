

type Props = {
  children?: React.ReactNode;
};

const BlogHomeSection: React.FC<Props> = ({ children }) => {
return <section className="BlogHomeSection flex gap-20 ">{children}</section>;
};

export default BlogHomeSection;