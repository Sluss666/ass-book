import { motion } from "framer-motion"

const AnimatedBlocks = () => {
  return (
    <>
      <motion.div
          className="absolute bg-black h-[94px] "
          initial={{ width: "0%", x: -150 }}
          animate={{ width: "10%", x: -150 }}
          exit={{
            width: ["10%", "95%", "100%"],
            x: -420,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute bg-black h-[94px] grid items-center "
          initial={{ width: "5%", x: -150 }}
          animate={{ width: "5%", x: -130 }}
          exit={{
            width: ["10%", "100%", "300%"],
            x: [-130, 0, 350],
            backgroundColor: "#ef4444",
            color: "#fff",
          }}
          transition={{ duration: 0.8, ease:'easeInOut' }}
        >        <span className="absolute text-5xl font-sans left-[50%]">&times;</span>
</motion.div>
    </>
  )
}

export default AnimatedBlocks