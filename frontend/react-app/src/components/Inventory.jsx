import DatabaseTable from '../components/DatabaseTable';
import Typography from '@mui/material/Typography';

/**
 * Renders the Inventory component.
 * This component displays a table of inventory items and their counts.
 * @author Thomas Zheng
 * 
 * @returns {JSX.Element} The rendered Inventory component.
 */
function Inventory() {
    return (
        <>
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h3" component="p" gutterBottom>
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