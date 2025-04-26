'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/core/auth/hooks/use-current-user';
import { SidebarButton, useSidebar } from '@/components/layout/sidebar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/layout/logo';
import { ChevronRight, X } from 'lucide-react';
import { TTreeDTO } from '@/core/utils/tree';
import { Fragment } from 'react';
import { cn } from '@/core/utils/cn';
import { TRouteDTO, IS_PATH, ROUTES } from '@/core/settings/routes';

const MENU_PADDING_ITEM = 15;
const MENU_TRANSITION_DURATION = 100;

interface IMenuItemProps<T> {
  node: TTreeDTO<T>;
}

const MenuItemPadding = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  if (!node.state.level || node.state.level <= 1) return null;
  return <div style={{ width: `${(node.state.level - 1) * MENU_PADDING_ITEM}px` }} />;
};
MenuItemPadding.displayName = 'MenuItemPadding';

const MenuItemContent = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  const classNameChevron = cn(
    `transition-all transform duration-${MENU_TRANSITION_DURATION}`,
    !node.state.collapsed && 'rotate-90'
  );
  return (
    <Fragment>
      {node.data?.icon}
      <p className="flex-1 text-left">{node.data?.label}</p>
      {node.items.length > 0 && <ChevronRight className={classNameChevron} />}
    </Fragment>
  );
};
MenuItemContent.displayName = 'MenuItemContent';

const MenuItem = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  const { toggleNode } = useSidebar();

  if (!node.data) return null;

  // item toggle
  if (!IS_PATH(node.data.path)) {
    const handleToggle = () => toggleNode(node);
    return (
      <div className="flex">
        <MenuItemPadding node={node} />
        <Button
          size="flex-start"
          variant={node.state.selected ? 'sidebar' : 'ghost'}
          className="flex-1"
          onClick={handleToggle}
        >
          <MenuItemContent node={node} />
        </Button>
      </div>
    );
  }

  // item link
  return (
    <div className="flex">
      <MenuItemPadding node={node} />
      <SidebarButton variant={node.state.selected ? 'sidebar' : 'ghost'} className="flex-1" asChild>
        <Link href={node.data.path}>
          <MenuItemContent node={node} />
        </Link>
      </SidebarButton>
    </div>
  );
};
MenuItem.displayName = 'MenuItem';

const Menu = () => {
  const user = useCurrentUser();
  const { toggleSidebar, data } = useSidebar();
  if (!user) return null;
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 p-4 justify-between">
        <SidebarButton asChild variant="ghost" className="flex-1">
          <Link href={ROUTES.HOME.path}>
            <Logo className="w-6 h-6" />
            <p>{process.env.APP_NAME}</p>
          </Link>
        </SidebarButton>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <X />
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-4 p-4">
        {data
          ?.flat()
          ?.filter((d) => !d.state.hidden)
          .map((node, index) => <MenuItem key={index} node={node} />)}
      </div>
    </div>
  );
};
Menu.displayName = 'Menu';

export { Menu };
