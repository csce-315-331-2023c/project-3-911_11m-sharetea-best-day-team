import DatabaseTable from '../components/DatabaseTable';

function Inventory() {
    return (
        <>
            <DatabaseTable query="SELECT * FROM inventory ORDER BY ingredient;"/>
        </>
    );
}


export default Inventory;