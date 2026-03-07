import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBG(){

const particlesInit = useCallback(async (engine)=>{
await loadFull(engine);
},[]);

return(

<Particles
id="tsparticles"
init={particlesInit}

options={{

background:{
color:{
value:"#0f172a"
}
},

fpsLimit:60,

particles:{

number:{
value:60
},

color:{
value:"#38bdf8"
},

links:{
enable:true,
color:"#38bdf8",
distance:150
},

move:{
enable:true,
speed:1
},

opacity:{
value:0.5
},

size:{
value:3
}

}

}}

style={{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
zIndex:-1
}}

/>

);

}