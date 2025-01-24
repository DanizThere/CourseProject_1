import "./Button.css";

export default function Button({children, onClick, type}){
    return <button className="button" onClick={onClick} type={type}>{children}</button>
}