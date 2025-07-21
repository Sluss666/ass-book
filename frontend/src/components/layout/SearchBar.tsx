import { HiMagnifyingGlass } from "react-icons/hi2"

const SearchBar = ()=> { 
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }
    return (<form
          onSubmit={(e) => handleSearch(e)}
          className="flex relative top-3 my-auto items-center"
        >
          <input
            type="text"
            className="placeholder-shown::text-slate-200 md:w-auto w-40
              focus:border-b-2 focus:pb-1 focus:duration-[0.1s] focus:-mb-2
              duration-[0.1s] transition-all transition-200
              bg-transparent outline-none text-xl text-white"
            placeholder="Search for something"
          />
          <button type="submit" className="text-white p-2 top-1">
            <HiMagnifyingGlass size={20} />
          </button>
        </form>)
    }
export default SearchBar