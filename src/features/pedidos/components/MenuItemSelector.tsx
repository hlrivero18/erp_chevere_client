import type { MenuItem } from '@/features/menu-items/types/menu-items.types';
import type { MenuItemFormData } from '../types/pedidos.types';

import { Input } from '@/components/ui/input';
import { Check, Plus, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMenuItemsResponse } from '@/features/menu-items/api/menu-items.api';

interface MenuItemSelectorProps {
  selectedItems: MenuItemFormData[];
  onSelectionChange: (items: MenuItemFormData[]) => void;
}

const MenuItemSelector = ({
  selectedItems,
  onSelectionChange,
}: MenuItemSelectorProps) => {

  const [page] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data,
    // isLoading,
    // isError,
    // error
  } = useQuery({
    queryKey: ['menu-items', page, searchTerm],
    queryFn: () => getMenuItemsResponse(page, searchTerm),
  });

  const menuItems = data?.data.data ?? [];

  const handleToggle = (menuItem: MenuItem) => {
    const isSelected = selectedItems.find((item) => item.id === menuItem.id);

    if (isSelected) {
      onSelectionChange([
        ...selectedItems.map((item) => item.id === menuItem.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      ])
      return;
    }

    onSelectionChange([
      ...selectedItems,
      {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        cantidad: 1,
        total: menuItem.price,
        subTotal: menuItem.price,
      }
    ]);
  };

  return (
    <div className="space-y-3">
      <div className='relative'>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
        <Input
          type='search'
          placeholder='buscar menu por nombre...'
          className='pl-9 text-sm'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1 mt-2 h-[200px]">
        <div className="space-y-1.5 pr-2">
          {menuItems.map((menuItem) => {

            const isSelected = selectedItems.filter((item) => item.id === menuItem.id)[0];

            return (
              <div
                key={menuItem.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-all group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{menuItem.name}</span>
                    {menuItem && (
                      <Badge className="text-[10px] px-1.5 py-0 font-normal">
                        Categoria
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 font-mono">
                    ${menuItem.price}
                  </p>
                </div>
                <Button
                  size='sm'
                  variant={selectedItems ? "secondary" : "outline"}
                  onClick={() => handleToggle(menuItem)}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Añadido ({isSelected.cantidad})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Añadir</span>
                    </>
                  )}
                </Button>
              </div>
            )
          })}

        </div>
      </ScrollArea>


    </div>
  );
};

export default MenuItemSelector;