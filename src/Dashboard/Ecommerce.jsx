import { useState}  from "react";

function Ecommerce() {
  const [search, setSearch] = useState(0);    
  const HandelSearch = async()=>{
    const response =await fetch("https://dummyjson.com/products");
    const result = await response.json();
    console.log(result);
  }

  return(
    <>
    <div>
        <input type="text" value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
        <button onClick={HandelSearch}>Search</button>
        
    </div>
    </>
  );
}
export default Ecommerce;