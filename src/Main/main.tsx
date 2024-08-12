import React, { Component, PropsWithChildren, ReactNode } from "react";
import SectionWithNav from "../Nav/SectionWithNav";
import Footer from "../footer/footer";

interface MainProps  {
  children?: ReactNode;
}

class Main extends Component<MainProps> {
  render() {
    return (
      <>
        <SectionWithNav />
        
          
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              {this.props.children}
            </main>
          
        
        <Footer />
      </>
    );
  }
}

export default Main;
