const styles = theme => ({
    root: {
      backgroundColor: '#fafafa',
      //width: '90%',
      //marginTop: theme.spacing.unit * 3,
      //margin: 'auto',
      padding: theme.spacing.unit * 3,
      '& div.postEditor': {
        //backgroundColor: '#f0f0f0',
        '& .postItem': {
         // width: '90%',
         // margin: 'auto',
        },
        '& .title': {
          '& input': {
            backgroundColor: '#fff',
            fontSize: '1.5em',
          }
        },
        '& div.contentWrap': {
          backgroundColor: '#fff',
          padding: '0 20px 20px',
          marginTop: 20,
//          width:'90%',
//          margin:'auto',
        },
        '& div.editorContainer': {
          padding:20,
          fontSize: 18,
        },
        '& .excerpt': {
          backgroundColor: '#fff',
          marginTop: 20,
//          width:'90%',
//          margin:'auto',
//          boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.5)',
          height:100,
          overflowY: 'hidden',
        },
        '& .content': {
          height:450,
          //overflowY: 'scroll',
          overflowY: 'auto',
        },
        '& .toolbar': {
          textAlign: 'center',
          margin: '0.5em',
          padding: '0.5em',
          '& .RichEditor-activeButton': {
            backgroundColor: '#feb47b',
            color: 'white',
          },
          
          '& select': {
            padding: '0.5em',
            border: 'none',
            margin: '0.35em',
            borderRadius: 6,
            fontFamily: 'Open Sans',
            fontSize: 13,
            height: '2.25em',
          },
          
          '& button, select': {
            backgroundImage: 'linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%)',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          },
          
          '& #bold': {
            fontWeight: 'bold',
          },
          
          '& #italic': {
            fontStyle: 'italic',
            fontFamily: 'serif',
          },
          
          '& #underline': {
            textDecoration: 'underline',
          },
  
          '& .styleButton, .RichEditor-styleButton': {
            padding: '0.5em',
            backgroundImage: 'linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%)',
            border: 'none',
            margin: '0.35em',
            width: '2.75em',
            fontFamily: 'Open Sans',
            fontSize: 13,
            height: '2.25em',
            borderRadius: 4
          },
        },
      },

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