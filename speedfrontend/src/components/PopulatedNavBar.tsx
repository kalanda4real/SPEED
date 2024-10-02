import NavBar from "@/components/nav/NavBar"
import NavItem from "./nav/NavItem";


const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem route="/" end>SPEED</NavItem>
      <NavItem route="/articles">View articles</NavItem>
      <NavItem route="/articles/new">Submit new</NavItem>
      <NavItem route="/articles/admin"> Admin View Demo</NavItem>
      
    </NavBar>
  );
};

export default PopulatedNavBar;
