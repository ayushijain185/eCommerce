import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";
const Layout = ({children,title="Innovation Mart",description="Innovation mart of electronic gadget such as phone , earbuds ,laptop , tablets and all the electronic items",keywords="mern stack project , Smartphones,Laptops,Tablets,Smartwatches, Headphones,Earbuds,Bluetooth ,Speakers, Home Theater Systems, Smart TVs, Gaming Consoles,Digital Cameras,Apple,Samsung,Sony,LG,Microsoft,Dell,HP,Lenovo,Asus,Bose",author="Ayushi Jain"}) => {
  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description}/>
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author}/>
          <title>{title}</title>
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Header />
      <main style={{minHeight:"72vh"}}>
        <Toaster />{children}</main>
      <Footer />
    </>
  )
}

export default Layout
