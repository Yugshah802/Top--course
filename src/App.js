import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {apiUrl,filterData} from "./data"
import {useState} from "react"
import {useEffect} from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
const App = () => {

  const [courses,setCourses]=useState([]);
  const [loading,Setloading]=useState(false);
  const [category,setCategory]=useState(filterData[0].title);

  async function fetchdata()
  {
    Setloading(true);
    try{
     let response=await fetch(apiUrl);
      const output= await response.json();
      console.log(output.data);
      setCourses(output.data);
    }
    catch(error)
    {
      console.log('hey');
      toast.error("Something Wrong");
    }
    Setloading(false);
  }
  useEffect(() => {
   fetchdata();
  }, [])
  
  
  return (
  <div className="min-h-screen flex-col flex bg-bgDark2">
    <div>
           <Navbar></Navbar>
    </div>
  
  <div className="bg-bgDark2">
  <div>
           <Filter filterData={filterData}
           category={category}
           setCategory={setCategory}></Filter>
    </div>

    <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {

            loading ? (<Spinner />) : (<Cards courses={courses} category={category}/>)

          }
    </div>
  </div>
  </div>
  );
};

export default App;
