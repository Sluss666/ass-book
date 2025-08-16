import { motion } from "framer-motion"
import AnimatedBlocks from "./AnimatedBlocks"
const RemoveButton = ({onClose}:{onClose: () => void}) => {
  return (
    <>
      <motion.div
        className={`absolute text-center grid cursor-pointer border-r h-[94px] -ms-3 
          border-red-600/20 self-center items-center hover:border-red-400/90 hover:bg-red-500 z-10`}
        initial=
          {{ width: "5%", x: -150}} whileHover={{color:'white'}} animate={{ width: "10%", x: -130, color:'black'}}
        exit=
          {{width: ["10%", "100%", "220%"], x: [-130, 0, 550], backgroundColor: "#ef4444", color:"#ef4444"}}
        transition={{ duration: 0.9 }} onClick={onClose}
      >
        <AnimatedBlocks/>
        <span className=" text-2xl font-sans">&times;</span>
      </motion.div>
    </>
  )
}
export default RemoveButton