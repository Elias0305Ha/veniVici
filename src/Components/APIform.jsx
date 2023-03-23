// this is the form that will be used to display the categories of the API
const APIForm = ({onSubmit, cats}) => {

    return (
      <div>
                <form className="form-container">
                {cats &&
                Object.entries(cats).map(([category, value], index) => (
                <li className="form" key={index}>
                <h2>{category} </h2>
                </li>
                ))}
                </form>
                <button
                className="DiscoverBtn" onClick={onSubmit}>
                    
                Discover
                </button>
      </div>
    );
  };
  
  export default APIForm;