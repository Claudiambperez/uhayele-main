//SECTION 


import { NavbarDemo } from "@/components/Navbar"
import Facilities from "./Home/Facilities"
import Features from "./Home/Features"
import Hero from "./Home/Hero"
import Pricing from "./Home/Pricing"
import Testimonial from "./Home/Testimonials"
import { Footer } from "react-day-picker"

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
