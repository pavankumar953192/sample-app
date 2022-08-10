import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {


  const [isEnt, setIsEnt] = useState()
  var [name, setName] = useState('');
  var [link, setLink] = useState('');
  var [id, setId] = useState('');
  var [isCreate, setIsCreate] = useState(false);

  var [showCreateButton, setShowCreateButton] = useState(false);

  function clickedCreate() {
    setShow(true)
    setIsCreate(true)
    setId("")
    setName("")
    setLink("")

  }
  function clickedupdate(data) {

    setShow(true)
    setId(data.id)
    setName(data.name)
    setLink(data.link)
  }
  function clickedDelete(data) {

    if (isEnt) {
      fetch("http://localhost:3004/entertainment/" + data.id, { method: "DELETE" }).then(res => res.json()).then(result => {
        getEntVideos()
      });
    } else {
      fetch("http://localhost:3004/education/" + data.id, { method: "DELETE" }).then(res => res.json()).then(result => {
        getEducationVideos()
      });
    }
  }
  function submitClicked() {
    setShow(false)
  }
  function getEntVideos() {
    document.getElementById('education').classList.remove("active");
    document.getElementById('entertainment').classList.add("active");
    setShowCreateButton(true)
    setIsEnt(true)
    fetch("http://localhost:3004/entertainment").then(res => res.json()).then(result => {
      setVideos(result)
    });


  }
  function getEducationVideos() {
    document.getElementById('education').classList.add("active");
    document.getElementById('entertainment').classList.remove("active");
    setShowCreateButton(true)
    setIsEnt(false)
    fetch("http://localhost:3004/education").then(res => res.json()).then(result => {
      setVideos(result)
    });
  }
  function cardSelected(data) {
    setVideo(true)
    setTimeout(() => {
      document.getElementById("video-content").setAttribute("src", data.link)
    }, 500);
  }
  const [showVideo, setVideo] = useState(false)
  const [entVideos, setVideos] = useState([]); // define the state
  const [showForm, setShow] = useState(false)

  var list = entVideos.map(product =>
    <div style={{ "position": "relative" }}>
      <div className='button-wrapper'>
        <button onClick={(e) => clickedupdate(product)}>Update</button>
        <button onClick={(e) => clickedDelete(product)}>Delete</button>
      </div>
      <div onClick={(e) => cardSelected(product)} className='card-item' key={product.name}>
        <h3>{product.name}</h3>
        <p>{product.link}</p>
      </div>

    </div>
  )

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleIdChange = (e) => {
    setId(e.target.value);
  }

  const handleSubmit = (e) => {
    if (isCreate) {
      if (isEnt) {
        fetch("http://localhost:3004/entertainment", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id, name: name, link: link }) }).then(res => res.json()).then(result => {
          getEntVideos()
        });
      } else {
        fetch("http://localhost:3004/education", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id, name: name, link: link }) }).then(res => res.json()).then(result => {
          getEducationVideos()
        });
      }
    } else {
      if (isEnt) {
        fetch("http://localhost:3004/entertainment/" + id, { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, link: link }) }).then(res => res.json()).then(result => {
          getEntVideos()
        });
      } else {
        fetch("http://localhost:3004/education/" + id, { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, link: link }) }).then(res => res.json()).then(result => {
          getEducationVideos()
        });
      }
    }

    setShow(false);

    e.preventDefault();

  }

  return (

    <div >

      {showForm && <div className='form'>
        <button style={{
          position: "absolute",
          right: 0
        }} onClick={(e) => setShow(false)}>close</button>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <label >
            Id:
          </label><br />
          <input type="text" value={id} required onChange={(e) => { handleIdChange(e) }} /><br />
          <label >
            Name:
          </label><br />
          <input type="text" value={name} required onChange={(e) => { handleChange(e) }} /><br />

          <label >
            link:
          </label><br />
          <input type="text" value={link} required onChange={(e) => { handleLinkChange(e) }} /><br />

          <input type="submit" value="Submit" />
        </form>
      </div>
      }

      {showVideo && <div className='form'>
        <div style={{ "position": "relative" }}>
          <button style={{
            position: "absolute",
            right: 0
          }} onClick={(e) => setVideo(false)}>close</button>
          <iframe id='video-content' width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        </div>
      </div>
      }

      <header className="App-header">
        <div className="menu-wrapper">
          <section id='entertainment' onClick={(e) => getEntVideos()} className="menu-item">
            Entairnment videos
          </section>
          <section id='education' onClick={(e) => getEducationVideos()} className="menu-item">
            Education videos
          </section>
        </div>
      </header>
      {!showCreateButton && <h3>click on above menu items to see videos</h3>}
      {showCreateButton && <button className='btn' onClick={clickedCreate}>Create</button>}

      <div className='card-wrapper'>
        {list}
      </div>

    </div>

  );
}

export default App;
