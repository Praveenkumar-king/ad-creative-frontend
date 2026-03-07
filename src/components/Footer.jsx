import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer(){

return(

<footer className="footerMain">

<div className="footerContainer">

{/* LOGO */}

<div className="footerBrand">

<h2>AdVantage Gen</h2>

<p>
AI powered ad creative generator for startups,
marketers and creators.
</p>

</div>


{/* PRODUCT */}

<div className="footerLinks">

<h3>Product</h3>

<Link to="/">Home</Link>
<Link to="/dashboard">Dashboard</Link>
<Link to="/gallery">Campaign Gallery</Link>
<Link to="/subscription">Pricing</Link>

</div>


{/* COMPANY */}

<div className="footerLinks">

<h3>Company</h3>

<Link to="/">About</Link>
<Link to="/">Contact</Link>
<Link to="/">Careers</Link>
<Link to="/">Privacy Policy</Link>

</div>


{/* SOCIAL */}

<div className="footerLinks">

<h3>Follow Us</h3>

<a href="#">LinkedIn</a>
<a href="#">Twitter</a>
<a href="#">GitHub</a>
<a href="#">Instagram</a>

</div>

</div>


{/* BOTTOM */}

<div className="footerBottom">

<p>

© {new Date().getFullYear()} AdVantage Gen. All Rights Reserved.

</p>

<p>

This website is intended for AI creative generation platform users.

</p>

</div>

</footer>

);

}