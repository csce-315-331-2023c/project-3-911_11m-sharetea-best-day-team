import MenuTable from '../components/MenuTable';
import Typography from '@mui/material/Typography';

function Menu() {
    return (
        <>
        <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Menu:
          </Typography>
          <Typography variant="subtitle4" color="textSecondary" gutterBottom>
            Items, prices, and ingredients for each drink
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MenuTable query="SELECT * FROM pricelist ORDER BY itemid;" />
        </div>
        </div>
        </>
        
    );
}


export default Menu;