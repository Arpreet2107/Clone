import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { input, setInput, onSent, showResult, loading, resultData } = useContext(Context);

  return (
    <div className='main'>
      <div className="content">
        <p>Gemini Clone</p>
        <p className="desc">
          Discover the amazing capabilities of Gemini, your personal AI assistant. Ask anything, get insights, and more.
        </p>

        <form className='input-container' onSubmit={(e) => e.preventDefault()}>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Ask me anything...' />
          <button type='submit' onClick={() => onSent()}>{loading ? "Sending..." : "Send"}</button>
        </form>

        {showResult && (
          <div className='result'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
