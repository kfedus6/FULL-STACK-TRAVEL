<a id="to-top"></a>

<div align="center">
   
  <img src="/README/bus.png" alt="Logo" width="250px"/>
   
  <h1 align="center">This is my real React project for a client.</h1>
  <p style="font-size: 25px;"><strong>TRAVEL</strong></p>
</div>

---

<h2 align="start">Website information</h2>

> **_About Project_** : This project was created for a client, unfortunately the client refused the site for personal reasons, the project turned out to be quite cool. The designers developed this design using Figma, so the experience with Figma is there.

> **_What I used to create this project_** : React, JavaScript, Node.js, OSPanel phpMyAdmin MySQL, Redux, Middleware, React Router DOM, i18next, CSS, axios, Material UI, Telegram API, @google-pay/button-react and @react-oauth/google, TinyMCE, bcryptjs, CORS for React.

<span>You can ask me <strong>"What Can I do here",</strong> let me show you every page and you will understand, what you can do:</span>

<p style="font-size: 25px;"><strong>- Home</strong><span style="font-size: 20px;"> is the first page you see</span></p>

<p align="center">
  <img src="/README/Home.gif" alt="Home" width="800px" height="400px"/>
</p>

---

<p style="font-size: 25px;"><strong>- Sign Up/Log Up and Password recovery</strong></p>

<ul>
  <li><h6><em>Sign Up: You can register with Google and without Google.</em></h6></li>

  <p align="center">
     <img src="/README/registration.png" alt="Registration" width="800px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>Log Up: You can login up in to your account with or without Google.</em></h6></li>

  <p align="center">
     <img src="/README/login.png" alt="Login" width="800px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>Password recovery: You can reset your password using Gmail.</em></h6></li>

  <p align="center">
     <img src="/README/password.png" alt="Password recovery" width="800px" height="400px"/>
  </p>
</ul>

---

<p style="font-size: 25px;"><strong>- Flights and Flight</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/flight.gif" alt="Flights" width="800px" height="400px"/>
</div>

---

<p style="font-size: 25px;"><strong>- Services</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/Services.gif" alt="Sercvices" width="800px" height="400px"/>
</div>

---


<p style="font-size: 25px;"><strong>- Blog</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/Blog.gif" alt="Blog" width="800px" height="400px"/>
</div>

---

<p style="font-size: 25px;"><strong>- Contact</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/Contact.png" alt="Contact" width="800px" height="400px"/>
</div>

---

<p style="font-size: 25px;"><strong>- Pagination with Material UI</strong></p>

<ul>
  <li><h6><em>Pagination: Back.</em></h6></li>

  <p align="center">
    <img src="/README/backPagination.png" alt="Pagination Backend" width="800px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>Pagination: Front.</em></h6></li>

  <p align="center">
    <img src="/README/paginationFrontCount.png" alt="Pagination Frontend" width="800px" height="100px"/>
    <img src="/README/paginationFront.png" alt="Pagination Frontend" width="800px" height="100px"/>
    <img src="/README/frontPagination.png" alt="Pagination Frontend" width="800px" height="200px"/>
  </p>
</ul>

<ul>
  <li><h6><em>- Pagination</em></h6></li>

  <p align="center">
    <img src="/README/pagination.gif" alt="Pagination" width="800px" height="400px"/>
  </p>
</ul>

---

<p style="font-size: 25px;"><strong>- Breadcrumbs</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/Breadcrumbs.gif" alt="Breadcrumbs" width="800px" height="400px"/>
</div>

---

<p style="font-size: 25px;"><strong>- Sort Flights</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/sortflight.gif" alt="Sort Flights" width="800px" height="400px"/>
</div>

---

<p style="font-size: 25px;"><strong>- Account</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/Account.gif" alt="Account" width="800px" height="400px"/>
</div>

---

<p style="font-size: 25px;"><strong>- Buy</strong></p>

<div  style="display:flex;justify-content: space-around;align-items: center">
  <img src="/README/buy_Dqj9LKjU.gif" alt="Buy" width="800px" height="400px"/>
</div>

---
<p style="font-size: 25px;"><strong>- The website is multilingual and can be translated into one of two languages. On the front I did it with the i18Next, it's easy there, I'd rather show you how I did it on the back.</strong></p>

<ul>
  <li><h6><em>Using the join method, we fix a term from 2 languages in the database, for example: Київ//Киев.<em><h6></li>
  <p align="center">
    <img src="/README/flightControllerBack.png" alt="language" width="800px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>When we retrieve data from the database before sending it to frot, we use the split method to create an array, for example: [Київ, Киев].</em></h6></li>
  <p align="center">
    <img src="/README/flightGetBack.png" alt="language" width="800px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>Here we assign 0 or 1 to the language.</em></h6></li>
  <p align="center">
    <img src="/README/flightAction.png" alt="language" width="800px" height="120px"/>
    <img src="/README/flightReducer.png" alt="language" width="800px" height="300px"/>
  </p>
</ul>

<ul>
 <li><h6><em>We are looking for the language we need by the index.</em></h6></li>
  <p align="center">
    <img src="/README/flightStore.png" alt="language" width="800px" height="50px"/>
    <img src="/README/flightHtml.png" alt="language" width="800px" height="100px"/>
  </p>
</ul>

<p style="font-size: 25px;"><strong>- Result</strong></p>

<ul>
  <p align="center">
    <img src="/README/Language.gif" alt="language" width="800px" height="400px"/>
  </p>
</ul>

---

<p style="font-size: 25px;"><strong>- What can an administrator do? </strong></p>

<ul>
<h5><em>The administrator can:</em></h5>
  <li><h6><em>Add a picture to the banner and delete it.</em></h6></li>

  <p align="center">
    <img src="/README/HomeBaner.gif" alt="Baner" width="700px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>Add product type, brand and product, you can also add product color and more pictures, remove product.</em></h6></li>

  <p align="center">
    <img src="/README/AddProduct.gif" alt="Product" width="700px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>Find the order, view it and change the status of the order: accept or cancel.</em></h6></li>

  <p align="center">
    <img src="/README/Order.gif" alt="Order" width="700px" height="400px"/>
  </p>
</ul>

<ul>
  <li><h6><em>View product statistics and find out which product is selling best and which is not.</em></h6></li>

  <p align="center">
    <img src="/README/statistic-page.png" alt="Statistic" width="700px" height="400px"/>
  </p>
</ul>

---

[Go to Top](#to-top)