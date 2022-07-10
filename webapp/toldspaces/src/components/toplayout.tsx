import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';

import Viewport from './viewport';

// @ts-ignore
export default function TopLayout({children, theme}) {

    console.log('TopLayout', theme)
    return (
      <>
          <Viewport>
              <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline/>
                  {children}
              </ThemeProvider>
          </Viewport>
      </>
    );
}