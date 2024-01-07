import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import "./App.css";
import Button from "./components/Button";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(2);
  const [allPosts, setallPosts] = useState(0);
  const [searchValue, setaSearchValue] = useState("");

  const callItemsApi = async () => {
    const callTextApi = fetch("https://jsonplaceholder.typicode.com/posts");
    const callImagesApi = fetch("https://jsonplaceholder.typicode.com/photos");

    // solve all promisses and convert this to an array
    const [post, photos] = await Promise.all([callTextApi, callImagesApi]);

    const postJson = await post.json();
    const photosJson = await photos.json();

    // there are more photos than posts, maping the posts and creating a object with a imagem for each post, will limit the number of photos redered 
    const postAndPhotos = postJson.map((post, index) => {
      return {
        ...post,
        cover: photosJson[index].url,
        alt: photosJson[index].title,
      };
    });

    // slice methodo will create a new array with the actual page and post perPage;
    // page = 0 and postPerPage = 2 === array with 2 items on the screen;

    //the page increment with postPerPage when someone click on the button, then..
    // page = 2 and postPerPage = 2 === array with 4 items on the screen;
    // page = 4 and postPerPage = 2 === array with 6 items on the screen;
    setPosts(postAndPhotos.slice(page, postPerPage));
    setallPosts(postAndPhotos);
  };
  
  const loadMorePosts = () => {
    //all posts receiv all posts of the array, but with the slice methodo he can filter an array with the actual page and the posts per page.
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    //push methodo inject on the array an spread operator that put all content of nextPosts without remove or replace anything
    posts.push(...nextPosts);
    setPage(nextPage);
  };
  // create a conditional methodo to check the limit of the array for disable the load button
  const noMorePosts = page + postPerPage >= allPosts.length;

  /**
   * @function handleChange receiv the value of the input in real time and set on the state this value. 
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setaSearchValue(value);
  };

  // case input contains anything value, the variables posts will be filtered and each posts will be changed on post.title to lower case;
  // the includes() method determines whether an array contains an value and returning true or false for him.
  // then whether each posts contains search value return true else false.  this will be used to create an short-circuit on the jsx ;
  const filteredPosts = !!searchValue
    ? posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  // each page reload recharge the items from api
  useEffect(() => {
    callItemsApi();
  }, []);

  return (
    <div className="App">
      <section className="container">
        {!!searchValue && <h3>Sua busca:{searchValue}</h3>}
        <input
          type="search"
          className="search-posts"
          placeholder="what is your mind ?"
          onChange={handleChange}
          value={searchValue}
        />
        <Posts posts={filteredPosts} />

        {!searchValue && (
          <Button
            text="Load more"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </section>
    </div>
  );
};

export default App;
