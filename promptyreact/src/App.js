import Head from "next/head";
import { useState } from "react";
//import styles from "./index.css";
import Typed from 'typed.js';
import {useEffect, useRef } from 'react'
import React from "react";
import Quotes from './quotes'
//import generate from "./generate";
   


export default function Home() {
  //Using Typed.js
const el = useRef(null);
useEffect(() => {
  const typed = new Typed(el.current, {
    strings: ['...Power to create through the lens of your uniqueness','Prompts generated can be used in DALL.E, ChatGPT, Midjourney, DreamStudios', 'Or for Training your Own AI Models','Think','Feel','🚀Create😎'],
    startDelay: 150,
    typeSpeed: 50,
    smartBackspace: true,
    showCursor: false,
    loop: false,
  }) 
})

  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });
      console.log(response)

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.replaceAll('\n', '<br />'));
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Prompty_1.0</title>
        <link rel="icon" href="./AI icon.png" />
      </Head>
      <div className='nav'>
      <img alt="logo" id="form" className='logo' src="./ai logo.jpeg"/><h1>PROMPTY v1.0</h1>
      <ul>
        <a href="#form"><li>Home</li></a>
        <a href="#about"><li>About</li></a>
        <a href="#developer"><li>Developer</li></a>
        </ul>
      </div>
      
      <h2 className='typedtext'><span ref={el}></span></h2>
      <Quotes/>
      
      <main className='main'>
      
        <img src="./robot illustration.jpg" className='icon' />
        <h3>Creative & Effective Prompt Engineering Tool, To Get The Most Of AI Revolution</h3>
        <form  onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter a text, phrase, or sentence..."
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate Prompt" />
        </form>
        {result && (
           <div className='result' dangerouslySetInnerHTML={{ __html: result}} />
        )}
      </main>
      <div className='bottom'>
        <h2 id="about">About <br/><p className='p'>As the AI revolution is gradually taking place,<br/>humans have to find effective ways of interacting<br/>with the AI around us. The goal of Prompty is to<br/> provide better ways of talking to computers<br/>in a clear and concise manner, to get the desired outcome.</p></h2>
        <h2 id="developer">Developer<br/><p className='p'>I am Jude Itopa, an engineering student studying<br/>in Covenant University, Nigeria. And exploring<br/>the infinite possiblities of leveraging on AI by creating useful tools.<br/>If you find this helpful don't forget to recommend it.<br/>Thanks for checking it out!<br/>
        <a href="https://www.twitter.com/adavize_jude"><img className='twittericon' src="./twitter_logo_2.jpg"></img></a>
        <a href="mailto:itopajude1@gmail.com"><img className='emailicon' src="./email-logo.jpg"></img></a></p></h2>
       </div>
       
    </div>
  );
}
