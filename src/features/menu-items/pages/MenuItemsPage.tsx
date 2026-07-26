import { useEffect, useState } from 'react';
import MenuItemCreateDialog from '../components/MenuItemsCreateDialog';
import MenuItemTable from '../components/MenuItemsTable';

import type { MenuItem } from '../types/menu-items.types';
import { getMenuItemsResponse } from '../api/menu-items.api';

const MenuItemsPage = () => {

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  const loadMenuItems = async () => {
    try {

      const response = await getMenuItemsResponse();
      if(response.success) {
        setMenuItems(response.data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    loadMenuItems();
  }, []);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            Menu
          </h1>

          <p className="text-muted-foreground">
            Gestiona el menu de tu restaurante.
          </p>
        </div>

        <MenuItemCreateDialog />

      </div>

      <MenuItemTable menuItems={menuItems} />

    </div>
  );
};

export default MenuItemsPage;