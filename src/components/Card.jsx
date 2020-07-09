import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import blue from '@material-ui/core/colors/blue';




const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin:20,
    borderRadius: 25,
    border: 0,

  },
  media: {
    height: 300,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  const[thumbnail,setThumbnail] = useState(props.thumbnail)
  const [isHovering,setHovering] =useState(false)

   

  return (
    <Card className={classes.root} elevation={isHovering?24:3} onMouseEnter={() => setHovering(true) } onMouseLeave={() => setHovering(false)}>
      
        <CardMedia
        onMouseEnter={() => setThumbnail(props.gif) } onMouseLeave={() => setThumbnail(props.thumbnail)}
          className={classes.media}
          image={thumbnail}
          title={props.name}
        />
        <CardContent st>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.details}
          </Typography>
          <br></br>
          <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
            {props.liveDemo==='' ?  <Button disabled size='large' color='secondary' variant='contained'><h5 className="ion-play"> Live Demo</h5></Button>: <a target="_blank" rel="noopener noreferrer"href={props.liveDemo}><Button size='large' color='secondary' variant='contained'><h5 className="ion-play" style={{color:'#FFF'}}> Live Demo</h5></Button></a>}
            <a target="_blank" rel="noopener noreferrer"href={props.gitHub}><Button style ={{marginLeft:20}}size='large' color='primary' variant='contained'><h5 className="ion-social-github" style={{color:'#FFF'}}> GitHub</h5></Button></a>
          </div>
          <br></br>
          {props.techUsed.map(item => <Chip label={item} elevation={24} clickable={false} style={{background:'black',color:'#FFF',margin:2}}/>)}
         


        </CardContent>
            
    </Card>
  );
}