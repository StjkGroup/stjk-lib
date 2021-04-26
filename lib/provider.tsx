/**
 * Created by feichongzheng on 16/12/18.
 */
import React from 'react';
import {RecoilRoot} from 'recoil';
import { SnackbarProvider } from 'notistack';

const Provider = ({children}: any) => {
  return (
    <RecoilRoot>
      <SnackbarProvider maxSnack={3}>
        {children}
      </SnackbarProvider>
    </RecoilRoot>
  )
}

export default Provider;
