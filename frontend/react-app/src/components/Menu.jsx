import MenuTable from '../components/MenuTable';

function Menu() {
    return (
        <>
            <MenuTable query="SELECT * FROM pricelist ORDER BY itemid;"/>
        </>
    );
}


export default Menu;