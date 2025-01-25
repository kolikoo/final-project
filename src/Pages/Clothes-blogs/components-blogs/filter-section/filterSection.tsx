import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import SearchIcon from "@mui/icons-material/Search";

// types/Blog.ts
export interface Blog {
  id: number;
  title: string;
  description: string;
  currency: string;
  image_url: string;
  price: number;
}


interface FilterSectionProps {
  allBlogs: Blog[];
  onFilterChange: (filteredBlogs: Blog[]) => void;
}


const FilterSection: React.FC<FilterSectionProps> = ({
  onFilterChange,
  allBlogs,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortOrder, setSortOrder] = useState<string>("default");

  useEffect(() => {
    const filteredBlogs = allBlogs
      .filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .filter(
        (blog) => blog.price >= priceRange[0] && blog.price <= priceRange[1],
      )
      .sort((a, b) => {
        if (sortOrder === "ascending") return a.price - b.price;
        if (sortOrder === "descending") return b.price - a.price;
        return 0;
      });

    onFilterChange(filteredBlogs);
  }, [searchQuery, priceRange, sortOrder, allBlogs, onFilterChange]);

  return (
    <div
      className="filter-container flex gap-5 py-6 w-[60%] justify-start
    small:w-[160%]
    semismall:w-[130%]
    medium:w-[110%]
    sm:w-[100%]
    semimedium:w-[75%]
    xl:w-[60%]"
    >
      {/* Search */}
      <div className="search-container flex gap-5 py-6 w-[40%]">
        <div className="w-[100%] flex items-center border-[2px] rounded-[40px] h-12 p-3 border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500">
          <SearchIcon className="ml-1" />

          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[100%] h-10 rounded-[10px] dark:border-slate-400 dark:bg-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="w-[30%]">
        <div className="flex justify-center gap-3 items-center mb-2 text-sm">
          <input
            type="number"
            value={priceRange[0]}
            min={0}
            max={priceRange[1]}
            onChange={(e) =>
              setPriceRange([
                Math.max(0, Number(e.target.value)),
                priceRange[1],
              ])
            }
            className="w-17 p-1 border-[2px] rounded-2xl text-center dark:text-black border-[#450920] dark:border-black font-semibold dark:bg-[#C4D7F2]"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            min={priceRange[0]}
            max={5000}
            onChange={(e) =>
              setPriceRange([
                priceRange[0],
                Math.min(5000, Number(e.target.value)),
              ])
            }
            className="w-17 p-1 border-[2px] rounded-2xl text-center dark:text-black border-[#450920] dark:border-black font-semibold dark:bg-[#C4D7F2]"
          />
        </div>
        <ReactSlider
          className="h-2 rounded-full "
          thumbClassName="h-4 w-4 bg-[#450920] rounded-full cursor-pointer dark:bg-[#C4D7F2]"
          renderTrack={(props, state) => {
            const trackStyle =
              state.index === 1
                ? "bg-[#450920]"
                : "bg-gray-200 dark:opacity-10";
            return (
              <div
                {...props}
                className={`h-1 mt-1 rounded-full dark:bg-[#C4D7F2] ${trackStyle}`}
              />
            );
          }}
          min={0}
          max={5000}
          step={0.01}
          value={priceRange}
          onChange={(newRange) => setPriceRange(newRange as [number, number])}
        />
      </div>

      {/* Sort Order */}
      <div className="flex flex-col justify-center textce mb-7">
        <label htmlFor="sortPrice"> Sort By Price</label>
        <select
          value={sortOrder}
          name="sortPrice"
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-[100%] flex items-center border-[2px] rounded-[40px] h-12 p-3 border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500"
        >
          <option value="default">Default</option>
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
