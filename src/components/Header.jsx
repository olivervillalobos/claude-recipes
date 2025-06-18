import chefHatLogo from "../assets/chef-hat.svg"
export default function Header(){
    return(
        <>
        <header className="header-container">
            <nav className="nav-container">
                <img src={chefHatLogo} alt="Chef Hat" className="nav-icon" />
                <h1 className="nav-title">Chef Claude</h1>
            </nav>
        </header>
        </>
    )
}