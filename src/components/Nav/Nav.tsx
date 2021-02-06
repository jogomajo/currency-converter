import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, Tab, Container, makeStyles } from '@material-ui/core';
import { Timeline, Repeat } from '@material-ui/icons';

const useStyles = makeStyles({
  containerRoot: {
    maxWidth: '100vw',
    backgroundColor: '#282c34',
    boxShadow: '0 8px 6px -6px #333',
    position: 'relative',
    zIndex: 1,
  },
  tabRoot: {
    fontWeight: 700,
    color: '#aaa',
  },
  tabSelected: {
    color: 'orange',
  },
  tabsRoot: {
    maxWidth: 600,
    margin: '0 auto',
  },
  tabsIndicator: {
    backgroundColor: 'orange',
  },
});

const Nav: React.FC = () => {
  const [value, setValue] = useState(0);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  return (
    <Container
      classes={{
        root: classes.containerRoot,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        classes={{
          root: classes.tabsRoot,
          indicator: classes.tabsIndicator,
        }}
      >
        <Tab
          icon={<Repeat />}
          label="CONVERT"
          classes={{
            root: classes.tabRoot,
            selected: classes.tabSelected,
          }}
          component={Link}
          to="/converter"
        />

        <Tab
          icon={<Timeline />}
          label="CHARTS"
          classes={{
            root: classes.tabRoot,
            selected: classes.tabSelected,
          }}
          component={Link}
          to="/charts"
        />
      </Tabs>
    </Container>
  );
};

export default Nav;
