import React, { useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import EditorModule from "react-simple-code-editor";
import prism from "prismjs";
import { useEffect } from "react";
import axios from 'axios';
import Markdown from 'react-markdown';
const Editor = EditorModule.default;

function App() {
  const [code, setCode] = useState(`
function sum() {
  return 1 + 1;
}
`);

const [review,setReview]=useState(``);

async function reviewCode(){
  const response=await axios.post('http://localhost:3000/ai/get-review',{code})

  setReview(response.data);
}
useEffect(()=>{
  prism.highlightAll()
},[])
  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(
                code,
                prism.languages.javascript,
                "javascript"
              )
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Courier New", monospace',
              fontSize: 16,
              border:"1px sold #ddd",
              borderRadius:"5px",
              height:"100%",
              width:"100%"
            }}
          />
        </div>

        <div onClick={reviewCode} className="review">Review</div>
      </div>

      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;