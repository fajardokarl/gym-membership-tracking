<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/members">Members</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap');

body {
  margin: 0;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn-container button {
  padding: 10px 10px;
  background: #fff;
  margin: 5px;
  border: solid 1px #ccc;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-container .close:hover {
    background: rgb(224, 78, 78);
}

.btn-container button:active, .btn-container button:focus {
  outline: none;
  border: solid 1px #1aee00;
  transition: border ease-out .2s;
}

.btn-container button:hover {
  background: #7dee7f;
  color: white;
}

.input-container {
  position: relative;
  margin: 10px;
}

.main-form input {
  background: #fff;
  border-radius: 3px;
  border: solid 1px #aaaaaa;
  width: calc(100% - 16px);
  height: 2em;
  padding: 0 8px;
  margin: 0;
}

.main-form h3 {
  grid-column: 1/4;
}

.main-form input:active, .main-form input:focus {
  background: #fff;
  border-radius: 3px;
  border: solid 1px #1aee00;
  outline: none;
}

.modal-btn-container {
    padding: 1em;
}

.modal-btn-container button {
    padding: 10px 20px;
    background: #42b983;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    border: 1px solid;
    border-radius: 20px;
    cursor: pointer;
}

.modal-btn-container button:hover {
    background: #ddffdd;
    border: 1px solid #42b983;
    color: #42b983;
}

.modal-btn-container button:active, .modal-btn-container button:focus {
    outline: none;
}
</style>
