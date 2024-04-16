import React from "react";
import Posts from "../posts/posts.js";
import Forms from "../Form/Forms.js";
import { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper ,AppBar,TextField,Button } from "@material-ui/core";
import { useNavigate,useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import useStyles from "./styles.js";
import Paginate from "../Pagination.jsx";
import { getPosts , getPostBySearch } from "../../actions/posts.js";

function useQuery(){
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const [search,setSearch]= useState("");

  const [tags,setTags] = useState([]);
  
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const dispatch = useDispatch();



 const searchPost = () =>{
  if(search.trim() || tags)
  {
   dispatch(getPostBySearch({search , tags: tags.join(',')}));
   navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  }
  else{
    navigate('/');
  }
 }

 

 const handleKeyPress= (e) =>{
   if(e.keyCode===13)
   {
    searchPost();
   }
 };

 const handleAdd =(tag)=>{
  setTags([...tags, tag])

  
 };

 const handleDelete = (tagDelete) => setTags(tags.filter((tag)=> tag !== tagDelete))

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>

            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField name="search" variant="outlined" label="Search Posts"
              fullWidth
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              onKeyUp={handleKeyPress}/>


              <ChipInput 
              style={{margin:'10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
              />

              <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
            </AppBar>


            <Forms currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags?.length ) && (
             
              <Paper  elevation={6} className={classes.pagination}>
              <Paginate page={page}/>
            </Paper>
            )}
            
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
