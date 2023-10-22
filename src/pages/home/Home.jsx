import { useDispatch } from "react-redux"
import Filter from "../../components/filter/Filter"
import Herosection from "../../components/herosection/Herosection"
import Productcard from "../../components/productcard/Productcard"
import Testimonial from "../../components/testimonial/Testimonial"

const Home = () => {
  return (
    <div className="Home">
      <Herosection/>
      <Filter/>
      <Productcard/>
      <Testimonial/>
    </div>
  )
}

export default Home
