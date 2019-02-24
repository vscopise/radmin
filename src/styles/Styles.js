const styles = theme => ({
    App: {
      backgroundColor: '#fafafa',
      padding: theme.spacing.unit * 3,

    },
    

    postEditor: {
      '& .postItem': {
        marginBottom: 20,
        '& input': {
          backgroundColor: '#fff',
        },
        backgroundColor: '#fff',
      },
      '& .title': {
        '& input': {
          fontSize: '1.5em',
        }
      },
      '& div.contentWrap': {
        backgroundColor: '#fff',
        padding: '0 20px 20px',
        marginTop: 20,
      },
      '& div.editorContainer': {
        padding:20,
        fontSize: 18,
      },
      '& .content': {
        minHeight:200,
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

    richEditorRoot: {
      background: '#fff',
      //border: '1px solid #ddd',
      fontFamily: '"Georgia", serif',
      fontSize: 14,
      padding: 15,
      '& .RichEditor-editor': {
        borderTop: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        marginTop: 10,
        paddingTop: 15,
        '& .public-DraftEditorPlaceholder-root': {
          margin: '0 -15px -15px',
          padding: 15
        },
        '& .public-DraftEditor-content': {
          margin: '0 -15px -15px',
          minHeight: 100,
          padding: 15
        },
      },
      '& .RichEditor-editor .RichEditor-blockquote': {
        borderLeft: '5px solid #eee',
        color: '#666',
        fontFamily: '"Hoefler Text", "Georgia", serif',
        fontStyle: 'italic',
        margin: '16px 0',
        padding: '10px 20px',
      },
      '& .RichEditor-controls': {
        fontFamily: '"Helvetica", sans-serif',
        fontSize: 14,
        marginBottom: 5,
        userSelect: 'none',
        '& .RichEditor-styleButton': {
          color: '#999',
          cursor: 'pointer',
          marginRight: 16,
          padding: '2px 0',
          display: 'inline-block',
        },
        '& .RichEditor-activeButton': {
          color: '#5890ff',
        }         
      },

/*
.RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
  display: none;
}


.RichEditor-editor .public-DraftStyleDefault-pre {
  background-color: rgba(0, 0, 0, 0.05);
  font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
  font-size: 16px;
  padding: 20px;
}

*/
    },



    sideEditorInput: {
      width: '100%',
      marginBottom: 20,
      '& .side-editor-select': {
        width: '100%',
      }
    },
    sideEditorInputLast: {
      width: '100%',
    },
    postBox: {
      marginBottom: 20,
      textAlign: 'center', 
      '& .label': {
        textAlign: 'left',
        marginBottom: 0,
      },
      '& .secondary': {
        marginTop: 20,
      },
      '& .button': {
        width: '100%',
      },
      '& .button1': {
        marginBottom: 20,
      },
      '& .button2': {
      },
    },
    postFeaturedImage: {
      textAlign: 'center',
      marginBottom: 20,
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
    select: {
      //margin: theme.spacing.unit,
      minWidth: 200,
      maxWidth: 500,
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
  });

  export default styles;