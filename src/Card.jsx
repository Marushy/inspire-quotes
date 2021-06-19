import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { ReactComponent as Copy } from "./img/copy.svg";
import { ReactComponent as Quote } from "./img/quotation-marks-in-speech-bubble.svg";

export default function Card() {
  const [quote, setQuote] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteCopied, setQuoteCopied] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  async function fetchRandomQuote() {
    try {
      setLoadingQuote(true);
      setErrorMessage("");
      setQuoteCopied(false);
      const quoteObject = await axios.get("https://api.quotable.io/random");
      setQuote(quoteObject.data);
      setLoadingQuote(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingQuote(false);
    }
  }

  function copyQuote() {
    navigator.clipboard.writeText(quote.content + " - " + quote.author);
    setQuoteCopied(true);
  }

  return (
    <div className="card">
      {loadingQuote ? (
        <div>
          <Loader type="Bars" color="#58e3f5" height={70} width={80} />
          <span>loading</span>
        </div>
      ) : quote.content ? (
        <div>
          <h2>{quote.content}</h2>
          <p>-{quote.author}</p>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}

      <div>
        {quoteCopied ? (
          <p>Quote copied to clipboard</p>
        ) : (
          <button aria-label="copy-icon" onClick={copyQuote}>
            <Copy className="copy" /> copy quote
          </button>
        )}
      </div>
      <div>
        <button aria-label="copy-icon" onClick={fetchRandomQuote}>
          <Quote className="copy" /> new quote
        </button>
      </div>
    </div>
  );
}
