import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

 const arr=[
    {
      state:"Gujarat",
      city:{
        city1:"Bhuj",
        city2:"Dwarka"
      }
    },
    {
      state:"Goa",
      city:{
        city1:"Panji",
        city2:"Madgaon"
      }
    },
    {
      state:"Ladakh",
      city:{
        city1:"Barwani",
        city2:"Betul"
      }
    },
    {
      state:"Haryana",
      city:{
        city1:"Bhiwani",
        city2:"hansi"
      }
    },
    {
      state:"Chhattisgarh",
      city:{
        city1:"Raipur",
        city2:"Bilaspur"
      }
    },
  ];

function App() {
//  console.log(arr);
  const[data,setdata]=useState(arr);
  const[stat,setstat]=useState("Gujarat");
  const[city1,setcity1]=useState("Bhuj");
  const[city2,setcity2]=useState("Dwarka");

  let handleselect=function(val){
    console.log("inside");
    console.log(val);
    setstat(val);
    let filteritem=arr.filter((item)=>{
      console.log(item);
      if(item.state==val)
      {
      return(item) ;
      }
    })
    console.log(filteritem);
    setcity1(filteritem[0].city.city1);
    setcity2(filteritem[0].city.city2); 

  }

  useEffect(()=>{
 console.log("inside useeffect",city1,city2);
  },[city1,city2]);


  return (
    <div className="App">
     <h1>React practice</h1>
    <div>
    <select name='state' onChange={(e)=>{handleselect(e.target.value)}}>
      {
        data.map((item,i)=>{
          return(
              <option key={i}>{item.state}</option>
          )
        })
      }a
        </select>
    </div>
    <div>
      <select name='city'>
        <option>{city1}</option>
        <option>{city2}</option>
      </select>
    </div>
    <div>
      <h1> Selected State is: {stat} and Cities in {stat} are:{city1} and {city2}</h1>
    </div>
    </div>
  );
}

export default App;