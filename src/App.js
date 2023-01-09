import {GiKnockout} from 'react-icons/gi'
import {AiOutlineStar,AiFillEye, AiOutlineMail , AiFillTwitterCircle} from 'react-icons/ai'
import {FaConnectdevelop} from 'react-icons/fa'
import {BiGitRepoForked} from 'react-icons/bi'
import {CiLocationArrow1} from 'react-icons/ci'
import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import {MdOutlineAutoAwesome} from 'react-icons/md'
import { BeatLoader, ClipLoader } from "react-spinners"; 
import {SlPeople} from 'react-icons/sl'
import {BsPeopleFill} from 'react-icons/bs'
import { useRef } from "react";
function App() {
  const ref = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [noMatch, setNoMatch] = useState(false);  
  const [dataRepos , setDataRepos] = useState([])
  const changeHandler = (e) => {
    setSearchKey(e.target.value);
  };
  useEffect(() => {
    if (searchKey !== "") {
      setLoader(true);
      fetch(`https://api.github.com/users/${searchKey}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.message === "Not Found") {
            setNoMatch(true);
            setLoader(false);
          } else if (!data.message) {
            setData(data);
            setLoader(false);
            fetch(`https://api.github.com/users/${searchKey}/repos`)
            .then(data => data.json())
            .then(data => setDataRepos(data))
          }
        })
        .catch((e) => {
          setError(e);
          setLoader(false);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [searchKey]);
  useEffect(() => {
    if (data.id) {
      setNoMatch(false);
    }
  }, [data]); 
  
  return (
    <div className="App flex justify-center items-center">
      <div className="search absolute top-32 mr-52">
        <label className=" absolute flex flex-row items-center justify-center gap-2 cursor-pointer">
          <span className="flex flex-row items-center justify-center">
            <AiFillGithub size={25} color="white" />
            <span className="text-xl text-white"> /</span>
          </span>
          <input
            onChange={(e) => changeHandler(e)}
            placeholder="@username"
            className="p-1 px-4 rounded-sm outline-none"
            type="textbox"
          ></input>
        </label>
      </div>
      {loader ? (
        <BeatLoader size={20} className="absolute" color="#ffffff" />
      ) : searchKey
      ? <div
      ref={ref}
      className="container w-2/5 h-1/2 bg-white rounded-2xl shadow-container shadow-stone-900"
    >
      {noMatch 
      ? <div className='container-not-match relative'>
        <GiKnockout className='absolute top-10 right-52' color='#9CA3AF' size={150}/>
        <span className=' text-gray-400 absolute top-52 right-44'>such a person never existed...</span>
      </div> 
      : <div className="container-match flex">
        <div className="container-match-left w-1/2 px-7 py-1 flex flex-col justify-center items-center">
          <img className="owner-img w-36 my-3 rounded-full" src={data.avatar_url}></img>
          <span className="owner-name font-semibold">{data.name}</span>
          <span className="owner-tag mb-3 text-gray-600 text-xs">{data.login}</span>
          <p className="owner-bio text-sm font-medium tracking-wider">{data.bio?data.bio.slice(0,50):null}...</p>
          <a href={data.html_url} target='_blank' className="owner-visit outline-none">visit on github</a>
          <div className="owner-action pt-1 flex flex-row  justify-center items-center gap-5">
            <div className="following  flex flex-row justify-center gap-1 items-center">
            <BsPeopleFill/>
            <span>{data.following}</span>
            </div>
            <div className="follower  flex flex-row  justify-center gap-1 items-center">
              <SlPeople/>
              <span>{data.followers}</span>
            </div>
          </div>
        </div>
        <div className="container-match-right mr-1 w-1/2 h-full py-10  relative">
             <div className="owner-specs">
              <div className='flex items-center gap-2 py-2 px-5'><CiLocationArrow1/><span>{data.location?data.location:'No one know that..'}</span></div>
              <div className='flex items-center gap-2 py-2 px-5'><BiGitRepoForked/><span>Public Repos <span className='font-semibold'>{` ` + data.public_repos}</span></span></div>
          
              {
                dataRepos.length != 0
                ? <div className='repos  flex flex-row justify-center items-center gap-1 p-3 !px-0'>
                  {
                    dataRepos[0]
                    ? <a href={dataRepos[0].html_url} target='_blank'>
                    <div className='repo1 flex flex-col gap-2'>
                     <span className='text-sm text-center'>{dataRepos[0].name.slice(0, 8)}...</span>
                     <span className='text-xs text-gray-500'>{dataRepos[0]?dataRepos[0].full_name.slice(0,12):null}...</span>
                     <div className='flex flex-row gap-1'><FaConnectdevelop/><span className='text-xs font-semibold'>{` `+dataRepos[0].language}</span></div>
                     <div className='repo-actions flex gap-3'>
                      <div className='stars flex items-center gap-1 justify-center'><AiOutlineStar/>{dataRepos[0].stargazers_count}</div>
                      <div className='watch flex items-center gap-1 justify-center'><AiFillEye/>{dataRepos[0].watchers_count}</div>   
                     </div>
                     <div className='visibility pl-3'>
                        <a className='visibility-tag'>{dataRepos[0].visibility}</a>
                     </div>
                    </div>
                    </a>
                    :null
                  }
                 {
                  dataRepos[1]
                  ?
                  <a href={dataRepos[1].html_url} target='_blank'>
                  <div className='repo2 flex flex-col gap-2'>
                   <span className='text-sm text-center'>{dataRepos[1].name.slice(0, 8)}...</span>
                   <span className='text-xs text-gray-500'>{dataRepos[1]?dataRepos[1].full_name.slice(0,12):null}...</span>
                   <div className='flex flex-row gap-1'><FaConnectdevelop/><span className='text-xs font-semibold'>{` `+dataRepos[1].language}</span></div>
                   <div className='repo-actions flex gap-3'>
                    <div className='stars flex items-center gap-1 justify-center'><AiOutlineStar/>{dataRepos[1].stargazers_count}</div>
                    <div className='watch flex items-center gap-1 justify-center'><AiFillEye/>{dataRepos[1].watchers_count}</div>   
                   </div>
                   <div className='visibility pl-3'>
                      <a className='visibility-tag'>{dataRepos[1].visibility}</a>
                   </div>
                  </div>
                  </a>
                  :null
                 }
                {
                  dataRepos[2]
                  ?  <a href={dataRepos[2].html_url} target='_blank'>
                  <div className='repo3 flex flex-col gap-2'>
                   <span className='text-sm text-center'>{dataRepos[2].name.slice(0, 8)}...</span>
                   <span className='text-xs text-gray-500'>{dataRepos[2]?dataRepos[2].full_name.slice(0,12):null}...</span>
                   <div className='flex flex-row gap-1'><FaConnectdevelop/><span className='text-xs font-semibold'>{` `+dataRepos[2].language}</span></div>
                   <div className='repo-actions flex gap-3'>
                    <div className='stars flex items-center gap-1 justify-center'><AiOutlineStar/>{dataRepos[2].stargazers_count}</div>
                    <div className='watch flex items-center gap-1 justify-center'><AiFillEye/>{dataRepos[2].watchers_count}</div>   
                   </div>
                   <div className='visibility pl-3'>
                      <a className='visibility-tag'>{dataRepos[0].visibility}</a>
                   </div>
                  </div>
                  </a>
                  :null
                }
               
              </div>
                : <ClipLoader color="black" className='absolute right-36 top-40' />
              }
            
             </div>
             <div className='owner-social-icons absolute ml-24 gap-1 flex flex-row items-center justify-center'>
              <a href={data.html_url} target='_blank'> <AiFillGithub/></a>
              <a href={`https://twitter.com/${data.twitter_username}`}> <AiFillTwitterCircle/></a>
              <a href={`mailto:${data.email}`}> <AiOutlineMail/></a>
             </div>
        </div>
      </div>}
    </div>
      : <div className="container-holder top-72  text-white absolute text-gray-300">Type github username to see owner profile details... <MdOutlineAutoAwesome size={100} className="absolute left-28 top-32 text-gray-300"/> </div>
      
      }
      
    </div>
  );
}
 
export default App;

 