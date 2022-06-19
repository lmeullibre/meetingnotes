import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({

}));

export const DashboardNavbar = (props: any) => {
  const { ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={() => console.log()}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
  

          <Typography  variant="h5">
            Automateam
          </Typography>
  
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
            </IconButton>
          </Tooltip>
    
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 20,
              width: 20,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};