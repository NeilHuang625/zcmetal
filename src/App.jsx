import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import GetQuote from "./components/GetQuote.jsx";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Work from "./components/Work.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <GetQuote />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
