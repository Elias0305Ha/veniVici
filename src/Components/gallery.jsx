// This component is used to display the gallery of cats that the user has discovered
const Gallery = ({ entries, breedNames 
}) => {

     return (
           <div>
                 <h1> Cat Gallery!</h1>
                 <h2>Past cats you've discovered!</h2>

                 <div className="image-container">
                       {entries && entries.length > 0 ? (
                       entries.map((entry, index) => (
                       <li className="gallery" key={index}>
                       <h3 style={{color:'black'}} className="galleryText"> {breedNames[index]} </h3>
                       <img
                       className="gallery-screenshot"
                       src={entry}
                       alt="Undefined screenshot from query"
                       width="100"
                       />
                       </li> ))
                       
                       ) : (
                 <h3>You haven't made a screenshot yet!</h3>
                 )}

                 </div>
           </div> 
)}
   
export default Gallery;