import { useContext } from 'react';

import { DrawerName, editor } from '../Editor';
import { ChooseNodeDrawer } from './ChooseNode/ChooseNode';
import { insertConditionalData, insertStartData } from './InsertData/InsertData';

export type CommonDrawerProps = {
  id?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const drawers = {
  [DrawerName.newNode]: ChooseNodeDrawer,
  [DrawerName.insertStartData]: insertStartData,
  [DrawerName.insertConditionalData]: insertConditionalData,
  [DrawerName.insertEndData]: insertStartData,
} satisfies Record<DrawerName, (props: never) => JSX.Element>;

export const CurrentDrawer = () => {
  const { drawerName, drawerProps } = useContext(editor);
  const Drawer = drawers[drawerName];

  return <Drawer key={drawerProps.id} {...drawerProps} />;
};
