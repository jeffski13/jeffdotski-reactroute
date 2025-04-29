import NavigationBar from "./NavigationBar";
import FooterBarski from "./FooterBarski";
import React from 'react';

interface ComponentWithProps {}

const jeffDotSkiPage = <P extends object>(Component: React.ComponentType<P>) =>
  class JeffDotSkiPage extends React.Component<P & ComponentWithProps> {
    render() {
      const { ...props } = this.props;
        return (
          <div id="App" >
              <NavigationBar />
              <div className="webpagecontent">
                <Component {...props} />
              </div>
              <FooterBarski />
          </div>
        )
    }
  }

export default jeffDotSkiPage;