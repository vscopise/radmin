const styles = theme => ({
    root: {
      width: '90%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      margin: '0 auto',
    },
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      fontFamily: theme.typography.fontFamily,
      minWidth: 700,
    },
    postRow: {
      color: '#555',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
      '& .cat' : {
        marginRight: 5,
        '&::after': {
          content: `','`,
        },  
      }
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
    Loading: {
      textAlign: 'center',
      padding: `${theme.spacing.unit * 2}px 0`,
    }
  });

  export default styles;