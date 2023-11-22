import DatabaseTable from '../components/DatabaseTable';

function Menu() {
    return (
        <>
            <DatabaseTable query="SELECT * FROM pricelist;"/>
        </>
    );
}


export default Menu;