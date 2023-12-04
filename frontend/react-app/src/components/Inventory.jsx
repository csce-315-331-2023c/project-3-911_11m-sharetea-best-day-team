import DatabaseTable from '../components/DatabaseTable';
import Typography from '@mui/material/Typography';

function Inventory() {
    return (
        <>
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h3" gutterBottom>
                Inventory:
              </Typography>
              <Typography variant="subtitle4" color="textSecondary" gutterBottom>
                Keep track of stock and change ingredients
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DatabaseTable query="SELECT * FROM inventory ORDER BY ingredient;"/>
            </div>
        </div>
        </>
    );
}


export default Inventory;