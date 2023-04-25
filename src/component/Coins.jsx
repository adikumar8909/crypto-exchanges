import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container,  HStack,  Button, RadioGroup , Radio } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';



const Coins = () => {
 
const[Coins, setCoins] = useState([]);
const [loading , setLoading] = useState([true]);
const[error , setError] = useState(false);
const[Page , setPage] = useState(1);
const[currency , setCurrency] = useState("inr");

const currencySymbol = currency === "inr" ? "₹" : currency ==="eur"?"€" : "$";


const ChangePage = (Page) => {

  setPage(Page);
setLoading(true);

}

const btns = new Array(132).fill(1)

useEffect(()=>{
  const fetchCoin = async () => {
  
    try {
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${Page}`);
      setCoins(data);
      setLoading(false);
      
     
    
    } catch (error) {
      setError(true);
      setLoading(false);
    }

  };
  fetchCoin();
}, [currency , Page] );


if(error) return <ErrorComponent message={"Error during fetching data"}/>


return (
  <Container maxW={"container.xl"}>
  {
loading ? ( <Loader/> ) : (
<>

<RadioGroup value={currency} onChange={setCurrency} p={'8'}>
  <HStack spacing={'4'}>
    <Radio  value={'inr'} >₹ INR</Radio>
    <Radio value={'eur'} >€ EUR</Radio>
    <Radio value={'usd'} >$ USD</Radio>
  </HStack>
</RadioGroup>
{/* const currencySymbol = currency === "inr" ? "₹" : currency ==="eur"?"€" : "$"; */}
<HStack wrap={"wrap"} justifyContent={'space-evenly'}>
  {
    Coins?.map((i) =>(
    <CoinCard key={i.id} id={i.id} name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
    ) )
  }
</HStack>

<HStack w={'full'} overflowX={"auto"} p={"8"}>

{
  btns.map((item,index)=>(
    <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>ChangePage(index+1)}>
    {index+1}
  </Button>
  ))
  
}

</HStack>

</>
) 
  }
</Container>
)

 }





export default Coins
