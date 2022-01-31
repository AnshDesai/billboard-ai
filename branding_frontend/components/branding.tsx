export {}
import React from "react";
import Form from './forms';
import Results from './results';
import Image from 'next/image';
import logo from '../public/bbailogo.png'
const Brand_comp: React.FC = () =>{

  const CHARACTER_LIMIT:number = 32; 
  const ENDPOINT: string = 
  "https://tzgsg9y36g.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords"
  
  const [prompt,setPrompt] = React.useState("");
  const[snippet,setSnippet] = React.useState("");
  const[keywords,setKeywords] = React.useState([]);
  const[hasResult,setHasResult] = React.useState(false);
  const[isLoading,setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting:" + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
    .then((res) => res.json())
    .then(onResult);
  };

  const onResult = (data:any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("")
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if(hasResult){
    displayedElement = ( 
    <Results 
          snippet={snippet} 
          keywords={keywords} 
          onBack={onReset} 
          prompt={prompt} 
    />
  );
  }else{
    displayedElement = (
      <Form 
          prompt={prompt} 
          setPrompt={setPrompt} 
          onSubmit={onSubmit} 
          isLoading={isLoading} 
          characterLimit={CHARACTER_LIMIT} 
      />
   );
  }
  const gradientTextStyle =
  "text-white text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-gray-300 font-light w-fit mx-auto";

  return (
  <div className="h-screen flex">
        <div className="max-w-md m-auto p-3">
            <div className="bg-gray-600 p-5 rounded-md text-white">
                 <div className="text-center my-5">
                      <Image src={logo} width={82} height={82}/>
                      <h1 className = {gradientTextStyle + " text-3xl font-light"}>Bill Board AI</h1>
                     <div className="{gradientTextStyle}"> AI-Driven branding snippet 
                     </div>
                  </div>
  {displayedElement}
  </div>
  </div>
  </div>
  );
};
export default Brand_comp;