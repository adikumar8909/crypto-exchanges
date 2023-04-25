import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcimg from '../assets/btc2.jpg'
import { motion } from 'framer-motion'


const Home = () => {
  return (
   <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"} >


<motion.div style={{height:'80vh'}} animate={{translateY:'20px'}} transition={{duration:'2', repeat:'infinity' , repeatType:'reverse' }} >
<Image w={"full"} h={"full"} objectFit={"cover"}  src={btcimg}  />




<Text fontSize={"6xl"}  textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.900"}
marginTop={"-40%"} 
>

Crypto

</Text>
</motion.div>

   </Box>
  )
}

export default Home
