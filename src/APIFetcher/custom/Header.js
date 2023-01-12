import CustomHook from "./custom-hook";
function Header(){
    const counter=CustomHook(true);
    return (<div className={`modal-header dropdown-header`} style={{border:"2px solid"}}>
        <div className="container"><h2>You are in Header Counter: {counter}</h2></div>
    </div>)
}
export default Header;