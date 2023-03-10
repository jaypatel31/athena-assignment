import Head from 'next/head'
import Image from 'next/image'
import { useEffect,useRef,useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
// import first from "../images/first.gif"
// import second from "../images/second.gif"
// import third from "../images/third.gif"

const inter = Inter({ subsets: ['latin'] })

export default function Home({ text}) {
  const ref = useRef()

  const [activeGif, setActiveGif] = useState("first.gif")
  const [section, setSection] = useState(0)

  function handleScroll() {
    const scroll = Math.abs(ref.current.children[0].getBoundingClientRect().top - ref.current.children[0].offsetTop);
    let divHeight = ref.current.children[0].clientHeight/3;
    let divHeight2 = ref.current.children[0].clientHeight/3*2;
    let divHeight3 = ref.current.children[0].clientHeight;
    if(scroll < 3*divHeight/5){
      console.log(section)
      if(section !== 1){
        setSection(1)
        setActiveGif("first.gif")
      }
    }
    else if(scroll < 3*divHeight2/5){
      if(section !== 2){
        setSection(2)
        setActiveGif("second.gif")
      }
    }
    else{
      if(section !== 3){
        setSection(3)
        setActiveGif("third.gif")
      }
    }
    
  }

  useEffect(() => {
    const div = ref.current
    div.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Athena Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main_container} ref={ref}>
        <div className={styles.card_container}>
        {
          text.map((item, index) => {
            return(
              <>
              <div className={styles.main_card} key={index}>
                <div className={styles.heading}>
                  {item.heading}
                </div>
                <h2 className={styles.sub_heading}>
                  {item.subHeading}
                </h2>
                <div className={styles.text}>
                  {item.description}
                </div>
              </div>
              <Image className={styles.small_gif_container}  src={`/img/${index==0?"first":index==1?"second":"third"}.gif`} alt='athenahealth logo' width={500} height={500}/>
              </>
            )
          })
        }
        </div>
        <div className={styles.gif_container}>
          <div >
            <div style={{backgroundImage:`url(${`/img/${activeGif}`})`}}>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  let text = await axios.get('https://mocki.io/v1/ee762599-31ae-4a3d-a6c7-d596525945e1')
  text = text.data.texts
  return {
    props: {
      text,
    },
  }
}
