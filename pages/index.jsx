import React from 'react';

import Typed from 'react-typed';

import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PageLayout from '../components/layouts/PageLayout';

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  };
});

export default function Index(props) {
  const classes = useStyles();
  return (
    <PageLayout title='Index' {...props.auth}>
      <Paper className={classes.paper}>
        <Typography variant='h5' component='h1'>
          <Typed
            loop
            typeSpeed={100}
            backSpeed={20}
            strings={['Index', 'Page', 'Typed.js']}
            smartBackspace
            shuffle={false}
            backDelay={1}
            fadeOut={false}
            fadeOutDelay={100}
            loopCount={0}
            showCursor
            cursorChar='|'
          />
        </Typography>
      </Paper>
    </PageLayout>
  );
}
