import React  from 'react';
import {
    Button,
//    Card,
//    CardContent,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    withStyles,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
    PostEditorSide: {
        width: '100%',
        marginBottom: 20,
        
        '& .side-editor-panel': {
            width: '100%',
        },
        '& .button': {
            width: '100%',
        },
        '& .post-box': {
            marginBottom: 20,
            fontSize: theme.spacing.unit,
            '& .side-editor-input': {
                float: 'right',
                maxWidth: 200,
            },
            '& .img-container': {
                textAlign: 'center',
            },
        },
        '& .post-box:last-child': {
            marginBottom: 0,
        },
        '& .button-wrapper': {
            display: 'block',
            padding: '20px 24px 4px'
        },
        '& .button-wrapper .button': {
            marginBottom: 20,
        },
    },
})

const PostBox = (props) => (
    <div className={'post-box'}>
        {
            props.title &&
            <InputLabel>{props.title}</InputLabel>
        }
        {
            props.type === 'select' &&
            <Select
                className={'side-editor-input'}
                multiple={props.multiple}
                value={props.value}
                onChange={props.handleChange}
                name={props.name}
            >
                {props.items.map(item => (
                    <MenuItem 
                        key={item.id} 
                        value={item.id}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        }
        {
            props.type === 'text' &&
            <TextField
                className={'side-editor-input'}
                value={props.value}
                type="datetime-local"
                onChange={props.handleChange}
                name={props.name}
            />
        }
        {
            props.type === 'featured-image' &&
            <div>
                {
                    props.postFeaturedImage &&
                    <div className='img-container'>
                        <img 
                            src={props.postFeaturedImage.media_details.sizes.thumbnail.source_url} 
                            alt='' 
                        />
                        <PostBoxButton 
                            onClick={props.handleShowMediaLibrary}
                            disabled={props.disabledButtons}
                            label='Reemplazar imagen'
                        />
                    </div>
                }
                {
                    ! props.postFeaturedImage &&
                    <PostBoxButton 
                        onClick={props.handleShowMediaLibrary}
                        primary={true}
                        disabled={props.disabledButtons}
                        label='Establecer imagen'
                    />
                }
            </div>
        }
    </div>
)

const PostBoxButton = (props) => (
    <Button 
        className={props.primary ? 'button' : 'button button1'}
        variant="contained" 
        color={props.primary ? 'primary' : 'default'}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.label}
    </Button>
)

const PostEditorSide = (props) => (
    <div className={props.classes.PostEditorSide}>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    Estado y visibilidad
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
                <div className={'side-editor-panel'}>
                    <PostBox
                        type='select'
                        title='Visibilidad'
                        multiple={false}
                        value={props.postStatus}
                        handleChange={props.handleChange}
                        name='postStatus'
                        items={props.status}
                    />
                    <PostBox 
                        type='text'
                        title='Fecha / Hora'
                        value={props.postDate}
                        handleChange={props.handleChange}
                        name='postDate'
                    />
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    Categor??as y Etiquetas
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={'side-editor-panel'}>
                    <PostBox
                        type='select'
                        title='Categor??a(s)'
                        multiple={true}
                        value={props.postCategories}
                        handleChange={props.handleChange}
                        name='postCategories'
                        items={props.categories}
                    />
                    <PostBox
                        type='select'
                        title='Etiqueta(s)'
                        multiple={true}
                        value={props.postTags}
                        handleChange={props.handleChange}
                        name='postTags'
                        items={props.tags}
                    />

                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    Imagen Destacada
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={'side-editor-panel'}>
                    <PostBox
                        type='featured-image'
                        postFeaturedImage={props.postFeaturedImage}
                        handleFeaturedImageClick={props.handleFeaturedImageClick}
                        loading={props.loading}
                        message={props.messageImage}
                        handleShowMediaLibrary={props.handleShowMediaLibrary}
                        buttonLabel1=''
                        onClick1={props.onClick1}
                    />
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
            defaultExpanded={true}
        >
            <ExpansionPanelDetails 
                className='button-wrapper'
            >
                <PostBoxButton 
                    primary
                    onClick={props.handleUpdatePost}
                    label='Guardar'
                />
                <PostBoxButton 
                    onClick={props.handleClose}
                    label='Cerrar'
                />
                {
                props.messagePost !== '' && 
                    <Typography 
                        className='label secondary'
                        color="textSecondary" gutterBottom>
                        {props.messagePost}
                    </Typography>
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
)
export default withStyles(styles)(PostEditorSide);
