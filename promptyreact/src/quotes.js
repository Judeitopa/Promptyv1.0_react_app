import React from "react";
import styles from "./index.css";
import dynamic from "next/dynamic";

const quotes = ["Al 'prompt engineer' jobs can pay up to $335,000 a year and don't always require a background in tech ---via Business Insider",
"'I love the 'mad scientist' part where I'm able to come up with a dumb idea for a prompt and see it actually work' --- Bernstein via Insider",
"writing a really great prompt for a chatbot persona is an amazingly high-leverage skill. --- Sam Altman, the CEO of OpenAI",
"Telling an AI to do EXACTLY what you want may prove to be the most difficult part of using with them --- Unknown",
"Whether you're planning your next content, or just looking to have fun, Prompty is where the magic happens!✨"];
let message;
 function DisplayQuotes() {
    const randomness = Math.floor(Math.random() * quotes.length)
    message = quotes[randomness]
    return (
    <div>
     <p className='quotes'>{message}</p>
    </div>   
)}
export default dynamic (() => Promise.resolve(DisplayQuotes), {ssr: false})

   