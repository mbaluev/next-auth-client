'use client';

import {
  ComponentProps,
  createContext,
  ElementRef,
  forwardRef,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '@/core/utils/cn';
import { MEDIA_MD, useMatchMedia } from '@/core/hooks/use-match-media';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useCurrentUser } from '@/core/auth/hooks/use-current-user';
import { useCookies } from 'next-client-cookies';
import { CTree, TTreeDTO } from '@/core/utils/tree';
import { menuTree } from '@/core/settings/menu';
import { Menu } from '@/components/layout/sidebar-menu';
import { usePathname } from 'next/navigation';
import { TRouteDTO } from '@/core/settings/routes';

const SIDEBAR_STORAGE_NAME = 'sidebar';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const SIDEBAR_DEFAULT_OPEN = true;
const SIDEBAR_TRANSITION_DURATION = 200;
const SIDEBAR_EVENT_START = 'sidebar-start';
const SIDEBAR_EVENT_END = 'sidebar-end';

interface SidebarContext<T> {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  data?: CTree<T>;
  toggleNode: (node: TTreeDTO<T>) => void;
}
const SidebarContext = createContext<SidebarContext<TRouteDTO> | null>(null);
function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within a Sidebar.');
  return context;
}

type SidebarProviderBaseProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  collapsed?: boolean;
};
type SidebarProviderProps = ComponentProps<'div'> & SidebarProviderBaseProps;
const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>((props, ref) => {
  const cookies = useCookies();
  let _defaultOpen: any = cookies.get(SIDEBAR_STORAGE_NAME);
  _defaultOpen = _defaultOpen ? _defaultOpen === 'true' : SIDEBAR_DEFAULT_OPEN;

  const {
    open: openProp,
    onOpenChange: setOpenProp,
    defaultOpen = _defaultOpen,
    collapsed,
    className,
    children,
    ..._props
  } = props;
  const isMobile = useMatchMedia(MEDIA_MD);
  const [openMobile, setOpenMobile] = useState(false);
  const pathname = usePathname();

  // internal state of the sidebar.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpenCallback = (value: boolean | ((value: boolean) => boolean)) => {
    const res = typeof value === 'function' ? value(open) : value;
    if (setOpenProp) return setOpenProp?.(res);
    cookies.set(SIDEBAR_STORAGE_NAME, String(res));
    _setOpen(value);
  };
  const setOpen = useCallback(setOpenCallback, [setOpenProp, open, cookies]);

  // toggle the sidebar.
  const toggleCallback = () => {
    window.dispatchEvent(new Event(SIDEBAR_EVENT_START));
    setTimeout(() => {
      window.dispatchEvent(new Event(SIDEBAR_EVENT_END));
    }, SIDEBAR_TRANSITION_DURATION * 2);
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  };
  const toggleSidebar = useCallback(toggleCallback, [isMobile, setOpen, setOpenMobile]);

  // keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // init data
  const [data, setData] = useState<CTree<TRouteDTO>>(menuTree);
  const toggleNodeCallback = (node: TTreeDTO<TRouteDTO>) => {
    const _data = data.clone();
    _data.toggle(node.id);
    setData(_data);
  };
  const toggleNode = useCallback(toggleNodeCallback, []);
  useEffect(() => {
    const _data = data.clone();
    if (collapsed) _data.collapseTo(1);
    setData(_data);
  }, [collapsed]);
  useEffect(() => {
    const _data = data.clone();
    const node = _data.find((d) => d.data?.path === pathname);
    if (node) _data.select(node.id, true);
    else _data.deselect();
    setData(_data);
  }, [pathname]);

  // context value
  const contextValueMemo = (): SidebarContext<TRouteDTO> => ({
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    data,
    toggleNode,
  });
  const contextValue = useMemo<SidebarContext<TRouteDTO>>(contextValueMemo, [
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    toggleNode,
    data,
  ]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className={cn('flex min-h-full relative', className)} ref={ref} {..._props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = 'SidebarProvider';

type SidebarTriggerProps = ComponentProps<typeof Button>;
const SidebarTrigger = forwardRef<ElementRef<typeof Button>, SidebarTriggerProps>((props, ref) => {
  const { onClick, ..._props } = props;
  const { toggleSidebar, isMobile, open, openMobile } = useSidebar();
  const user = useCurrentUser();
  if (!user) return null;
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {..._props}
    >
      {!(isMobile ? openMobile : open) && <ChevronsRight />}
      {(isMobile ? openMobile : open) && <ChevronsLeft />}
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

type SidebarButtonProps = ComponentProps<typeof Button>;
const SidebarButton = forwardRef<ElementRef<typeof Button>, SidebarButtonProps>((props, ref) => {
  const { onClick, children, ..._props } = props;
  const { toggleSidebar, isMobile } = useSidebar();
  const handleClick = (e: any) => {
    if (onClick) onClick(e);
    if (isMobile) toggleSidebar();
  };
  return (
    <Button ref={ref} size="flex-start" onClick={handleClick} {..._props}>
      {children}
    </Button>
  );
});
SidebarButton.displayName = 'SidebarButton';

type SidebarBaseProps = {};
type SidebarProps = ComponentProps<'nav'> & SidebarBaseProps;
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { className, ..._props } = props;
  const { isMobile, open, openMobile, toggleSidebar } = useSidebar();

  const user = useCurrentUser();
  if (!user) return null;

  const classNavDesktop = cn(
    'w-[240px] min-h-full flex-grow-0 flex-shrink-0 flex-basis-auto',
    !open && 'ml-[-240px]'
  );
  const classNavMobile = cn(
    'w-[calc(100%-12px)] max-w-[300px] fixed top-0 bottom-0 z-[10]',
    openMobile ? 'left-0 right-4' : 'left-[-100%] right-[100%]'
  );
  const classNav = cn(
    `transition-all duration-${SIDEBAR_TRANSITION_DURATION}`,
    isMobile ? classNavMobile : classNavDesktop,
    className
  );

  const classDivMobile = cn('h-full shadow-md rounded-r-lg');
  const classDivDesktop = cn('fixed w-[240px] h-full');
  const classDiv = cn(
    'bg-sidebar text-sidebar-foreground',
    isMobile ? classDivMobile : classDivDesktop
  );

  return (
    <Fragment>
      <nav id="_sidebar" className={classNav} ref={ref} {..._props}>
        <div className={classDiv}>
          <Menu />
        </div>
      </nav>
      {isMobile && openMobile && (
        <div
          className={cn('absolute top-0 left-0 w-full h-full z-[9] bg-black/25')}
          onClick={toggleSidebar}
        />
      )}
    </Fragment>
  );
});
Sidebar.displayName = 'Sidebar';

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarButton,
  useSidebar,
  SIDEBAR_EVENT_START,
  SIDEBAR_EVENT_END,
};
