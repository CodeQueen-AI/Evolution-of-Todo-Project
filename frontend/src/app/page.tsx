'use client'
import { Navbar } from '@/components/Navbar'
import Home  from '@/components/Home'
import Feature from '@/components/Features'
import Footer from '@/components/Footer'

export default function page() {
  return (
    <div>
    <Navbar/>
    <Home/>
    <Feature/>
    <Footer/>
    </div>
  );
}
