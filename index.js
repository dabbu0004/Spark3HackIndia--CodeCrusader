// SHOW MENU
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Menu Show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Menu hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
// REMOVE MENU MOBILE
const navLink = document.querySelectorAll(".nav__link");
const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // when we click on each nav__link , we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

// ADD BLUR HEADER
const blurHeader = () => {
  const header = document.getElementById("header");
  //Add a class if the bottom offset is gretaer than 50 of the
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

// SHOW SCROLL UP
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // when the scroll is higher than 350 vuewpoint height ,add the
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);
// SCROLL SECTIONS ACTIVE LINK

const sections = document.querySelectorAll('section[id]')
const scrollActive=()=>{
  const scrollDown = window.scrollY

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
    sectionTop = current.offsetTop - 58,
    sectionId = current.getAttribute('id'),
    sectionsClass = document.querySelector('.nav__menu a[href*' + sectionId + ']')

    if(scrollDown > sectionTop && scrollDown <= sectionTop +sectionHeight){
      sectionsClass.classList.add('active-link')
    }else{
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll',scrollActive)


const sr = ScrollReveal({
  origin:'top',
  distance:'80px',
  duration:2500,
  delay:300,
})
sr.reveal(`.home__img, .new__data, .care__img, .contact__content, .footer`)
sr.reveal(`.home__data ,.care__list, .contact__img `,{delay:500})
sr.reveal(`.new__card`,{delay:500, interval:100})
sr.reveal(`.shop__card`,{interval:100})
// sr.reveal(`.cactus.webp,.new__data`)
// sr.reveal(`.home__data`,{delay:500})
// sr.reveal(`.new__card`,{delay:500,interval:100})
// sr.reveal(`.shop__card`,{})

const express = require('express');
const Web3 = require('web3');
const app = express();
const contractABI = require('./DreamNFT.json'); // ABI file generated by Solidity compiler
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

const dreamNFT = new web3.eth.Contract(contractABI, contractAddress);

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to mint a new dream NFT
app.post('/mint', async (req, res) => {
    const { fromAddress, privateKey, tokenURI } = req.body;

    try {
        const mintData = dreamNFT.methods.mintDream(tokenURI).encodeABI();

        const transaction = {
            to: contractAddress,
            data: mintData,
            gas: 2000000,
        };

        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, receipt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(Server running on port ${port});
});
