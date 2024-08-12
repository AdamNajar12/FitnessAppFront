import { Component, ReactNode } from "react";
import Navbar from "./navbar";
import SectionNavbar from "./sectionNav";


class SectionWithNav extends Component{
render(){
    return(<div className="hero_area">
        <Navbar />
        <SectionNavbar />

    </div>)

}

}
export default SectionWithNav