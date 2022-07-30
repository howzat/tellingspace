import {navigate} from "gatsby";
import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Box from "@mui/material/Box";
import {useAllLocations} from "../hooks/use-locations";
import {MenuItem} from "@mui/material";

export type NavigationProps = {
    links: Array<LinkData>;
}

export type LinkData = {
    linkText: string;
    text: string;
    to: string;
}

export const Navigation = ({links}: NavigationProps): JSX.Element => {

    let set = new Set<LinkData>();
    set.add({to: "/", text: "Home", linkText: "Home"})
    set.add({to: "/map", text: "Map", linkText: "Map"})
    links.forEach(l => set.add(l))
    let newLinks = Array.from(set.values())
    newLinks.sort().reverse()

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${newLinks[selectedIndex].text}`);
        return navigate(`${newLinks[selectedIndex].to}`)
    };

    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
      <React.Fragment>
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button"
                       sx={{flexDirection: 'column-reverse'}}>
              <Box sx={{display: 'flex', alignItems: 'flex-end', flexWrap: 'nowrap'}}>
                  <Button onClick={handleClick}>{newLinks[selectedIndex].linkText}</Button>
                  <Button
                    size="medium"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                      <ArrowDropDownIcon/>
                  </Button>
              </Box>
          </ButtonGroup>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
              {({TransitionProps, placement}) => (
                <Grow
                  {...TransitionProps}
                  style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList data-testid="links" id="split-button-menu" autoFocusItem>
                                {newLinks.map((option, index) => (
                                  <MenuItem
                                    dense={true}
                                    key={option.to}
                                    // disabled={index === selectedIndex}
                                    // selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                  >
                                      {option.linkText}
                                  </MenuItem>
                                ))
                                }
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
              )}
          </Popper>
      </React.Fragment>
    );
}
export const NewNavigationFromLocationsQuery = (): JSX.Element => {
    let nodes: Array<Queries.LocationsJson> = useAllLocations();
    console.log('NewNavigationFromLocationsQuery', nodes)

    let links = nodes.map((node) => {
        return {to: `/locations/${node.sid}`, text: node.text, linkText: node.sid}
    });
    console.log('NewNavigationFromLocationsQuery links', links)
    return <Navigation data-testid="nav" links={links}/>
}