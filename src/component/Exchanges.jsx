import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, Heading, HStack, Image, VStack ,Text } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';



const Exchanges = () => {
 
const[exchanges, setxchanges] = useState([]);
const [loading , setLoading] = useState([true]);
const[error , setError] = useState(false);

useEffect(()=>{
  const fetchExchanges = async () => {
  
    try {
      const {data} = await axios.get(`${server}/exchanges`);
      setxchanges(data);
      setLoading(false);
    
    } catch (error) {
      setError(true);
      setLoading(false);
    }

  };
  fetchExchanges();
}, [] );


if(error) return <ErrorComponent message={"Error during fetching data"}/>


return (
  <Container maxW={"container.xl"}>
  {
loading ? ( <Loader/> ) : (
<>
<HStack wrap={"wrap"} justifyContent={"space-evenly"}>
  {
    exchanges?.map((i) =>(
    <ExchangeCard key={i.id} name={i.name} rank={i.trust_score_rank} img={i.image} url={i.url} />
    ) )
  }
</HStack>
</>
) 
  }
</Container>
)

 }


 const ExchangeCard = ({name,img,rank,url}) => (
  <a href={url} target={"blank"}>

<VStack w={52} p={8} borderRadius={'lg'} shadow={'lg'} margin={4} transition={'all 0.3s'}
css={{
  "&:hover": {transform: "scale(1.1)"}
}}
>

<Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"}/>


<Heading size={"md"} noOfLines={1}>
  {rank}
</Heading>

<Text noOfLines={1}>{name}</Text>

</VStack>


  </a>
 )


export default Exchanges
