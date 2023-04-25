import React from 'react'
import { HStack ,Button  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
   <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}  >
<Link to="/"><Button varient={"unstyled"} color={"white"}  bgColor={"blackAlpha.900"}>
  Home
</Button></Link>

<Link to="/Exchanges"><Button varient={"unstyled"} color={"white"} bgColor={"blackAlpha.900"}>
 Exchanges
</Button></Link>

<Link to="/coins"><Button varient={"unstyled"} color={"white"}  bgColor={"blackAlpha.900"}>
  Coins
</Button></Link>

<Button varient={"unstyled"} color={"white"}  bgColor={"blackAlpha.900"}  > 
<a target={'_blank'} rel={'noreferrer'} href="https://instagram.com/mauryaadityakumar" >
Social Acc </a>  </Button>

   </HStack>
  )
}

export default Header
