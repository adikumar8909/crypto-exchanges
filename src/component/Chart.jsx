import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as Chartjs , CategoryScale , LinearScale ,
     PointElement , LineElement , Tooltip ,Title , Legend } from 'chart.js'

Chartjs.register(CategoryScale , LinearScale ,
    PointElement , LineElement , Tooltip ,Title , Legend);

const Chart = ({arr=[],currency,days}) => {

const prices=[];
const date = [];

for (let i = 0; i < arr.length; i++) {
if (days==="24")  date.push(new Date(arr[i][0]).toLocaleTimeString());
 else date.push(new Date(arr[i][0]).toLocaleDateString());
    
    prices.push(arr[i][1]);

} 

console.log(arr);

const  data={

    labels:date,
    datasets:[{
        label: `Price in ${currency}`,
        data:prices, borderColor:"rgb(255,99,132)",
        backgroundColor:"rgba(255,99,132 ,0)"     }]

}

  return (
   
<Line options={{responsive:true}}  


data={data}

/>

)
}

export default Chart
