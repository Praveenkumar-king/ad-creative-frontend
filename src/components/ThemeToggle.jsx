import { useEffect, useState } from "react";

export default function ThemeToggle(){

const [theme,setTheme] = useState("dark");

useEffect(()=>{

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
setTheme(savedTheme);
document.body.className = savedTheme;
}

},[]);

const toggleTheme = ()=>{

const newTheme = theme === "dark" ? "light" : "dark";

setTheme(newTheme);

document.body.className = newTheme;

localStorage.setItem("theme",newTheme);

};

return(

<button
onClick={toggleTheme}
style={{
marginLeft:"20px",
padding:"8px 14px",
borderRadius:"6px",
border:"none",
cursor:"pointer"
}}
>

{theme === "dark" ? "🌙" : "☀️"}

</button>

);

}