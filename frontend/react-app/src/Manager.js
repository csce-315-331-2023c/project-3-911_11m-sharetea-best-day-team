import ButtonComponent from "./components/ButtonComponent";
import SideNav from "./components/Sidenav";
import logo from './logo.svg';

function Manager() {
    return (
        // Header
        <>
            {/* // Header */}
            <div class='Header'>
                {/* //Share Tea home button */}
                {/* //Good morning text */}
                {/* //Employee Display */}
                <img src={logo} width={150} height={150} className="App-logo" alt="logo" />
            </div>
            {/* // Side bar */}
            <div class='Sidebar' style={{
                display: "flex",
                alignItems: "center"
                }}>
                {/* Cashier Button */}
                <ButtonComponent text='Cashier Home' eventName='eventName'/>
                {/* SideNav for Manager */}
                <SideNav />
            </div>

        {/* // Main display */}
            {/* //Menu, Inventory, Sales Report, Restock, Excess */}

        {/* // Footer */}
            {/* //Accessibility */}
        </>
    );
}

export default Manager;