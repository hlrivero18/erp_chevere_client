import type { MenuItem } from '@/features/menu-items/types/menu-items.types';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MenuItemSelectorProps {
  menuItems: MenuItem[];
  selectedItems: number[];
  onSelectionChange: (items: number[]) => void;
}

const MenuItemSelector = ({
  menuItems,
  selectedItems,
  onSelectionChange,
}: MenuItemSelectorProps) => {

  const handleToggle = (menuItemId: number) => {
    const isSelected = selectedItems.includes(menuItemId);

    if (isSelected) {
      onSelectionChange(
        selectedItems.filter(
          (id) => id !== menuItemId
        )
      );

      return;
    }

    onSelectionChange([
      ...selectedItems,
      menuItemId,
    ]);
  };

  return (
    <div className="space-y-3">

      <Label>
        Seleccionar productos
      </Label>

      <div className="space-y-3">

        {menuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            className="flex items-center gap-3"
          >

            <Checkbox
              id={`menu-item-${menuItem.id}`}
              checked={selectedItems.includes(menuItem.id)}
              onCheckedChange={() =>
                handleToggle(menuItem.id)
              }
            />

            <Label
              htmlFor={`menu-item-${menuItem.id}`}
              className="cursor-pointer"
            >
              {menuItem.name}
            </Label>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MenuItemSelector;