import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
   const [menuItems, setMenuItems] = useState([]);

   useEffect(() => {
      async function fetchMenuItems() {
         try {
            const response = await axios.get('http://localhost:3001/menu-items');
            setMenuItems(response.data);
         } catch (error) {
            console.error('Error fetching menu items:', error);
         }
      }

      fetchMenuItems();
   }, []);

   return (
      <div>
         <h2>Menu Items</h2>
         <ul>
            {menuItems.map(item => (
               <li key={item.itemid}>
                  {item.itemname} - ${item.itemprice}
               </li>
            ))}
         </ul>
         {/* Add other components or functionalities here, e.g., add, update, delete menu items */}
      </div>
   );
}

export default Menu;
