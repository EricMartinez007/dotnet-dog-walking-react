import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <Navbar color="light" expand="md">
          <NavbarBrand href="/">🐕‍🦺 🐩 DeShawn's Dog Walking</NavbarBrand>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/dogs">Dogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/walkers">Walkers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cities/add">Cities</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Outlet />
      </>
    </div>
  );
}

export default App;
