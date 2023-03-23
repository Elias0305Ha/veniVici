// This is the main component of the app. It contains the API call, the ban list, and the gallery.

// import useState, useEffect, and axios
import { useState, useEffect } from 'react'
import axios from 'axios'

// import APIForm and Gallery
import APIForm from './components/APIForm'
import Gallery from './Components/gallery';

// import css
import './App.css'

// import the API key
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


// main component
function App() {

  // cats is the state that will hold the API call
  const [cats, setCats] = useState(null);
  // banList is the state that will hold the list of banned breeds
  const [banList, setBanList] = useState([])
  // prevEntry is the state that will hold the previous entries
  const [prevEntry, setPrevEntry] = useState([]);
  // prevBreed is the state that will hold the previous breed names
  const [prevBreed, setPrevBreed] = useState([]);
  // query is the state that will hold the API call
  const [query, setQuery] = useState(`https://api.thecatapi.com/v1/images/search?has_breeds=true&api_key=${ACCESS_KEY}&breed_ids=asho&breed_ids=awir
  &breed_ids=amis&breed_ids=beng&breed_ids=bomb&breed_ids=esho&breed_ids=hima&breed_ids=mcoo&breed_ids=manx&breed_ids=munc&breed_ids=norw&breed_ids=pers&breed_ids=pixi&breed_ids=ragd&breed_ids=siam&breed_ids=snow`);

  // discoverQuery is the function that will be called when the Discover button is clicked
  const discoverQuery = () => {
    // call the API
    callAPI(query).catch(console.error);
  }

  // BREED_IDS is an object that holds the breed ids
  const BREED_IDS = {
    'American Shorthair': 'asho',
    'American Wirehair': 'awir',
    'Australian Mist': 'amis',
    'Bengal': 'beng',
    'Bombay': 'bomb',
    'Exotic Shorthair': 'esho',
    'Himalayan': 'hima',
    'Maine Coon': 'mcoo',
    'Manx': 'manx',
    'Munchkin': 'munc',
    'Norwegian Forest Cat': 'norw',
    'Persian': 'pers',
    'Pixie-bob': 'pixi',
    'Ragdoll': 'ragd',
    'Siamese': 'siam',
    'Snowshoe': 'snow',
  };

  // breedQueryRemove is a function that is responsible for removing breeds requested by user when adding breeds to the ban list
  const breedQueryRemove = () => {
    let newQuery = query;
    // go through the loop, find if a breed is in the ban list, and then remove it from query
    for (let i = 0; i < banList.length; i++) {
      const breed = banList[i];
      if (BREED_IDS[breed]) {
        const breedId = BREED_IDS[breed];
        newQuery = newQuery.replace(`&breed_ids=${breedId}`, '');
      }
    }
    // change query
    setQuery(newQuery);
  }
  

  // breedQueryAdd is a function that's responsible for adding breeds back when user no longer wants to ban them
  const breedQueryAdd = () => {
    // go through the loop, if a breed is in ban list, add it back to query as it will be removed from ban list 
    for (let i = 0; i < banList.length; i++) {
      const breedId = BREED_IDS[banList[i]];
      if (breedId) {
        setQuery(query.concat(`&breed_ids=${breedId}`));
      }
    }
  }


  // callAPI is the function that will call the API
  const callAPI = async (query) => {
    // call the API
    const response = await axios.get(query);
    // set cats to the response
      setCats(response.data);
      // map both url, and breed name to prevEntry 
      setPrevEntry((prevEntry) => [...prevEntry, response.data.map((cat) => cat.url)])
      setPrevBreed((prevBreed) => [...prevBreed, response.data.map((cat) => cat.breeds[0].name)])
  }

   
  return (
    <div className="App">

      <div className='rightSideDiv'>
        <h1>Ban List</h1>
        <h2>Select an attribute in your listing to ban it</h2>   
        <div className='banListDiv'>
          {
            banList.map((item, index) => <button 
            onClick={() => {breedQueryAdd(); setBanList(banList.filter((_, i) => i !== index))}}
            className='banListBtn' > {item} </button>)
          }
      </div>
      </div>

      <div className='leftSideDiv'> 
        <Gallery entries={prevEntry} breedNames={prevBreed}/>
      </div>

      <div className='centerDiv'> 
        <h1>Kitty Kitty!</h1>
        <h2>Discover cats from your wildest dreams!</h2>
       
      <div className='catAttributesDiv'>
        { cats ? ( 
            <button onClick={() => {breedQueryRemove(); setBanList(([...banList, cats.map((cat) => cat.breeds[0].name)]))}}
            className='breedBtn'>{ cats.map((cat) => cat.breeds[0].name)}</button>

      ) : (

        <div> </div>)}


      { cats ? (
            <button onClick={() => setBanList([...banList, cats.map((cat) => cat.breeds[0].weight.imperial)])}
            className='weightBtn'>{cats.map((cat) => cat.breeds[0].weight.imperial)} Ibs</button>
      
      ) : (
      
        <div> </div>)}

      { cats ? (

            <button onClick={() => setBanList([...banList, cats.map((cat) => cat.breeds[0].origin)])}
            className='originBtn'>{cats.map((cat) => cat.breeds[0].origin)}</button>

      ) : (
        
        <div> </div>)}
      
      </div>

      { cats ? ( <img src={cats.map((cat) => cat.url)} alt="screenshot"/>

      ) : (

      <div> </div>)}


        
      <APIForm onSubmit={() => {breedQueryRemove(); discoverQuery()}}/>
      </div>
    </div>
  )
}

export default App