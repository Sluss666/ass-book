import { HiMagnifyingGlass } from "react-icons/hi2";
import { motion } from 'framer-motion';
import { useState } from "react";

const SearchBar = () => { 
  const [show, setShow] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex z-[1] max-w-[20%] relative top-3 my-auto items-center"
    >
      <motion.div
        layout
        className="flex items-center overflow-hidden"
        transition={{ duration: 0.3 }}
      >
        {/* Input siempre existe, pero se expande/colapsa */}
        <motion.input
          type="text"
          placeholder="Search for somethin'"
          className="bg-transparent outline-none text-xl text-white placeholder:text-slate-200
                     border-b border-white/50"
          animate={{
            width: show ? 180 : 0,
            opacity: show ? 1 : 0,
            marginRight: show ? 8 : 0
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Botón siempre visible */}
        <motion.button
          type="button"
          className="text-white p-2"
          onClick={() => setShow(!show)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <HiMagnifyingGlass size={20} />
        </motion.button>
      </motion.div>
    </form>
  );
};

export default SearchBar;
