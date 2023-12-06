import MenuTable from '../components/MenuTable';
import Typography from '@mui/material/Typography';

/**
 * Renders the Menu component.
 * @author Amber Cheng
 * @returns {JSX.Element} The rendered Menu component.
 */
function Menu() {
    return (
        <>
        <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" component="p" gutterBottom>
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