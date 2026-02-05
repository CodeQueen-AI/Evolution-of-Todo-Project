'use client'
// import Navbar from '../components/layout/Navbar'
import { Navbar } from '@/components/Navbar'
import Home  from '@/components/Home'
import Feature from '@/components/Features'
import Footer from '@/components/Footer'

export default function page() {
  return (
    <div>
    {/* <h1>Hello World</h1> */}
    <Navbar/>
    <Home/>
    <Feature/>
    <Footer/>
    </div>
  );
}
