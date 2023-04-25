import { Avatar, Box, Stack, VStack ,Text } from '@chakra-ui/react'
import React from 'react'
import avatarimg from '../assets/mypic.jpeg'


const Footer = () => {
  return (
   <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} min={"48"} p={"16"} paddingY={["16","8"]} >


<Stack direction={['column','row']} h={"full"} alignItems={"center"} >

<VStack w={'full'} alignItems={['center' , 'flex-start']} >
<Text fontWeight={"bold"}>About Us</Text>
<Text fontSize={'sm'} letterSpacing={"widest"} textAlign={["center","left"]} >
    Bext Crypto App..... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo vel soluta eum architecto! Ratione pariatur molestiae assumenda molestias? Voluptatibus quia voluptatum sunt delectus deserunt a esse vitae officia ad beatae?</Text>
</VStack>

<VStack>
    <Avatar boxSize={"28"} marginTop={['4','0']} src={avatarimg} />
    <Text>Our Founder</Text>
</VStack>

</Stack>

   </Box>
  )
}

export default Footer
