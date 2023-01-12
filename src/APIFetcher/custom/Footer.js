import CustomHook from "./custom-hook";
function Footer(){
    const counter=CustomHook()
    return (<div className="container"><h2>You are in Footer Counter: {counter}</h2></div>)
}
export default Footer;