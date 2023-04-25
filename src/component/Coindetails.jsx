import { Box, Container, HStack, Radio, RadioGroup,
   VStack , Text, Image, StatLabel, 
   StatNumber, Stat, StatHelpText, 
   StatArrow, Badge, Progress, Button 
   } from '@chakra-ui/react'
import React from 'react'
import Loader from './Loader';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';


const Coindetails = () => {

  const[Coins, setCoins] = useState({});
const [loading , setLoading] = useState([true]);
const[error , setError] = useState(false);
const[Page , setPage] = useState(1);
const[currency , setCurrency] = useState("inr");
const[days , setDays] = useState("24h");
const[chartArray , setChartArray] = useState([]);



const currencySymbol = currency === "inr" ? "₹" : currency ==="eur"?"€" : "$";

const btns=["24h" ,"7d" , "14d" , "30d" , "60d","200d","1y" , "max"];

const switchChartStats =(key)=>{

  switch (key) {
    case "24h":
      setDays("1d");
      setLoading(true);
       break;
  
       case "7d":
      setDays("7d");
      setLoading(true);
       break;
  
       case "14d":
      setDays("14d");
      setLoading(true);
       break;
  
       case "30d":
      setDays("30d");
      setLoading(true);
       break;
  
       case "60d":
      setDays("60d");
      setLoading(true);
       break;
  
       case "200d":
        setDays("200d");
        setLoading(true);
         break;

         case "1y":
          setDays("365d");
          setLoading(true);
           break;
        
           case "max":
            setDays("max");
            setLoading(true);
             break;
        
    default:
      setDays("24h");
      setLoading(true);
      break;
  }
   

}

const params = useParams()

useEffect(()=>{
  const fetchCoins = async () => {
  
    try {
      const {data} = await axios.get(`${server}/coins/${params.id}`);

      const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);


      setChartArray(chartData.prices);
      

      setCoins(data);
      setLoading(false);
      console.log(data);
      
     
    
    } catch (error) {
      setError(true);
      setLoading(false);
    }

  };
  fetchCoins();
}, [params.id , currency ,days] );

if(error) return <ErrorComponent message={"Error during fetching data"}/>

  return (
 <Container maxW={'container.xl'}>
{
  loading ? <Loader/>:(
    <>
    <Box borderWidth={'1'} width={'full'} >
<Chart arr={chartArray} currency={currencySymbol} days={days} />
    </Box>

<HStack p={"4"} overflowX={"auto"}>
{
btns.map((i) => (
<Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
)
)
}
</HStack>

    <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
  <HStack spacing={'4'}>
    <Radio  value={'inr'} >₹ INR</Radio>
    <Radio value={'eur'} >€ EUR</Radio>
    <Radio value={'usd'} >$ USD</Radio>
  </HStack>
</RadioGroup>


<VStack spacing={'4'} padding={'16'} alignItems={"flex-start"}>

<Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
last updated on {Date(Coins.market_data.last_updated).split("G")[0]}
</Text>

<Image src={Coins.image.large} w={'16'} h={'16'} objectFit={'contain'} />

<Stat>
  <StatLabel>{Coins.name}</StatLabel>
  <StatNumber>{currencySymbol}{Coins.market_data.current_price[currency]}</StatNumber>
<StatHelpText>
  <StatArrow type={Coins.market_data.price_change_percentage_24h > 0? "increase":"decrease" }  />
  {Coins.market_data.price_change_percentage_24h} %
</StatHelpText>

</Stat>

<Badge fontSize={'2xl'} bgColor={"blackAlpha.800"} color={'white'} >
  {`#${Coins.market_cap_rank}`}
</Badge>

<CustomBar high={`${currencySymbol}${Coins.market_data.high_24h[currency]}`} low={`${currencySymbol}${Coins.market_data.low_24h[currency]}`} />


<Box w={'full'} p={"4"} justifyContent={"center"}>
  <Item tittle={"Max Supply"} value={Coins.market_data.max_supply} />
  <Item tittle={"Circulating Supply"} value={Coins.market_data.circulating_supply} />
  <Item tittle={"Market Cap"} value={`${currencySymbol}${Coins.market_data.market_cap[currency]}`} />
  <Item tittle={"All Time Low"} value={`${currencySymbol}${Coins.market_data.atl[currency]}`} />
  <Item tittle={"All Time High"} value={`${currencySymbol}${Coins.market_data.ath[currency]}`} />

</Box>

</VStack>

    </>
  )
}
 </Container>
  )
}

const Item=({tittle,value})=>(
<HStack justifyContent={"space-between"} w={'full'} my={"4"} >
  <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"} >{tittle}</Text>
  <Text>{value}</Text>
</HStack>
)

const CustomBar = ({high,low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={"space-between"} w={'full'} ></HStack>
    <Badge children={low} colorScheme={"red"} />
    <Text fontSize={'sm'}>24H Range</Text>
    <Badge children={high} colorScheme={"green"}/>
  </VStack>
)

export default Coindetails
