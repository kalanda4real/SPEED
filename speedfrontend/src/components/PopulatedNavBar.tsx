import NavBar from "@/components/nav/NavBar";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem route="/" end>
        SPEED
      </NavItem>
      <NavItem route="/articles/new">Submit new</NavItem>
      <NavItem route="/admin/adminhome"> Admin View Demo</NavItem>
      <NavItem route="/mod"> Moderator View Demo</NavItem> 
      <NavItem route="/Searcher/searchpage"> View/Search Demo</NavItem>
      <NavItem route="/analyst/Home">Analyst View</NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
