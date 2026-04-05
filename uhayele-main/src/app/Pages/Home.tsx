//SECTION 

import Footer from "../Components/Footer"
import { NavbarDemo } from "../Components/Navbar"
import Facilities from "./Home/Facilities"
import Features from "./Home/Features"
import Hero from "./Home/Hero"
import Pricing from "./Home/Pricing"
import Testimonial from "./Home/Testimonials"

const LandingPage = () => {
  return (
    <>
     <NavbarDemo />
     <Hero />
     <Facilities />
     <Features />
     <Pricing />
     <Testimonial />   
     <Footer/>  
    </>
  )
}

export default LandingPage
